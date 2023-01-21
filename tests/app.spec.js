// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:8787/');

  await expect(page).toHaveTitle(/Audio Effects/);
});
