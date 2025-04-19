<script lang="ts">
  import { user as userStore } from "stores/user";
  import CashFlowTable from "components/Profile/CashFlowTable.svelte";
  import Balance from "components/Profile/Balance.svelte";
  import HeaderContainer from "components/Profile/HeaderContainer.svelte";
  import { browser } from "$app/environment";

  // i18n
  import i18next from '../../../lib/i18n';
  import { writable } from 'svelte/store';
  const t = writable((key: string) => i18next.t(key));
  i18next.on('languageChanged', () =>
    t.set((key: string) => i18next.t(key))
  );

  if (browser) userStore.getCashflow();
</script>

<HeaderContainer>
  <h1 class="font-medium text-2xl">{$t('balancePage.title')}</h1>
  <div class="flex flex-wrap gap-4">
    <a
      class="btn btn-primary bg-[#4E8D8D]"
      href="/profile/balance/replenish"
    >
      {$t('balancePage.replenish')}
    </a>
    <a
      class="btn btn-primary bg-[#4E8D8D]"
      href="/profile/balance/withdraw"
    >
      {$t('balancePage.withdraw')}
    </a>
  </div>
</HeaderContainer>

<Balance />
<CashFlowTable />
