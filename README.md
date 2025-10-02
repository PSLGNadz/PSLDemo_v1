# Playwright Test Automation Project

This project contains automated tests using Playwright for cross-browser testing.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (LTS recommended)
- npm or yarn

### Installation
```bash
npm install
npm run install:browsers
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests with browser visible
npm run test:headed

# Run interactive UI mode
npm run test:ui

# Run specific browser
npm run test:chromium
npm run test:firefox  
npm run test:webkit

# CI optimized run
npm run test:ci
```

### View Reports
```bash
npm run report
```

## 🏗️ CI/CD Pipeline

This project includes GitHub Actions workflow for automated testing:

### Features
- ✅ **Multi-browser testing** (Chromium, Firefox, WebKit)
- ✅ **Parallel execution** for faster results
- ✅ **Test artifacts** uploaded automatically
- ✅ **HTML reports** merged and deployed
- ✅ **GitHub Pages** deployment (optional)

### Workflow Triggers
- Push to `main`, `master`, or `develop` branches
- Pull requests to `main`, `master`, or `develop` branches

### Artifacts
- Individual browser test reports
- Merged HTML report
- Test screenshots/videos (on failures)

## 📁 Project Structure

```
├── .github/workflows/
│   └── playwright.yml       # CI/CD configuration
├── tests/
│   └── example.spec.js      # Test files
├── playwright.config.js     # Playwright configuration
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## 🔧 Configuration

Edit `playwright.config.js` to:
- Change browser configurations
- Set base URLs
- Configure test directories
- Adjust parallel workers
- Set up test environments

## 📊 GitHub Actions Setup

1. **Push this code to GitHub**
2. **Enable GitHub Actions** (should work automatically)
3. **Optional: Enable GitHub Pages** for report hosting:
   - Go to Settings → Pages
   - Source: GitHub Actions
   - Reports will be available at: `https://yourusername.github.io/yourrepo`

## 🎯 Best Practices

- **Page Object Model**: Organize tests with POM pattern
- **Data-driven tests**: Use fixtures for test data
- **Retry strategies**: Configure retries for flaky tests
- **Parallel execution**: Optimize test execution time
- **Environment management**: Use different configs for dev/staging/prod

## 🐛 Troubleshooting

### Common Issues
- **Browser download fails**: Run `npm run install:browsers`
- **Tests timeout**: Increase timeout in config
- **CI failures**: Check GitHub Actions logs and artifacts

### Debug Mode
```bash
# Run with debug info
DEBUG=pw:api npm test

# Run specific test
npm test -- tests/example.spec.js
```

## 📈 Monitoring & Reporting

- **GitHub Actions**: View test results in Actions tab
- **HTML Reports**: Download from workflow artifacts
- **GitHub Pages**: Live reports (if enabled)
- **Test Trends**: Track pass/fail rates over time