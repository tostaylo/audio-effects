// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Audio Effects/);
});

test('has the correct number of effects with proper names', async ({
  page,
}) => {
  await page.goto('/');

  await expect(page.locator('text=Gain')).toBeVisible();
  await expect(page.locator('text=Reverb')).toBeVisible();
  await expect(page.locator('text=Distortion')).toBeVisible();
  await expect(page.locator('text=Compressor')).toBeVisible();
  await expect(page.locator('text=ImpulseResponse')).toBeVisible();
  await expect(page.locator('text=Delay')).toBeVisible();
  await expect(page.locator('text=Fuzz')).toBeVisible();
  await expect(page.locator('text=Tremelo')).toBeVisible();
  await expect(page.locator('text=Fuzzy')).not.toBeVisible();

  const effects = await page.evaluate(async () => [
    ...document.querySelectorAll('[data-test-id]'),
  ]);

  expect(effects).toHaveLength(8);
});
