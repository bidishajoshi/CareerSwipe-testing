class ProfilePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // TODO: Replace with actual logical selectors
    this.firstNameInput = page.locator('input[name="first_name"]');
    this.lastNameInput = page.locator('input[name="last_name"]');
    this.phoneInput = page.locator('input[name="phone"]');
    this.saveButton = page.getByRole('button', { name: /save/i });
    this.successMessage = page.locator('.alert-success');
  }

  async navigate() {
    await this.page.goto('/profile'); // TODO: Adjust route
  }

  async editProfile(firstName, lastName, phone) {
    if (firstName) await this.firstNameInput.fill(firstName);
    if (lastName) await this.lastNameInput.fill(lastName);
    if (phone) await this.phoneInput.fill(phone);
    await this.saveButton.click();
  }

  async getSuccessMessage() {
    return await this.successMessage.textContent();
  }
}

module.exports = { ProfilePage };
