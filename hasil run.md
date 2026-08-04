k6 run scripts/k6/conversation-5ep.js --env VUS=1 --env DURATION_SEC=10 --env POLL_INTERVAL_SEC=2 --env BASE_URL=https://dev-v2-api.satuinbox.com --env E2E_USER=admintest --env E2E_PASSWORD=Password1@

         /\      Grafana   /‾‾/
    /\  /  \     |\  __   /  /

/ \/ \ | |/ / / ‾‾\
 / \ | ( | (‾) |
/ \***\*\_\_\*\*** \ |\_|\_\ \_\_\_\_\_/

     execution: local
        script: scripts/k6/conversation-5ep.js
        output: -

     scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
              * conv_5ep: 1 looping VUs for 10s (gracefulStop: 30s)

WARN[0040] No script iterations fully finished, consider making the test duration longer

█ THRESHOLDS

    http_req_failed
    ✓ 'rate<0.3' rate=0.00%

█ TOTAL RESULTS

    checks_total.......: 3       0.074999/s
    checks_succeeded...: 100.00% 3 out of 3
    checks_failed......: 0.00%   0 out of 3

    ✓ login ok
    ✓ variant1_all status
    ✓ variant2_yourinbox status

    HTTP
    http_req_duration..............: avg=11.97s min=397.91ms med=8.81s max=26.72s p(90)=23.14s p(95)=24.93s
      { expected_response:true }...: avg=11.97s min=397.91ms med=8.81s max=26.72s p(90)=23.14s p(95)=24.93s
    http_req_failed................: 0.00%  0 out of 3
    http_reqs......................: 3      0.074999/s

    EXECUTION
    vus............................: 1      min=1      max=1
    vus_max........................: 1      min=1      max=1

    NETWORK
    data_received..................: 140 kB 3.5 kB/s
    data_sent......................: 3.7 kB 92 B/s

running (40.0s), 0/1 VUs, 0 complete and 1 interrupted iterations
conv_5ep ✓ [======================================] 1 VUs 10s

k6 run scripts/k6/conversation-5ep.js --env VUS=1 --env DURATION_SEC=30 --env POLL_INTERVAL_SEC=2 --env BASE_URL=https://dev-v2-api.satuinbox.com --env E2E_USER=admintest --env E2E_PASSWORD=Password1@

         /\      Grafana   /‾‾/
    /\  /  \     |\  __   /  /

/ \/ \ | |/ / / ‾‾\
 / \ | ( | (‾) |
/ \***\*\_\_\*\*** \ |\_|\_\ \_\_\_\_\_/

     execution: local
        script: scripts/k6/conversation-5ep.js
        output: -

     scenarios: (100.00%) 1 scenario, 1 max VUs, 1m0s max duration (incl. graceful stop):
              * conv_5ep: 1 looping VUs for 30s (gracefulStop: 30s)

WARN[0021] Request Failed error="Post \"https://dev-v2-api.satuinbox.com/api/auth/login\": dial tcp 172.67.155.34:443: connectex: A connection attempt failed because the connected party did not properly respond after a period of time, or established connection failed because connected host has failed to respond."

█ THRESHOLDS

    http_req_failed
    ✗ 'rate<0.3' rate=100.00%

█ TOTAL RESULTS

    checks_total.......: 1       0.045985/s
    checks_succeeded...: 0.00%   0 out of 1
    checks_failed......: 100.00% 1 out of 1

    ✗ login ok
      ↳  0% — ✓ 0 / ✗ 1

    HTTP
    http_req_duration....: avg=0s     min=0s     med=0s     max=0s     p(90)=0s     p(95)=0s
    http_req_failed......: 100.00% 1 out of 1
    http_reqs............: 1       0.045985/s

    EXECUTION
    iteration_duration...: avg=21.74s min=21.74s med=21.74s max=21.74s p(90)=21.74s p(95)=21.74s
    iterations...........: 1       0.045985/s
    vus..................: 1       min=1      max=1
    vus_max..............: 1       min=1      max=1

    NETWORK
    data_received........: 0 B     0 B/s
    data_sent............: 0 B     0 B/s

running (0m21.8s), 0/1 VUs, 0 complete and 1 interrupted iterations
conv_5ep ✗ [==========================>-----------] 1 VUs 21.7s/30s
ERRO[0024] test aborted: login failed: HTTP 0 at login (file:///C:/Users/Flinct/Desktop/sixV2Automation/scripts/k6/conversation-5ep.js:85:20(49))
PS C:\Users\Flinct\Desktop\sixV2Automation>

█ THRESHOLDS

    http_req_failed
    ✓ 'rate<0.3' rate=0.00%

      {endpoint:login}
      ✓ 'rate<0.05' rate=0.00%

█ TOTAL RESULTS

    checks_total.......: 86      1.910839/s
    checks_succeeded...: 100.00% 86 out of 86
    checks_failed......: 0.00%   0 out of 86

    ✓ login ok
    ✓ variant1_all status
    ✓ variant2_yourinbox status
    ✓ count status
    ✓ filterCount status
    ✓ screenshotSetting status

    HTTP
    http_req_duration..............: avg=71.04ms min=46.17ms med=61.41ms max=411.52ms p(90)=94.03ms p(95)=96.22ms
      { expected_response:true }...: avg=71.04ms min=46.17ms med=61.41ms max=411.52ms p(90)=94.03ms p(95)=96.22ms
    http_req_failed................: 0.00%  0 out of 86
      { endpoint:login }...........: 0.00%  0 out of 1
    http_reqs......................: 86     1.910839/s

    EXECUTION
    vus............................: 1      min=0       max=1
    vus_max........................: 1      min=1       max=1

    NETWORK
    data_received..................: 2.9 MB 64 kB/s
    data_sent......................: 15 kB  331 B/s

running (45.0s), 0/1 VUs, 0 complete and 1 interrupted iterations
conv_5ep ✓ [======================================] 1/1 VUs 15s

█ THRESHOLDS

    http_req_failed
    ✓ 'rate<0.3' rate=0.78%

      {endpoint:login}
      ✓ 'rate<0.05' rate=0.00%

█ TOTAL RESULTS

    checks_total.......: 11438  53.199541/s
    checks_succeeded...: 99.21% 11348 out of 11438
    checks_failed......: 0.78%  90 out of 11438

    ✓ login ok
    ✗ variant1_all status
      ↳  98% — ✓ 2265 / ✗ 30
    ✗ variant2_yourinbox status
      ↳  98% — ✓ 2265 / ✗ 30
    ✓ count status
    ✗ filterCount status
      ↳  98% — ✓ 2244 / ✗ 30
    ✓ screenshotSetting status

    HTTP
    http_req_duration..............: avg=160.12ms min=42.31ms med=99ms    max=3.62s p(90)=330.76ms p(95)=428.53ms
      { expected_response:true }...: avg=155.56ms min=42.31ms med=98.56ms max=3.62s p(90)=327.3ms  p(95)=422.89ms
    http_req_failed................: 0.78%  90 out of 11438
      { endpoint:login }...........: 0.00%  0 out of 30
    http_reqs......................: 11438  53.199541/s

    EXECUTION
    vus............................: 30     min=5           max=30
    vus_max........................: 30     min=30          max=30

    NETWORK
    data_received..................: 384 MB 1.8 MB/s
    data_sent......................: 1.7 MB 8.1 kB/s

running (3m35.0s), 00/30 VUs, 0 complete and 30 interrupted iterations
conv_5ep ✓ [======================================] 30/30 VUs 3m5s
