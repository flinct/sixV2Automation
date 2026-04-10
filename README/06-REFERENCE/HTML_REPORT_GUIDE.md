# HTML Report Generation Guide

## Overview

Widget Socket Load Test now generates professional HTML reports similar to k6 format. Reports are automatically generated at the end of each test run.

## Features

✅ **Professional Design**
- Modern gradient backgrounds
- Responsive layout (mobile-friendly)
- Clean, readable typography
- K6-style visual design

✅ **Comprehensive Metrics**
- Connection statistics
- Message throughput
- Error tracking
- Performance metrics
- Configuration details
- Timeline information

✅ **Interactive Elements**
- Hover effects on metric cards
- Responsive grid layout
- Color-coded status indicators
- Mobile-responsive tables

## Configuration

### Default Output Location
```bash
reports/load-test-report.html
```

### Custom Output Location
```bash
REPORT_OUTPUT=my-reports/custom-report.html node widget-socket-load-2.js
```

### Example with Full Parameters
```bash
$env:BASE_URL = "https://dev-v2.satuinbox.com"
$env:MODE = "throughput"
$env:TARGET_CONNECTIONS = "50"
$env:REPORT_OUTPUT = "reports/my-test-report.html"
node widget-socket-load-2.js
```

## Generated Report Contents

### Header Section
- Test Title
- Test ID (timestamp-based)
- Duration
- Test Mode (soak/throughput)
- Status Badge (PASSED / PASSED_WITH_ERRORS)

### Metrics Grid
- Target Connections
- Connected Clients
- Connection Errors
- Messages Sent
- Disconnects
- Prepared Rooms

### Configuration Section
- Test Settings (Base URL, Mode, Target VU)
- Timing (Start, End, Duration)
- Performance (Emit Rate, Success Rate, Error Rate)

### Detailed Results Table
| Metric | Value | Status |
|--------|-------|--------|
| Created Clients | N | ✓ |
| Successfully Connected | N | ✓/⚠ |
| Connection Errors | N | ✓/✗ |
| Total Messages | N | ✓ |
| Emit Rate | N msg/sec | ✓ |
| And more... | | |

### Summary
- Human-readable summary of test results
- Key statistics
- Error analysis (if any)

## Report Status Indicators

### Status Badge
- **PASSED** (Green) - 0 connection errors
- **PASSED_WITH_ERRORS** (Red) - Some connection errors

### Metric Colors
- **Green** - Success (connected, no errors)
- **Yellow** - Warning (some issues)
- **Red** - Danger (errors detected)

## Quick Start

### 1. Simple Test (Soak Mode)
```bash
$env:BASE_URL = "https://dev-v2.satuinbox.com"
$env:MODE = "soak"
$env:TARGET_CONNECTIONS = "50"
node widget-socket-load-2.js

# Report generated at: reports/load-test-report.html
```

### 2. Throughput Test with Custom Report
```bash
$env:BASE_URL = "https://dev-v2.satuinbox.com"
$env:MODE = "throughput"
$env:TARGET_CONNECTIONS = "100"
$env:EMIT_EVERY_MS = "200"
$env:REPORT_OUTPUT = "reports/throughput-test.html"
node widget-socket-load-2.js

# Report generated at: reports/throughput-test.html
```

### 3. Long Running Stress Test
```bash
$env:BASE_URL = "https://dev-v2.satuinbox.com"
$env:MODE = "throughput"
$env:TARGET_CONNECTIONS = "500"
$env:RUN_DURATION_MS = "600000"
$env:REPORT_OUTPUT = "reports/stress-test-$(Get-Date -Format 'yyyy-MM-dd-HHmmss').html"
node widget-socket-load-2.js

# Report with timestamp: reports/stress-test-2026-04-09-143000.html
```

## Report Files Generated

### Main Report
- **load-test-report.html** (default)
- Standalone HTML file
- No external dependencies required
- Can be opened in any browser

### Auto-Created Directories
- `reports/` folder created automatically if it doesn't exist

