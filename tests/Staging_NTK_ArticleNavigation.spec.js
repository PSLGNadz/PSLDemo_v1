import { test, expect } from '@playwright/test';
import { config, secrets, utils } from './config/test-config.js';
import { authHelper } from './config/AuthHelper.js';
import dotenv from 'dotenv';
dotenv.config();

test.describe('NTK Article Navigation - Complete Flow', () => {
  test.beforeEach(async () => {
    console.log(`🎯 Test started at: ${utils.getCurrentTimestamp()}`);
  });

  test('ArticleNavigation - LoginVerification + Navigation Flow', async ({ page, context }) => {
    // Set longer timeout for this complex flow
    test.setTimeout(300000); // 5 minutes for complete flow
    
    console.log('🚀 Starting complete LoginVerification + Navigation flow...');

    // 🔐 SMART AUTHENTICATION HANDLING
    const authSuccess = await authHelper.handleAuthentication(
      page, 
      'Staging_NTK_ArticleNavigation',  // ✅ This contains 'ntk'!
      async (page) => {
        // 🔄 FULL LOGIN VERIFICATION FLOW (only runs if needed)
        console.log('🔄 Performing complete LoginVerification flow...');
        
        // Step 1: Navigate to NTK site and submit email
        console.log('📧 Step 1: Submitting email for verification');
        await page.goto(config.ntkUrl, { waitUntil: 'networkidle' });
        await page.getByTestId('ULF-emailInput').locator('#email').click();
        await page.getByTestId('ULF-emailInput').locator('#email').fill(config.testUser.loginVerifyEmail);
        await page.getByTestId('ULF-emailFormSubmit').click();
        await page.getByRole('heading', { name: 'Thank you!' }).click();

        // Step 2: Open new tab and login to Mailinator
        console.log('📬 Step 2: Opening Mailinator in new tab');
        const page1 = await context.newPage();
        await page1.goto(config.mailinatorUrl, { waitUntil: 'networkidle' });

        // 🔍 Smart Mailinator Login Detection
        console.log('🔍 Checking if Mailinator login is required...');
        
        try {
          // Check if we're already logged in by looking for the specific email in the UI
          const loggedInEmailElement = page1.locator('text=daniel.rodriguez@pslgroup.com');
          await loggedInEmailElement.waitFor({ state: 'visible', timeout: 3000 });
          
          // Double-check that inbox field is also available
          const inboxField = page1.getByRole('textbox', { name: 'inbox field' });
          await inboxField.waitFor({ state: 'visible', timeout: 2000 });
          
          console.log('✅ Already logged into Mailinator with daniel.rodriguez@pslgroup.com - skipping login process');
          
        } catch (alreadyLoggedInError) {
          // Not logged in, need to perform login
          console.log('🔐 Not logged into Mailinator - performing login...');
          
          try {
            // Check if Login link is available
            const loginLink = page1.getByRole('link', { name: 'Login' });
            await loginLink.waitFor({ state: 'visible', timeout: 5000 });
            await loginLink.click();
            
            console.log('📧 Filling Mailinator credentials...');
            await page1.getByRole('textbox', { name: 'Email field' }).click();
            await page1.getByRole('textbox', { name: 'Email field' }).fill(secrets.mailinator.email);
            await page1.getByRole('textbox', { name: 'Password field' }).click();
            await page1.getByRole('textbox', { name: 'Password field' }).fill(secrets.mailinator.password);
            
            console.log('⏳ Waiting for login to process...');
            await page1.waitForTimeout(30000); // Wait 30 seconds for login to process
            
            await page1.getByLabel('Login link').click();
            
            // Wait for login to complete by checking for inbox field
            await page1.getByRole('textbox', { name: 'inbox field' }).waitFor({ 
              state: 'visible', 
              timeout: 10000 
            });
            
            console.log('✅ Mailinator login completed successfully');
            
          } catch (loginError) {
            console.log(`⚠️ Error during Mailinator login: ${loginError.message}`);
            // Try to continue anyway - maybe we're on a different page layout
            console.log('🔄 Attempting to continue despite login error...');
          }
        }

        // Navigate to inbox (this works whether we were already logged in or just logged in)
        console.log('📥 Navigating to email inbox...');
        await page1.getByRole('textbox', { name: 'inbox field' }).click();
        await page1.getByRole('textbox', { name: 'inbox field' }).fill(config.testUser.loginVerifyEmail);
        await page1.getByRole('button', { name: 'GO', exact: true }).click();

        // Step 3: Wait for verification email and extract code
        console.log('🔍 Step 3: Waiting for verification email to arrive...');
        
        let emailFound = false;
        let code = '';
        const maxWaitTime = 30000; // 30 seconds
        const checkInterval = 2000; // Check every 2 seconds
        const maxAttempts = maxWaitTime / checkInterval;
        
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
          console.log(`📧 Checking for email - Attempt ${attempt}/${maxAttempts}`);
          
          try {
            await page1.waitForTimeout(checkInterval);
            
            const verificationEmails = page1.getByRole('cell', { name: /Verification code for NTK/i });
            const emailCount = await verificationEmails.count();
            
            if (emailCount > 0) {
              console.log(`✅ Found ${emailCount} verification email(s)! Clicking the first one...`);
              
              await verificationEmails.first().click();
              await page1.waitForTimeout(2000);
              
              try {
                const iframe = page1.locator('iframe[name="html_msg_body"]').contentFrame();
                
                const codeSelectors = [
                  'text=/\\d{3}\\s\\d{3}/',
                  'text=/\\d{6}/',
                  '[style*="font-size: 24px"], [style*="font-size: 32px"]',
                  'td:has-text(/\\d{3}\\s\\d{3}/)',
                  'span:has-text(/\\d{3}\\s\\d{3}/)',
                ];
                
                for (const selector of codeSelectors) {
                  try {
                    const codeElement = iframe.locator(selector).first();
                    if (await codeElement.count() > 0) {
                      code = await codeElement.textContent();
                      if (code && /\d{3}\s?\d{3}/.test(code.trim())) {
                        console.log(`🎯 Found verification code: "${code.trim()}"`);
                        emailFound = true;
                        code = code.trim();
                        break;
                      }
                    }
                  } catch (selectorError) {
                    // Continue to next selector
                  }
                }
                
                if (emailFound) break;
                
              } catch (extractError) {
                console.log(`⚠️ Error extracting code: ${extractError.message}`);
              }
            } else {
              console.log(`⏳ No verification email found yet... waiting ${checkInterval/1000}s`);
            }
            
          } catch (searchError) {
            console.log(`⚠️ Error searching for email: ${searchError.message}`);
          }
        }
        
        if (!emailFound || !code) {
          throw new Error('❌ Verification email not found or code could not be extracted after 30 seconds');
        }
        
        console.log(`✅ Successfully extracted code: "${code}"`);

        // Step 4: Switch back to first tab and input verification code
        console.log('🔢 Step 4: Filling verification code in input boxes');
        await page.bringToFront();
        
        const cleanCode = code.replace(/\s/g, '');
        const codeDigits = cleanCode.split('');
        
        console.log(`📝 Code digits to fill: [${codeDigits.join(', ')}]`);
        
        if (codeDigits.length !== 6) {
          throw new Error(`❌ Expected 6 digits, but got ${codeDigits.length}: [${codeDigits.join(', ')}]`);
        }
        
        try {
          for (let i = 0; i < 6; i++) {
            const inputSelector = `#otp-${i + 1}`;
            const digit = codeDigits[i];
            
            console.log(`📝 Filling ${inputSelector} with digit: ${digit}`);
            await page.locator(inputSelector).fill(digit);
            await page.waitForTimeout(200);
          }
          
          console.log('✅ All 6 digits filled successfully!');
          
          await page.screenshot({ path: './tests/evidences/verification-code-filled.png' });
          
          console.log('⏳ Waiting for page to process the code...');
          await page.waitForTimeout(30000);

          // Scroll down 3 times with pauses
          for (let i = 0; i < 3; i++) {
            await page.evaluate(() => window.scrollBy(0, window.innerHeight));
            await page.waitForTimeout(2000);
          }

        } catch (fillError) {
          console.log(`❌ Error filling input boxes: ${fillError.message}`);
          throw fillError;
        }

        // Close the mailinator tab
        await page1.close();
        console.log('✅ LoginVerification flow completed successfully!');
      }
    );

    // Verify authentication was successful
    if (!authSuccess) {
      throw new Error('❌ Authentication failed - cannot proceed with navigation test');
    }

    console.log('✅ Authentication completed - proceeding with navigation flow...');
    
    // 📰 YOUR NAVIGATION FLOW (Enhanced with proper structure)
    console.log('🧭 Starting Article Navigation Flow...');
    
    // Use the main page (page) for navigation
    const page1 = page; // Your original navigation used page1, so we'll keep that reference
    
    //After login proceed below:
    console.log('📱 Step 1: Opening menu and navigating sections...');

    //To click and navigate through various sections
    // Click on the menu icon to open the sidebar
    await page1.getByTestId('MenuIcon').click();
    await page1.locator('.MuiBackdrop-root').click();

    // Navigate through different sections
    console.log('🧭 Navigating through different sections...');
    await page1.getByRole('button', { name: 'News' }).click();
    await page1.getByRole('button', { name: 'Papers' }).click();
    await page1.getByRole('button', { name: 'Digital' }).click();
    await page1.getByRole('button', { name: 'Courses' }).click();
    await page1.getByRole('button', { name: 'COVID-' }).click();
    await page1.getByRole('button', { name: 'all' }).click();

    console.log('🔍 Step 2: Performing search functionality...');
    // Click on the search icon and perform a search
    await page1.getByRole('link').filter({ hasText: /^$/ }).click();
    await page1.getByRole('textbox', { name: 'Enter your search terms' }).click();
    await page1.getByRole('textbox', { name: 'Enter your search terms' }).fill('Covid19');
    await page1.getByRole('button').nth(1).click();

    console.log('📖 Step 3: Interacting with article...');
    // Interact with an article
    // Please note the article to be clicked dynamically changes, so you might want to adjust the selector accordingly
    await page1.locator('div:nth-child(18) > .MuiBox-root.css-1yape3g > .MuiSvgIcon-root > svg > path').click();
    await page1.locator('div:nth-child(18) > .MuiBox-root.css-1yape3g > .MuiSvgIcon-root > svg > path').click();
    await page1.locator('div:nth-child(18) > div:nth-child(2) > .MuiSvgIcon-root > svg > path').click();
    await page1.getByText('click to scroll down to').click();
    await page1.getByText('article continues here').click();
    
    console.log('💬 Step 4: Adding comment and sharing article...');
    await page1.getByRole('textbox', { name: 'Add a Comment...' }).click();
    await page1.getByRole('textbox', { name: 'Add a Comment...' }).fill('test2');
    await page1.getByTestId('post').click();
    await page1.getByTestId('MailOutlineIcon').click();
    await page1.getByTestId('email-input').getByTestId('form-input').click();
    await page1.getByTestId('email-input').getByTestId('form-input').fill(config.testUser.emailPSL);
    await page1.getByTestId('submit-button').click();

    console.log('🌐 Step 5: Testing social media integrations...');
    // Interact with social media icons
    // each icon opens a new tab, so we handle them accordingly
    
    // LinkedIn popup verification
    console.log('📘 Testing LinkedIn integration...');
    const page2Promise = page1.waitForEvent('popup');
    await page1.getByTestId('LinkedInIcon').click();
    const page2 = await page2Promise;
    console.log('✅ LinkedIn popup opened successfully');
    await page2.close(); // Close popup after verification
    
    // Twitter popup verification
    console.log('🐦 Testing Twitter integration...');
    const page3Promise = page1.waitForEvent('popup');
    await page1.getByTestId('TwitterIcon').click();
    const page3 = await page3Promise;
    console.log('✅ Twitter popup opened successfully');
    await page3.close(); // Close popup after verification
    
    // DougallGPT popup verification
    console.log('🤖 Testing DougallGPT integration...');
    const page4Promise = page1.waitForEvent('popup');
    await page1.getByTestId('DougallIcon').first().click();
    const page4 = await page4Promise;
    await page4.goto('https://staging.dougallgpt.com/');
    console.log('✅ DougallGPT popup opened and navigated successfully');
    await page4.close(); // Close popup after verification

    // 📸 Take final screenshot for evidence
    await page1.screenshot({ 
      path: './tests/evidences/article-navigation2-completed.png',
      fullPage: true 
    });

    console.log('🎉 Complete LoginVerification + Navigation flow completed successfully!');
    console.log('💡 Next run will reuse authentication for faster execution');
  });
});