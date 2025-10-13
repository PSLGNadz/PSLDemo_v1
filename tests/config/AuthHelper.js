import { promises as fs } from 'fs';
import path from 'path';
import { config, secrets } from './test-config.js';
import { text } from 'stream/consumers';

/**
 * 🔐 AuthHelper - Smart Authentication Management for Playwright Tests
 * 
 * Features:
 * - Auto-detects if test needs fresh auth or can reuse stored auth
 * - Saves/restores browser authentication state (cookies + tokens)
 * - Quick re-authentication when stored auth expires
 * - Keyword-based detection for auth-related tests
 */
export class AuthHelper {
  constructor() {
    this.authStateDir = './test-data/auth-state';
    
    // Keywords that indicate a test should always start fresh
    this.freshAuthKeywords = [
      'login', 'signin', 'signup', 'register', 
      'auth', 'verification', 'password', 'reset'
    ];
  }

  /**
   * 🎯 Detects which site the test is for based on test name
   * @param {string} testName - Name of the test file or test case
   * @returns {Object} - Site configuration object
   */
  detectSite(testName) {
    const testNameLower = testName.toLowerCase();
    
    // Multi-site detection with backward compatibility
    if (testNameLower.includes('ntkpapers')) {
      return {
        type: 'ntkpapers',
        url: config.ntkPapersUrl,
        authStateFile: path.join(this.authStateDir, 'auth-state-ntkpapers.json'),
        cookiesFile: path.join(this.authStateDir, 'cookies-ntkpapers.json'),
        legacyAuthStateFile: path.join(this.authStateDir, 'auth-state.json'), // Backward compatibility
        legacyCookiesFile: path.join(this.authStateDir, 'cookies.json'),
        name: 'NTK Papers',
        // 🆕 OPTIONAL: Site-specific authentication rules (backward compatible)
        authRules: {
          loginFormSelectors: [
            'input[type="email"]',
            '[placeholder*="email"], [placeholder*="Email"]',
            'button:has-text("Continue with email"), button:has-text("continue with email")',
            'text="Please provide your email to sign up"'
          ],
          authenticatedSelectors: [
            'button:has-text("All"), button:has-text("News"), button:has-text("Papers"), button:has-text("Digital"), button:has-text("Courses"), button:has-text("COVID-19")',
            '.user-menu, .profile-menu, .dashboard, [data-testid*="user"], [data-testid*="profile"]'
          ]
        }
      };
    } else if (testNameLower.includes('ntk')) {
      return {
        type: 'ntk',
        url: config.ntkUrl,
        authStateFile: path.join(this.authStateDir, 'auth-state-ntk.json'),
        cookiesFile: path.join(this.authStateDir, 'cookies-ntk.json'),
        legacyAuthStateFile: path.join(this.authStateDir, 'auth-state.json'), // Backward compatibility
        legacyCookiesFile: path.join(this.authStateDir, 'cookies.json'),
        name: 'NTK Institute',
        // 🆕 OPTIONAL: Site-specific authentication rules (backward compatible)
        authRules: {
          loginFormSelectors: [
            'input[type="email"]',
            '[placeholder*="email"], [placeholder*="Email"]',
            'button:has-text("Continue with email"), button:has-text("continue with email")',
            'text="Please provide your email to sign up"'
          ],
          authenticatedSelectors: [
            'button:has-text("All"), button:has-text("News"), button:has-text("Papers"), button:has-text("Digital"), button:has-text("Courses"), button:has-text("COVID-19")',
            '.user-menu, .profile-menu, .dashboard, [data-testid*="user"], [data-testid*="profile"]'
          ]
        }
      };
    } 
    
    // 🆕 TEMPLATE FOR NEW WEBSITES - Just uncomment and customize:
    /*
    else if (testNameLower.includes('SITE_KEYWORD')) {
      return {
        type: 'SITE_TYPE',
        url: config.SITE_URL,                    // Add this URL to test-config.js
        authStateFile: path.join(this.authStateDir, 'auth-state-SITE_TYPE.json'),
        cookiesFile: path.join(this.authStateDir, 'cookies-SITE_TYPE.json'),
        legacyAuthStateFile: path.join(this.authStateDir, 'auth-state.json'),
        legacyCookiesFile: path.join(this.authStateDir, 'cookies.json'),
        name: 'SITE_DISPLAY_NAME',
        // 🎯 Custom authentication rules for this site
        authRules: {
          loginFormSelectors: [
            'input[name="username"]',         // Customize these selectors
            'input[name="password"]',         // for your new site
            '.login-form',
            'button:has-text("Sign In")'
          ],
          authenticatedSelectors: [
            '.user-dashboard',                // Customize these selectors  
            '.profile-menu',                  // for your new site
            'nav .user-info',
            '.logout-button'
          ]
        }
      };
    }
    */
    
    else {
      // Default fallback for other sites or ambiguous names
      return {
        type: 'default',
        url: config.ntkUrl, // Default to NTK for now
        authStateFile: path.join(this.authStateDir, 'auth-state.json'), // Use legacy files
        cookiesFile: path.join(this.authStateDir, 'cookies.json'),
        legacyAuthStateFile: path.join(this.authStateDir, 'auth-state.json'),
        legacyCookiesFile: path.join(this.authStateDir, 'cookies.json'),
        name: 'Default Site'
      };
    }
  }

