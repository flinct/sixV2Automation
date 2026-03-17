import http from "k6/http";
   import { check, sleep } from "k6";

   export const options = {
     scenarios: {
       flow: {
         executor: "constant-arrival-rate",
         // FLOW_RPS = flow/second (bukan HTTP RPS)
         rate: __ENV.FLOW_RPS ? parseInt(__ENV.FLOW_RPS, 10) : 5,
         timeUnit: "1s",
         duration: __ENV.DURATION || "20m",
         preAllocatedVUs: __ENV.PRE_VUS ? parseInt(__ENV.PRE_VUS, 10) : 200,
         maxVUs: __ENV.MAX_VUS ? parseInt(__ENV.MAX_VUS, 10) : 2000,
       },
     },

     thresholds: {
       // transaksi full-flow dianggap "ok" kalau semua step ok dan QR ketemu (atau minimal poll tidak error)
       checks: ["rate>0.95"],

       http_req_failed: ["rate<0.05"],

       // total latency semua request campur; untuk flow, lebih bagus lihat custom trend,
       // tapi ini tetap berguna buat red flag.
       http_req_duration: ["p(95)<2000"],                                                                                                                                          
     },
   };

   const BASE_URL = __ENV.BASE_URL; // e.g. https://v2.satuinbox.com atau https://dev-v2.satuinbox.com
   const API_BASE =
     BASE_URL === "https://v2.satuinbox.com"
       ? "https://v2-api.satuinbox.com"
       : BASE_URL === "https://dev-v2.satuinbox.com"
         ? "https://dev-v2-api.satuinbox.com"
         : null;

   if (!BASE_URL || !API_BASE) {
     throw new Error("Set BASE_URL to https://v2.satuinbox.com or https://dev-v2.satuinbox.com");
   }

   const X_API_KEY = __ENV.X_API_KEY || "";
   const LOGIN_IDENTIFIER = __ENV.LOGIN_IDENTIFIER || "";
   const LOGIN_KEYWORD = __ENV.LOGIN_KEYWORD || "";
   const LOGIN_PASSWORD = __ENV.LOGIN_PASSWORD || "";

   const POLL_INTERVAL_MS = __ENV.POLL_INTERVAL_MS ? parseInt(__ENV.POLL_INTERVAL_MS, 10) : 2000;

   // Batasi polling supaya request tidak meledak.
   // Misal 10 attempts dengan interval 2s = max ~20s polling/flow.
   const POLL_MAX_ATTEMPTS = __ENV.POLL_MAX_ATTEMPTS ? parseInt(__ENV.POLL_MAX_ATTEMPTS , 10) : 10;

   // token expiry: kamu bilang 15 menit, kita refresh ketika sisa 60 detik.
   const TOKEN_TTL_SEC = __ENV.TOKEN_TTL_SEC ? parseInt(__ENV.TOKEN_TTL_SEC, 10) : 15 * 60;
   const TOKEN_REFRESH_SKEW_SEC = __ENV.TOKEN_REFRESH_SKEW_SEC
     ? parseInt(__ENV.TOKEN_REFRESH_SKE W_SEC, 10)
     : 60;

   function headers(token) {
     const h = { "content-type": "application/json" };
     if (X_API_KEY) h["x-api-key"] = X_API_KEY;
     if (token) h["Authorization"] = `Bearer ${token}`;
     return h;
   }

   function nowSec() {
     return Math.floor(Date.now() / 1000);
   }

   function login() {
     const url = `${API_BASE}/api/auth/login`;
     const body =
       LOGIN_IDENTIFIER
         ? { identifier: LOGIN_IDENTIFIER, password: LOGIN_PASSWORD }
         : { keyword: LOGIN_KEYWORD, password: LOGIN_PASSWORD };

     const res = http.post(url, JSON.stringify(body), {
       headers: headers(""),
       tags: { name: "auth_login" },
       timeout: "20s",
     });

     const ok = check(res, {
       "login status 2xx": (r) => r.status >= 200 && r.status < 300,
     });

     if (!ok) return { token: "", exp: 0 };

     const json = res.json();
     const token =
       json?.accessToken || json?.token || json?.data?.accessToken || json?.data?.token || "";

     if (!token) return { token: "", exp: 0 };

     return { token, exp: nowSec() + TOKEN_TTL_SEC };
   }

   // Per-VU token cache (tiap VU punya state sendiri)
   let tokenState = { token: "", exp: 0 };

   function getValidToken() {
     const t = nowSec();
     const shouldRelogin =
       !tokenState.token || !tokenState.exp || (tokenState.exp - t) <= TOKEN_REFRESH_SKEW_SEC;                                                                                     

     if (shouldRelogin) {
       tokenState = login();
     }
     return tokenState.token;
   }

   function randomPhone() {
     const suffix = String(Math.floor(Math.random() * 1e9)).padStart(9, "0");
     return `+628${suffix}`;
   }

   export default function () {
     const token = getValidToken();

     // Step 1: create account-channel
     const createUrl = `${API_BASE}/api/account-channel`;
     const phone = randomPhone();
     const createBody = {
       accountStatus: "used",
       connectionStatus: "inactive",
       channel: __ENV.CHANNEL_ID || "692e83fb9fe6921a278565ab",
       name: "helo",
       phoneNumber: phone,
     };

     const r1 = http.post(createUrl, JSON.stringify(createBody), {
       headers: headers(token),
       tags: { name: "account_channel_create" },
       timeout: "20s",
     });

     const createOk = check(r1, {
       "create 2xx": (r) => r.status >= 200 && r.status < 300,                                                                                                                     
     });
     if (!createOk) return;

     const created = r1.json();
     const id = created?.id || created?.data?.id;
     if (!id) {
       check(null, { "create returned id": () => false });
       return;
     }

     // Step 2: init instance
     const initUrl = `${API_BASE}/api/account-channel/instance`;
     const initBody = { id };

     const r2 = http.post(initUrl, JSON.stringify(initBody), {
       headers: headers(token),
       tags: { name: "instance_init" },
       timeout: "20s",
     });

     const initOk = check(r2, {
       "init 2xx": (r) => r.status >= 200 && r.status < 300,
     });
     if (!initOk) return;

     // Step 3: poll QR
     const qrUrl = `${API_BASE}/api/account-channel/instance/qr/${encodeURIComponent(id)}`;

     let qrOk = false;
     for (let attempt = 1; attempt <= POLL_MAX_ATTEMPTS; attempt++) {
       const r3 = http.get(qrUrl, {
         headers: headers(token),
         tags: { name: "qr_poll" },
         timeout: "20s",
       });

       // Kalau token expired di tengah polling, relogin lalu lanjut polling
       if (r3.status === 401) {                                                                                                                                                    
         tokenState = login();
         continue;
       }

       const ok = r3.status >= 200 && r3.status < 300;
       if (!ok) {
         // non-2xx: anggap gagal polling attempt ini
         sleep(POLL_INTERVAL_MS / 1000);
         continue;
       }

       const j = r3.json();
       const qr = j?.qrCode || j?.data?.qrCode || j?.qr || "";
       if (typeof qr === "string" && qr.length > 0) {
         qrOk = true;
         break;
       }

       sleep(POLL_INTERVAL_MS / 1000);
     }

     check(qrOk, { "qr obtained": (v) => v === true });
   }