## Opening the Report

### Option 1: Direct File
```bash
# Windows
start reports/load-test-report.html

# Mac
open reports/load-test-report.html

# Linux
xdg-open reports/load-test-report.html
```

### Option 2: From PowerShell
```powershell
# Windows
Invoke-Item reports/load-test-report.html
```

### Option 3: With Python SimpleHTTPServer
```bash
cd reports
python -m http.server 8000

# Then open: http://localhost:8000/load-test-report.html
```

## Report Styling

### Colors Used
- **Primary Blue**: #667eea, #764ba2 (gradients)
- **Success Green**: #68d391, #48bb78
- **Warning Orange**: #fbd38d, #f6ad55
- **Danger Red**: #fc8181, #f56565
- **Text**: #2d3748 (dark), #718096 (light)

### Responsive Design
- Desktop: Multi-column grid layout
- Tablet: Adjusted spacing and font sizes
- Mobile: Single column, optimized for small screens

## Environment Variables

```bash
# Required
BASE_URL                    # e.g., https://dev-v2.satuinbox.com

# Optional Report-specific
REPORT_OUTPUT              # Custom report file path (default: reports/load-test-report.html)

# Other load test parameters (existing)
MODE                       # soak | throughput
TARGET_CONNECTIONS        # Number of VUs
EMIT_EVERY_MS            # Message interval
RUN_DURATION_MS          # Test duration
# ... and more (see widget-socket-load-2.js header)
```

## Example Complete Commands

### Quick Baseline (Soak)
```bash
$env:BASE_URL = "https://dev-v2.satuinbox.com"
$env:TARGET_CONNECTIONS = "10"
$env:RUN_DURATION_MS = "30000"
node widget-socket-load-2.js
# Report: reports/load-test-report.html
```

### Medium Stress (Throughput)
```bash
$env:BASE_URL = "https://dev-v2.satuinbox.com"
$env:MODE = "throughput"
$env:TARGET_CONNECTIONS = "100"
$env:EMIT_EVERY_MS = "500"
$env:RUN_DURATION_MS = "300000"
$env:REPORT_OUTPUT = "reports/medium-stress.html"
node widget-socket-load-2.js
```

### Heavy Stress (Throughput)
```bash
$env:BASE_URL = "https://dev-v2.satuinbox.com"
$env:MODE = "throughput"
$env:TARGET_CONNECTIONS = "500"
$env:EMIT_EVERY_MS = "200"
$env:RUN_DURATION_MS = "900000"
$env:REPORT_OUTPUT = "reports/heavy-stress.html"
node widget-socket-load-2.js
```

## Troubleshooting

### Report Not Generated
**Issue**: HTML file not created
**Solution**: Check if `reports/` directory exists and has write permissions

```bash
# Create manually if needed
mkdir reports

# Or set custom path with full permissions
$env:REPORT_OUTPUT = "C:\temp\my-report.html"
```

### Report Location Not Found
**Issue**: Can't find where report was saved
**Solution**: Check console output for "HTML report generated" message

```bash
# Output will show:
# [INFO ] HTML report generated { file: reports/load-test-report.html }
```

### Report Shows No Data
**Issue**: Report generated but metrics are 0/empty
**Solution**: Test may have failed - check console for errors

Look for messages like:
- "[ERROR] Socket error"
- "[ERROR] Connection failed"

## Features Coming Soon

- 📊 Historical comparison graphs
- 📈 Latency percentile charts
- 🔍 Per-VU detailed logs
- 💾 Export to CSV/JSON
- 📧 Email report notifications
- 🔗 Report sharing links

## Browser Compatibility

✅ Chrome/Chromium 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+
✅ Mobile browsers (iOS Safari, Chrome Mobile)

## File Size

- Typical report: 25-30 KB
- Fully self-contained (no external assets)
- Fast loading even on slow connections

## Notes

- Reports are timestamped with test ID
- All data is embedded in HTML (no database required)
- Reports can be archived for long-term storage
- Compatible with k6 report naming convention
