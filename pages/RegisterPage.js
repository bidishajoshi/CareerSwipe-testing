class RegisterPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // TODO: Replace logical selectors if needed
    this.firstNameInput = page.locator('input[name="first_name"]');
    this.lastNameInput = page.locator('input[name="last_name"]');
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.roleSelect = page.locator('select[name="role"]'); // If role is selected during registration
    this.registerButton = page.getByRole('button', { name: /register/i });
    this.errorMessage = page.locator('.alert-danger');
    this.successMessage = page.locator('.alert-success');
  }

  async navigate() {
    await this.page.goto('/register');
  }

  async register(firstName, lastName, email, password, role = 'seeker') {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    if (await this.roleSelect.isVisible()) {
        await this.roleSelect.selectOption(role);
    }
    await this.registerButton.click();
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }

  async getSuccessMessage() {
    return await this.successMessage.textContent();
  }
}

module.exports = { RegisterPage };
