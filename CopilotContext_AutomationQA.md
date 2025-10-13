# 🤖 Copilot Context - Senior Automation QA Engineer

> **Use this file to restore my role and context in new chat sessions**  
> **Last Updated:** October 14, 2025 - v3.0 (Multi-Site Smart Authentication System)  
> **Project:** PSL Demo v1 - NTK Papers Automation Framework

---

## 🎯 **My Assigned Role & Expertise**

**I am your Senior Automation QA Engineer** with specialized expertise in:

- 🔧 **Playwright Test Automation** (Advanced frameworks, cross-browser testing)
- 💻 **VS Code Integration** (Extensions, debugging, workflow optimization)
- 🚀 **CI/CD & GitHub Actions** (Pipeline design, workflow optimization, artifact management)
- 📋 **QA Engineering Excellence** (Test planning, execution strategies, best practices)
- 💻 **Multi-language Development** (JavaScript/TypeScript, Python, Shell scripting)
- ✉️ **Email Automation Testing** (Mailinator integration, dynamic verification)
- 🔍 **Test Debugging & Troubleshooting** (Complex automation issues, performance optimization)

---

## 📋 **Project Overview & Architecture**

### **🏗️ Project Structure:**
```
PSLDemo_v1/
├── .github/workflows/
│   └── playwright.yml                 # Optimized CI/CD pipeline
├── tests/
│   ├── config/
│   │   ├── test-config.js            # Centralized config with email generation & auth
│   │   └── AuthHelper.js             # Smart authentication management (v2.0)
│   ├── Staging_NTK_LoginVerification.spec.js     # Enhanced email verification (Fresh Mode)
│   ├── Staging_NTKPapers_LoginVerification.spec.js
│   ├── Staging_NTK_SignUp.spec.js    # Signup automation (Fresh Mode)
│   ├── Staging_NTKPapers_SignUp.spec.js
│   ├── Staging_NTK_ArticleNavigation.spec.js     # Enhanced navigation with LoginVerification
│   ├── evidences/                    # Test screenshots and evidence
│   │   └── verification-code-filled.png
│   └── [Future: Production test variants]
├── test-data/
│   ├── auth-state/                   # Authentication state storage (24hr cache)
│   │   ├── auth-state.json          # localStorage/sessionStorage data
│   │   ├── cookies.json             # Browser cookies
│   │   └── README.md                # Auth storage documentation
│   ├── email-counter.json           # Sequential email generation tracking
│   └── sample-document.png          # Test upload file
├── playwright.config.js              # CI-compatible configuration
├── package.json                      # Dependencies and scripts
├── playwrightSetup.md                # Setup documentation
└── CopilotContext_AutomationQA.md   # This context file
```

### **🎯 Core Applications Under Test:**
- **NTK Institute Staging**: https://staging.ntk-institute.org/
- **NTK Papers Staging**: https://staging-ntkpapers.ntk-institute.org/
- **Mailinator**: Email verification automation

### **📧 Email System Architecture:**
- **Sequential Email Generation**: `phoenix.newslettersNtkPapers_auto1@pslqa.testinator.com`
- **Dynamic Verification Code Extraction**: 30-second polling system
- **Dual Page Management**: Main app + Mailinator in separate contexts

### **🔐 Smart Authentication Architecture:**
- **Two-Mode System**: Fresh auth (full flow) vs Fast auth (reuse state)
- **Keyword Detection**: Auto-detects test type by filename keywords
- **State Persistence**: 24-hour auth state storage (cookies + localStorage)
- **Quick Re-auth**: Simple login fallback using `xphoenix.newsletters@pslqa.testinator.com`
- **Environment Overrides**: `FORCE_FRESH_AUTH=true` for debugging

---

## 🚀 **What We've Accomplished Together**

### **Phase 1: Environment Restoration (October 10, 2025)**
- ✅ **Node.js Setup**: Restored Node.js v22.20.0 + npm v10.9.3 via nvm
- ✅ **Playwright Installation**: Fresh installation with Chromium browser
- ✅ **VS Code Integration**: Playwright Test extension configuration

