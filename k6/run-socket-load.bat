@echo off
REM Socket.IO Load Test Runner for k6
REM This batch file makes it easy to run k6 tests without manually typing long commands

setlocal enabledelayedexpansion

echo.
echo ========================================
echo Socket.IO Load Test Runner (k6)
echo ========================================
echo.

REM Default values
set BASE_URL=https://dev-v2.satuinbox.com
set MODE=soak
set VUS=100
set DURATION=5m
set EMIT_EVERY_MS=2000

REM Check if k6 is installed
where k6 >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: k6 is not installed or not in PATH
    echo Please install k6 from: https://k6.io/docs/getting-started/installation/
    pause
    exit /b 1
)

echo k6 version:
k6 version
echo.

REM Ask user for test mode
echo Select test mode:
echo 1. Soak (idle connections) - Default
echo 2. Throughput (send messages)
echo.
set /p MODE_CHOICE="Enter choice (1 or 2): "

if "%MODE_CHOICE%"=="2" (
    set MODE=throughput
    echo.
    echo Throughput mode selected
    echo Default emit interval: 2000ms
    set /p EMIT_EVERY_MS="Enter emit interval in ms (or press Enter for default): "
) else (
    set MODE=soak
    echo.
    echo Soak mode selected
)

echo.
echo Enter test parameters:
set /p VUS="Number of VUs [100]: " || set VUS=100
set /p DURATION="Test duration [5m]: " || set DURATION=5m

REM Validate inputs
if not defined VUS set VUS=100
if not defined DURATION set DURATION=5m

echo.
echo ========================================
echo Test Configuration
echo ========================================
echo Base URL: %BASE_URL%
echo Mode: %MODE%
echo VUs: %VUS%
echo Duration: %DURATION%
if "%MODE%"=="throughput" echo Emit interval: %EMIT_EVERY_MS%ms
echo ========================================
echo.

pause /b

REM Build k6 command
if "%MODE%"=="throughput" (
    k6 run --vus %VUS% --duration %DURATION% ^
      -e BASE_URL=%BASE_URL% ^
      -e MODE=throughput ^
      -e EMIT_EVERY_MS=%EMIT_EVERY_MS% ^
      socketLoadMultichannel.js
) else (
    k6 run --vus %VUS% --duration %DURATION% ^
      -e BASE_URL=%BASE_URL% ^
      socketLoadMultichannel.js
)

echo.
echo ========================================
echo Test completed!
echo ========================================
pause
