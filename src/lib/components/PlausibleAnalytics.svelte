<script lang="ts">
	import events from '$lib/events/events.svelte.js';
	import { type PlausibleOptions } from 'plausible-tracker';

	type Props = PlausibleOptions & {
		/**
		 * Compatibility mode for tracking users on Internet Explorer.
		 *
		 * @defaultValue `false`
		 */
		compat?: boolean;

		/**
		 * Enable analytics.
		 *
		 * @defaultValue `true` in production mode, `false` otherwise.
		 */
		enabled?: boolean;

		/**
		 * Enable tracking of custom properties.
		 * @see {@link https://plausible.io/docs/custom-props/introduction}
		 *
		 * @defaultValue `undefined`
		 */
		event?: { [key: string]: string };

		/**
		 * Automatically track file downloads.
		 * @see {@link https://plausible.io/docs/file-downloads-tracking}
		 *
		 * @defaultValue `false`
		 */
		fileDownloads?: boolean;

		/**
		 * @deprecated Use `hashMode` instead.
		 */
		hash?: boolean;

		/**
		 * @deprecated Use `trackLocalhost` instead.
		 */
		local?: boolean;

		/**
		 * @deprecated Use `trackOutboundLinks` instead.
		 */
		outboundLinks?: boolean;

		/**
		 * Enable ecommerce revenue and attribution tracking.
		 * @see{@link https://plausible.io/docs/ecommerce-revenue-tracking}
		 *
		 * @defaultValue `false`
		 */
		revenue?: boolean;

		/**
		 * Enable tracking of custom events.
		 * @see {@link https://plausible.io/docs/custom-event-goals}
		 *
		 * @defaultValue `false`
		 */
		trackCustomEvents?: boolean;

		/**
		 * Enable automatic tracking of 404 error pages.
		 * @see {@link https://plausible.io/docs/error-pages-tracking-404}
		 *
		 * @defaultValue `false`
		 */
		trackErrorPages?: boolean;

		/**
		 * Enable automatic tracking of outbound links.
		 * @see {@link https://plausible.io/docs/outbound-link-click-tracking}
		 *
		 * @defaultValue `false`
		 */
		trackOutboundLinks?: boolean;
	};

	const { MODE } = import.meta.env;

	let {
		enabled = MODE === 'production',
		hash = false,
		local = enabled && MODE === 'development',
		outboundLinks = false,
		apiHost,
		compat = false,
		domain = typeof window !== 'undefined' ? window.location.hostname : undefined,
		event,
		fileDownloads = false,
		hashMode = hash,
		revenue = false,
		trackErrorPages = false,
		trackCustomEvents = false,
		trackLocalhost = local,
		trackOutboundLinks = outboundLinks
	}: Props = $props();

	let api = $derived(apiHost ? `${apiHost}/api/event` : undefined);
	let src = $derived(
		[
			`${apiHost ?? 'https://plausible.io'}/js/script`,
			compat ? 'compat' : undefined,
			event ? 'pageview-props' : undefined,
			fileDownloads ? 'file-downloads' : undefined,
			hashMode ? 'hash' : undefined,
			revenue ? 'revenue' : undefined,
			trackCustomEvents ? 'tagged-events' : undefined,
			trackLocalhost ? 'local' : undefined,
			trackOutboundLinks ? 'outbound-links' : undefined,
			trackCustomEvents ? 'tagged-events' : undefined,
			'js'
		]
			.filter(Boolean)
			.join('.')
	);

	let pageviewProps = $derived.by(() =>
		event
			? Object.entries(event).reduce(
					(acc, [key, value]) => Object.assign(acc, { [`event-${key}`]: value }),
					{} as { [key: string]: string }
				)
			: undefined
	);

	$effect(() => {
		events.forEach(({ eventName, options, eventData }) => {
			window.plausible(eventName, options, eventData);
		});

		events.length = 0;
	});
</script>

<svelte:head>
	{#if enabled}
		{#if domain}
			<script defer data-api={api} data-domain={domain} {...pageviewProps} {src}></script>
		{/if}
		{#if trackErrorPages}
			<script>
				window.plausible =
					window.plausible ||
					function () {
						(window.plausible.q = window.plausible.q || []).push(arguments);
					};
			</script>
		{/if}
	{/if}
</svelte:head>
