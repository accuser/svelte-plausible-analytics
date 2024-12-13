<script>
	import PlausibleAnalytics from '$lib/components/PlausibleAnalytics.svelte';

	let { children } = $props();
</script>

<PlausibleAnalytics enabled />

{@render children?.()}
