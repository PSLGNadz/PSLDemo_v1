// Test environment configuration
const randomId = Math.floor(Math.random() * 10000); // Random ID for email uniqueness

export const config = {
  // Base URLs
  //Staging Environment
  ntkPapersUrl: 'https://staging-ntkpapers.ntk-institute.org/',
  ntkUrl: 'https://staging.ntk-institute.org/',
  //Production Environment
  ntkUrlProd: 'https://ntk-institute.org/',
  // Mail services
  mailinatorUrl: 'https://www.mailinator.com/v4/public/inboxes.jsp',
  mailosaurURL: 'https://mailosaur.com/app-ea/login?redirect=%2Fapp-ea%2Fservers%2Ftjun2apv%2Fmessages%2Finbox',
  
  // Test timeouts
  timeouts: {
    navigation: 30000,
    action: 10000,
    assertion: 5000
  },
  // Test data
  testUser: {
//    generateUniqueEmail: `phoenix.newsletters+${String(randomId).padStart(1, '0')}@pslqa.testinator.com`,
//    generateUniqueEmail2: `phoenix.newsletters+${String(randomId).padStart(1, '0')}@pslqa.testinator.com`,    
    generateUniqueEmail: `phoenix.ntkPapers${String(randomId).padStart(1, '0')}@pslqa.testinator.com`,
    generateUniqueEmail2: `phoenix.ntk${String(randomId).padStart(1, '0')}@pslqa.testinator.com`,    
//    generateUniqueEmail: `phoenix.ntkPapers${String(randomId).padStart(1, '0')}@tjun2apv.mailosaur.net`,
//    generateUniqueEmail2: `phoenix.ntk${String(randomId).padStart(1, '0')}@tjun2apv.mailosaur.net`,    
//    generateUniqueEmail: `phoenix.ntkPapers${String(randomId).padStart(1, '0')}@pslteam199291.testinator.com`,
//    generateUniqueEmail2: `phoenix.ntk${String(randomId).padStart(1, '0')}@pslteam199291.testinator.com`,  
    loginVerifyEmail: `phoenix.newsletters@pslqa.testinator.com`,
    firstName: 'Playwright',
    lastName: `Auto${String(randomId).padStart(1, '0')}`,
    country: 'Malaysia',
    state: 'Port Dickson',
    profession: 'Physician',
    specialty: 'Addiction Medicine'
  },
  
  // File paths (relative to project root)
  testFiles: {
    uploadDocument: './test-data/sample-document.png'
  }
};

// Environment variables (these should be set in .env file)
export const secrets = {
  mailinator: {
    email: process.env.MAILINATOR_EMAIL || 'your-email@domain.com',
    password: process.env.MAILINATOR_PASSWORD || 'your-password'
  }
};

// Simple email counter (resets every test session)
let emailCounter = 1;

// Utility functions
export const utils = {
  // Generate sequential email addresses
  generateUniqueEmail: (prefix = 'phoenix.newslettersNtkPapers_auto') => {
    emailCounter++;
    return `${prefix}${emailCounter}@pslqa.testinator.com`;
  },
  
  // Reset email counter (useful for testing)
  resetEmailCounter: () => {
    emailCounter = 1;
    console.log('🔄 Email counter reset to 1');
  },
  
  // Get current counter value
  getCurrentEmailCounter: () => {
    return emailCounter;
  },
  
  // Format current date/time for test naming
  getCurrentTimestamp: () => {
    return new Date().toISOString().replace(/:/g, '-').split('.')[0];
  }
};