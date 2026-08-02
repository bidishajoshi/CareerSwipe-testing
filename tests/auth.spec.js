const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { RegisterPage } = require('../pages/RegisterPage');
const { DashboardPage } = require('../pages/DashboardPage');
const users = require('../test-data/users.json');
const { generateRandomEmail, generateRandomPassword } = require('../utils/helpers');

test.describe('Authentication Tests', () => {

  test('Valid Login - @smoke @sanity', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.navigate();
    await loginPage.login(users.validSeeker.email, users.validSeeker.password);
    
    // Assert successful login by checking dashboard URL or welcome message
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(dashboardPage.logoutButton).toBeVisible();
  });

  test('Invalid Login - @sanity', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.navigate();
    await loginPage.login(users.invalidUser.email, users.invalidUser.password);
    
    // Assert error message
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toBeTruthy(); // TODO: adjust to specific message if known
  });

  test('Empty Login Fields - @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.navigate();
    await loginPage.login('', '');
    
    // Check HTML5 validation or custom error message
    // If it's custom:
    // await expect(loginPage.errorMessage).toBeVisible();
    // If HTML5:
    const emailField = loginPage.emailInput;
    const isInvalid = await emailField.evaluate((el) => !el.checkValidity());
    expect(isInvalid).toBe(true);
  });

  test('Successful Registration - @smoke', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    
    await registerPage.navigate();
    const newEmail = generateRandomEmail();
    const newPassword = generateRandomPassword();
    
    await registerPage.register('John', 'Doe', newEmail, newPassword, 'seeker');
    
    // Wait for success message or redirect
    await expect(page).toHaveURL(/.*login|.*dashboard/);
  });

  test('Duplicate Email Registration - @regression', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    
    await registerPage.navigate();
    // Use an already registered email
    await registerPage.register('Jane', 'Doe', users.validSeeker.email, 'Password123!', 'seeker');
    
    const errorMsg = await registerPage.getErrorMessage();
    expect(errorMsg).toMatch(/already exists/i); // TODO: adjust regex
  });

  test('Forgot Password - @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.navigate();
    await loginPage.clickForgotPassword();
    
    await expect(page).toHaveURL(/.*forgot-password/);
  });

  test('Logout - @smoke', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    // Login first
    await loginPage.navigate();
    await loginPage.login(users.validSeeker.email, users.validSeeker.password);
    
    // Logout
    await dashboardPage.logout();
    
    // Assert redirect to login or home
    await expect(page).toHaveURL(/.*login/);
  });

});
