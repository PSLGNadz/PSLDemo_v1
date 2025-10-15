// Test environment configuration
const randomId = Math.floor(Math.random() * 10000); // Random ID for email uniqueness

export const config = {
  // Base URLs
  //Staging Environment
  ntkPapersUrl: 'https://staging-ntkpapers.ntk-institute.org/',
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
    loginVerifyEmail: `phoenix.newsletters@pslqa.testinator.com`,
    //loginVerifyEmail: `nadzrul.adnan@pslgroup.com`,
    // 🔐 Authentication credentials (for fast-mode tests)
    email: `phoenix.newsletters@pslqa.testinator.com`, // Main auth email from config
    emailPSL: `nadzrul.adnan@pslgroup.com`, 
    password: process.env.TEST_USER_PASSWORD || 'defaultPassword123', // Set this in your .env file
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
    email: process.env.MAILINATOR_EMAIL || 'daniel.rodriguez@pslgroup.com',
    password: process.env.MAILINATOR_PASSWORD || 'kJbGb!k3#6SySUS'
  }
};

// 🔐 Authentication Configuration
export const authConfig = {
  // Enable/disable authentication state reuse
  enableAuthReuse: process.env.DISABLE_AUTH_REUSE !== 'true',
  
  // Force all tests to start fresh (overrides smart detection)
  forceAlwaysFresh: process.env.FORCE_FRESH_AUTH === 'true',
  
  // Maximum age of saved auth state (in hours)
  maxAuthAgeHours: 24,
  
  // Auth state storage paths
  authStorePath: './test-data/auth-state/',
  
  // Keywords that trigger fresh authentication
  freshAuthKeywords: [
    'login', 'signin', 'signup', 'register', 
    'auth', 'verification', 'password', 'reset'
  ],
  
  // Selectors for authentication validation
  selectors: {
    // Login form selectors
    emailInput: '#email, [data-testid="email"], input[type="email"]',
    passwordInput: '#password, [data-testid="password"], input[type="password"]',
    loginSubmit: '[data-testid="login-submit"], button[type="submit"], .login-button',
    
    // Success indicators (adapt to your app)
    authenticatedElements: [
      '[data-testid="user-dashboard"]',
      '.dashboard',
      '.profile-menu',
      '[data-testid="user-profile"]',
      '.user-menu'
    ]
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