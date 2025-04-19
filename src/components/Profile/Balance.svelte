<script lang="ts">
  import { user as userStore } from "stores/user";
  import { Jellyfish } from "svelte-loading-spinners";

  // i18n
  import i18next from '../../lib/i18n';
  import { writable } from 'svelte/store';
  const t = writable((key: string) => i18next.t(key));
  i18next.on('languageChanged', () =>
    t.set((key: string) => i18next.t(key))
  );
</script>

{#if $userStore.isLoading && !($userStore.user?.userprofile.account_balance === 0 || $userStore.user?.userprofile.account_balance)}
  <div class="stats shadow mt-4">
    <div class="stat">
      <Jellyfish size="60" color="blue" />
    </div>
  </div>
{/if}

{#if $userStore.user?.userprofile.account_balance === 0 || $userStore.user?.userprofile.account_balance}
  <div class="stats shadow mt-4">
    <div class="stat">
      <div class="stat-title">{$t('balanceStat.currentBalance')}</div>
      <div class="stat-value">
        ${$userStore.user?.userprofile.account_balance}
      </div>
    </div>
  </div>
{/if}
