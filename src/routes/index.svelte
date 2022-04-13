<script>
  import { pa } from '$lib/store'

  const { login } = pa;
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<button on:click={e => login('click', 'blop')}>Login</button>