  /**
   * 🎯 Enhanced authentication detection using site-specific rules
   * @param {Page} page - Playwright page object
   * @param {Object} siteConfig - Site configuration with authRules
   * @returns {Object} - Authentication status info
   */
  async detectAuthenticationWithRules(page, siteConfig) {
    try {
      // Wait for page to load completely
      await page.waitForTimeout(2000);
      
      if (siteConfig.authRules) {
        console.log(`🔍 Using custom authentication rules for ${siteConfig.name}`);
        
        // Check login form selectors
        let isLoginFormVisible = false;
        for (const selector of siteConfig.authRules.loginFormSelectors) {
          const element = page.locator(selector).first();
          const isVisible = await element.isVisible({ timeout: 2000 }).catch(() => false);
          if (isVisible) {
            console.log(`   Login form detected: "${selector}" is visible`);
            isLoginFormVisible = true;
            break;
          }
        }
        
        if (isLoginFormVisible) {
          return { isAuthenticated: false, method: 'custom-rules' };
        }
        
        // Check authenticated selectors
        let isAuthElementVisible = false;
        for (const selector of siteConfig.authRules.authenticatedSelectors) {
          const element = page.locator(selector).first();
          const isVisible = await element.isVisible({ timeout: 2000 }).catch(() => false);
          if (isVisible) {
            console.log(`   Authenticated element detected: "${selector}" is visible`);
            isAuthElementVisible = true;
            break;
          }
        }
        
        return { 
          isAuthenticated: isAuthElementVisible, 
          method: 'custom-rules',
          details: `Login form: ${isLoginFormVisible}, Auth elements: ${isAuthElementVisible}`
        };
      } else {
        console.log(`🔍 No custom rules found for ${siteConfig.name}, using legacy detection`);
        return { isAuthenticated: null, method: 'fallback-to-legacy' };
      }
    } catch (error) {
      console.log(`⚠️ Error in custom authentication detection: ${error.message}`);
      return { isAuthenticated: null, method: 'error-fallback-to-legacy' };
    }
  }

  /**
   * 🧠 Determines if test should reuse authentication or start fresh
   * @param {string} testName - Name of the test file or test case
   * @returns {boolean} - true if should reuse auth, false if should start fresh
   */
  shouldReuseAuth(testName) {
    const siteConfig = this.detectSite(testName);
    
    // Check for force fresh flag
    if (process.env.FORCE_FRESH_AUTH === 'true') {
      console.log(`🔄 FORCE_FRESH_AUTH=true - Starting fresh authentication for ${siteConfig.name}`);
      return false;
    }

    // Check if testName contains any fresh auth keywords
    const testNameLower = testName.toLowerCase();
    const containsAuthKeyword = this.freshAuthKeywords.some(keyword => 
      testNameLower.includes(keyword)
    );

    if (containsAuthKeyword) {
      console.log(`🔍 Test "${testName}" contains auth keyword - Starting fresh authentication for ${siteConfig.name}`);
      return false;
    }

    console.log(`⚡ Test "${testName}" can reuse authentication for ${siteConfig.name} - Fast mode enabled`);
    return true;
  }

  /**
   * 📁 Ensures auth state directory exists
   */
  async ensureAuthDirectory() {
    try {
      await fs.mkdir(this.authStateDir, { recursive: true });
    } catch (error) {
      // Directory might already exist, ignore error
    }
  }

