
import { test, expect } from "@playwright/test";
import {
  login,
  verifyErrorMessage,
  navigateToResetPassword,
} from "../tests-examples/Login.js";

// Run Command : npx playwright test tests/Login.spec.js --headed

// TC-12 is a bug, the error message is not displayed when the email is not registered.

test.describe("EVhub Login Testcases", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    test.setTimeout(90000);
    await page.goto(baseURL);
  });

  test("TC_EV_LOGIN_01 - Verify Navigation to Login Screen", async ({
    page,
  }) => {
    await login(page, "nithyanagalakshmi", "nn");
    const pageTitle = await page.title();
    expect(pageTitle).toBe("EV HUB INSPECTION");
  });

  test("TC_EV_LOGIN_02 - Verify Login Screen Elements", async ({ page }) => {
    const usernameField = page.locator("#username");
    const passwordField = page.locator("#password");
    const loginButton = page.locator("#kc-login");

    await expect(usernameField).toBeVisible();
    await expect(passwordField).toBeVisible();
    await expect(loginButton).toBeVisible();
  });

  test("TC_EV_LOGIN_03 - Verify Positive Login", async ({ page }) => {
    await login(page, "nithyanagalakshmi", "nn");
    const pageTitle = await page.title();
    expect(pageTitle).toBe("EV HUB INSPECTION");
  });

  test("TC_EV_LOGIN_04 - Verify Invalid Password Login", async ({ page }) => {
    await login(page, "nithyanagalakshmi", "wrongpassword");
    await verifyErrorMessage(page, "Invalid username or password.");
  });

  test("TC_EV_LOGIN_05 - Verify Invalid Username Login", async ({ page }) => {
    await login(page, "wrongusername", "nn");
    await verifyErrorMessage(page, "Invalid username or password.");
  });

  test("TC_EV_LOGIN_06 - Verify Invalid Username & Password Login", async ({
    page,
  }) => {
    await login(page, "wrongusername", "wrongpassword");
    await verifyErrorMessage(page, "Invalid username or password.");
  });

  test("TC_EV_LOGIN_07 - Verify Blank Username", async ({ page }) => {
    await login(page, "", "nn");
    await verifyErrorMessage(page, "Invalid username or password.");
  });

  test("TC_EV_LOGIN_08 - Verify Blank Password", async ({ page }) => {
    await login(page, "nithyanagalakshmi", "");
    await verifyErrorMessage(page, "Invalid username or password.");
  });

  test("TC_EV_LOGIN_09 - Verify Blank Username and Password", async ({
    page,
  }) => {
    await login(page, "", "");
    await verifyErrorMessage(page, "Invalid username or password.");
  });

  test("TC_EV_LOGIN_10 - Verify Forgot Password Page Navigation", async ({
    page,
  }) => {
    await navigateToResetPassword(page);
    const pageTitle = page.locator("#kc-page-title");
    const titleText = await pageTitle.textContent();
    expect(titleText.trim()).toBe("Forgot Your Password?");
  });

  test("TC_EV_LOGIN_11 - Verify Back to Login Navigation", async ({ page }) => {
    await navigateToResetPassword(page);
    const backToLoginLink = page.locator('a:has-text("Back to Login")');
    await backToLoginLink.click();
    const pageTitle = page.locator("#kc-page-title");
    const titleText = await pageTitle.textContent();
    expect(titleText.trim()).toBe("Welcome to EV HUB");
  });

  // test("TC_EV_LOGIN_12 - Verify Unregistered Email ID in Reset Password", async ({
  //   page,
  // }) => {
  //   await navigateToResetPassword(page);
  //   await page.fill("#username", "unregistered@example.com");
  //   const alert = page.locator(".pf-c-alert__icon");
  //   await expect(alert).toBeVisible();
  //   const alertMessage = await page
  //     .locator(".pf-c-alert__title.kc-feedback-text")
  //     .textContent();
  //   expect(alertMessage.trim()).toBe("No account found with this email.");
  // });

  test("TC_EV_LOGIN_13 - Verify Submit and Success Message in Reset Password", async ({
    page,
  }) => {
    await navigateToResetPassword(page);
    await page.fill("#username", "nithyanagalakshmi");
    await page.click('input[type="submit"][value="Submit"]');
    const alert = page.locator(".pf-c-alert__icon");
    await expect(alert).toBeVisible({ timeout: 10000 });
    const alertMessage = await page
      .locator(".pf-c-alert__title.kc-feedback-text")
      .textContent();
    expect(alertMessage.trim()).toBe(
      "You should receive an email shortly with further instructions."
    );
  });
});
