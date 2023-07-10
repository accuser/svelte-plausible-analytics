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

Add custom properties to page views:

```svelte
<script>
  import { PlausibleAnalytics } from '@accuser/svelte-plausible-analytics';
</script>

<PlausibleAnalytics pageviewprops={{"fancy-hyphenated-prop": "fancy value string", somekindofboolean: false}} />

<slot />
```

*Note*: as per the Plausible documentation, up to 30 custom properties can be included alongside a pageview by adding multiple attributes.

Set custom properties in the `pageviewprops` Svelte prop on the `<PlausibleAnalytics />` component. 

The Plausible-required `event-` prefix can be omitted. Eg. `<PlausibleAnalytics pageviewprops={{"my-fancy-prop": "a value"}} />` becomes `<script src="https://plausible.io/js/script.pageview-props.js" event-my-fancy-prop"="a value"></script>`.

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

## Contributors

Matthew Gibbons - [@accuser](https://github.com/accuser)

Jeffrey Palmer - [@JeffreyPalmer](https://github.com/JeffreyPalmer)

Dan Grebb - [@dgrebb](https://github.com/dgrebb)