  /**
   * 💾 Saves current authentication state (cookies + localStorage)
   * @param {Page} page - Playwright page object
   * @param {string} testName - Name of the test (for site detection)
   */
  async saveAuthState(page, testName) {
    try {
      await this.ensureAuthDirectory();
      const siteConfig = this.detectSite(testName);
      
      console.log(`💾 Saving authentication state for ${siteConfig.name}...`);
      
      // Save cookies
      const cookies = await page.context().cookies();
      await fs.writeFile(siteConfig.cookiesFile, JSON.stringify(cookies, null, 2));
      
      // Save localStorage and sessionStorage
      const storageState = await page.evaluate(() => {
        return {
          localStorage: Object.fromEntries(Object.entries(localStorage)),
          sessionStorage: Object.fromEntries(Object.entries(sessionStorage)),
          timestamp: Date.now()
        };
      });
      
      await fs.writeFile(siteConfig.authStateFile, JSON.stringify(storageState, null, 2));
      
      console.log(`✅ Authentication state saved successfully for ${siteConfig.name}`);
      return true;
    } catch (error) {
      console.log(`❌ Error saving auth state: ${error.message}`);
      return false;
    }
  }

  /**
   * 🔄 Restores previously saved authentication state
   * @param {Page} page - Playwright page object
   * @param {string} testName - Name of the test (for site detection)
   * @returns {boolean} - true if restore successful, false if failed
   */
  async restoreAuthState(page, testName) {
    try {
      const siteConfig = this.detectSite(testName);
      console.log(`🔄 Attempting to restore authentication state for ${siteConfig.name}...`);
      
      // Check if auth state files exist
      const authStateExists = await this.authStateExists(testName);
      if (!authStateExists) {
        console.log(`⚠️ No saved auth state found for ${siteConfig.name}`);
        return false;
      }

      // Determine which files to use (new site-specific or legacy)
      let authStateFileToUse = siteConfig.authStateFile;
      let cookiesFileToUse = siteConfig.cookiesFile;
      
      try {
        // Try new site-specific files first
        await fs.access(siteConfig.authStateFile);
        await fs.access(siteConfig.cookiesFile);
        console.log(`📁 Using site-specific auth files for ${siteConfig.name}`);
      } catch {
        // Fall back to legacy files
        console.log(`📁 Using legacy auth files for ${siteConfig.name}`);
        authStateFileToUse = siteConfig.legacyAuthStateFile;
        cookiesFileToUse = siteConfig.legacyCookiesFile;
      }

      // Check if auth state is not too old (24 hours max)
      const authStateContent = await fs.readFile(authStateFileToUse, 'utf-8');
      const authState = JSON.parse(authStateContent);
      const ageInHours = (Date.now() - authState.timestamp) / (1000 * 60 * 60);
      
      if (ageInHours > 24) {
        console.log(`⚠️ Auth state for ${siteConfig.name} is ${ageInHours.toFixed(1)} hours old - Too old, will re-authenticate`);
        return false;
      }

      // Restore cookies
      const cookiesContent = await fs.readFile(cookiesFileToUse, 'utf-8');
      const cookies = JSON.parse(cookiesContent);
      await page.context().addCookies(cookies);

      // 🚀 CRITICAL FIX: Always navigate to the CORRECT site URL
      console.log(`🌐 Navigating to ${siteConfig.name} site: ${siteConfig.url}`);
      await page.goto(siteConfig.url, { waitUntil: 'networkidle' });

      // Restore localStorage and sessionStorage
      await page.evaluate((state) => {
        // Clear existing storage
        localStorage.clear();
        sessionStorage.clear();
        
        // Restore saved state
        Object.entries(state.localStorage).forEach(([key, value]) => {
          localStorage.setItem(key, value);
        });
        
        Object.entries(state.sessionStorage).forEach(([key, value]) => {
          sessionStorage.setItem(key, value);
        });
      }, authState);

      // 🔄 Refresh the page to ensure authentication is applied
      await page.reload({ waitUntil: 'networkidle' });

      // Validate authentication by checking for site-specific elements
      try {
        // First check we're on the correct site
        const currentUrl = page.url();
        if (siteConfig.type === 'ntkpapers' && !currentUrl.includes('ntkpapers')) {
          console.log(`⚠️ Expected NTK Papers site but on: ${currentUrl}`);
          return false;
        } else if (siteConfig.type === 'ntk' && currentUrl.includes('ntkpapers')) {
          console.log(`⚠️ Expected NTK site but on: ${currentUrl}`);
          return false;
        }
        
        // Check if we see LOGIN FORM (means NOT authenticated)
        const loginForm = page.locator('input[type="email"], [placeholder*="email"], [placeholder*="Email"]').first();
        const isLoginFormVisible = await loginForm.isVisible({ timeout: 3000 }).catch(() => false);
        
        if (isLoginFormVisible) {
          console.log(`⚠️ Login form detected on ${siteConfig.name} - authentication invalid`);
          return false;
        }
        
        // Check for authenticated navigation elements (NTK sites)
        const loggedInNavElement = page.locator('button:has-text("All"), button:has-text("News"), button:has-text("Papers"), button:has-text("Digital"), button:has-text("Courses"), button:has-text("COVID-19")').first();
        const areNavButtonsVisible = await loggedInNavElement.isVisible({ timeout: 3000 }).catch(() => false);
        
        if (areNavButtonsVisible) {
          console.log(`✅ Authentication state restored successfully for ${siteConfig.name} (age: ${ageInHours.toFixed(1)} hours)`);
          console.log(`🌐 Confirmed on correct site: ${currentUrl}`);
          return true;
        }
        
        // If no nav buttons but no login form either, check for other authenticated elements
        const authenticatedElements = page.locator('.user-menu, .profile-menu, .dashboard, [data-testid*="user"], [data-testid*="profile"]').first();
        const areAuthElementsVisible = await authenticatedElements.isVisible({ timeout: 2000 }).catch(() => false);
        
        if (areAuthElementsVisible) {
          console.log(`✅ Authentication state restored successfully for ${siteConfig.name} (age: ${ageInHours.toFixed(1)} hours)`);
          console.log(`🌐 Confirmed on correct site: ${currentUrl}`);
          return true;
        }
        
        console.log(`⚠️ No authenticated elements found on ${siteConfig.name} - authentication invalid`);
        return false;
        
      } catch (error) {
        console.log(`⚠️ Error validating authentication for ${siteConfig.name}: ${error.message}`);
        return false;
      }
    } catch (error) {
      console.log(`❌ Error restoring auth state: ${error.message}`);
      return false;
    }
  }

