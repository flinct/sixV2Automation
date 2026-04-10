# Report Directory Configuration

## Default Location

All HTML reports are now saved to:
```
C:\Users\MyBook SAGA 12\Desktop\sixV2Automation\scripts\report
```

This directory is **automatically created** if it doesn't exist.

## Report Naming

Reports are automatically named with timestamp:
```
load-test-2026-04-09-143000.html
load-test-2026-04-10-090530.html
load-test-2026-04-10-152145.html
```

Format: `load-test-YYYY-MM-DD-HHMMSS.html`

## Usage

### Option 1: Use Default Directory (Simplest)
```powershell
$env:BASE_URL = "https://dev-v2.satuinbox.com"
$env:MODE = "throughput"
$env:TARGET_CONNECTIONS = "50"
node scripts/widget-socket-load-2.js

# Report saved to: scripts/report/load-test-2026-04-09-143000.html
```

### Option 2: Custom Directory (Override)
```powershell
$env:REPORT_OUTPUT = "C:\custom\path\my-report.html"
$env:BASE_URL = "https://dev-v2.satuinbox.com"
node scripts/widget-socket-load-2.js

# Report saved to: C:\custom\path\my-report.html
```

### Option 3: Custom Filename with Default Directory
```powershell
$env:REPORT_OUTPUT = "C:\Users\MyBook SAGA 12\Desktop\sixV2Automation\scripts\report\my-custom-name.html"
$env:BASE_URL = "https://dev-v2.satuinbox.com"
node scripts/widget-socket-load-2.js

# Report saved to: scripts/report/my-custom-name.html
```

## File Structure

```
sixV2Automation/
├── scripts/
│   ├── widget-socket-load-2.js
│   ├── report-generator.js
│   ├── report/                          ← Reports saved here
│   │   ├── load-test-2026-04-09-143000.html
│   │   ├── load-test-2026-04-09-145530.html
│   │   ├── load-test-2026-04-10-090145.html
│   │   └── my-custom-report.html
│   └── ...
```

## Opening Reports

### Method 1: PowerShell - Open Latest Report
```powershell
$latestReport = Get-ChildItem "C:\Users\MyBook SAGA 12\Desktop\sixV2Automation\scripts\report" -Filter "*.html" | Sort-Object LastWriteTime -Descending | Select-Object -First 1
Invoke-Item $latestReport.FullName
```

### Method 2: Windows Explorer
```powershell
explorer "C:\Users\MyBook SAGA 12\Desktop\sixV2Automation\scripts\report"
```

Then double-click any `.html` file to open in browser.

### Method 3: Direct Path
```powershell
Invoke-Item "C:\Users\MyBook SAGA 12\Desktop\sixV2Automation\scripts\report\load-test-2026-04-09-143000.html"
```

### Method 4: Python HTTP Server
```powershell
cd "C:\Users\MyBook SAGA 12\Desktop\sixV2Automation\scripts\report"
python -m http.server 8000

# Then open: http://localhost:8000
```

## Report Locations Summary

| Scenario | Command | Location |
|----------|---------|----------|
| Default (recommended) | None | `scripts/report/load-test-YYYY-MM-DD-HHMMSS.html` |
| Custom file | `$env:REPORT_OUTPUT=path` | User-specified path |
| Same folder, custom name | `$env:REPORT_OUTPUT=scripts/report/custom.html` | `scripts/report/custom.html` |

## Environment Variables

### REPORT_OUTPUT
- **Type**: String (file path)
- **Default**: Auto-generated in `scripts/report/` folder
- **Example**: `C:\Users\MyBook SAGA 12\Desktop\sixV2Automation\scripts\report\my-test.html`

If not specified:
- Directory: `scripts/report/` (auto-created)
- Filename: `load-test-{timestamp}.html`

## Features

✅ Automatic directory creation  
✅ Timestamp-based naming  
✅ Customizable path  
✅ Fallback to default directory  
✅ Full path displayed in console  

## Console Output Example

```
[INFO ] Starting widget-socket-load-2 {...}
[INFO ] progress { created: 50, connected: 50, emits: 5000 }
...
[INFO ] done { created: 50, connected: 50, connectErrors: 0, emits: 72939 }
[REPORT] HTML report generated: C:\Users\MyBook SAGA 12\Desktop\sixV2Automation\scripts\report\load-test-2026-04-09-143000.html
```

## Accessing Reports Programmatically

```javascript
// Get the report path
const { generateHTMLReport, DEFAULT_REPORT_DIR } = require('./report-generator');

// Reports are saved in DEFAULT_REPORT_DIR
console.log('Reports location:', DEFAULT_REPORT_DIR);
// Output: C:\Users\MyBook SAGA 12\Desktop\sixV2Automation\scripts\report

// List all reports
const fs = require('fs');
const reports = fs.readdirSync(DEFAULT_REPORT_DIR).filter(f => f.endsWith('.html'));
console.log('Available reports:', reports);
```

## Cleanup (Old Reports)

To delete old reports:

```powershell
# Delete reports older than 30 days
Get-ChildItem "C:\Users\MyBook SAGA 12\Desktop\sixV2Automation\scripts\report" -Filter "*.html" | 
  Where-Object {$_.LastWriteTime -lt (Get-Date).AddDays(-30)} | 
  Remove-Item

# Or delete all reports
Remove-Item "C:\Users\MyBook SAGA 12\Desktop\sixV2Automation\scripts\report\*"

# Keep only latest 5 reports
Get-ChildItem "C:\Users\MyBook SAGA 12\Desktop\sixV2Automation\scripts\report" -Filter "*.html" | 
  Sort-Object LastWriteTime -Descending | 
  Select-Object -Skip 5 | 
  Remove-Item
```

## Troubleshooting

### Report Not Found
**Problem**: Report file not created
**Solution**: Check console output for `[REPORT]` message showing full path

### Permission Denied
**Problem**: Cannot write to report directory
**Solution**: 
```powershell
# Set full control permissions
icacls "C:\Users\MyBook SAGA 12\Desktop\sixV2Automation\scripts\report" /grant:r "%USERNAME%":F /t
```

### Wrong Directory
**Problem**: Report saved in unexpected location
**Solution**: Check `REPORT_OUTPUT` env var isn't set
```powershell
echo $env:REPORT_OUTPUT  # Should be empty for default
```

## Quick Reference

```bash
# Default location
C:\Users\MyBook SAGA 12\Desktop\sixV2Automation\scripts\report

# Run test (auto-generates report)
node scripts/widget-socket-load-2.js

# Open latest report
Invoke-Item (Get-ChildItem "C:\Users\MyBook SAGA 12\Desktop\sixV2Automation\scripts\report\*.html" | Sort-Object LastWriteTime -Descending | Select-Object -First 1)

# List all reports
Get-ChildItem "C:\Users\MyBook SAGA 12\Desktop\sixV2Automation\scripts\report\*.html"
```
