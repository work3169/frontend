<script lang="ts">
  import '../app.css'
  import { browser } from '$app/environment';
  if (browser) {
    // @ts-ignore next line
    import('boxicons')
  }
</script>

<svelte:head>
	<title>GEEF</title>
</svelte:head>
<slot />

<style>
  :global(body) {
    height: 100vh;
  }
</style>