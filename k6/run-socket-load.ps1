# Socket.IO Load Test Runner (PowerShell version)
# Usage: .\run-socket-load.ps1 -Mode "soak" -VUs 100 -Duration "5m"

param(
    [ValidateSet("soak", "throughput")]
    [string]$Mode = "soak",
    
    [int]$VUs = 100,
    
    [string]$Duration = "5m",
    
    [ValidateSet("https://dev-v2.satuinbox.com", "https://v2.satuinbox.com")]
    [string]$BaseUrl = "https://dev-v2.satuinbox.com",
    
    [int]$EmitEveryMs = 2000,
    
    [string]$SignatureKey,
    
    [switch]$Interactive
)

# Colors
$colors = @{
    Info  = "Cyan"
    Error = "Red"
    Success = "Green"
    Warn  = "Yellow"
}

function Write-Info($msg) { Write-Host "[$((Get-Date).ToString('HH:mm:ss'))] $msg" -ForegroundColor $colors.Info }
function Write-Error($msg) { Write-Host "[$((Get-Date).ToString('HH:mm:ss'))] ERROR: $msg" -ForegroundColor $colors.Error }
function Write-Success($msg) { Write-Host "[$((Get-Date).ToString('HH:mm:ss'))] $msg" -ForegroundColor $colors.Success }
function Write-Warn($msg) { Write-Host "[$((Get-Date).ToString('HH:mm:ss'))] $msg" -ForegroundColor $colors.Warn }

Write-Info "Socket.IO Load Test Runner (k6)"

# Check if k6 is installed
$k6Check = k6 version 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Error "k6 is not installed or not in PATH"
    Write-Info "Install from: https://k6.io/docs/getting-started/installation/"
    exit 1
}

Write-Success "k6 is installed: $($k6Check.Split([Environment]::NewLine)[0])"

# Interactive mode
if ($Interactive) {
    Write-Info ""
    Write-Info "Available modes:"
    Write-Info "  1. soak (idle connections)"
    Write-Info "  2. throughput (send messages)"
    Write-Info ""
    
    $modeChoice = Read-Host "Select mode (1/2) [1]"
    if ($modeChoice -eq "2") {
        $Mode = "throughput"
        $EmitEveryMs = Read-Host "Emit interval in ms [2000]"
        if ([string]::IsNullOrEmpty($EmitEveryMs)) { $EmitEveryMs = 2000 }
    } else {
        $Mode = "soak"
    }
    
    $vusInput = Read-Host "Number of VUs [100]"
    if (-not [string]::IsNullOrEmpty($vusInput)) { $VUs = [int]$vusInput }
    
    $durationInput = Read-Host "Duration [5m]"
    if (-not [string]::IsNullOrEmpty($durationInput)) { $Duration = $durationInput }
    
    $baseUrlChoice = Read-Host "Base URL (1=dev, 2=prod) [1]"
    if ($baseUrlChoice -eq "2") {
        $BaseUrl = "https://v2.satuinbox.com"
    }
}

# Display configuration
Write-Info ""
Write-Info "========================================="
Write-Info "Test Configuration"
Write-Info "========================================="
Write-Info "Base URL: $BaseUrl"
Write-Info "Mode: $Mode"
Write-Info "VUs: $VUs"
Write-Info "Duration: $Duration"
if ($Mode -eq "throughput") {
    Write-Info "Emit interval: ${EmitEveryMs}ms"
}
Write-Info "========================================="
Write-Info ""

# Confirm before starting
if ($Interactive) {
    $confirm = Read-Host "Start test? (y/n) [y]"
    if ($confirm -ne "y" -and $confirm -ne "") { exit }
}

# Build k6 environment variables
$envVars = @{
    BASE_URL = $BaseUrl
    MODE = $Mode
}

if ($Mode -eq "throughput") {
    $envVars.EMIT_EVERY_MS = $EmitEveryMs
}

if (-not [string]::IsNullOrEmpty($SignatureKey)) {
    $envVars.SIGNATURE_KEY = $SignatureKey
}

# Set environment variables
foreach ($key in $envVars.Keys) {
    [Environment]::SetEnvironmentVariable($key, $envVars[$key])
}

# Run k6 test
Write-Success "Starting k6 test..."
Write-Info ""

$scriptPath = Join-Path $PSScriptRoot "socketLoadMultichannel.js"
$args = @("run", "--vus", $VUs, "--duration", $Duration)

foreach ($key in $envVars.Keys) {
    $args += "-e"
    $args += "$key=$($envVars[$key])"
}

$args += $scriptPath

Write-Info "Command: k6 $($args -join ' ')"
Write-Info ""

& k6 @args

if ($LASTEXITCODE -eq 0) {
    Write-Success "Test completed successfully!"
} else {
    Write-Error "Test failed with exit code: $LASTEXITCODE"
}
