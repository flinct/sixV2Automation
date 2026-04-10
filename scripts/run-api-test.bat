@echo off
REM API Performance Test Runner for Windows

echo.
echo ======================================
echo API Performance Test
echo ======================================
echo.

REM Get credentials
set /p USERNAME="Enter email/username: "
set /p PASSWORD="Enter password: "
set /p VUS="Enter number of VUs (default 5): "
if "%VUS%"=="" set VUS=5

set /p BASE_URL="Enter BASE_URL (default https://dev-v2.satuinbox.com): "
if "%BASE_URL%"=="" set BASE_URL=https://dev-v2.satuinbox.com

REM Run the test
echo.
echo Starting API performance test with %VUS% VUs...
echo.

setlocal enabledelayedexpansion
set API_TEST_USERNAME=%USERNAME%
set API_TEST_PASSWORD=%PASSWORD%
set API_TEST_VUS=%VUS%
set BASE_URL=%BASE_URL%
set LOG_LEVEL=info

node scripts/api-performance-test.js

echo.
echo Test completed.
echo.
pause
