<script context="module" lang="ts">
	interface PlausibleTracker {
		(event: string, options?: any): void;
	}

	interface PlausibleWindow extends Window {
		plausible: PlausibleTracker;
	}

	declare let window: PlausibleWindow;

	const plausible: PlausibleTracker = (event, options) => window.plausible(event, options);
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { dev } from '$app/environment';
	import { page } from '$app/stores';
	import { pa } from '$lib/store';

	onMount(() => {
		pa.subscribe((events) => {
			let next = events.length && events.shift();

			while (next) {
				const { event, data } = next;
				plausible(event, data);
				next = events.shift();
			}
		});
	});

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
	export let local: boolean = enabled && dev;

	$: api = `${apiHost}/api/event`;
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
		<script data-api={api} data-domain={domain.toString()} defer {src}></script>
		<script>
			window.plausible =
				window.plausible ||
				function () {
					(window.plausible.q = window.plausible.q || []).push(arguments);
				};
		</script>
	{/if}
</svelte:head>
