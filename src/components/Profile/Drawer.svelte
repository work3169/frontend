<script lang="ts">
  import DrawerButton from "components/Profile/DrawerButton.svelte";
  import BotNavButton from "./BotNavButton.svelte";
  import { user as userStore } from "stores/user";
</script>

<div class="drawer-side">
  <label for="my-drawer-2" class="drawer-overlay"></label> 
  <ul class="menu p-4 w-72 bg-#BCE6E6">
    <div class="mt-8 mb-6 ml-3">
      <div class="avatar placeholder">
        <div class="bg-neutral-focus text-neutral-content rounded-full w-10">
          <span class="text-lg">{$userStore.user?.username.charAt(0).toUpperCase() || '' || ''}</span>
        </div>
      </div>
      <div class="inline-block ml-2">
        {$userStore.user?.username || ''}
      </div>
    </div>
    <DrawerButton text="Контракты" href="/profile/contracts" />
    <DrawerButton icon="network-chart" text="Партнерские контракты" href="/profile/contracts/partnered" />
    <br />
    <DrawerButton icon="history" text="История баланса" href="/profile/balance" />
    <DrawerButton icon="wallet-alt" text="Внести средства" href="/profile/balance/replenish" />
    <DrawerButton icon="money-withdraw" text="Вывести средства" href="/profile/balance/withdraw" />
    <br />
    <DrawerButton icon="group" text="Реферальная система" href="/profile/referrals" />
    <DrawerButton icon="user" text="Профиль" href="/profile/account" />
    <br />
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