import { test, expect } from '@playwright/test';
import { config, secrets, utils } from './config/test-config.js';
import dotenv from 'dotenv';
dotenv.config();

test.describe('NTK Login Verification', () => {
  test.beforeEach(async () => {
    console.log(`🎯 Test started at: ${utils.getCurrentTimestamp()}`);
  });

test('NTK Login Verification - Enhanced Dynamic Code Extraction', async ({ page, context }) => {
// Set longer timeout for this complex flow
    test.setTimeout(260000);
    
    console.log('🚀 Starting NTK login verification test...');

  // Step 1: Navigate to NTK site and submit email
  console.log('📧 Step 1: Submitting email for verification');
  await page.goto(config.ntkPapersUrl, { waitUntil: 'networkidle' });
  await page.getByTestId('ULF-emailInput').locator('#email').click();
  await page.getByTestId('ULF-emailInput').locator('#email').fill(config.testUser.loginVerifyEmail);
  await page.getByTestId('ULF-emailFormSubmit').click();
  await page.getByRole('heading', { name: 'Thank you!' }).click();

  // Step 2: Open new tab and login to Mailinator
  console.log('📬 Step 2: Opening Mailinator in new tab');
  const page1 = await context.newPage();
  await page1.goto(config.mailinatorUrl, { waitUntil: 'networkidle' });
  await page1.getByRole('link', { name: 'Login' }).click();
  await page1.getByRole('textbox', { name: 'Email field' }).click();
  await page1.getByRole('textbox', { name: 'Email field' }).fill(secrets.mailinator.email);
  await page1.getByRole('textbox', { name: 'Password field' }).click();
  await page1.getByRole('textbox', { name: 'Password field' }).fill(secrets.mailinator.password);
  await page1.waitForTimeout(30000);
  await page1.getByLabel('Login link').click();
  await page1.getByRole('textbox', { name: 'inbox field' }).click();
  await page1.getByRole('textbox', { name: 'inbox field' }).fill(config.testUser.loginVerifyEmail);
  await page1.getByRole('button', { name: 'GO', exact: true }).click();

  // Step 3: Wait for verification email and extract code (ENHANCED - Dynamic with 30s wait)
  console.log('🔍 Step 3: Waiting for verification email to arrive...');
  
  let emailFound = false;
  let code = '';
  const maxWaitTime = 30000; // 30 seconds
  const checkInterval = 2000; // Check every 2 seconds
  const maxAttempts = maxWaitTime / checkInterval;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    console.log(`📧 Checking for email - Attempt ${attempt}/${maxAttempts}`);
    
    try {
      // Wait for any new emails to load
      await page1.waitForTimeout(checkInterval);
      
      // Look for verification email by subject (most recent first)
      const verificationEmails = page1.getByRole('cell', { name: /Verification code for NTK/i });
      const emailCount = await verificationEmails.count();
      
      if (emailCount > 0) {
        console.log(`✅ Found ${emailCount} verification email(s)! Clicking the first one...`);
        
        // Click the first (most recent) verification email
        await verificationEmails.first().click();
        await page1.waitForTimeout(2000); // Wait for email to load
        
        // Extract the verification code from email content
        try {
          // Look for the code pattern in the email iframe
          const iframe = page1.locator('iframe[name="html_msg_body"]').contentFrame();
          
          // Try different ways to find the code
          const codeSelectors = [
            'text=/\\d{3}\\s\\d{3}/', // Pattern like "507 728"
            'text=/\\d{6}/',         // Pattern like "507728"  
            '[style*="font-size: 24px"], [style*="font-size: 32px"]', // Large text
            'td:has-text(/\\d{3}\\s\\d{3}/)', // Table cell with code
            'span:has-text(/\\d{3}\\s\\d{3}/)', // Span with code
          ];
          
          for (const selector of codeSelectors) {
            try {
              const codeElement = iframe.locator(selector).first();
              if (await codeElement.count() > 0) {
                code = await codeElement.textContent();
                if (code && /\d{3}\s?\d{3}/.test(code.trim())) {
                  console.log(`🎯 Found verification code: "${code.trim()}"`);
                  emailFound = true;
                  code = code.trim(); // Clean the code
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
  
  // Error handling if email not found
  if (!emailFound || !code) {
    throw new Error('❌ Verification email not found or code could not be extracted after 30 seconds');
  }
  
  console.log(`✅ Successfully extracted code: "${code}"`);

  // Step 4: Switch back to first tab and input verification code (ENHANCED - Dynamic filling)
  console.log('🔢 Step 4: Filling verification code in input boxes');
  await page.bringToFront();
  
  // Clean and split the code into individual digits
  const cleanCode = code.replace(/\s/g, ''); // Remove spaces: "507 728" -> "507728"
  const codeDigits = cleanCode.split(''); // Split into array: ["5","0","7","7","2","8"]
  
  console.log(`📝 Code digits to fill: [${codeDigits.join(', ')}]`);
  
  // Verify we have exactly 6 digits
  if (codeDigits.length !== 6) {
    throw new Error(`❌ Expected 6 digits, but got ${codeDigits.length}: [${codeDigits.join(', ')}]`);
  }
  
  // Fill each input box dynamically
  try {
    for (let i = 0; i < 6; i++) {
      const inputSelector = `#otp-${i + 1}`;
      const digit = codeDigits[i];
      
      console.log(`📝 Filling ${inputSelector} with digit: ${digit}`);
      await page.locator(inputSelector).fill(digit);
      await page.waitForTimeout(200); // Small delay between inputs
    }
    
    console.log('✅ All 6 digits filled successfully!');
    
    // Optional: Take screenshot after filling
    await page.screenshot({ path: './tests/evidences/verification-code-filled.png' });
    
    // To wait for page to load after filling code
    console.log('⏳ Waiting for page to process the code...');
    await page.waitForTimeout(30000); // Wait for any post-fill actions to complete

    // Scroll down 3 times with pauses 2 seconds
    for (let i = 0; i < 3; i++) {
      await page.evaluate(() => window.scrollBy(0, window.innerHeight));
      await page.waitForTimeout(2000);
    }


  } catch (fillError) {
    console.log(`❌ Error filling input boxes: ${fillError.message}`);
    
    // Fallback: Try to find input boxes with different selectors
    console.log('🔄 Trying alternative input selectors...');
    const alternativeSelectors = [
      'input[id*="otp"]',
      'input[name*="otp"]', 
      'input[type="text"][maxlength="1"]',
      '.otp-input'
    ];
    
    for (const altSelector of alternativeSelectors) {
      try {
        const inputs = page.locator(altSelector);
        const inputCount = await inputs.count();
        
        if (inputCount === 6) {
          console.log(`✅ Found 6 inputs with selector: ${altSelector}`);
          
          for (let i = 0; i < 6; i++) {
            await inputs.nth(i).fill(codeDigits[i]);
            await page.waitForTimeout(200);
          }
          
          console.log('✅ Alternative filling method successful!');
          break;
        }
      } catch (altError) {
        console.log(`⚠️ Alternative selector failed: ${altSelector}`);
      }
    }
  }

  console.log('🎉 Test completed! Verification code has been extracted and filled dynamically.');
});
});