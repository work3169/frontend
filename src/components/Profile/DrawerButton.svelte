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
<li class:pl-1={!active} class:bordered={active} class:fill-base-200={active}>
  <a href={href}>
    <box-icon name={icon} class="fill-current"></box-icon>
    {text}
  </a>
</li>