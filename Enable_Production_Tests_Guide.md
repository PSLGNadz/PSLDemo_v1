# 🎯 How to Enable Production Tests Later

## Current Setup: Staging Only ✅

Your CI/CD now runs **ONLY staging tests**:
- ✅ NTK_Institute_Staging (3 tests)
- ✅ NTK_Papers_Staging (3 tests)
- ✅ **Total: 6 staging tests only**

## 🚀 When Ready: Enable Production Tests

### Quick 2-Step Process:

#### **Step 1: Uncomment Matrix Entries**
In `.github/workflows/playwright.yml` (around line 20):

```yaml
# Change FROM:
matrix:
  test-group: [
    "NTK_Institute_Staging", 
    "NTK_Papers_Staging"
    # "NTK_Institute_Production",    ← Uncomment this
    # "NTK_Papers_Production"        ← Uncomment this
  ]

# Change TO:
matrix:
  test-group: [
    "NTK_Institute_Staging", 
    "NTK_Papers_Staging",
    "NTK_Institute_Production",      # ✅ Enabled
    "NTK_Papers_Production"          # ✅ Enabled
  ]
```

#### **Step 2: Uncomment Test Execution**
In same file (around line 50):

```yaml
# Change FROM:
# "NTK_Institute_Production")       ← Uncomment this block
#   npx playwright test tests/NTK_Institute/Prod_*.spec.js --project=chromium
#   ;;
# "NTK_Papers_Production")          ← Uncomment this block
#   npx playwright test tests/NTK_Papers/Prod_*.spec.js --project=chromium
#   ;;

# Change TO:
"NTK_Institute_Production")         # ✅ Enabled
  npx playwright test tests/NTK_Institute/Prod_*.spec.js --project=chromium
  ;;
"NTK_Papers_Production")            # ✅ Enabled
  npx playwright test tests/NTK_Papers/Prod_*.spec.js --project=chromium
  ;;
```

## 📊 Results After Enabling Production:

### **Current (Staging Only):**
```
🧪 Test Coverage:
├── ✅ NTK_Institute_Staging (3 tests)
├── ✅ NTK_Papers_Staging (3 tests)
└── 📊 Total: 6 tests
```

### **After Enabling Production:**
```
🧪 Test Coverage:
├── ✅ NTK_Institute_Staging (3 tests)
├── ✅ NTK_Institute_Production (3 tests)
├── ✅ NTK_Papers_Staging (3 tests)
├── ✅ NTK_Papers_Production (3 tests)
└── 📊 Total: 12 tests (all files)
```

## 🎯 Benefits of Current Staging-Only Setup:

✅ **Faster CI runs** (6 tests vs 12 tests)
✅ **Safe testing** (no impact on production)
✅ **Cost effective** (fewer test minutes)
✅ **Quick feedback** (parallel execution of 2 groups)
✅ **Easy to expand** (just uncomment lines)

## 🔄 When to Enable Production Tests:

- ✅ **Staging tests are stable and green**
- ✅ **Ready for production validation**
- ✅ **Need comprehensive coverage**
- ✅ **Team agrees to run full suite**

## 💡 Alternative: Manual Production Testing

You can always run production tests locally:
```bash
# Run production tests manually when needed
npx playwright test tests/NTK_Institute/Prod_*.spec.js
npx playwright test tests/NTK_Papers/Prod_*.spec.js
```

**Your current staging-only setup is perfect for development and testing!** 🎯