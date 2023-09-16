<script lang="ts">
  import { PUBLIC_BACKEND_URL } from "$env/static/public";
  import { user as userStore } from "stores/user";
  import HeaderContainer from "components/Profile/HeaderContainer.svelte";
  import Balance from "components/Profile/Balance.svelte";
  import axios from "axios";
	import { browser } from "$app/environment";
  if (browser) userStore.getCashflow();

  let value: String = "";
  let error = ""
  let wallet = ""
  const replenish = async () => {
    error = '';
    let numValue = parseFloat(value.trim());
    if (isNaN(numValue) || !isFinite(numValue)) {
      error = "Неверный формат суммы";
      return;
    };
    const accessToken = await userStore.getAccessToken();
    const formData = new FormData();
    formData.append("amount", numValue.toString());
    const res = await axios(`${PUBLIC_BACKEND_URL}/api/v1/user/user_balance_supplement/`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": window.location.origin,
        "Authorization": `Bearer ${accessToken}`,
      },
      data: formData,
    });
    wallet = res?.data?.wallet;
  };
</script>

<HeaderContainer>
  <h1 class="font-medium text-2xl">Пополнить баланс</h1>
  <div class="flex gap-4">
    <a class="btn btn-outline" href="/profile/balance">Назад</a>
  </div>
</HeaderContainer>
<Balance />
<div class="bg-base-100 overflow-x-auto max-w-xl mt-8 min-h-[40px] rounded-xl p-3 md:p-4 shadow-xl">
  <div class="flex flex-wrap w-full gap-2">
    <input bind:value={value} class="input input-bordered w-full max-w-sm " placeholder="Сумма" />
    <button on:click={replenish} class="btn btn-primary min-w-[150px]">Пополнить</button>
  </div>
  {#if error}
    <div class="text-error mt-1">
      {error}
    </div>
  {/if}
  {#if wallet}
    <div class="mt-1 text-lg">
      Пожалуйста, пополните баланс на сумму $<b>{value}</b> на кошелек <b class="text-info text-xl">{wallet}</b>
    </div>
  {/if}
</div>
