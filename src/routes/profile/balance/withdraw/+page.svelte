<script lang="ts">
  import { PUBLIC_BACKEND_URL } from "$env/static/public";
  import { user, user as userStore } from "stores/user";
  import HeaderContainer from "components/Profile/HeaderContainer.svelte";
  import { Jellyfish } from "svelte-loading-spinners";
  import Balance from "components/Profile/Balance.svelte";
  import { browser } from "$app/environment";
  import axios, { AxiosError } from "axios";

  /* ---------- i18n ---------- */
  import i18next from "../../../../lib/i18n";
  import { writable } from "svelte/store";
  const t = writable<(k: string, o?: any) => string>((k, o) => i18next.t(k, o) as string);
  i18next.on("languageChanged", () => t.set((k, o) => i18next.t(k, o) as string));

  if (browser) userStore.getCashflow();

  let wallets: Array<any> = [];
  let walletInput = "";
  let walletType = "";
  let selectedWallet = "";
  let amount = "";
  let isLoadingWalletAdd = false;
  let walletAddError = "";
  let walletAddSuccess = "";
  let isLoadingWithdrawing = false;
  let withdrawingSuccess = "";
  let withdrawingError = "";

  let showAddWallet = false;

  const getWallets = async () => {
    const accessToken = await userStore.getAccessToken();
    const res = await axios(`${PUBLIC_BACKEND_URL}/api/v1/user/get_wallets/`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": window.location.origin,
        Authorization: `Bearer ${accessToken}`
      }
    });
    wallets = res.data;
  };

  const addWallet = async () => {
    try {
      walletAddError = "";
      walletAddSuccess = "";
      isLoadingWalletAdd = true;
      if (!walletInput.trim()) throw new Error($t("withdrawPage.invalidWalletFormat"));
      if (!walletType.trim()) throw new Error($t("withdrawPage.invalidWalletType"));
      const accessToken = await userStore.getAccessToken();
      const data = new FormData();
      data.append("wallet_number", walletInput.trim());
      data.append("type", walletType);
      await axios(`${PUBLIC_BACKEND_URL}/api/v1/user/add_wallet/`, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": window.location.origin,
          Authorization: `Bearer ${accessToken}`
        },
        data
      });
      await getWallets();
      walletAddSuccess = $t("withdrawPage.walletAdded");
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        walletAddError =
          e.response?.data?.non_field_errors?.[0] || $t("withdrawPage.serverError");
      } else {
        walletAddError = (e as Error).message || $t("withdrawPage.serverError");
      }
    } finally {
      isLoadingWalletAdd = false;
    }
  };

  const withdraw = async () => {
    try {
      isLoadingWithdrawing = true;
      withdrawingError = "";
      withdrawingSuccess = "";
      const data = new FormData();
      data.append("wallet_number", selectedWallet);
      data.append("amount", amount);
      const accessToken = await userStore.getAccessToken();
      await axios(`${PUBLIC_BACKEND_URL}/api/v1/user/withdraw_money/`, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": window.location.origin,
          Authorization: `Bearer ${accessToken}`
        },
        data
      });

      await user.getUser();
      withdrawingSuccess = $t("withdrawPage.withdrawalSubmitted");
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        withdrawingError =
          e.response?.data?.non_field_errors?.[0] || $t("withdrawPage.serverError");
      } else {
        withdrawingError = (e as Error).message || $t("withdrawPage.serverError");
      }
    } finally {
      isLoadingWithdrawing = false;
    }
  };

  if (browser) getWallets();
</script>

<HeaderContainer>
  <h1 class="font-medium text-2xl">{$t("withdrawPage.title")}</h1>
  <div class="flex gap-4">
    <a class="btn btn-outline" href="/profile/balance">{$t("withdrawPage.back")}</a>
  </div>
</HeaderContainer>

<Balance />

<div class="bg-base-100 overflow-x-auto max-w-4xl 2xl:max-w-6xl mt-8 min-h-[240px] rounded-xl p-4 shadow-xl">
  {#if !wallets.length && !$userStore.isLoading}
    <p class="text-warning text-medium text-lg">
      {$t("withdrawPage.noWallets")}
    </p>
  {/if}

  <select class="select select-bordered w-full max-w-md mt-2" bind:value={selectedWallet}>
    <option disabled selected value="">{ $t("withdrawPage.selectWalletPrompt") }</option>
    {#each wallets as wallet}
      <option value={wallet.id}>{wallet.wallet_number}</option>
    {/each}
  </select>

  <div class="flex flex-wrap items-center gap-4 gap-y-2 mt-3">
    <input
      placeholder={$t("withdrawPage.amountPlaceholder")}
      class="input input-bordered input-secondary w-full max-w-sm"
      bind:value={amount}
    />
    <button
      class="btn btn-primary w-full max-w-[200px] bg-[#4E8D8D]"
      on:click={withdraw}
      disabled={isLoadingWithdrawing}
    >
      {#if isLoadingWithdrawing}
        <Jellyfish size="35" color="#68cca1" />
      {:else}
        {$t("withdrawPage.withdraw")}
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

  <button
    class="btn w-full max-w-[200px] mt-12 bg-[#4E8D8D]"
    class:hidden={showAddWallet}
    on:click={() => (showAddWallet = true)}
  >
    {$t("withdrawPage.addWallet")}
  </button>

  {#if showAddWallet}
    <h3 class="text-2xl mt-12 text-bold">{$t("withdrawPage.manageWallets")}</h3>
    <h3 class="mt-2">{$t("withdrawPage.enterWalletNumber")}</h3>

    <div class="flex flex-wrap items-center gap-4 gap-y-2 mt-4">
      <select class="select select-bordered w-full max-w-md" bind:value={walletType}>
        <option disabled selected value="">
          {$t("withdrawPage.selectWalletType")}
        </option>
        <option value="0">{$t("withdrawPage.walletTypes.creditCard")}</option>
        <option value="1">{$t("withdrawPage.walletTypes.trc20")}</option>
        <option value="2">{$t("withdrawPage.walletTypes.bitcoin")}</option>
        <option value="3">{$t("withdrawPage.walletTypes.ethereum")}</option>
      </select>

      <input
        bind:value={walletInput}
        placeholder={$t("withdrawPage.enterWalletPlaceholder")}
        class="input input-bordered input-secondary w-full max-w-sm"
      />

      <button
        class="btn btn-primary w-full max-w-[200px]"
        on:click={addWallet}
        disabled={isLoadingWalletAdd}
      >
        {#if isLoadingWalletAdd}
          <Jellyfish size="35" color="#68cca1" />
        {:else}
          {$t("withdrawPage.addWallet")}
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
