<script lang="ts">
  import { PUBLIC_BACKEND_URL } from "$env/static/public";
  import { user, user as userStore } from "stores/user";
  import HeaderContainer from "components/Profile/HeaderContainer.svelte";
  import { Jellyfish } from "svelte-loading-spinners";
  import Balance from "components/Profile/Balance.svelte";
	import { browser } from "$app/environment";
	import axios, { Axios, AxiosError } from "axios";

  if (browser) userStore.getCashflow();

  let wallets: Array<any> = [];
  let walletInput = '';
  let walletType = '';
  let selectedWallet = '';
  let amount = '';
  let isLoadingWalletAdd = false;
  let walletAddError = '';
  let walletAddSuccess = '';
  let isLoadingWithdrawing = false;
  let withdrawingSuccess = '';
  let withdrawingError = '';

  let showAddWallet = false;

  const getWallets = async () => {
    const accessToken = await userStore.getAccessToken();
    const res = await axios(`${PUBLIC_BACKEND_URL}/api/v1/user/get_wallets/`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": window.location.origin,
        "Authorization": `Bearer ${accessToken}`,
      },
    });
    wallets = res.data;
  };

  const addWallet = async () => {
    try {
      walletAddError = '';
      walletAddSuccess = '';
      isLoadingWalletAdd = true;
      if (!walletInput.trim()) throw new Error('Неверный формат номера кошелька');
      if (!walletType.trim()) throw new Error('Неверный тип кошелька');
      const accessToken = await userStore.getAccessToken();
      let data = new FormData();
      walletInput = walletInput.trim();
      let wallet_number_type = walletType;
      data.append("wallet_number", walletInput);
      data.append("type", wallet_number_type.toString());
      await axios(`${PUBLIC_BACKEND_URL}/api/v1/user/add_wallet/`, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": window.location.origin,
          "Authorization": `Bearer ${accessToken}`,
        },
        data,
      });
      await getWallets();
      walletAddSuccess = 'Кошелек успешно добавлен. Пожалуйста, выберите его в списке выше';
    } catch (e: AxiosError | any) {
      if (axios.isAxiosError(e)) {
        walletAddError = e.response?.data?.non_field_errors?.[0] || 'Произошла ошибка. Попробуйте позже или обратитесь в поддержку';
      } else {
        walletAddError = e.message || 'Произошла ошибка. Попробуйте позже или обратитесь в поддержку';
      }
    } finally {
      isLoadingWalletAdd = false;
    }
  }

  const withdraw = async () => {
    try {
      isLoadingWithdrawing = true;
      withdrawingError = '';
      withdrawingSuccess = '';
      let data = new FormData();
      data.append("wallet_number", selectedWallet.toString());
      data.append("amount", amount.toString());
      const accessToken = await userStore.getAccessToken();
      await axios(`${PUBLIC_BACKEND_URL}/api/v1/user/withdraw_money/`, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": window.location.origin,
          "Authorization": `Bearer ${accessToken}`,
        },
        data,
      });

      await user.getUser();
      withdrawingSuccess = 'Ваша заяка на вывод средств успешно отправлена. Пожалуйста, ожидайте ответа от администрации';
    } catch (e: AxiosError | any) {
      if (axios.isAxiosError(e)) {
        withdrawingError = e.response?.data?.non_field_errors?.[0] || 'Произошла ошибка. Попробуйте позже или обратитесь в поддержку';
      } else {
        withdrawingError = e.message || 'Произошла ошибка. Попробуйте позже или обратитесь в поддержку';
      }
    } finally {
      isLoadingWithdrawing = false;
    }
  }

  if (browser) getWallets();
</script>

<HeaderContainer>
  <h1 class="font-medium text-2xl">Вывести средства</h1>
  <div class="flex gap-4">
    <a class="btn btn-outline" href="/profile/balance">Назад</a>
  </div>
</HeaderContainer>

<Balance />
<div class="bg-base-100 overflow-x-auto max-w-4xl 2xl:max-w-6xl mt-8 min-h-[240px] rounded p-4 shadow-xl">
  {#if !wallets.length && !$userStore.isLoading}
    <p class="text-warning text-medium text-lg">
      У вас нет кошельков для вывода средств. Пожалуйста, добавьте кошелек.
    </p>
  {/if}
  <select class="select select-bordered w-full max-w-md mt-2" bind:value={selectedWallet}>
    <option disabled selected value="">Выберите кошелек</option>
    {#each wallets as wallet}
      <option value={wallet.id}>{wallet.wallet_number}</option>
    {/each}
  </select>

  <div class="flex flex-wrap items-center gap-4 gap-y-2 mt-3">
    <input placeholder="Введите сумму" class="input input-bordered input-secondary w-full max-w-sm" bind:value={amount} />
    <button class="btn btn-primary w-full max-w-[200px]" on:click={withdraw} disabled={isLoadingWithdrawing}>
      {#if isLoadingWithdrawing}
        <Jellyfish size="35" color="#68cca1" />
      {:else}
        Вывести
      {/if}
    </button>
    {#if withdrawingError}
      <div class="text-error mt-1">
        {withdrawingError}
      </div>
    {/if}
    {#if withdrawingSuccess}
      <div class="text-success mt-1">
        {withdrawingSuccess}
      </div>
    {/if}
  </div>

  <button class="btn w-full max-w-[200px] mt-12" class:hidden={showAddWallet} on:click={() => (showAddWallet = true)} >
    Добавить кошелек
  </button>
  {#if showAddWallet}
  <h3 class="text-2xl mt-12 text-bold">Управление кошельками</h3>
  <h3 class="mt-2">Введите номер кредитной карты или криптокошелька</h3>
  <div class="flex flex-wrap items-center gap-4 gap-y-2 mt-4">
    <select class="select select-bordered w-full max-w-md" bind:value={walletType}>
      <option disabled selected value="">Выберите тип кошелька</option>
      <option value="0">Credit Card</option>
      <option value="1">TRC20 USDT</option>
      <option value="2">Bitcoin</option>
      <option value="3">Ethereum</option>
    </select>
    <input  bind:value={walletInput}  placeholder="Введите номер" class="input input-bordered input-secondary w-full max-w-sm" />
    <button class="btn btn-primary w-full max-w-[200px]" on:click={addWallet} disabled={isLoadingWalletAdd}>
      {#if isLoadingWalletAdd}
        <Jellyfish size="35" color="#68cca1" />
      {:else}
        Добавить кошелек
      {/if}
    </button>
    {#if walletAddError}
      <div class="text-error mt-1">
        {walletAddError}
      </div>
    {/if}
    {#if walletAddSuccess}
      <div class="text-success mt-1">
        {walletAddSuccess}
      </div>
    {/if}
  </div>
  {/if}
</div>