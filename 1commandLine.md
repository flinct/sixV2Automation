//-------------------CYPRESS--------------------
$env:CYPRESS_baseUrl="https://dev.example.test"; $env:CYPRESS_loginType="cekerayam01"; npx cypress open

//run time 5 menit WIDGET LOAD
$env:BASE_URL = "https://dev.example.test"; $env:LOG_LEVEL = "debug"; $env:MODE = "throughput"; $env:TARGET_CONNECTIONS = "50"; $env:RUN_DURATION_MS = "300000"; node scripts/widget-socket-load-2.js

$env:BASE_URL = "https://dev.example.test"; $env:MODE="throughput"
$env:TARGET_CONNECTIONS = "50";
$env:RUN_DURATION_MS = "300000"; $env:EMIT_EVERY_MS = "200"; $env:LOG_LEVEL = "info"; node scripts/widget-socket-load-2.js

//shared mode tidak usah kirim prepare_mode / perClient
$env:BASE_URL = "https://dev.example.test";
$env:MODE = "throughput";
$env:TARGET_CONNECTIONS = "50";
$env:PREPARE_MODE = "perClient";
$env:RUN_DURATION_MS = "300000";
$env:EMIT_EVERY_MS = "200";
$env:LOG_LEVEL = "info"; node scripts/widget-socket-load-2.js

//stress test get qr code
$env:BASE_URL = "https://dev.example.test";
$env:CYPRESS_loginType = "cekerayam01";
node scripts/print-k6-env-from-cypress.js | Invoke-Expression

k6 run .\k6\wa_qr_fullflow.js
//-------------------CYPRESS--------------------

-
-
-
-
-
-
- //-------------------PLAYWRIGHT--------------------
  $env:ENV="dev"
$env:LOGIN_TYPE="cekerayam01"
  npx playwright test --ui

$env:ENV="dev"
$env:LOGIN_TYPE="cekerayam01"
npx playwright test "playwright/tests/e2e/auth/login.spec.js" --headed --project=chromium

$env:ENV="dev"
$env:LOGIN_TYPE="cekerayam01"
npx playwright codegen  
//-------------------PLAYWRIGHT--------------------

-
-
-
-
-
-
- //-------------------prompt analisa prd--------------------

dengan rule yang ada
analisa PRD {....}

cari conflict atau requirement yang tidak relevan tapi ada di PRD
impact ketika development dilakukan

dengan rule yang ada
analisa PRD {....} <local-prd-folder>

cari conflict atau requirement yang tidak relevan tapi ada di PRD
impact ketika development dilakukan

bandingkan kedua file, seharusnya contact adalah existing contact yang di prod
contact - context and visibility adalah update feature

## //-------------------prompt analisa prd--------------------

-
-
-
-
-
- //-------------------crikket credentials--------------------

NEXT_PUBLIC_CRIKKET_KEY=crk_Tc-3VeBRCgXtKsj6YeAOt8o7

# Crikket API host (self-hosted: https://qa.satuinbox.dev)

NEXT_PUBLIC_CRIKKET_HOST=https://qa.satuinbox.dev

## //-------------------crikket credentials--------------------

-
-
-
-
-
-
-
