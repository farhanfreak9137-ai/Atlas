import { test, expect } from '@playwright/test';

// Playwright test to reproduce the reported bug on the deployed site.
// It visits the public deployment, opens the AI/chat UI, sends a message,
// and asserts that the top navbar/header remains visible after sending.

const DEPLOYED_URL = 'https://atlas-aa7q.vercel.app/';

test('chat send should not hide top navbar', async ({ page }) => {
  await page.goto(DEPLOYED_URL, { waitUntil: 'networkidle' });

  // Navigate to AI/chat section if there is a nav link — try to find a link or section
  // containing "AI" or "Atlas"; fallback is just to operate on the current page.

  // Wait for the chat input to appear
  const chatInput = page.locator('textarea[placeholder="Message Atlas..."]');
  await expect(chatInput).toBeVisible({ timeout: 15000 });

  // Focus and type a quick message, then press Enter to send
  await chatInput.fill('Playwright test message');
  await chatInput.press('Enter');

  // Wait briefly for message to appear
  await page.waitForTimeout(1500);

  // Assert header/logo text "Atlas" is still visible in viewport
  const header = page.locator('text=Atlas').first();
  await expect(header).toBeVisible();

  // Also assert the header is not scrolled out of view
  const isInViewport = await header.evaluate((el) => {
    const rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
  });
  expect(isInViewport).toBeTruthy();
});
