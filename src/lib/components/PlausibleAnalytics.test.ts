import { JSDOM } from 'jsdom';
import { mount } from 'svelte';
import { beforeEach, describe, expect, it } from 'vitest';
import PlausibleAnalytics from './PlausibleAnalytics.svelte';

describe('PlausibleAnalytics', () => {
	beforeEach(async () => {
		document = window.document = (await JSDOM.fromFile('src/app.html')).window.document;
	});

	describe('in development mode', () => {
		beforeEach(() => {
			import.meta.env.MODE = 'development';
		});

		it('renders nothing with default props', async () => {
			mount(PlausibleAnalytics, { target: document.body });

			expect(document.querySelectorAll('script').length).toBe(0);
		});

		it('renders nothing when `enabled` is `false`', async () => {
			mount(PlausibleAnalytics, { props: { enabled: false }, target: document.body });

			expect(document.querySelectorAll('script').length).toBe(0);
		});

		it('renders scripts when `enabled` is `true`', async () => {
			mount(PlausibleAnalytics, { props: { enabled: true }, target: document.body });

			expect(document.querySelectorAll('script').length).toBe(2);
		});
	});

	describe('in production mode', () => {
		beforeEach(() => {
			import.meta.env.MODE = 'production';
		});

		it('renders with default props', async () => {
			mount(PlausibleAnalytics, { target: document.body });

			expect(document.querySelectorAll('script').length).toBe(2);
		});

		it('renders nothing when `enabled` is `false`', async () => {
			mount(PlausibleAnalytics, { props: { enabled: false }, target: document.body });

			expect(document.querySelectorAll('script').length).toBe(0);
		});

		it('renders scripts when `enabled` is `true`', async () => {
			mount(PlausibleAnalytics, { props: { enabled: true }, target: document.body });

			expect(document.querySelectorAll('script').length).toBe(2);
		});
	});

	it('includes "compat" in `src` attribute when `compat` is `true`', async () => {
		mount(PlausibleAnalytics, { props: { compat: true }, target: document.body });

		expect(document.querySelector('script[data-api]')).toBeInTheDocument();
		expect(document.querySelector('script[data-api]')).toHaveAttribute('src');
		expect(document.querySelector('script[data-api]')?.getAttribute('src')).toContain('compat');
	});

	for (const value of [false, undefined]) {
		it(`does not include "compat" in \`src\` attribute when \`compat\` is \`${value}\``, async () => {
			mount(PlausibleAnalytics, { props: { compat: value }, target: document.body });

			expect(document.querySelector('script[data-api]')).toBeInTheDocument();
			expect(document.querySelector('script[data-api]')).toHaveAttribute('src');
			expect(document.querySelector('script[data-api]')?.getAttribute('src')).not.toContain(
				'compat'
			);
		});
	}

	it('includes `${apiHost}/api/event` in `data-api` attribute when `apiHost` is set', async () => {
		mount(PlausibleAnalytics, { props: { apiHost: 'example.com' }, target: document.body });

		expect(document.querySelector('script[data-api]')).toBeInTheDocument();
		expect(document.querySelector('script[data-api]')?.getAttribute('data-api')).toContain(
			'example.com/api/event'
		);
	});

	it('includes `https://plausible.io/api/event` in `data-domain` attribute when `domain` is not set', async () => {
		mount(PlausibleAnalytics, { target: document.body });

		expect(document.querySelector('script[data-api]')).toBeInTheDocument();
		expect(document.querySelector('script[data-api]')?.getAttribute('data-api')).toContain(
			'https://plausible.io/api/event'
		);
	});

	it('includes `domain` in `data-domain` attribute when `domain` is set', async () => {
		mount(PlausibleAnalytics, { props: { domain: 'example.com' }, target: document.body });

		expect(document.querySelector('script[data-domain]')).toBeInTheDocument();
		expect(document.querySelector('script[data-domain]')?.getAttribute('data-domain')).toContain(
			'example.com'
		);
	});

	it('includes `localhost` in `data-domain` attribute when `domain` is not set', async () => {
		mount(PlausibleAnalytics, { target: document.body });

		expect(document.querySelector('script[data-domain]')).toBeInTheDocument();
		expect(document.querySelector('script[data-domain]')?.getAttribute('data-domain')).toContain(
			'localhost'
		);
	});

	it('includes "file-downloads" in `src` attribute when `fileDownloads` is `true`', async () => {
		mount(PlausibleAnalytics, { props: { fileDownloads: true }, target: document.body });

		expect(document.querySelector('script[data-api]')).toBeInTheDocument();
		expect(document.querySelector('script[data-api]')?.getAttribute('src')).toContain(
			'file-downloads'
		);
	});

	for (const value of [false, undefined]) {
		it(`does not include "file-downloads" in \`src\` attribute when \`fileDownloads\` is \`${value}\``, async () => {
			mount(PlausibleAnalytics, { props: { fileDownloads: value }, target: document.body });

			expect(document.querySelector('script[data-api]')).toBeInTheDocument();
			expect(document.querySelector('script[data-api]')?.getAttribute('src')).not.toContain(
				'file-downloads'
			);
		});
	}

	for (const prop of ['hash', 'hashMode']) {
		it(`includes "hash" in \`src\` attribute when \`${prop}\` is \`true\``, async () => {
			mount(PlausibleAnalytics, { props: { [prop]: true }, target: document.body });

			expect(document.querySelector('script[data-api]')).toBeInTheDocument();
			expect(document.querySelector('script[data-api]')?.getAttribute('src')).toContain('hash');
		});

		for (const value of [false, undefined]) {
			it(`does not include "hash" in \`src\` attribute when \`${prop}\` is \`${value}\``, async () => {
				mount(PlausibleAnalytics, { props: { [prop]: value }, target: document.body });

				expect(document.querySelector('script[data-api]')).toBeInTheDocument();
				expect(document.querySelector('script[data-api]')?.getAttribute('src')).not.toContain(
					'hash'
				);
			});
		}
	}

	for (const prop of ['local', 'trackLocalhost']) {
		it(`includes "local" in \`src\` attribute when \`${prop}\` is \`true\``, async () => {
			mount(PlausibleAnalytics, { props: { [prop]: true }, target: document.body });

			expect(document.querySelector('script[data-api]')).toBeInTheDocument();
			expect(document.querySelector('script[data-api]')?.getAttribute('src')).toContain('local');
		});

		for (const value of [false, undefined]) {
			it(`does not include "local" in \`src\` attribute when \`${prop}\` is \`${value}\``, async () => {
				mount(PlausibleAnalytics, { props: { [prop]: value }, target: document.body });

				expect(document.querySelector('script[data-api]')).toBeInTheDocument();
				expect(document.querySelector('script[data-api]')?.getAttribute('src')).not.toContain(
					'local'
				);
			});
		}
	}

	for (const prop of ['outboundLinks', 'trackOutboundLinks']) {
		it(`includes "outbound-links" in \`src\` attribute when \`${prop}\` is \`true\``, async () => {
			mount(PlausibleAnalytics, { props: { [prop]: true }, target: document.body });

			expect(document.querySelector('script[data-api]')).toBeInTheDocument();
			expect(document.querySelector('script[data-api]')?.getAttribute('src')).toContain(
				'outbound-links'
			);
		});

		for (const value of [false, undefined]) {
			it(`does not include "outbound-linkg" in \`src\` attribute when \`${prop}\` is \`${value}\``, async () => {
				mount(PlausibleAnalytics, { props: { [prop]: value }, target: document.body });

				expect(document.querySelector('script[data-api]')).toBeInTheDocument();
				expect(document.querySelector('script[data-api]')?.getAttribute('src')).not.toContain(
					'outbound-links'
				);
			});
		}
	}
});
