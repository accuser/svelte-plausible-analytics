import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig(({ mode }) => ({
	plugins: [sveltekit()],
	resolve: {
		conditions: mode === 'test' ? ['browser'] : undefined,
	},
	server: {
		host: '0.0.0.0'
	},
	test: {
		environment: 'jsdom',
		include: ['src/**/*.test.{js,ts}'],
		setupFiles: ['vitest-setup.js']
	}
}));