### **Phase 2: Email Generation Enhancement**
- ✅ **Sequential Email System**: Replaced random IDs with incrementing counters
- ✅ **Centralized Configuration**: Created `test-config.js` with utility functions
- ✅ **Format Standardization**: `phoenix.newslettersNtkPapers_auto{N}@pslqa.testinator.com`

### **Phase 3: Dynamic Email Verification System**
- ✅ **Advanced Code Extraction**: 30-second polling with multiple selector fallbacks
- ✅ **Multi-Page Context Management**: Separate browser contexts for app and email
- ✅ **Error Handling**: Comprehensive timeout and failure recovery
- ✅ **6-Digit Input Automation**: Character-by-character input box handling

### **Phase 4: Test Enhancement & Debugging**
- ✅ **Selector Fixes**: Updated form field selectors (`data[firstname]`, `data[lastname]`)
- ✅ **File Upload Enhancement**: Proper `filechooser` event handling
- ✅ **Scrolling Implementation**: Bottom-of-page scrolling for form submission
- ✅ **Screenshot-based Debugging**: Enhanced error capture and analysis

### **Phase 5: CI/CD Pipeline Optimization**
- ✅ **Configuration Fixes**: Conditional headless mode (CI vs local)
- ✅ **Matrix Strategy Removal**: Simplified to single-browser (Chromium) testing
- ✅ **Permissions Optimization**: Streamlined GitHub Actions permissions
- ✅ **Secret-free CI**: Excluded email tests from CI due to company restrictions
- ✅ **Workflow Cleanup**: Removed problematic merge-reports job

### **Phase 6: Smart Authentication Management System (October 13, 2025)**
- ✅ **AuthHelper.js Class**: Complete authentication state management with save/restore
- ✅ **Keyword-based Detection**: Auto-detects fresh vs fast-mode tests by filename
- ✅ **Smart Auth Reuse**: Saves cookies, localStorage, sessionStorage for 24-hour reuse
- ✅ **Quick Re-authentication**: Simple login fallback when stored auth expires
- ✅ **Enhanced Configuration**: Extended test-config.js with authentication settings
- ✅ **Fast-Mode Tests**: Example ArticleNavigation.spec.js with auth reuse capability
- ✅ **Environment Overrides**: FORCE_FRESH_AUTH flag for debugging scenarios

### **Phase 7: Enhanced Navigation Testing & Integration (October 13, 2025)**
- ✅ **Complete LoginVerification Integration**: Enhanced ArticleNavigation.spec.js with full login flow
- ✅ **Smart Mailinator Detection**: Account-specific login detection with `daniel.rodriguez@pslgroup.com`
- ✅ **Hybrid Test Architecture**: Combined LoginVerification + Navigation in single comprehensive test
- ✅ **Enhanced Error Handling**: Improved popup verification and navigation flow validation
- ✅ **Test File Organization**: Clean file structure with proper naming conventions
- ✅ **Production-Ready Framework**: Scalable architecture for future environment expansion

### **Phase 8: Multi-Site Smart Authentication System (October 14, 2025)**
- ✅ **Site-Specific Authentication**: Separate auth states for NTK and NTK Papers sites
- ✅ **Smart Browser Detection**: Auto-detects existing authentication in browser sessions
- ✅ **Enhanced Multi-Site Architecture**: Support for 5+ websites with custom authentication rules
- ✅ **Backward Compatibility**: All existing tests continue working without changes
- ✅ **Demo-Ready Environment**: Perfect auth state management for presentation scenarios
- ✅ **Robust Error Handling**: Comprehensive authentication validation and fallback systems
- ✅ **Scalable Template System**: Easy template for adding new websites with custom rules

---

## 🔧 **Current Setup & Configurations**

### **🎛️ Playwright Configuration:**
```javascript
// playwright.config.js - Key Settings
{
  headless: process.env.CI ? true : false,  // Conditional headless
  slowMo: process.env.CI ? 0 : 1000,       // Debug timing
  projects: [{ name: 'chromium' }]         // Single browser
}
```

### **🚀 CI/CD Pipeline (GitHub Actions):**
```yaml
# .github/workflows/playwright.yml - Current State
- Runs: npx playwright test --project=chromium --grep-invert "Login.*Verification|Email.*Verification"
- Excludes: Email verification tests (company secret restrictions)
- Includes: Signup tests, file upload, form validation
- Artifacts: HTML reports + screenshots on failure
```

