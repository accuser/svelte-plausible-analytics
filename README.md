# svelte-plausible-analytics

Add Plausible Analytics to a SvelteKit app and track analytics and custom events.

## Example

Add Plausible Analytics to the root layout:

```svelte
<script>
	import { PlausibleAnalytics } from '@accuser/svelte-plausible-analytics';
</script>

<PlausibleAnalytics />

<slot />
```

Track analytics events:

```svelte
<script>
  import { pa } from '@accuser/svelte-plausible-analytics';

  const { login } = pa;
</script>

<button on:click={login('Button')}>Click to login!</button>
```

Track custom events:

```svelte
<script>
  import { pa } from '@accuser/svelte-plausible-analytics';

  const { addEvent } = pa;
</script>

<button on:click={addEvent('click')}>Click me!</button>
```