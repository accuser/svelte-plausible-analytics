<script lang="ts">
	import { dev } from '$app/env';
	import { page } from '$app/stores';

	/**
	 * The API host.
	 *
	 * @defaultValue 'https://plausible.io'
	 */
	export let apiHost = 'https://plausible.io';

	/**
	 * Compatibility mode for tracking users on Internet Explorer.
	 *
	 * @defaultValue false
	 */
	export let compat = false;

	/**
	 * The domain name(s) of the website(s) to track.
	 *
	 * @defaultValue current hostname.
	 */
	export let domain: string | string[] = $page.url.hostname;

	/**
	 * Enable analytics.
	 *
	 * @defaultValue `true` in production mode, `false` in development mode.
	 */
	export let enabled = !dev;

	/**
	 * Automatically follow frontend navigation when using hash-based routing.
	 *
	 * @defaultValue `false`
	 */
	export let hash = false;

	/**
	 * Allow analytics to track on localhost (useful in hybrid apps).
	 * @defaultValue `false`, unless `enabled` is `true` in development mode.
	 */
	export let local = enabled && dev;

	$: src = [
		`${apiHost}/js/script`,
		compat ? 'compat' : undefined,
		hash ? 'hash' : undefined,
		local ? 'local' : undefined,
		'js'
	]
		.filter(Boolean)
		.join('.');
</script>

<svelte:head>
	{#if enabled}
		<script data-domain={domain.toString()} defer {src}></script>
	{/if}
</svelte:head>
