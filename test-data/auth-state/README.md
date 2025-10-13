# 🔐 Authentication State Storage

This directory stores authentication state for fast-mode tests:

## Files:
- `auth-state.json` - localStorage and sessionStorage data
- `cookies.json` - Browser cookies

## Usage:
- Files are automatically created when authentication is saved
- Files are automatically loaded when authentication is restored
- Files expire after 24 hours and will trigger re-authentication
- Files are ignored by git for security

## Security:
- This directory should be added to .gitignore
- Contains sensitive authentication data
- Only used for test automation purposes

## Manual Management:
To clear all saved auth state:
```bash
rm -rf test-data/auth-state/*
```

To force fresh authentication for all tests:
```bash
FORCE_FRESH_AUTH=true npx playwright test
```