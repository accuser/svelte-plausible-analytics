# svelte-plausible-analytics

Add Plausible Analytics to a SvelteKit app and track analytics and custom events.

*Important* - requires a [Plausible Analytics](https://plausible.io/) account.
All events require custom goals to be configured in the Plausible Analytics dashboard.

## Install the package

```bash
npm i --save-dev @accuser/svelte-plausible-analytics
```

## Examples

### Add Plausible Analytics to the root layout to track page views.

```svelte
<script>
  import { PlausibleAnalytics } from '@accuser/svelte-plausible-analytics';
</script>

<PlausibleAnalytics />

<slot />
```

### Add custom properties to page views:

```svelte
<script>
  import { page } from "$app/stores";
  import { PlausibleAnalytics } from '@accuser/svelte-plausible-analytics';

  $: ({ id: route } = $page?.route); // beware duplicate plausible calls
</script>

  <PlausibleAnalytics
      enabled={true}
      pageviewProps={{
        route,
        willNotBeIncluded: false,
        message: `a template literal containing a ${dynamicValue}`,
        testingFilter: "test-some-scenario",
        "hyphenated-property": "filter value",
      }}
  />

<slot />
```

Set custom properties in the `pageviewProps` Svelte prop on the `<PlausibleAnalytics />` component. *Beware hydration race conditions and take note when `<PlausibleAnalytics />` is mounted. Especially with SSG.*

The Plausible-required `event-` prefix can be omitted. Eg. `<PlausibleAnalytics pageviewProps={{"my-fancy-prop": "a value"}} />` becomes `<script src="https://plausible.io/js/script.pageview-props.js" event-my-fancy-prop"="a value"></script>`.

*Note*: as per the [Plausible documentation](https://plausible.io/docs/custom-props/introduction#limits), up to 30 custom properties can be included alongside a pageview by adding multiple attributes. There is also a 300/2000 character limit on each property `key` and `value`, respectively.

### Track analytics events:

```svelte
<script>
  import { pa } from '@accuser/svelte-plausible-analytics';

  const { login } = pa;
</script>

<button on:click={login('Button')}>Click to login!</button>
```

### Track custom events:

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
