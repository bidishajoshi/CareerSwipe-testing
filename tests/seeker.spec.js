const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { JobSearchPage } = require('../pages/JobSearchPage');
const { JobDetailsPage } = require('../pages/JobDetailsPage');
const { ProfilePage } = require('../pages/ProfilePage');
const { ResumePage } = require('../pages/ResumePage');
const users = require('../test-data/users.json');

test.describe('Job Seeker Workflows', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    // Log in as seeker before each test
    await loginPage.login(users.validSeeker.email, users.validSeeker.password);
  });

  test('Edit Profile - @regression', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const profilePage = new ProfilePage(page);

    await dashboardPage.goToProfile();
    await profilePage.editProfile('UpdatedFirstName', 'UpdatedLastName', '1234567890');
    
    const success = await profilePage.getSuccessMessage();
    expect(success).toBeTruthy();
  });

  test('Upload Resume - @regression', async ({ page }) => {
    // Note: requires a sample resume file in test-data
    // You must create a dummy.pdf in test-data/ before running
    const dashboardPage = new DashboardPage(page);
    const resumePage = new ResumePage(page);

    await dashboardPage.navigate();
    // Navigate to resume upload logic
    await resumePage.navigate();
    
    // await resumePage.uploadResume('../test-data/dummy.pdf'); // Uncomment when dummy.pdf is created
    // const success = await resumePage.getSuccessMessage();
    // expect(success).toBeTruthy();
  });

  test('Search Jobs and Swipe Right - @regression', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const jobSearchPage = new JobSearchPage(page);

    await dashboardPage.goToJobSearch();
    await jobSearchPage.search('Software Engineer', 'Remote');
    
    const jobCount = await jobSearchPage.getJobResultsCount();
    if(jobCount > 0) {
       await jobSearchPage.swipeRight();
       // Assert successful swipe/application (e.g., flash message or removed from DOM)
    }
  });

  test('Save Job - @regression', async ({ page }) => {
    const jobDetailsPage = new JobDetailsPage(page);
    
    // Go to a specific job ID (assuming ID 1 exists for test)
    await jobDetailsPage.navigate(1);
    await jobDetailsPage.saveJob();
    
    const success = await jobDetailsPage.getSuccessMessage();
    expect(success).toBeTruthy();
  });
});
