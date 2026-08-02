class JobDetailsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // TODO: Replace with actual logical selectors
    this.jobTitle = page.locator('.job-details-title'); // TODO: Replace
    this.applyButton = page.getByRole('button', { name: /apply/i });
    this.saveButton = page.getByRole('button', { name: /save/i });
    this.successMessage = page.locator('.alert-success'); // TODO: Replace
  }

  async navigate(jobId) {
    await this.page.goto(`/jobs/${jobId}`); // TODO: Adjust to actual route
  }

  async getJobTitle() {
    return await this.jobTitle.textContent();
  }

  async apply() {
    await this.applyButton.click();
  }

  async saveJob() {
    await this.saveButton.click();
  }

  async getSuccessMessage() {
    return await this.successMessage.textContent();
  }
}

module.exports = { JobDetailsPage };
