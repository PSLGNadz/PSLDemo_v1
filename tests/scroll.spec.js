import { test, expect } from '@playwright/test';
import { config, secrets, utils } from './config/test-config.js';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

test.describe('NTK Papers User Registration', () => {
  let uniqueEmail;
  
  test.beforeEach(async () => {
    // Generate unique email for each test run
    //uniqueEmail = config.testUser.generateUniqueEmail2;
    console.log(`🎯 Test started at: ${utils.getCurrentTimestamp()}`);
    //console.log(`📧 Using test email: ${uniqueEmail}`);
  });

  test('Complete user signup flow with email verification', async ({ page }) => {
    // Add your test steps here
    await page.goto('https://staging.api.phnxml.io/v2/auth/registration/v3/email-confirm?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaXRlSWQiOjEsImluZm9JZCI6IjEtMC00Njc5NDk4OC0xNzYwMDI3MDYwMDM3Iiwicm9sZUlkIjoiZGVmYXVsdCIsInV1aWQiOiIxLTQ1M2I3OGEwLTVhZDAtNDdmYi04M2MzLWQ2YTYxNzQ3MDIyMCIsInR5cGUiOiJhY2Nlc3MiLCJkb21haW4iOiJudGstaW5zdGl0dXRlLm9yZyIsImlzc3VlciI6InBob2VuaXgiLCJpYXQiOjE3NjAwMjcwNjAsImV4cCI6MTc2MjYxOTA2MH0.sQcnlWqeuWW9EpC98PlsJRTs1mOPkx4WKuA9o2p6XHU&siteid=1&origin=https://staging.ntk-institute.org/&registrationid=9001::staging::universal-registration-v4::1760027520422::a3653d7e-01af-4f71-a97a-1987a373109a&confirmationid=a5a7aa7f-04c7-4158-9612-7c7d42f0b717&brandCode=ntk_today&brandId=58&redirect=https://staging.ntk-institute.org&otp=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaXRlSWQiOjEsImluZm9JZCI6IjEtMzIwNzY0MjIyLTkxYWE3ZTgwLTE3NjAwMjc1Mjg1OTgiLCJyb2xlSWQiOiJhdXRoIiwidXVpZCI6IjEtODBiNzZjZjItOWJlZS00MmYzLWE3OGUtZTM5YTM2OGNkYjRiIiwicGFydHlJZCI6MzIwNzY0MjIyLCJlbWFpbElkIjoiMzA3Njk5NTI0IiwidHlwZSI6ImFjY2VzcyIsImRvbWFpbiI6Im50ay1pbnN0aXR1dGUub3JnIiwiaXNzdWVyIjoicGhvZW5peCIsImlhdCI6MTc2MDAyNzUyOCwiZXhwIjoxNzYwMDMxMTI4fQ.nlS4iGN9Y5jtVHwfYBPlYM90U8E-UW2fiTVbet2APv0&action=Welcome&nl_ref=newsletter&source=otp&track=welcomeEmailLogIn', { waitUntil: 'networkidle' });
      await page.waitForTimeout(1000);
    // Simple 3x scroll with waits
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(2000);

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(2000);

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(2000);

    console.log('✅ Scrolled 3 times with 2-second waits');
    }); // <-- Close the test block

});