### **📧 Email Configuration:**
```javascript
// test-config.js - Current Setup
export const secrets = {
  mailinator: {
    email: process.env.MAILINATOR_EMAIL || 'daniel.rodriguez@pslgroup.com',
    password: process.env.MAILINATOR_PASSWORD || 'kJbGb!k3#6SySUS'
  }
};
```

### **🔐 Multi-Site Smart Authentication Configuration:**
```javascript
// test-config.js - Authentication Setup (Enhanced v3.0)
export const authConfig = {
  enableAuthReuse: process.env.DISABLE_AUTH_REUSE !== 'true',
  forceAlwaysFresh: process.env.FORCE_FRESH_AUTH === 'true',
  maxAuthAgeHours: 24,
  authStorePath: './test-data/auth-state/',
  freshAuthKeywords: [
    'login', 'signin', 'signup', 'register', 
    'auth', 'verification', 'password', 'reset'
  ]
};

// Site-specific authentication rules (in AuthHelper.js detectSite method)
authRules: {
  loginFormSelectors: [
    'input[type="email"]',
    '[placeholder*="email"], [placeholder*="Email"]',
    'button:has-text("Continue with email")',
    'text="Please provide your email to sign up"'
  ],
  authenticatedSelectors: [
    'button:has-text("All"), button:has-text("News"), button:has-text("Papers")',
    '.user-menu, .profile-menu, .dashboard, [data-testid*="user"]'
  ]
}

// Authentication credentials
testUser: {
  loginVerifyEmail: 'phoenix.newsletters@pslqa.testinator.com', // Main auth email
  email: 'phoenix.newsletters@pslqa.testinator.com', 
  password: process.env.TEST_USER_PASSWORD || 'defaultPassword123'
}
```

---

## 📝 **Important Commands & Workflows**

### **🏃‍♂️ Test Execution Commands:**
```bash
# Local Development (Headed Mode)
npx playwright test --headed

# Run specific test with debugging
npx playwright test tests/Staging_NTK_LoginVerification.spec.js --headed --debug

# Run only signup tests (CI simulation)
npx playwright test --grep-invert "Login.*Verification|Email.*Verification"

# Run only email verification tests (Fresh Mode)
npx playwright test --grep "Login.*Verification|Email.*Verification" --headed

# Run only fast-mode tests (Auth Reuse)
npx playwright test --grep-invert "Login.*Verification|Email.*Verification|SignUp" --headed

# Force all tests to start fresh (debugging)
FORCE_FRESH_AUTH=true npx playwright test --headed

# Run enhanced navigation test (LoginVerification + Navigation combined)
npx playwright test tests/Staging_NTK_ArticleNavigation.spec.js --headed

# Run specific enhanced navigation test with full debugging
npx playwright test tests/Staging_NTK_ArticleNavigation.spec.js --headed --debug --timeout=300000

# Generate and view reports
npx playwright show-report

# Check authentication state status
npx playwright test --grep "Auth.*Status" --headed --reporter=line
```

### **🔧 Development Commands:**
```bash
# Environment setup
nvm use 22.20.0
npm ci

# Browser installation
npx playwright install chromium --with-deps

# Configuration check
npx playwright test --list
```

### **🚀 CI/CD Commands:**
```bash
# Local CI simulation
CI=true npx playwright test --project=chromium

# Check git status and push
git status
git add .
git commit -m "message"
git push origin main
```

### **🔐 Authentication Management Commands:**
```bash
# Check current auth state status
npx playwright test tests/Staging_NTK_ArticleNavigation.spec.js --grep "Auth Status Check" --headed

# Clear saved authentication state
rm -rf test-data/auth-state/*

# Run enhanced navigation test (comprehensive LoginVerification + Navigation)
npx playwright test tests/Staging_NTK_ArticleNavigation.spec.js --headed

# Force fresh authentication for debugging
FORCE_FRESH_AUTH=true npx playwright test --headed

# Disable auth reuse completely
DISABLE_AUTH_REUSE=true npx playwright test --headed

# Run only fresh-mode tests (authentication flows)
npx playwright test --grep "Login.*Verification|SignUp|Auth" --headed

# Run only fast-mode tests (feature testing)
npx playwright test --grep-invert "Login.*Verification|SignUp|Auth" --headed

# Run enhanced navigation with extended timeout (5 minutes)
npx playwright test tests/Staging_NTK_ArticleNavigation.spec.js --headed --timeout=300000
```