  /**
   * 📋 Checks if saved authentication state exists
   * @param {string} testName - Name of the test (for site detection)
   * @returns {boolean} - true if auth state files exist
   */
  async authStateExists(testName) {
    try {
      const siteConfig = this.detectSite(testName);
      
      // For NTKPapers, ONLY check for site-specific auth files
      // Don't use legacy NTK auth files for NTKPapers
      if (siteConfig.type === 'ntkpapers') {
        try {
          await fs.access(siteConfig.authStateFile);
          await fs.access(siteConfig.cookiesFile);
          console.log(`📁 Site-specific auth files exist for ${siteConfig.name}`);
          return true;
        } catch {
          console.log(`📁 No NTKPapers-specific auth files found - legacy NTK auth won't work for NTKPapers`);
          return false;
        }
      }
      
      // For NTK and other sites, check site-specific first, then legacy
      try {
        await fs.access(siteConfig.authStateFile);
        await fs.access(siteConfig.cookiesFile);
        console.log(`📁 Site-specific auth files exist for ${siteConfig.name}`);
        return true;
      } catch {
        // Check for legacy auth files
        try {
          await fs.access(siteConfig.legacyAuthStateFile);
          await fs.access(siteConfig.legacyCookiesFile);
          console.log(`📁 Legacy auth files exist for ${siteConfig.name}`);
          return true;
        } catch {
          console.log(`📁 No auth files found for ${siteConfig.name}`);
          return false;
        }
      }
    } catch (error) {
      console.log(`❌ Error checking auth state existence: ${error.message}`);
      return false;
    }
  }

  /**
   * 🗑️ Clears saved authentication state
   * @param {string} testName - Name of the test (for site detection), or 'all' to clear both sites
   */
  async clearAuthState(testName = 'all') {
    try {
      if (testName === 'all') {
        console.log('🗑️ Clearing saved authentication state for all sites...');
        // Clear both NTK and NTKPapers auth states
        const ntkConfig = this.detectSite('ntk');
        const ntkPapersConfig = this.detectSite('ntkpapers');
        
        await fs.unlink(ntkConfig.authStateFile).catch(() => {});
        await fs.unlink(ntkConfig.cookiesFile).catch(() => {});
        await fs.unlink(ntkPapersConfig.authStateFile).catch(() => {});
        await fs.unlink(ntkPapersConfig.cookiesFile).catch(() => {});
        
        console.log('✅ Authentication state cleared for all sites');
      } else {
        const siteConfig = this.detectSite(testName);
        console.log(`🗑️ Clearing saved authentication state for ${siteConfig.name}...`);
        await fs.unlink(siteConfig.authStateFile).catch(() => {});
        await fs.unlink(siteConfig.cookiesFile).catch(() => {});
        console.log(`✅ Authentication state cleared for ${siteConfig.name}`);
      }
    } catch (error) {
      console.log(`⚠️ Error clearing auth state: ${error.message}`);
    }
  }

