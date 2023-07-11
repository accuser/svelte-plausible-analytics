<script context="module" lang="ts">
	import type { Action } from 'svelte/action';
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
	import { pa } from '$lib/store.js';

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
	 * Automatically track file downloads
	 * (Requires manual goal configuration on Plausible.)
	 * @defaultValue `false`
	 */
	export let fileDownloads = false;

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

	/**
	 * Automatically track clicks on outbound links from your website.
	 * (Requires manual goal configuration on Plausible.)
	 * @defaultValue `false`
	 */
	export let outboundLinks = false;

	/**
	 * Add custom properties to pageviews.
	 * Holds the page view props to be used in the application.
	 * It can either be a boolean value or an object with the 'prop' property of type string or boolean.
	 * (See Plausible's documentation for dashboard filtering by custom property details.)
	 * @defaultValue `Object`
	 */
	export let pageviewprops: { prop: string | boolean } | boolean = false;

	const setPageviewProps: Action<HTMLElement> | boolean = (node) => {
		if (!pageviewprops) return;
		Object.entries(pageviewprops).map((prop) => {
			if (prop[1] === false) return false;
			node.setAttribute(`event-${prop[0]}`, `${prop[1]}`);
		});
	};

	$: api = `${apiHost}/api/event`;
	$: src = [
		`${apiHost}/js/script`,
		compat ? 'compat' : undefined,
		fileDownloads ? 'file-downloads' : undefined,
		hash ? 'hash' : undefined,
		local ? 'local' : undefined,
		outboundLinks ? 'outbound-links' : undefined,
		pageviewprops ? 'pageview-props' : undefined,
		'js'
	]
		.filter(Boolean)
		.join('.');
</script>

<svelte:head>
	{#if enabled}
		<script
			data-api={api}
			data-domain={domain.toString()}
			defer
			{src}
			use:setPageviewProps
		></script>
		<script>
			window.plausible =
				window.plausible ||
				function () {
					(window.plausible.q = window.plausible.q || []).push(arguments);
				};
		</script>
	{/if}
</svelte:head>
