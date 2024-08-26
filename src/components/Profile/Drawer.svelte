<script lang="ts">
  import DrawerButton from "components/Profile/DrawerButton.svelte";
  import BotNavButton from "./BotNavButton.svelte";
  import { user as userStore } from "stores/user";
</script>

<div class="drawer-side">
  <label for="my-drawer-2" class="drawer-overlay"></label> 
  <ul class="menu p-4 w-72 bg-base-100">
    <div class="mt-4 mb-1 ml-4">
      <div class="avatar placeholder">
        <div class="bg-neutral-focus text-neutral-content rounded-full w-10">
          <span class="text">{$userStore.user?.username.charAt(0).toUpperCase() || '' || ''}</span>
        </div>
      </div>
      <div class="inline-block ml-2">
        {$userStore.user?.username || ''}
      </div>
    </div>
    <hr class="my-5" />
    <DrawerButton text="Контракты" href="/profile/contracts" />
    <DrawerButton icon="history" text="История баланса" href="/profile/balance" />
    <DrawerButton icon="wallet-alt" text="Внести средства" href="/profile/balance/replenish" />
    <DrawerButton icon="money-withdraw" text="Вывести средства" href="/profile/balance/withdraw" />
    <DrawerButton icon="group" text="Реферальная система" href="/profile/referrals" />
    <DrawerButton icon="user" text="Профиль" href="/profile/account" />
    <DrawerButton icon="home-alt-2" text="На главную" href="/" />
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click={userStore.logout}>
      <DrawerButton icon="log-out-circle" text="Выход" href="#"  />
    </div>
  </ul>
</div>

<div class="btm-nav lg:hidden">

  <a href="/">
    <img src="/favicon.png" alt="logo" class="w-[20px] h-[20px]" />
    <span class="btm-nav-label">Главная</span>
  </a>
  <BotNavButton text="Контракты" href="/profile/contracts" />
  <BotNavButton icon="transfer-alt" text="Баланс" href="/profile/balance" />
  <BotNavButton icon="user" text="Профиль" href="/profile/account" />
</div>