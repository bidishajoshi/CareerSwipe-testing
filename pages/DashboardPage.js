class DashboardPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // TODO: Replace with actual logical selectors
    this.welcomeMessage = page.locator('.welcome-message'); // TODO: Replace
    this.logoutButton = page.getByRole('link', { name: /logout/i });
    this.profileLink = page.getByRole('link', { name: /profile/i });
    this.jobSearchLink = page.getByRole('link', { name: /search jobs/i });
    this.notificationsLink = page.locator('.nav-notifications'); // TODO: Replace
    this.savedJobsList = page.locator('.saved-jobs-list'); // TODO: Replace
  }

  async navigate() {
    await this.page.goto('/dashboard'); // TODO: Adjust based on seeker/company routing
  }

  async getWelcomeText() {
    return await this.welcomeMessage.textContent();
  }

  async logout() {
    await this.logoutButton.click();
  }

  async goToProfile() {
    await this.profileLink.click();
  }

  async goToJobSearch() {
    await this.jobSearchLink.click();
  }

  async getSavedJobsCount() {
    // Wait for saved jobs to load and return count
    // TODO: adjust locator to actual saved job cards
    const cards = this.page.locator('.saved-jobs-list .job-card');
    return await cards.count();
  }
}

module.exports = { DashboardPage };
