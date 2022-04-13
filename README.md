# svelte-plausible-analytics

Add Plausible Analytics to a SvelteKit app and track analytics and custom events.

*Important* - requires a [Plausible Analytics](https://plausible.io/) account.
All events require custom goals to be configured in the Plausible Analytics dashboard.

## Install the package

```bash
npm i --save-dev @accuser/svelte-plausible-analytics
```

## Examples

Add Plausible Analytics to the root layout to track page views.

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