  /**
   * 🚀 Performs quick re-authentication using simple login form
   * @param {Page} page - Playwright page object
   */
  async performQuickReauth(page) {
    try {
      console.log('🔄 Performing quick re-authentication...');
      
      // Navigate to login page
      await page.goto(config.ntkUrl, { waitUntil: 'networkidle' });
      
      // Look for login form (adapt these selectors based on your actual login form)
      await page.waitForSelector('#email', { timeout: 10000 });
      
      // Fill login form
      await page.fill('#email', config.testUser.email);
      await page.fill('#password', config.testUser.password || 'defaultPassword');
      
      // Submit form
      await page.click('[data-testid="login-submit"], button[type="submit"], .login-button');
      
      // Wait for login to complete (adapt this selector to your success indicator)
      await page.waitForSelector('[data-testid="user-dashboard"], .dashboard, .profile-menu', { timeout: 15000 });
      
      // Save the new auth state
      await this.saveAuthState(page);
      
      console.log('✅ Quick re-authentication successful');
      return true;
    } catch (error) {
      console.log(`❌ Quick re-authentication failed: ${error.message}`);
      return false;
    }
  }

  /**
   * 🎯 Main method to handle authentication for any test
   * @param {Page} page - Playwright page object
   * @param {string} testName - Name of the test
   * @param {Function} fullAuthCallback - Function to perform full authentication (for fresh auth tests)
   */
  async handleAuthentication(page, testName, fullAuthCallback = null) {
    console.log(`🔐 Handling authentication for test: "${testName}" (${this.detectSite(testName).name})`);
    
    // Check if should reuse auth
    if (this.shouldReuseAuth(testName)) {
      console.log(`⚡ Test "${testName}" can reuse authentication for ${this.detectSite(testName).name} - Fast mode enabled`);
      
      // Try to restore saved auth ONLY if it exists
      const authExists = await this.authStateExists(testName);
      
      if (authExists) {
        const restored = await this.restoreAuthState(page, testName);
        
        if (restored) {
          console.log('✅ Authentication successfully restored');
          return true;
        } else {
          console.log('⚠️ Auth restoration failed, falling back to full authentication');
        }
      } else {
        console.log(`⚠️ No saved auth state found for ${this.detectSite(testName).name}`);
        console.log(`🔍 Checking if browser is already authenticated...`);
        
        // Check if browser is already authenticated even without saved files
        const siteConfig = this.detectSite(testName);
        try {
          await page.goto(siteConfig.url, { waitUntil: 'networkidle' });
          
          // 🆕 TRY ENHANCED DETECTION FIRST (if custom rules exist)
          const enhancedResult = await this.detectAuthenticationWithRules(page, siteConfig);
          
          if (enhancedResult.method === 'custom-rules') {
            // Use enhanced detection result
            console.log(`🎯 Enhanced detection result: ${enhancedResult.details}`);
            
            if (enhancedResult.isAuthenticated) {
              console.log(`✅ Browser is already authenticated for ${siteConfig.name}!`);
              console.log(`💾 Saving current browser auth state for future use...`);
              await this.saveAuthState(page, testName);
              return true;
            } else {
              console.log(`🔄 Browser not authenticated for ${siteConfig.name}, performing fresh authentication...`);
            }
          } else {
            // 🔄 FALLBACK TO CURRENT WORKING LOGIC (for backward compatibility)
            console.log(`🔄 Using legacy detection method for ${siteConfig.name}`);
            
            // Wait a moment for page to load completely
            await page.waitForTimeout(2000);
            
            // Check for login form first (means NOT authenticated)
            // Multiple ways to detect login form
            const emailInput = page.locator('input[type="email"]').first();
            const emailPlaceholder = page.locator('[placeholder*="email"], [placeholder*="Email"]').first();
            const continueButton = page.locator('button:has-text("Continue with email"), button:has-text("continue with email")').first();
            const signUpText = page.locator('text="Please provide your email to sign up"').first();
            
            const isEmailInputVisible = await emailInput.isVisible({ timeout: 3000 }).catch(() => false);
            const isEmailPlaceholderVisible = await emailPlaceholder.isVisible({ timeout: 3000 }).catch(() => false);
            const isContinueButtonVisible = await continueButton.isVisible({ timeout: 3000 }).catch(() => false);
            const isSignUpTextVisible = await signUpText.isVisible({ timeout: 3000 }).catch(() => false);
            
            const isLoginFormVisible = isEmailInputVisible || isEmailPlaceholderVisible || isContinueButtonVisible || isSignUpTextVisible;
            
            console.log(`🔍 Legacy login form detection for ${siteConfig.name}:`);
            console.log(`   Email input visible: ${isEmailInputVisible}`);
            console.log(`   Email placeholder visible: ${isEmailPlaceholderVisible}`);
            console.log(`   Continue button visible: ${isContinueButtonVisible}`);
            console.log(`   Sign up text visible: ${isSignUpTextVisible}`);
            console.log(`   Overall login form visible: ${isLoginFormVisible}`);
            
            if (isLoginFormVisible) {
              console.log(`🔄 Login form detected - browser NOT authenticated for ${siteConfig.name}`);
              console.log(`🔄 Browser not authenticated, performing fresh authentication...`);
            } else {
              // Only if NO login form, then check for authenticated elements
              const navButtons = page.locator('button:has-text("All"), button:has-text("News"), button:has-text("Papers"), button:has-text("Digital"), button:has-text("Courses"), button:has-text("COVID-19")').first();
              const areNavButtonsVisible = await navButtons.isVisible({ timeout: 3000 }).catch(() => false);
              
              // Additional check for other authenticated indicators
              const authenticatedElements = page.locator('.user-menu, .profile-menu, .dashboard, [data-testid*="user"]').first();
              const areAuthElementsVisible = await authenticatedElements.isVisible({ timeout: 2000 }).catch(() => false);
              
              if (areNavButtonsVisible || areAuthElementsVisible) {
                console.log(`✅ Browser is already authenticated for ${siteConfig.name}!`);
                console.log(`💾 Saving current browser auth state for future use...`);
                await this.saveAuthState(page, testName);
                return true;
              } else {
                console.log(`🔄 No authenticated elements found - browser not authenticated for ${siteConfig.name}`);
              }
            }
          }
          
          console.log(`🔄 Proceeding with fresh authentication for ${siteConfig.name}...`);
        } catch (error) {
          console.log(`⚠️ Error checking browser auth state: ${error.message}`);
        }
      }
    } else {
      console.log(`🔄 Test "${testName}" requires fresh authentication - performing full login flow`);
    }
    
    // Fresh auth or fallback: perform full authentication
    if (fullAuthCallback && typeof fullAuthCallback === 'function') {
      console.log(`🔄 Performing full authentication flow for ${this.detectSite(testName).name}...`);
      
      try {
        await fullAuthCallback(page);
        
        // Save the authentication state after successful login
        await this.saveAuthState(page, testName);
        console.log(`💾 Authentication state saved successfully for ${this.detectSite(testName).name}`);
        
        return true;
      } catch (authError) {
        console.log(`❌ Full authentication failed: ${authError.message}`);
        return false;
      }
    } else {
      console.log('⚠️ No full authentication callback provided for fresh auth test');
      return false;
    }
  }

