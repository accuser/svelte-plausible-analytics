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
		 * Automatically track file downloads.
		 * (Requires manual goal configuration on Plausible.)
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
		 * Enable automatic tracking of outbound links.
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
		apiHost = 'https://plausible.io',
		compat = false,
		domain = typeof window !== 'undefined' ? window.location.hostname : undefined,
		fileDownloads = false,
		hashMode = hash,
		trackLocalhost = local,
		trackOutboundLinks = outboundLinks
	}: Props = $props();

	let api = $derived(`${apiHost}/api/event`);
	let src = $derived(
		[
			`${apiHost}/js/script`,
			compat ? 'compat' : undefined,
			fileDownloads ? 'file-downloads' : undefined,
			hashMode ? 'hash' : undefined,
			trackLocalhost ? 'local' : undefined,
			trackOutboundLinks ? 'outbound-links' : undefined,
			'js'
		]
			.filter(Boolean)
			.join('.')
	);

	$effect(() => {
		events.forEach(({ eventName, options, eventData }) => {
			window.plausible(eventName, options, eventData);
		});

		events.length = 0;
	});
</script>

<svelte:head>
	{#if domain && enabled}
		<script data-api={api} data-domain={domain} defer {src}></script>
		<script>
			window.plausible ||= function () {
				(window.plausible.q ||= []).push(arguments);
			};
		</script>
	{/if}
</svelte:head>
