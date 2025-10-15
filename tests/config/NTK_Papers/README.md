# NTK Papers Module

This folder contains all tests and configurations specific to the NTK Papers website.

## Structure
```
NTK_Papers/
├── AuthHelper_Prod.js          # Production authentication helper
├── AuthHelper-Staging.js       # Staging authentication helper  
├── test-config-Prod.js         # Production configuration
└── test-config-Staging.js      # Staging configuration
```

## Configuration Files

### test-config-Staging.js
- Contains staging environment URLs
- Email configurations for staging tests
- Staging-specific timeouts and settings

### test-config-Prod.js  
- Contains production environment URLs
- Email configurations for production tests
- Production-specific timeouts and settings

### AuthHelper Files
- `AuthHelper-Staging.js`: Handles authentication for staging environment
- `AuthHelper_Prod.js`: Handles authentication for production environment
- Both use module-specific auth state storage: `test-data/auth-state/NTK_Papers/`

## Authentication State Storage
Auth states are stored in: `../../../test-data/auth-state/NTK_Papers/`
- `auth-state-staging.json` - Staging authentication state
- `auth-state-production.json` - Production authentication state
- `cookies-staging.json` - Staging cookies
- `cookies-production.json` - Production cookies

## Usage
Import the appropriate config and AuthHelper based on your test environment:

**Staging Tests:**
```javascript
import { config, secrets, utils } from '../config/NTK_Papers/test-config-Staging.js';
import { authHelper } from '../config/NTK_Papers/AuthHelper-Staging.js';
```

**Production Tests:**
```javascript
import { config, secrets, utils } from '../config/NTK_Papers/test-config-Prod.js';
import { authHelper } from '../config/NTK_Papers/AuthHelper_Prod.js';
```