class JobSearchPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // TODO: Replace with actual logical selectors
    this.searchInput = page.locator('input[placeholder*="Search"]');
    this.locationInput = page.locator('input[placeholder*="Location"]');
    this.searchButton = page.getByRole('button', { name: /search/i });
    this.jobCards = page.locator('.job-card'); // TODO: Replace
    this.swipeRightButton = page.locator('.btn-swipe-right'); // TODO: Replace
    this.swipeLeftButton = page.locator('.btn-swipe-left'); // TODO: Replace
  }

  async navigate() {
    await this.page.goto('/jobs'); // TODO: Adjust to actual route
  }

  async search(keyword, location) {
    if (keyword) await this.searchInput.fill(keyword);
    if (location) await this.locationInput.fill(location);
    await this.searchButton.click();
  }

  async getJobResultsCount() {
    await this.page.waitForTimeout(1000); // Wait for API response
    return await this.jobCards.count();
  }

  async swipeRight() {
    await this.swipeRightButton.click();
  }

  async swipeLeft() {
    await this.swipeLeftButton.click();
  }
}

module.exports = { JobSearchPage };
