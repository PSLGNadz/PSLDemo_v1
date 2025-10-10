# 🔐 GitHub Secrets Setup Guide

## **Quick Setup Steps**

### **1. Go to Your Repository**
- Navigate to: `https://github.com/PSLGNadz/PSLDemo_v1`

### **2. Access Settings**
- Click **"Settings"** (top menu)
- Click **"Secrets and variables"** → **"Actions"** (left sidebar)

### **3. Add Repository Secrets**

**Secret 1:**
```
Name: MAILINATOR_EMAIL
Value: daniel.rodriguez@pslgroup.com
```

**Secret 2:**
```
Name: MAILINATOR_PASSWORD  
Value: kJbGb!k3#6SySUS
```

### **4. Test the Setup**
After adding secrets, push your code to trigger CI:

```bash
git push origin main
```

### **5. Monitor Results**
- Go to **"Actions"** tab in your GitHub repo
- Watch your workflow run with green status ✅

## **What's Been Updated**

✅ **CI/CD Pipeline Optimized:**
- Single browser testing (Chromium) for stability
- 45-minute timeout for comprehensive tests
- Screenshot capture on failures
- Secure environment variable integration

✅ **Your Code is Ready:**
- `test-config.js` already uses `process.env.MAILINATOR_EMAIL` and `process.env.MAILINATOR_PASSWORD`
- Email verification tests will access credentials securely
- All tests including email verification will run in CI

## **Expected Results**
- ✅ Signup tests with file upload
- ✅ Email verification with dynamic code extraction  
- ✅ All tests running in GitHub Actions
- ✅ Secure credential management
- ✅ Proper artifact and screenshot handling

---

**Next Steps:** Add the secrets and push your code! 🚀