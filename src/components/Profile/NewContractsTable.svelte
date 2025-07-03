<script lang="ts">
  import axios, { AxiosError } from "axios";
  import { PUBLIC_BACKEND_URL } from "$env/static/public";
  import { user as userStore, type Contract, user } from "stores/user";
  import { Jellyfish } from "svelte-loading-spinners";
  import i18next from "../../lib/i18n";
  import { writable } from "svelte/store";

  const t = writable<(k: string) => string>((k) => i18next.t(k) as string);
  i18next.on("languageChanged", () =>
    t.set((k) => i18next.t(k) as string)
  );

  let contracts: Contract[] = [];
  let scrollTarget: HTMLDivElement;
  let errorMsg = "";
  let contractValue = "";
  let isLoading = false;
  let successMsg = "";
  $: contracts = $userStore.user?.userprofile?.showing_contracts || [];
  let selectedContract: Contract | null = null;

  const selectContract = (contract: Contract) => {
    selectedContract = contract;
    window.scrollTo({ top: scrollTarget.offsetTop, behavior: "smooth" });
  };

  const addContract = async () => {
    if (!selectedContract) return;
    try {
      isLoading = true;
      errorMsg = "";
      await user.refreshToken();
      const formData = new FormData();
      formData.append("selected_contract", selectedContract.id.toString());
      formData.append("offered_rate", contractValue.toString());
      await axios(`${PUBLIC_BACKEND_URL}/user/contracts/new/`, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": window.location.origin,
          Authorization: `Bearer ${$userStore.accessToken}`
        },
        data: formData
      });
      successMsg = $t("contractTable.successAdded");
      await user.getUser();
    } catch (e: AxiosError | unknown) {
      if (axios.isAxiosError(e)) {
        const { response } = e;
        const errMsg =
          response?.data?.non_field_errors?.[0] || $t("commonEr.serverError");
        errorMsg = errMsg;
      } else {
        errorMsg = $t("commonEr.serverError");
      }
    } finally {
      isLoading = false;
    }
  };

  // Рассчитываем сообщение о прибыли
  $: profitMessage = (() => {
    if (!selectedContract) return "";
    const deposit = Number(contractValue);
    if (!deposit || isNaN(deposit)) return "";

    if (deposit < selectedContract.min_money) {
      return $t("contractTable.tooSmall");
    }

    if (deposit > selectedContract.max_money) {
      return $t("contractTable.tooLarge");
    }

    const percentPerDay = selectedContract.percent_for_day / 100;
    const term = selectedContract.term;
    const workingDaysFactor = 5 / 7;
    const profit = deposit + (deposit * percentPerDay * term * workingDaysFactor);
    return `${$t("contractTable.estimatedProfit")}: $${profit.toFixed(2)}`;
  })();

  // Рассчитываем цвет для сообщения
  $: profitColor = (() => {
    if (!selectedContract) return "";
    const deposit = Number(contractValue);
    if (!deposit || isNaN(deposit)) return "";
    if (deposit < selectedContract.min_money || deposit > selectedContract.max_money) {
      return "text-red-500";
    }
    return "text-green-600";
  })();
</script>

{#if contracts.length}
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 md:mt-12 max-w-4xl 2xl:max-w-6xl">
    {#each contracts as contract}
      <div class="rounded-2xl shadow-lg border border-base-300 bg-base-100 p-4 transition-transform hover:scale-105 hover:shadow-xl">
        <h2 class="text-lg font-bold text-primary mb-2">{contract.name}</h2>
        <div class="space-y-1 text-sm">
          <div class="flex justify-between">
            <span class="text-gray-500">{$t('contractTable.min')}:</span>
            <span class="font-semibold text-success">${contract.min_money}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">{$t('contractTable.max')}:</span>
            <span class="font-semibold text-success">${contract.max_money}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">{$t('contractTable.percent')}:</span>
            <span class="font-semibold text-accent">{contract.percent_for_day} %</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">{$t('contractTable.term')}:</span>
            <span class="font-semibold">{contract.term} d.</span>
          </div>
        </div>
        <button
          class="btn btn-outline btn-primary btn-sm md:btn-md w-full mt-4 hover:bg-primary hover:text-base-100"
          on:click={() => selectContract(contract)}
        >
          {$t('contractTable.choose')}
        </button>
      </div>
    {/each}
  </div>
{/if}

<div bind:this={scrollTarget}></div>

{#if selectedContract}
  <div class="p-4 bg-base-100 max-w-4xl 2xl:max-w-6xl rounded mt-6">
    <h3 class="text-xl">
      {$t('contractTable.selected')}: <b>{selectedContract.name}</b>
    </h3>

    <div class="flex gap-2 mt-4 items-end">
      <input
        bind:value={contractValue}
        class="input input-bordered w-full max-w-sm"
        placeholder={$t('contractTable.amountPlaceholder')}
        type="number"
        min={selectedContract.min_money}
        max={selectedContract.max_money}
      />

      <button class="btn btn-primary w-auto" on:click={addContract} disabled={isLoading}>
        {#if isLoading}
          <Jellyfish size="35" color="#0000FF" />
        {:else}
          {$t('contractTable.deposit')}
        {/if}
      </button>
    </div>

    <div class="text-sm mt-1 {profitColor}">
      {profitMessage}
    </div>

    {#if errorMsg}
      <div class="text-error flex items-center mt-2">{errorMsg}</div>
    {/if}
    {#if successMsg}
      <div class="text-info flex items-center mt-2">{successMsg}</div>
    {/if}
  </div>
{/if}
