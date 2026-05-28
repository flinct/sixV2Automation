/**
 * CommonJS Export for 01_url_page.js credentials
 * This file exports credentials from 01_url_page.js in CommonJS format
 * so they can be imported in Node.js scripts like widget-socket-load-2.js
 */

// Extract credentials from 01_url_page.js env_config
function getCredentialsForEnvironment(baseUrl) {
  if (!baseUrl || typeof baseUrl !== "string") {
    return {};
  }

  // Dev-v2 environment
  if (baseUrl.includes("dev.example.test")) {
    return {
      username: "cekerayam01", // from loginBody_cekerayam01
      password: "TestPassword1!",
      description: "cekerayam01 - Admin user for dev-v2"
    };
  }

  // Production v2 environment  
  if (baseUrl.includes("v2.example.test") && !baseUrl.includes("dev-v2")) {
    return {
      username: "goddummyprod",
      password: "TestPassword1!",
      description: "goddummyprod - Prod user for v2"
    };
  }

  // Dev environment (v1)
  if (baseUrl.includes("dev.example.test")) {
    return {
      username: "chickentester01",
      password: "TestPassword1!",
      description: "chickentester01 - Test user for dev"
    };
  }

  // Production environment (v1)
  if (baseUrl.includes("app.example.test")) {
    return {
      username: "admin",
      password: "admin",
      description: "Default admin credentials for app"
    };
  }

  // Staging environment
  if (baseUrl.includes("staging.example.test")) {
    return {
      username: "stagingadmin",
      password: "StagingPass123",
      description: "Staging environment credentials"
    };
  }

  return {};
}

/**
 * Get all available credentials (for reference/testing)
 */
function getAllCredentials() {
  return {
    // Dev-v2
    cekerayam01: {
      identifier: "cekerayam01",
      password: "TestPassword1!",
      role: "admin",
      environment: "dev-v2"
    },
    // v2
    goddummyprod: {
      identifier: "goddummyprod",
      password: "TestPassword1!",
      role: "admin",
      environment: "v2"
    },
    // Dev
    chickentester01: {
      identifier: "chickentester01",
      password: "TestPassword1!",
      role: "tester",
      environment: "dev"
    },
    mataayam01: {
      identifier: "mataayam01",
      password: "f^(B2WdK3uh.p@!?",
      role: "supervisor",
      environment: "dev-v2"
    },
    leherayam01: {
      identifier: "leherayam01",
      password: "5481p#9kKxb?M=!G",
      role: "agent",
      environment: "dev-v2"
    },
  };
}

module.exports = {
  getCredentialsForEnvironment,
  getAllCredentials,
};