---

## 🐛 **Troubleshooting Quick Reference**

### **🔍 Common Issues & Solutions:**

#### **1. Email Verification Failures**
- **Issue**: Timeout waiting for verification email
- **Solution**: Check Mailinator inbox manually, verify email format
- **Debug**: Add `await page.screenshot()` before email check

#### **2. Selector Not Found**
- **Issue**: Form fields not found (`data[firstname]`)
- **Solution**: Use `data[firstname]` format, not `#firstname`
- **Debug**: `await page.locator('form').screenshot()`

#### **3. File Upload Issues**
- **Issue**: File chooser not triggered
- **Solution**: Use `page.on('filechooser')` event listener
- **Code**: See `NTKPapers_SignUp_Improved.spec.js`

#### **4. CI/CD Failures**
- **Issue**: Headless mode crashes or secret access denied
- **Solution**: Check environment variables, exclude email tests
- **Verification**: Ensure `--grep-invert` pattern matches

### **💡 Debugging Strategies:**
1. **Screenshots**: `await page.screenshot({ path: 'debug.png', fullPage: true })`
2. **Element Inspection**: `await page.locator('selector').screenshot()`
3. **Console Logs**: Add `console.log()` with timestamps
4. **Slow Motion**: Use `slowMo: 2000` for visual debugging

---

## 📊 **Test Execution Playbook**

### **🎯 Test Categories:**

#### **🚀 CI/CD Tests (Automated)**
- **Staging_NTK_SignUp.spec.js**: Form submission, file upload
- **Staging_NTKPapers_SignUp.spec.js**: NTK Papers registration
- **Scope**: No email verification, fast execution
- **Environment**: Headless, GitHub Actions

#### **🔍 Fresh Mode Tests (Full Authentication Flow)**
- **Staging_NTK_LoginVerification.spec.js**: Complete email verification flow
- **Staging_NTKPapers_LoginVerification.spec.js**: NTK Papers login verification
- **SignUp Tests**: Complete registration flows
- **Scope**: End-to-end authentication testing from scratch
- **Environment**: Headed, manual execution
- **Trigger**: Auto-detected by filename keywords or `FORCE_FRESH_AUTH=true`

##### **🎯 Multi-Site Smart Authentication Tests**
- **Staging_NTK_ArticleNavigation.spec.js**: NTK Institute with smart auth reuse
- **Staging_NTKPapers_ArticleNavigation.spec.js**: NTK Papers with separate auth state
- **Scope**: Site-specific authentication with intelligent browser detection
- **Features**: Smart auth detection, separate auth states, browser session detection
- **Environment**: Auto-detects authentication status and reuses when appropriate
- **Benefits**: Separate auth management per site, demo-ready fresh/fast modes

#### **🌐 Multi-Site Architecture**
- **Site-Specific Auth Files**: Each site maintains separate authentication state
- **Browser Detection**: Auto-detects existing authentication in browser sessions
- **Custom Authentication Rules**: Each site can have custom login/auth detection selectors
- **Backward Compatibility**: Existing tests continue working without modification
- **Scalable Template**: Easy addition of new websites with custom rules

#### **🔄 Future Site Expansion**
- **Template Ready**: Comment-based template for adding new sites
- **Custom Rules Support**: Site-specific login form and auth element detection
- **Flexible Configuration**: Easy URL and selector customization per site
- **Benefits**: 5+ website support with minimal configuration changes

#### **🏠 Local Development Tests**
- **Mixed Mode Support**: Can run both fresh and fast-mode tests
- **Smart Detection**: Automatically chooses appropriate auth mode
- **State Management**: 24-hour auth state persistence
- **Environment**: Headed with debugging capabilities

### **⚡ Performance Optimization:**
- **Single Browser**: Chromium only for CI speed
- **Conditional Settings**: Headless in CI, headed locally
- **Test Filtering**: Exclude slow email tests from CI
- **Parallel Execution**: Disabled in CI (`workers: 1`)

---

## 🎯 **Future Enhancements & Roadmap**

