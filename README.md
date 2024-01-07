# svelte-plausible-analytics

Add Plausible Analytics to a SvelteKit app to track analytics and custom events.

**Important:** `svelte-plausible-analytics` requires a [Plausible Analytics](https://plausible.io/) account or a [self-hosted](https://plausible.io/docs/self-hosting) Plausible instance.

## Installation

```shell
npm i --save-dev @accuser/svelte-plausible-analytics
```

## Usage

It is recommended to add your `<PlausibleAnalytics />` component to the root layout of your app. In most cases this will be `src/routes/+layout.svelte`.

```svelte
<script>
  import { PlausibleAnalytics } from '@accuser/svelte-plausible-analytics';
</script>

<PlausibleAnalytics />

<slot />
```

As Plausible only requires your domain during setup to function correctly, you can use `<PlausibleAnalytics />` without any further configuration. `svelte-plausible-analytics` automatically sets the `data-domain` attribute to your domain. You can change this behavior through its [props](#props).

### Props

You can see the full list of props on [GitHub](https://github.com/accuser/svelte-plausible-analytics/blob/main/src/lib/PlausibleAnalytics.svelte) or through IntelliSense in your IDE. In general, the props allow you to configure the [required script attributes](https://plausible.io/docs/plausible-script) and to enable [enhanced measurements](https://plausible.io/docs/script-extensions).

### Events

Goals and custom events allow you to track actions that you want your visitors to take on your site. With `svelte-plausible-analytics` you can track [custom event goals](https://plausible.io/docs/custom-event-goals). Import `pa` from `@accuser/svelte-plausible-analytics` to have access to the `addEvent` method and some other helper functions.

Here's an example on how you'd track a `login` event:

1. [Create a custom event goal](https://plausible.io/docs/custom-event-goals#3-create-a-custom-event-goal-in-your-plausible-account) in your dashboard with the name `login`
1. Import the `pa` namespace
    ```svelte
    <script>
      import { pa } from '@accuser/svelte-plausible-analytics';
    </script>
    
    <button>Login</button>
    ```
1. Use the `addEvent` method to track an event. The first argument is the event name (required), the second argument is optional and can be used to [attach custom properties](https://plausible.io/docs/custom-props/for-custom-events#2-using-the-manual-method).
    ```svelte
    <script>
      import { pa } from '@accuser/svelte-plausible-analytics';
    </script>
    
    <button on:click={pa.addEvent('login')}>Login</button>
    ```

For common events `@accuser/svelte-plausible-analytics` provides helper functions to enforce certain props. Feel free to only use `addEvent` if they don't fit your requirements. As an example, you can use the `login` method like so:

```svelte
<script>
  import { pa } from '@accuser/svelte-plausible-analytics';
</script>

<button on:click={pa.login('CTA')}>Login</button>
```

Behind the scenes this helper function sends the event with the name `login` and a custom property of `method: 'CTA'`. You can find all helper functions on [GitHub](https://github.com/accuser/svelte-plausible-analytics/blob/main/src/lib/store.ts) or through IntelliSense in your IDE.

**Important:** You need to create a custom event goal in your dashboard when using any of the event methods.

## Examples

Here are some further usage examples. If you have a snippet that you'd think might be helpful for others, please send them in through a pull request!

### 404 page

File: `src/routes/+error.svelte`

```svelte
<script>
	import { pa } from '@accuser/svelte-plausible-analytics';
	import { page } from '$app/stores';

	if ($page.status === 404) {
		pa.addEvent('404', {
			props: {
				path: $page.url.pathname,
			},
		})
	}
</script>
```

### Using a proxy

You can [proxy your script](https://plausible.io/docs/proxy/introduction) to deal with adblockers. You'll want to set the `apiHost` prop to your domain.

File: `src/routes/+layout.svelte`

```svelte
<script>
	import { PlausibleAnalytics } from '@accuser/svelte-plausible-analytics';
	import { page } from '$app/stores';
</script>

<PlausibleAnalytics apiHost={`${$page.url.protocol}//${$page.url.host}`} />
```

## Contributors

Matthew Gibbons - [@accuser](https://github.com/accuser)

Jeffrey Palmer - [@JeffreyPalmer](https://github.com/JeffreyPalmer)

Dan Grebb - [@dgrebb](https://github.com/dgrebb)
