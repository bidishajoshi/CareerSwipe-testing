class ResumePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // TODO: Replace with actual logical selectors
    this.uploadInput = page.locator('input[type="file"]');
    this.uploadButton = page.getByRole('button', { name: /upload/i });
    this.atsScore = page.locator('.ats-score'); // TODO: Replace
    this.buildResumeButton = page.getByRole('button', { name: /build resume/i });
    this.successMessage = page.locator('.alert-success');
    this.errorMessage = page.locator('.alert-danger');
  }

  async navigate() {
    await this.page.goto('/resume'); // TODO: Adjust to actual route
  }

  async uploadResume(filePath) {
    await this.uploadInput.setInputFiles(filePath);
    await this.uploadButton.click();
  }

  async getAtsScore() {
    return await this.atsScore.textContent();
  }

  async getSuccessMessage() {
    return await this.successMessage.textContent();
  }

  async buildResume() {
    await this.buildResumeButton.click();
  }
}

module.exports = { ResumePage };