  /**
   * 📊 Gets authentication status info
   * @param {string} testName - Name of the test (for site detection)
   */
  async getAuthInfo(testName) {
    const siteConfig = this.detectSite(testName);
    const exists = await this.authStateExists(testName);
    
    if (!exists) {
      return { 
        site: siteConfig.name,
        exists: false, 
        age: null, 
        status: 'No saved auth state' 
      };
    }

    try {
      // Determine which file to read (new site-specific or legacy)
      let authStateFileToRead = siteConfig.authStateFile;
      try {
        await fs.access(siteConfig.authStateFile);
      } catch {
        authStateFileToRead = siteConfig.legacyAuthStateFile;
      }
      
      const authStateContent = await fs.readFile(authStateFileToRead, 'utf-8');
      const authState = JSON.parse(authStateContent);
      const ageInHours = (Date.now() - authState.timestamp) / (1000 * 60 * 60);
      
      return {
        site: siteConfig.name,
        exists: true,
        age: ageInHours,
        status: ageInHours > 24 ? 'Expired' : 'Valid',
        timestamp: new Date(authState.timestamp).toISOString()
      };
    } catch (error) {
      return { 
        site: siteConfig.name,
        exists: true, 
        age: null, 
        status: 'Corrupted', 
        error: error.message 
      };
    }
  }
}

// Export singleton instance
export const authHelper = new AuthHelper();