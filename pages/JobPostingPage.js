class JobPostingPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // TODO: Replace with actual logical selectors
    this.titleInput = page.locator('input[name="title"]');
    this.descriptionInput = page.locator('textarea[name="description"]');
    this.locationInput = page.locator('input[name="location"]');
    this.typeSelect = page.locator('select[name="job_type"]');
    this.postButton = page.getByRole('button', { name: /post job/i });
    this.successMessage = page.locator('.alert-success');
  }

  async navigate() {
    await this.page.goto('/company/jobs/new'); // TODO: Adjust route
  }

  async createJob(title, desc, location, type = 'Full-time') {
    await this.titleInput.fill(title);
    await this.descriptionInput.fill(desc);
    await this.locationInput.fill(location);
    if (await this.typeSelect.isVisible()) {
        await this.typeSelect.selectOption(type);
    }
    await this.postButton.click();
  }

  async getSuccessMessage() {
    return await this.successMessage.textContent();
  }
}

module.exports = { JobPostingPage };
