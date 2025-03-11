<script lang="ts">
  import { user as userStore } from "stores/user";
  import CashFlowTable from "components/Profile/CashFlowTable.svelte";
  import Balance from "components/Profile/Balance.svelte";
  import HeaderContainer from "components/Profile/HeaderContainer.svelte";
	import { browser } from "$app/environment";
  if (browser) userStore.getCashflow();
</script>

<HeaderContainer>
  <h1 class="font-medium text-2xl">Управление балансом</h1>
  <div class="flex flex-wrap gap-4">
    <a class="btn btn-primary bg-[#4E8D8D]" href="/profile/balance/replenish">Внести средства</a>
    <a class="btn btn-primary bg-[#4E8D8D]" href="/profile/balance/withdraw">Вывести средства</a>
  </div>
</HeaderContainer>
<Balance />
<CashFlowTable />