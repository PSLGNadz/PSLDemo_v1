# 🚀 Adding New Websites to CI/CD Pipeline

## Quick Guide for Future Website Additions

### **Step 1: Create Your Test Structure**
When you add a new website (e.g., "XYZ_Portal"), follow your established pattern:

```
tests/
├── XYZ_Portal/                    # 📁 New module folder
│   ├── Prod_XYZ_LoginVerification.spec.js
│   ├── Prod_XYZ_SignUp.spec.js
│   ├── Prod_XYZ_ArticleNavigation.spec.js
│   ├── Staging_XYZ_LoginVerification.spec.js
│   ├── Staging_XYZ_SignUp.spec.js
│   └── Staging_XYZ_ArticleNavigation.spec.js
└── config/
    └── XYZ_Portal/                # 📁 Configuration folder
        ├── test-config-Prod.js
        └── test-config-Staging.js
```

### **Step 2: Update CI/CD Pipeline**
Edit `.github/workflows/playwright.yml`:

#### **A. Add to Matrix Strategy** (Line ~20):
```yaml
matrix:
  test-group: [
    "NTK_Institute_Production",
    "NTK_Institute_Staging", 
    "NTK_Papers_Production",
    "NTK_Papers_Staging",
    "XYZ_Portal_Production",     # 🆕 Add this
    "XYZ_Portal_Staging"         # 🆕 Add this
  ]
```

#### **B. Add Test Execution** (Line ~45):
```yaml
case "${{ matrix.test-group }}" in
  # ... existing cases ...
  "XYZ_Portal_Production")       # 🆕 Add this block
    npx playwright test tests/XYZ_Portal/Prod_*.spec.js --project=chromium
    ;;
  "XYZ_Portal_Staging")          # 🆕 Add this block
    npx playwright test tests/XYZ_Portal/Staging_*.spec.js --project=chromium
    ;;
esac
```

## 🎯 **Example: Adding "ABC_News" Website**

### **Template for Copy/Paste:**

#### **Matrix Addition:**
```yaml
matrix:
  test-group: [
    "NTK_Institute_Production",
    "NTK_Institute_Staging", 
    "NTK_Papers_Production",
    "NTK_Papers_Staging",
    "ABC_News_Production",        # 🆕 New website
    "ABC_News_Staging"            # 🆕 New website
  ]
```

#### **Test Execution Addition:**
```yaml
"ABC_News_Production")
  npx playwright test tests/ABC_News/Prod_*.spec.js --project=chromium
  ;;
"ABC_News_Staging")
  npx playwright test tests/ABC_News/Staging_*.spec.js --project=chromium
  ;;
```

## 🔧 **Alternative: Auto-Discovery Pattern**

For maximum automation, you could also make the CI automatically discover new test folders:

```yaml
# This would automatically include any new test folders
- name: 🧪 Run All Tests (Auto-Discovery)
  run: |
    # Find all test directories and run them
    for module in tests/*/; do
      module_name=$(basename "$module")
      echo "Running tests for $module_name"
      npx playwright test "$module"/Prod_*.spec.js --project=chromium
      npx playwright test "$module"/Staging_*.spec.js --project=chromium
    done
```

## 📋 **Summary: Adding New Website**

### **Easy 2-Step Process:**
1. **✅ Create test files** following your existing patterns
2. **✅ Add 4 lines** to `playwright.yml`:
   - 2 lines in matrix array
   - 2 execution blocks in case statement

### **That's it!** 🎉
Your CI/CD will automatically:
- ✅ Run all tests for the new website
- ✅ Include it in green/red status
- ✅ Generate separate reports
- ✅ Handle failures appropriately

## 🎯 **Naming Convention Reminder**
Always follow your established pattern:
- **Module**: `NewWebsite` (PascalCase)
- **Files**: `Environment_NewWebsite_TestType.spec.js`
- **Folders**: `tests/NewWebsite/` and `tests/config/NewWebsite/`

This ensures consistency and automatic pattern matching in CI/CD! 🚀