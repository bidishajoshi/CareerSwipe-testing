# CareerSwipe QA Automation

Playwright end-to-end (E2E) testing framework for the CareerSwipe web application.

## Prerequisites
- Node.js (v16+)
- CareerSwipe backend running locally (by default on `http://localhost:5000`)

## Installation

Run the following commands inside this `tests/` directory:

```bash
# 1. Install dependencies
npm install

# 2. Install Playwright browsers (Chromium, Firefox, WebKit)
npx playwright install
```

## Running Tests

### Run all tests in headless mode
```bash
npm run test
```

### Run tests in UI mode
```bash
npm run test:ui
```

### Run tests in headed mode (visible browser)
```bash
npm run test:headed
```

### Run specific test suites
```bash
npm run test:smoke
npm run test:sanity
npm run test:regression
```

### Run a single test file
```bash
npx playwright test tests/auth.spec.js
```

### Run a specific test by title
```bash
npx playwright test -g "Valid Login"
```

### Debugging Tests
```bash
npm run test:debug
```

## Viewing Reports
```bash
npm run report
```

## Folder Structure
- `pages/` - Page Object Model (POM) classes.
- `tests/` - Test spec files organized by domain (auth, seeker, company, general).
- `test-data/` - JSON files containing test data.
- `utils/` - Helper functions and utilities.
- `playwright.config.js` - Global Playwright configuration.
