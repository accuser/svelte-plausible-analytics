<script context="module" lang="ts">
	interface PlausibleTracker {
		(event: string, options?: any): void;
	}

	interface PlausibleWindow extends Window {
		plausible: PlausibleTracker;
	}

	/**
	 * Type definition for properties that can be sent as part of a page view event to Plausible.
	 * These properties can be of type boolean, number, or string.
	 */
	export type PageviewProp = boolean | number | string;

	/**
	 * Type definition for pageview properties.
	 * Can be either a boolean or an array containing a record with keys of type number or string,
	 * and values of type boolean, number, or string.
	 */
	export type PageviewProps = { [key: number | string]: PageviewProp } | boolean;

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
	 * Holds the pageview properties to be used in the application.
	 * The properties can be used for filtering in the Plausible dashboard. The pageview properties
	 * are subject to certain limitations:
	 * - Limited to 30 total custom properties per event.
	 * - Limited to 300 characters per property name.
	 * - Limited to 2000 characters per property value.
	 *
	 * @link https://plausible.io/docs/guided-tour#filtering for dashboard filtering by custom property details.
	 * @defaultValue `false` Indicates no custom properties by default.
	 */
	export let pageviewProps: PageviewProps = false;

	/**
	 * Function references for property validation guards.
	 * These are dynamically imported during development for validation purposes.
	 */
	let isCustomPropsLimit: Function, isCustomPropEntryLimit: Function;

	/**
	 * Sets the pageview properties as attributes on a given HTML script element.
	 * This function is responsible for validating and applying the custom properties
	 * defined in `pageviewProps` to the provided HTML element.
	 *
	 * @param {HTMLScriptElement} node - The HTML script element on which to set the attributes.
	 */
	const setPageviewProps: (node: HTMLScriptElement) => void = async (node) => {
		// Early exit if pageviewProps is not defined or falsy.
		if (!pageviewProps) return;

		// In development mode, load validation guards dynamically and validate custom property limits.
		if (dev) {
			const guards = await import('./guards.js');
			({ isCustomPropsLimit, isCustomPropEntryLimit } = guards);

			// Validate the total number of custom properties against Plausible's limit.
			isCustomPropsLimit(pageviewProps);
		}

		// Iterate over each key-value pair in pageviewProps to set them as attributes.
		Object.entries(pageviewProps).forEach(([key, value]) => {
			// In development mode, validate the length of property names and values.
			if (dev) {
				isCustomPropEntryLimit(300, key);
				isCustomPropEntryLimit(2000, value);
			}

			// Set the attribute on the script node. Format: 'event-key'
			node.setAttribute(`event-${key}`, String(value));
		});
	};

	$: api = `${apiHost}/api/event`;
	$: plausibleSrc = [
		`${apiHost}/js/script`,
		compat ? 'compat' : undefined,
		fileDownloads ? 'file-downloads' : undefined,
		hash ? 'hash' : undefined,
		local ? 'local' : undefined,
		outboundLinks ? 'outbound-links' : undefined,
		pageviewProps ? 'pageview-props' : undefined,
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
			src={plausibleSrc}
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
