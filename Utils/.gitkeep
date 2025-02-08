import {  expect } from "@playwright/test";

// login.js
export const BASE_URL = "https://dashboard.dev.evhub.no/";

// Utility function for logging in
export async function login(page, username, password) {
  await page.fill("#username", username);
  await page.fill("#password", password);
  await page.click("#kc-login");
  await page.waitForLoadState("domcontentloaded");
}

// Utility function to verify error message
export async function verifyErrorMessage(page, expectedMessage) {
  const errorMessage = await page.locator("#input-error");
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText(expectedMessage);
}

// Utility function for navigating to the reset password page
export async function navigateToResetPassword(page) {
  const forgotPasswordLink = page.locator('a:has-text("Forgot Password?")');
  await forgotPasswordLink.click();
  await page.waitForLoadState("domcontentloaded");
}
