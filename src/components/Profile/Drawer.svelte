<script lang="ts">
  /* ───── imports ───── */
  import DrawerButton from 'components/Profile/DrawerButton.svelte';
  import BotNavButton  from './BotNavButton.svelte';
  import { user as userStore } from 'stores/user';

  import i18next from '../../lib/i18n';         // путь поправьте при необходимости
  import { writable, get } from 'svelte/store';

  /* ───── переключение языка ───── */
  const lang = writable<string>(i18next.language || 'ru');
  i18next.on('languageChanged', (lng: string) => lang.set(lng));
  function toggleLang() {
    const next = get(lang) === 'ru' ? 'en' : 'ru';
    i18next.changeLanguage(next);
  }

  /* ───── перевод ───── */
  const t = writable((key: string) => i18next.t(key));
  i18next.on('languageChanged', () =>
    t.set((key: string) => i18next.t(key))
  );
</script>

<div class="drawer-side">
  <label for="my-drawer-2" class="drawer-overlay"></label>
  <ul class="menu p-4 w-72 bg-[#BCE6E6]">
    <!-- аватар + ник -->
    <div class="mt-8 mb-6 ml-3 flex items-center">
      <div class="avatar placeholder">
        <div class="bg-neutral-focus text-neutral-content rounded-full w-10 h-10 flex items-center justify-center">
          <span class="text-lg">
            {$userStore.user?.username.charAt(0).toUpperCase() ?? ''}
          </span>
        </div>
      </div>
      <span class="ml-2">
        {$userStore.user?.username ?? ''}
      </span>
    </div>

    <!-- пункты меню с i18n -->
    <DrawerButton
      icon="objects-horizontal-right"
      text={$t('drawer.contracts')}
      href="/profile/contracts"
    />
    <DrawerButton
      icon="network-chart"
      text={$t('drawer.partneredContracts')}
      href="/profile/contracts/partnered"
    />

    <br />

    <DrawerButton
      icon="history"
      text={$t('drawer.balanceHistory')}
      href="/profile/balance"
    />
    <DrawerButton
      icon="wallet-alt"
      text={$t('drawer.deposit')}
      href="/profile/balance/replenish"
    />
    <DrawerButton
      icon="money-withdraw"
      text={$t('drawer.withdraw')}
      href="/profile/balance/withdraw"
    />

    <br />

    <DrawerButton
      icon="group"
      text={$t('drawer.referrals')}
      href="/profile/referrals"
    />
    <DrawerButton
      icon="user"
      text={$t('drawer.account')}
      href="/profile/account"
    />

    <br />

    <DrawerButton
      icon="home-alt-2"
      text={$t('drawer.home')}
      href="/"
    />

    <!-- кнопка переключения языка (не трогаем) -->
    <li class="mt-4 ml-3">
      <button
      
        class="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-200 transition"
        on:click={toggleLang}
      >
        {#if $lang === 'ru'}
        <box-icon name="flag" class="fill-current"></box-icon> RU Смена языка 
        {:else}
        <box-icon name="flag" class="fill-current"></box-icon> GB Language change
        {/if}
      </button>
    </li>

    <!-- выход -->
    <div on:click={userStore.logout} class="mt-4">
      <DrawerButton
        icon="log-out-circle"
        text={$t('drawer.logout')}
        href="#"
      />
    </div>
  </ul>
</div>

<div class="btm-nav lg:hidden">
  <a href="/" class:active={window.location.pathname === '/'}>
  <img src="/favicon.png" alt="logo" class="w-5 h-5 align-middle" />
  <span class="btm-nav-label truncate">{$t('drawer.home')}</span>
</a>

  <BotNavButton
    icon="network-chart"
    text={$t('drawer.contracts')}
    href="/profile/contracts"
  />
  <BotNavButton
    icon="history"
    text={$t('drawer.balanceHistory')}
    href="/profile/balance"
  />
  <BotNavButton
    icon="user"
    text={$t('drawer.account')}
    href="/profile/account"
  />

  <a href="#" on:click|preventDefault={toggleLang}>
    <box-icon name="flag" class="fill-current"></box-icon>
    <span class="btm-nav-label ">{$lang === 'ru' ? 'RU' : 'EN'}</span>
  </a>
</div>


