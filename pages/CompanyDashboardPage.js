class CompanyDashboardPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // TODO: Replace with actual logical selectors
    this.postJobLink = page.getByRole('link', { name: /post a job/i });
    this.applicantsLink = page.getByRole('link', { name: /applicants/i });
    this.jobListings = page.locator('.company-job-list .job-item'); // TODO: Replace
    this.shortlistButton = page.getByRole('button', { name: /shortlist/i });
    this.hireButton = page.getByRole('button', { name: /hire/i });
    this.scheduleInterviewButton = page.getByRole('button', { name: /schedule interview/i });
  }

  async navigate() {
    await this.page.goto('/company/dashboard'); // TODO: Adjust route
  }

  async goToPostJob() {
    await this.postJobLink.click();
  }

  async goToApplicants() {
    await this.applicantsLink.click();
  }

  async getActiveJobsCount() {
    return await this.jobListings.count();
  }

  async shortlistApplicant() {
    await this.shortlistButton.first().click();
  }

  async hireApplicant() {
    await this.hireButton.first().click();
  }
  
  async scheduleInterview() {
      await this.scheduleInterviewButton.first().click();
  }
}

module.exports = { CompanyDashboardPage };
