<script lang="ts">
  import NavbarAuth from "components/Auth/NavbarAuth.svelte";
</script>

<NavbarAuth />
<slot />


<style>
  :global(body) {
    background: linear-gradient(to right, #4E8D8D, #6DA0A0, #8EB3B3, #AFC6C6);
    min-height: 100vh;        /* чтобы градиент закрывал всю страницу */
  }
</style>