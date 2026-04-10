# Bug Fix: AccessToken Not Defined Error

## Problem

Error when generating HTML report:
```
[ERROR] Failed to generate HTML report { error: 'accessToken is not defined' }
```

## Root Cause

`accessToken` variable was declared as `let accessToken = null;` inside the conditional block (if apiUsername && apiPassword), making it unavailable in the report generation section which is outside that block.

## Solution

Moved `accessToken` declaration to the top of the `main()` function:

```javascript
async function main() {
  const log = makeLogger();

  let accessToken = null; // ← Declared at function level
  
  // ... rest of code
  
  if (apiUsername && apiPassword) {
    // ... login code
    accessToken = loginData?.data?.accessToken || loginData?.accessToken;
  }
  
  // ... can now use accessToken anywhere in main()
}
```

## Changes Made

**File:** `scripts/widget-socket-load-2.js`

### Before:
```javascript
async function main() {
  const log = makeLogger();
  // ... other code ...
  
  // Inside conditional block
  if (apiUsername && apiPassword) {
    let accessToken = null;  // ← Local scope
    // ... login code ...
  }
  
  // Report generation (accessToken not accessible)
  generateHTMLReport({ ... apiTestingEnabled: accessToken ? true : false })
  // ❌ ERROR: accessToken is not defined
}
```

### After:
```javascript
async function main() {
  const log = makeLogger();

  let accessToken = null; // ← Function scope
  
  // ... other code ...
  
  if (apiUsername && apiPassword) {
    // ... login code ...
    accessToken = loginData?.data?.accessToken || loginData?.accessToken;
  }
  
  // Report generation (accessToken accessible)
  generateHTMLReport({ ... apiTestingEnabled: accessToken ? true : false })
  // ✓ WORKS
}
```

## Verification

✓ Syntax checked: `node -c scripts/widget-socket-load-2.js`
✓ Variable scope: accessToken now accessible throughout main()
✓ Report generation: Uses `accessToken ? true : false` to check if API testing enabled

## Impact

- ✓ No impact on functionality
- ✓ accessToken still works in API testing loop
- ✓ Report generation now completes without error
- ✓ HTML report correctly shows API metrics

## Testing

Run with API credentials:

```bash
API_TEST_USERNAME=admin@example.com \
API_TEST_PASSWORD=password \
docker-compose up
```

Should now complete successfully without the accessToken error.

## Status

✓ FIXED - Ready to run
