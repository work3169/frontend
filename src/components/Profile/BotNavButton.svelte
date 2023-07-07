<script lang="ts">
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  export let href:string = "#";
  export let icon:string = "bar-chart-alt-2";
  export let text:string = "Title";
  // export let active:boolean = false;
  let active = false;
  const updateLink = () => {
    if (browser) active = window.location.pathname === href;
  }
  onMount(() => {
    updateLink();
  });
  $: if ($page) updateLink();
</script>

<a class:active href={href}>
  <box-icon name={icon} class="fill-current"></box-icon>
  <span class="btm-nav-label">{text}</span>
</a>