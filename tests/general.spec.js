const { test, expect } = require('@playwright/test');

test.describe('General & UI Workflows', () => {

  test('Landing Page Navigation - @smoke', async ({ page }) => {
    await page.goto('/');
    
    // Assert page title
    await expect(page).toHaveTitle(/CareerSwipe|Home/i);
    
    // Assert login and register buttons are visible
    await expect(page.getByRole('link', { name: /login/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /register/i })).toBeVisible();
  });

  test('Broken Links Check - @sanity', async ({ page, request }) => {
    await page.goto('/');
    
    // Collect all links
    const links = await page.locator('a').elementHandles();
    for(let link of links) {
      const href = await link.getAttribute('href');
      if(href && href.startsWith('http')) {
        const response = await request.get(href);
        expect(response.status()).toBeLessThan(400); // Check for 404s
      }
    }
  });

  test('Mobile Responsiveness - @regression', async ({ page }) => {
    // Set viewport to mobile (iPhone 12)
    await page.setViewportSize({ width: 390, height: 844 });
    
    await page.goto('/');
    
    // Check if mobile hamburger menu is visible instead of desktop navbar
    const hamburger = page.locator('.navbar-toggler'); // TODO: adjust selector
    await expect(hamburger).toBeVisible();
  });

});
