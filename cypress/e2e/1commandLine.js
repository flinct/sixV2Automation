$env:CYPRESS_baseUrl="https://dev-v2.satuinbox.com";  $env:CYPRESS_loginType="cekerayam01"; npx cypress open

$env:BASE_URL="https://v2.satuinbox.com"; $env:LOG_LEVEL="debug"; $env:LOG_EVERY="1"; node scripts/widget-socket-load.js

$env:BASE_URL="https://v2.satuinbox.com"; $env:LOG_LEVEL="debug"; $env:AGENTS="50"; $env:CHURN_AGENTS="10"; $env:MESSAGES_PER_AGENT="30"; env:CYCLES="5"; $env:LOG_EVERY="100"; node scripts/widget-socket-load.js
