<script lang="ts">
  import Drawer from "components/Profile/Drawer.svelte";
  import { onDestroy, setContext } from "svelte";
  import { user } from 'stores/user';
  

  const intervalIdUser = setInterval(() => {
    user.getUser()
  }, 5000);

  const intervalIdCashflow = setInterval(() => {
    user.getCashflow()
  }, 5000);
  setContext('intervalIdCashflow', intervalIdCashflow);

  onDestroy(() => {
    clearInterval(intervalIdUser);
    clearInterval(intervalIdCashflow);
  });
</script>

<div class="drawer drawer-mobile bg-base-200">
  <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content self-start overflow-y-scroll h-inherit">
    <!-- Page content here -->
    <div class="bg-base-200 w-full p-4 mb-16 lg:mb-0 h-content md:p-10">
      <slot />
    </div>
  </div> 
  <Drawer />
</div>

<style>
  .h-inherit {
    height: inherit !important;
  }
</style>