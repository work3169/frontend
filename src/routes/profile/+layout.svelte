<script lang="ts">
  import Drawer from "components/Profile/Drawer.svelte";
  import { onDestroy, setContext } from "svelte";
  import { user } from 'stores/user';

  const intervalIdUser = setInterval(() => {
    user.getUser();
  }, 5000);

  const intervalIdCashflow = setInterval(() => {
    user.getCashflow();
  }, 5000);
  setContext('intervalIdCashflow', intervalIdCashflow);

  onDestroy(() => {
    clearInterval(intervalIdUser);
    clearInterval(intervalIdCashflow);
  });
</script>

<div class="flex items-center justify-center h-screen py-5">
  <div class="drawer drawer-mobile flex  justify-center h-full   ">
    <div class="drawer-side ">
      <Drawer />
    </div>
    <div class="drawer-content  relative  ">
      <div class=" rounded-3xl shadow-lg w-full max-w-3xl h-full "
      >
        <slot />
      </div>
    </div>
  </div>
</div>

<style>
  :global(body) {
    background-image: url('/bgtextures/ProfileBgSvg.svg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    margin: 0;
    height: 100vh;
  }

  .rounded-3xl {
    border-radius: 1.5rem;
  }

  .shadow-lg {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
  }
</style>
