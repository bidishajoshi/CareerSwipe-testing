/**
 * Generate a random email address
 */
function generateRandomEmail() {
  const timestamp = new Date().getTime();
  return `testuser_${timestamp}@example.com`;
}

/**
 * Generate a random password
 */
function generateRandomPassword() {
  return 'TestPass' + Math.floor(Math.random() * 10000) + '!';
}

/**
 * Pause execution for given milliseconds
 * @param {number} ms - Milliseconds to wait
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
  generateRandomEmail,
  generateRandomPassword,
  sleep
};
