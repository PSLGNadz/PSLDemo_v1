# 🎭 Playwright Complete Setup Guide - From Scratch to Production

> **Complete reference guide for setting up Playwright Test Automation Framework with CI/CD Pipeline**  
> *Created for PSL Group - Internal Documentation*

---

## 📋 Table of Contents

1. [Initial Requirements & Context](#initial-requirements--context)
2. [System Prerequisites](#system-prerequisites)
3. [Step-by-Step Installation Process](#step-by-step-installation-process)
4. [Project Configuration](#project-configuration)
5. [CI/CD Pipeline Setup](#cicd-pipeline-setup)
6. [Multi-Account Git Configuration](#multi-account-git-configuration)
7. [Troubleshooting Guide](#troubleshooting-guide)
8. [Verification & Testing](#verification--testing)
9. [Original Conversation Prompts](#original-conversation-prompts)
10. [Best Practices & Next Steps](#best-practices--next-steps)

---

## 🎯 Initial Requirements & Context

### Original User Request
```
"i need u to act as a Senior Automation QA Engineer"

"now please let me know the steps for me to have playwright in this system, 
what other tools need to install example node/etc"
```

### Project Goals
- Set up Playwright test automation framework from scratch
- Configure cross-browser testing (Chromium, Firefox, WebKit)
- Implement CI/CD pipeline with GitHub Actions
- Enable multi-account Git workflow (Personal → Work Account)
- Create production-ready automation environment

### Target Environment
- **System**: macOS
- **Node.js**: Latest LTS version
- **Package Manager**: npm
- **CI/CD**: GitHub Actions
- **Repository**: PSL Group account (PSLGNadz/PSLDemo_v1)

---

## ⚙️ System Prerequisites

### Required Software
- **macOS**: 10.15+ (Catalina or later)
- **RAM**: 4GB minimum, 8GB+ recommended
- **Disk Space**: ~1GB for Node.js + Playwright + browsers
- **Internet**: Stable connection for browser downloads

### Permission Requirements
- **Standard user access** (no sudo/admin required)
- **Terminal access** for command execution
- **GitHub account** access for repository creation

---

## 🚀 Step-by-Step Installation Process

### Step 1: Install Node Version Manager (NVM)
```bash
# Install NVM (alternative to Homebrew - no admin rights needed)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

# Reload terminal configuration
source ~/.bashrc
# OR
source ~/.zshrc
```

### Step 2: Install Node.js and npm
```bash
# Install latest LTS Node.js
nvm install --lts
nvm use --lts

# Verify installation
node --version
npm --version
```

**Expected Output:**
```
Node.js: v22.20.0 (or latest LTS)
npm: v10.9.3 (or compatible version)
```

### Step 3: Initialize Project
```bash
# Navigate to your workspace
cd /path/to/your/workspace

# Initialize npm project
npm init -y
```

### Step 4: Install Playwright Framework
```bash
# Install Playwright testing framework
npm install -D @playwright/test

# Install Node.js type definitions (fixes TypeScript errors)
npm install -D @types/node
```

### Step 5: Download Playwright Browsers
```bash
# Download all browsers (Chromium, Firefox, WebKit)
npx playwright install

# This downloads ~300MB of browser binaries
# Takes 2-5 minutes depending on internet speed
```

**Expected Browser Downloads:**
- ✅ Chromium 140.0.7339.186
- ✅ Firefox 141.0  
- ✅ WebKit 26.0
- ✅ FFMPEG (for video recording)

### Step 6: Create Configuration Files

#### Create `playwright.config.js`
```javascript
/// <reference types="node" />

const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://127.0.0.1:3000',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  webServer: {
    command: 'npm run start',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

#### Create Test Directory and Example Test
```bash
# Create tests directory
mkdir tests

# Create example test file
touch tests/example.spec.js
```

**tests/example.spec.js:**
```javascript
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Get started' }).click();
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
```

#### Update `package.json` with Test Scripts
```json
{
  "scripts": {
    "test": "playwright test",
    "test:headed": "playwright test --headed",
    "test:ui": "playwright test --ui",
    "test:chromium": "playwright test --project=chromium",
    "test:firefox": "playwright test --project=firefox",
    "test:webkit": "playwright test --project=webkit",
    "test:ci": "playwright test --reporter=html",
    "install:browsers": "playwright install",
    "report": "playwright show-report"
  }
}
```

---

## 🔄 CI/CD Pipeline Setup

### Step 7: Create GitHub Actions Workflow

#### Create Directory Structure
```bash
mkdir -p .github/workflows
```

#### Create `.github/workflows/playwright.yml`
```yaml
name: Playwright Tests

on:
  push:
    branches: [ main, master, develop ]
  pull_request:
    branches: [ main, master, develop ]
  workflow_dispatch:

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    
    strategy:
      fail-fast: false
      matrix:
        browser: [chromium, firefox, webkit]
        
    steps:
    - uses: actions/checkout@v4
    
    - uses: actions/setup-node@v4
      with:
        node-version: lts/*
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Install Playwright Browsers
      run: npx playwright install --with-deps ${{ matrix.browser }}
      
    - name: Run Playwright tests
      run: npx playwright test --project=${{ matrix.browser }}
      
    - name: Upload test results
      uses: actions/upload-artifact@v4
      if: always()
      with:
        name: playwright-report-${{ matrix.browser }}
        path: playwright-report/
        retention-days: 7

  merge-reports:
    if: always()
    needs: [test]
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - uses: actions/setup-node@v4
      with:
        node-version: lts/*
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Download all reports
      uses: actions/download-artifact@v4
      with:
        path: all-reports/
        pattern: playwright-report-*
        
    - name: Merge reports
      run: npx playwright merge-reports --reporter html ./all-reports/playwright-report-*
      
    - name: Upload merged report
      uses: actions/upload-artifact@v4
      with:
        name: merged-playwright-report
        path: playwright-report/
        retention-days: 14
        
    - name: Deploy to GitHub Pages
      if: github.ref == 'refs/heads/main'
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./playwright-report
```

#### Create `.gitignore`
```gitignore
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Test Artifacts
test-results/
playwright-report/
playwright/.cache/

# Environment
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
logs/
*.log
```

---

## 🔗 Multi-Account Git Configuration

### Original Requirement
```
"i have two github account, this one I consider it as account A, 
try to push to my other Github Account which i consider account B"
```

### Account B Details (Used in Setup)
- **Username**: PSLGNadz
- **Email**: nadzrul.adnan@pslgroup.com  
- **Repository**: PSLDemo_v1

### Step 8: Configure Git for Multiple Accounts

#### Initialize Git Repository
```bash
# Initialize git repository
git init

# Configure for Account B (PSL Group)
git config user.name "PSLGNadz"
git config user.email "nadzrul.adnan@pslgroup.com"

# Verify configuration
git config --list
```

#### Add and Commit Files
```bash
# Check files to be committed
git status

# Add all files
git add .

# Commit with descriptive message
git commit -m "Initial Playwright setup with CI/CD pipeline

- Cross-browser testing (Chromium, Firefox, WebKit)
- GitHub Actions workflow for automated testing
- Comprehensive test configuration
- Professional documentation and setup guide"
```

#### Connect to Remote Repository
```bash
# Add remote origin (Account B)
git remote add origin https://github.com/PSLGNadz/PSLDemo_v1.git

# Verify remote
git remote -v
```

### Step 9: Create Repository on GitHub

#### Manual Repository Creation Process
1. **Navigate to**: `https://github.com/PSLGNadz`
2. **Click**: "New repository" button
3. **Configure**:
   - Repository name: `PSLDemo_v1`
   - Description: `Playwright Test Automation Framework with CI/CD Pipeline`
   - Visibility: Public or Private (user choice)
   - **❌ DO NOT CHECK**: Add README, .gitignore, or license
4. **Click**: "Create repository"

#### Push to Repository
```bash
# Push to Account B repository
git push -u origin main

# Verify successful push
git log --oneline
```

**Expected Success Output:**
```
Enumerating objects: 12, done.
Counting objects: 100% (12/12), done.
Delta compression using up to 8 threads
Compressing objects: 100% (8/8), done.
Writing objects: 100% (12/12), 4.95 KiB | 4.95 MiB/s, done.
Total 12 (delta 0), reused 0 (delta 0), pack-reused 0
To https://github.com/PSLGNadz/PSLDemo_v1.git
 * [new branch]      main -> main
branch 'main' set up to track 'origin/main'.
```

---

## 🐛 Troubleshooting Guide

### Issue 1: TypeScript Error in Config File
**Error**: `Cannot find name 'process'. Do you need to install type definitions for node?`

**Solution**:
```bash
# Install Node.js type definitions
npm install -D @types/node

# Add type reference to playwright.config.js
/// <reference types="node" />
```

### Issue 2: Permission Denied (Homebrew)
**Error**: Cannot install Homebrew without sudo access

**Solution**: Use NVM instead of Homebrew
```bash
# Install NVM (no admin rights needed)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```

### Issue 3: Browser Download SSL Issues
**Warning**: SSL certificate warnings during browser download

**Solution**: Downloads continue via Microsoft fallback servers (this is normal)

### Issue 4: Repository Not Found Error
**Error**: `remote: Repository not found`

**Solution**: 
1. Verify repository exists on GitHub
2. Check username and repository name spelling
3. Ensure you have access to the account
4. Create repository manually via GitHub web interface

### Issue 5: Git Tracking Too Many Files
**Issue**: Git shows files from parent directories

**Solution**:
```bash
# Remove git tracking
rm -rf .git

# Reinitialize in correct directory
git init

# Add only project files
git add .
```

---

## ✅ Verification & Testing

### Step 10: Run Verification Tests

#### Test Installation
```bash
# Verify Node.js and npm
node --version && npm --version

# Verify Playwright installation
npx playwright --version
```

#### Run Sample Tests
```bash
# Run all tests
npm test

# Expected output: 6 tests passed across 3 browsers
```

**Successful Test Output:**
```
Running 6 tests using 6 workers
  6 passed (27.2s)

To open last HTML report run:
  npx playwright show-report
```

#### Check CI/CD Pipeline
1. **Push code** to GitHub
2. **Navigate** to repository Actions tab
3. **Verify** workflow runs automatically
4. **Check** test results and artifacts

---

## 💬 Original Conversation Prompts

### Initial Setup Request
> **User**: "i need u to act as a Senior Automation QA Engineer"

> **User**: "now please let me know the steps for me to have playwright in this system, what other tools need to install example node/etc"

### Auto-Setup Request  
> **User**: "no 1 with me monitoring u"
> *(Referring to auto-setup option with user monitoring)*

### Configuration Issue
> **User**: "why my config file having some issue"
> *(TypeScript error with 'process' not found)*

### CI/CD Requirement
> **User**: "so now i need to push to my github, but i dont see the playwright.yml file, bcoz i need to do some CI/CD also"

### Multi-Account Git Setup
> **User**: "now, i have two github account, this one I consider it as account A, try to push to my other Github Account which i consider account B, can u do it?"

### Account Details Provided
> **User**: 
> - Username: PSLGNadz
> - Email: nadzrul.adnan@pslgroup.com  
> - Repo name: u help create for me using this name "PSLDemo_v1"

### Repository Creation Choice
> **User**: "let me do option 1"
> *(Manual repository creation via GitHub web interface)*

### Documentation Request
> **User**: "now, kindly help me do one playwrightSetup.md, i want it cover all from the begining of the process from scratch, so others will able to refer to this file only when needed, please include the 'prompt' that i asked u also"

### File Missing Issue
> **User**: "i still not find tha playwrigSetup.md in my folder yet"

---

## 🎯 Best Practices & Next Steps

### Framework Architecture
```
PSLDemo_v1/
├── .github/workflows/
│   └── playwright.yml           # CI/CD pipeline
├── tests/
│   ├── pages/                   # Page Object Models (recommended)
│   ├── fixtures/                # Test data and fixtures
│   ├── helpers/                 # Utility functions
│   └── specs/                   # Test specifications
├── playwright.config.js         # Main configuration
├── package.json                 # Dependencies and scripts
├── README.md                    # Project documentation
├── playwrightSetup.md          # This complete setup guide
└── .gitignore                  # Git ignore rules
```

### Recommended Next Steps

#### 1. Implement Page Object Model
```javascript
// tests/pages/HomePage.js
class HomePage {
  constructor(page) {
    this.page = page;
    this.getStartedLink = page.getByRole('link', { name: 'Get started' });
  }

  async navigate() {
    await this.page.goto('https://playwright.dev/');
  }

  async clickGetStarted() {
    await this.getStartedLink.click();
  }
}

module.exports = { HomePage };
```

#### 2. Add API Testing
```bash
# Install additional dependencies for API testing
npm install -D @playwright/test axios
```

#### 3. Configure Multiple Environments
```javascript
// playwright.config.js environments
const config = {
  development: { baseURL: 'http://localhost:3000' },
  staging: { baseURL: 'https://staging.pslgroup.com' },
  production: { baseURL: 'https://pslgroup.com' }
};
```

#### 4. Mobile Testing Setup
```javascript
// Add mobile projects to playwright.config.js
{
  name: 'Mobile Chrome',
  use: { ...devices['Pixel 5'] },
},
{
  name: 'Mobile Safari',
  use: { ...devices['iPhone 12'] },
}
```

#### 5. Performance Testing Integration
```bash
# Add Lighthouse for performance testing
npm install -D @playwright/test lighthouse
```

### Team Onboarding Checklist

#### For New Team Members:
- [ ] Clone repository: `git clone https://github.com/PSLGNadz/PSLDemo_v1.git`
- [ ] Install dependencies: `npm install`
- [ ] Install browsers: `npm run install:browsers`
- [ ] Run sample tests: `npm test`
- [ ] Review this setup guide: `playwrightSetup.md`
- [ ] Set up local development environment
- [ ] Configure IDE extensions (Playwright Test for VS Code)

#### Development Workflow:
1. **Create feature branch**: `git checkout -b feature/new-tests`
2. **Write tests** following Page Object Model pattern
3. **Run tests locally**: `npm test`
4. **Commit changes**: `git commit -m "Add new test scenarios"`
5. **Push and create PR**: `git push origin feature/new-tests`
6. **CI/CD runs automatically** on PR creation
7. **Review test results** in GitHub Actions
8. **Merge after approval** and successful tests

### Monitoring & Maintenance

#### Regular Tasks:
- **Update dependencies**: `npm update`
- **Update browsers**: `npx playwright install`
- **Review test reports** in GitHub Actions
- **Monitor CI/CD pipeline** performance
- **Archive old test artifacts** (7-14 day retention)

#### Quality Metrics to Track:
- **Test execution time** trends
- **Pass/fail rates** across browsers
- **Flaky test identification**
- **Code coverage** (if implemented)
- **CI/CD pipeline reliability**

---

## 📞 Support & Resources

### Internal PSL Group Resources
- **Repository**: https://github.com/PSLGNadz/PSLDemo_v1
- **CI/CD Pipeline**: GitHub Actions (automatic)
- **Test Reports**: Available in Actions artifacts
- **Documentation**: This file (`playwrightSetup.md`)

### External Documentation
- **Playwright Official Docs**: https://playwright.dev/
- **GitHub Actions**: https://docs.github.com/en/actions
- **Node.js Documentation**: https://nodejs.org/en/docs/

### Emergency Contacts
- **Setup Issues**: Refer to [Troubleshooting Guide](#troubleshooting-guide)
- **CI/CD Problems**: Check GitHub Actions logs and artifacts
- **Framework Questions**: Review Playwright official documentation

---

*This document was created as part of the PSL Group Test Automation initiative. Last updated: October 2025*

**🎭 Happy Testing with Playwright!** 🚀