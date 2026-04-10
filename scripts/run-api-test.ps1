#!/usr/bin/env pwsh

<#
.SYNOPSIS
    API Performance Test Runner
.DESCRIPTION
    Interactive script to run API performance tests with multiple VUs
.EXAMPLE
    .\scripts\run-api-test.ps1
#>

Write-Host ""
Write-Host "======================================"
Write-Host "API Performance Test"
Write-Host "======================================"
Write-Host ""

# Get credentials
$username = Read-Host "Enter email/username"
$password = Read-Host "Enter password" -AsSecureString
$passwordPlaintext = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToCoTaskMemUnicode($password))

$vus = Read-Host "Enter number of VUs (default 5)"
if ([string]::IsNullOrWhiteSpace($vus)) { $vus = 5 }

$baseUrl = Read-Host "Enter BASE_URL (default https://dev-v2.satuinbox.com)"
if ([string]::IsNullOrWhiteSpace($baseUrl)) { $baseUrl = "https://dev-v2.satuinbox.com" }

Write-Host ""
Write-Host "Starting API performance test with $vus VUs..."
Write-Host ""

# Set environment variables
$env:API_TEST_USERNAME = $username
$env:API_TEST_PASSWORD = $passwordPlaintext
$env:API_TEST_VUS = $vus
$env:BASE_URL = $baseUrl
$env:LOG_LEVEL = "info"

# Run the test
& node scripts/api-performance-test.js

Write-Host ""
Write-Host "Test completed."
Write-Host ""
