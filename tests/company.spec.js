const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { CompanyDashboardPage } = require('../pages/CompanyDashboardPage');
const { JobPostingPage } = require('../pages/JobPostingPage');
const users = require('../test-data/users.json');

test.describe('Company Workflows', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    // Log in as company before each test
    await loginPage.login(users.validCompany.email, users.validCompany.password);
  });

  test('Create Job - @smoke @regression', async ({ page }) => {
    const dashboard = new CompanyDashboardPage(page);
    const postJob = new JobPostingPage(page);

    await dashboard.navigate();
    await dashboard.goToPostJob();
    
    await postJob.createJob('Playwright QA Engineer', 'Looking for an automation expert.', 'New York, NY', 'Full-time');
    
    const successMsg = await postJob.getSuccessMessage();
    expect(successMsg).toBeTruthy();
  });

  test('View and Shortlist Applicant - @regression', async ({ page }) => {
    const dashboard = new CompanyDashboardPage(page);

    await dashboard.navigate();
    await dashboard.goToApplicants();
    
    // Assuming there is at least one applicant
    await dashboard.shortlistApplicant();
    
    // Assert status changed or success flash message appeared
    const successMsg = await page.locator('.alert-success').textContent(); // TODO: adjust to actual
    expect(successMsg).toBeTruthy();
  });

  test('Schedule Interview - @regression', async ({ page }) => {
    const dashboard = new CompanyDashboardPage(page);

    await dashboard.navigate();
    await dashboard.goToApplicants();
    
    await dashboard.scheduleInterview();
    // Assuming a modal opens, we would fill the modal details here
    // TODO: implement modal interactions once selectors are known
  });

});