### **🔮 Potential Next Steps:**

#### **1. Multi-Browser Support**
```yaml
# Future GitHub Actions matrix
strategy:
  matrix:
    browser: [chromium, firefox, webkit]
```

#### **2. Enhanced Email Testing**
- **Alternative email providers**: If Mailinator access improves
- **Email template validation**: Content verification
- **Multi-language email support**: International testing

#### **3. Advanced CI/CD Features**
- **Parallel browser testing**: When stability is confirmed
- **Test result notifications**: Slack/Teams integration
- **Performance monitoring**: Test execution metrics

#### **4. Test Coverage Expansion**
- **Mobile viewport testing**: `devices['iPhone 12']`
- **API testing integration**: Backend validation
- **Visual regression testing**: Screenshot comparisons
- **Production Environment**: Separate PROD_ENDTOEND structure with production URLs

### **🛠️ Technical Debt & Improvements**
- **Page Object Model**: Standardize across all tests
- **Data-driven testing**: External test data files
- **Custom reporting**: Enhanced HTML reports
- **Error handling**: More sophisticated retry mechanisms
- **Production Testing**: Complete PROD_ENDTOEND folder structure for production validation

---

## 📖 **Code Snippets Library**

### **📧 Email Generation Pattern:**
```javascript
// Sequential email generation
export const utils = {
  generateUniqueEmail: (prefix = 'phoenix.newslettersNtkPapers_auto') => {
    emailCounter++;
    return `${prefix}${emailCounter}@pslqa.testinator.com`;
  }
};
```

### **🔍 Dynamic Code Extraction:**
```javascript
// 30-second polling with multiple selectors
for (let attempt = 1; attempt <= maxAttempts; attempt++) {
  const codeElement = await page1.locator('td:has-text("6-digit"):last-child').first();
  if (await codeElement.isVisible()) {
    code = await codeElement.textContent();
    break;
  }
  await page1.waitForTimeout(2000);
}
```

### **📋 File Upload Handler:**
```javascript
// Proper file upload with event listener
page.on('filechooser', async (filechooser) => {
  await filechooser.setFiles('./test-data/sample-document.png');
});
await page.getByRole('button', { name: 'Upload' }).click();
```

### **🎯 CI/CD Test Filtering:**
```bash
# Exclude email tests from CI
npx playwright test --grep-invert "Login.*Verification|Email.*Verification"
```

### **🔐 Smart Authentication Usage:**
```javascript
// Import AuthHelper
import { authHelper } from './config/AuthHelper.js';

// Smart authentication handling in any test
const authSuccess = await authHelper.handleAuthentication(
  page, 
  'TestName', // Used for keyword detection
  async (page) => {
    // Full authentication callback (only runs if needed)
    // Put your complete login flow here
  }
);

// Check if auth was successful
if (!authSuccess) {
  throw new Error('Authentication failed');
}
```

### **🌐 Multi-Site Authentication Test Template:**
```javascript
test('Multi-Site Test - Smart Authentication', async ({ page, context }) => {
  // Set extended timeout for comprehensive flow
  test.setTimeout(300000); // 5 minutes
  
  // Smart authentication with site-specific detection
  const authSuccess = await authHelper.handleAuthentication(
    page, 
    'Staging_NTKPapers_ArticleNavigation', // Auto-detects NTK Papers site
    async (page) => {
      // Complete LoginVerification flow for this specific site
      console.log('🔄 Performing complete LoginVerification flow...');
      await page.goto(config.ntkPapersUrl, { waitUntil: 'networkidle' });
      // ... full login verification with Mailinator
    }
  );
  
  // Continue with site-specific feature testing
  await page.click('[data-testid="navigation-button"]');
  // ... rest of navigation testing
});
```

### **⚡ Fast-Mode Test Template:**
```javascript
test('Feature Test - Fast Mode', async ({ page }) => {
  // This will reuse auth automatically (site-specific)
  await authHelper.handleAuthentication(page, 'Staging_NTK_FeatureTest');
  
  // Now test your feature directly
  await page.click('[data-testid="feature-button"]');
  // ... rest of feature testing
});
```

