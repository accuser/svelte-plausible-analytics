import { expect, test } from '@playwright/test';

test('PlausibleAnalytics provider includes correct <script> tag in <head> tag', async ({ page }) => {
	await page.goto('/');

	expect(await page.getAttribute('head script[data-api][data-domain][src]', 'data-api')).toContain('https://plausible.io/api/event');
	expect(await page.getAttribute('head script[data-api][data-domain][src]', 'data-domain')).toContain('localhost');
	expect(await page.getAttribute('head script[data-api][data-domain][src]', 'src')).toContain('https://plausible.io/js/script.js');
});
