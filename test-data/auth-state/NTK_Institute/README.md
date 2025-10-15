# NTK Institute Authentication State Storage

This folder stores authentication states specifically for NTK Institute tests.

## Files
- `auth-state-staging.json` - Browser authentication state for staging environment
- `auth-state-production.json` - Browser authentication state for production environment  
- `cookies-staging.json` - Browser cookies for staging environment
- `cookies-production.json` - Browser cookies for production environment

## Purpose
These files enable authentication state reuse across test runs, reducing test execution time by avoiding repeated login flows when not testing authentication specifically.

## Environment Isolation
Each environment (staging/production) maintains separate authentication states to prevent cross-contamination and ensure test reliability.

## Automatic Management
These files are automatically managed by the AuthHelper classes and should not be manually edited.