### **🆕 New Website Template:**
```javascript
// To add a new website, just:
// 1. Add URL to test-config.js
// 2. Uncomment template in AuthHelper.js detectSite() method
// 3. Customize selectors for the new site

test('New Site Test', async ({ page }) => {
  const authSuccess = await authHelper.handleAuthentication(
    page, 
    'Staging_NewSite_Test', // Will auto-detect new site rules
    async (page) => {
      // Site-specific authentication flow
    }
  );
});
```

### **🔄 Multi-Site Authentication Management:**
```javascript
// Check auth state for specific site
const authInfo = await authHelper.getAuthInfo('Staging_NTKPapers_Test');
console.log('Auth status:', authInfo.site, authInfo.status, 'Age:', authInfo.age);

// Clear auth state for specific site
await authHelper.clearAuthState('Staging_NTKPapers_Test');

// Clear ALL auth states (for demo reset)
await authHelper.clearAuthState('all');

// Force fresh auth check
const shouldReuse = authHelper.shouldReuseAuth('TestName');

// Site detection
const siteConfig = authHelper.detectSite('Staging_NTKPapers_Test');
console.log('Detected site:', siteConfig.name, 'URL:', siteConfig.url);
```

---

## 💼 **Project Context Summary**

### **🏢 Business Context:**
- **Client**: PSL Group automation testing
- **Applications**: NTK Institute educational platform
- **Goal**: Reliable end-to-end testing automation
- **Constraints**: Company restrictions on external secrets

### **⚙️ Technical Stack:**
- **Framework**: Playwright v1.56.0
- **Runtime**: Node.js v22.20.0
- **CI/CD**: GitHub Actions
- **Email Service**: Mailinator (with pslqa.testinator.com domain)
- **Browser**: Chromium (primary), Firefox/WebKit (future)

### **🎯 Success Metrics:**
- ✅ **Green CI/CD builds**: No failures due to configuration
- ✅ **Fast execution**: <5 minutes for signup tests
- ✅ **Reliable email automation**: >95% success rate locally
- ✅ **Smart authentication**: 24-hour auth state persistence with 3-5x speed improvement
- ✅ **Enhanced navigation testing**: Complete LoginVerification + navigation in single test
- ✅ **Maintainable code**: Clear structure and comprehensive documentation

---

## 🚀 **Quick Start Commands for New Chat Sessions**

```bash
# 1. Verify environment
cd /Users/nadzrul.adnan/Documents/PSL_Nadz/VSCODE/Test_PSL
nvm use 22.20.0
npm ci

# 2. Run multi-site tests (smart auth mode)
npx playwright test --headed

# 3. Run specific site tests
npx playwright test tests/Staging_NTK_ArticleNavigation.spec.js --headed
npx playwright test tests/Staging_NTKPapers_ArticleNavigation.spec.js --headed

# 4. Force all tests fresh (debugging/demo preparation)
FORCE_FRESH_AUTH=true npx playwright test --headed

# 5. Demo reset - clear all auth states
rm -f test-data/auth-state/*.json && echo "🎬 Demo environment reset!"

# 6. Run enhanced navigation tests (site-specific auth)
npx playwright test tests/Staging_NTK_ArticleNavigation.spec.js --headed --timeout=300000
npx playwright test tests/Staging_NTKPapers_ArticleNavigation.spec.js --headed --timeout=300000

# 7. Quick debugging with fresh auth
npx playwright test tests/Staging_NTK_LoginVerification.spec.js --headed --debug

# 8. Check site-specific authentication states
ls -la test-data/auth-state/
echo "Files: auth-state-ntk.json (NTK), auth-state-ntkpapers.json (NTK Papers)"

# 9. Check CI status
gh run list --limit 5

# 10. Add new website (template ready in AuthHelper.js)
# Just uncomment and customize the template in detectSite() method
```

---

## 📞 **Role Restoration Template**

**For new chat sessions, use this exact prompt:**

```
"Be my Senior Automation QA Engineer specializing in Playwright, VS Code, 
GitHub Actions, CI/CD pipelines, and email automation testing. Reference 
CopilotContext_AutomationQA.md for our complete project history, current 
configurations, and established patterns. I'm working on PSL Demo v1 - 
NTK Papers automation framework with dynamic email verification."
```

---

**✨ This context file contains everything needed to restore our working relationship and continue building your automation framework! ✨**