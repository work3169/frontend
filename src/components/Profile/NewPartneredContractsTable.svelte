<script lang="ts">
  import axios, { AxiosError } from "axios";
  import { PUBLIC_BACKEND_URL } from "$env/static/public";
  import { user as userStore, type Contract, user } from "stores/user";
  import type { PartneredContract } from "stores/user";
  import { Jellyfish } from "svelte-loading-spinners";

  /* ---------- i18n ---------- */
  import i18next from "../../lib/i18n";          /* поправьте путь, если нужно */
  import { writable } from "svelte/store";
  const t = writable<(k: string) => string>((k) => i18next.t(k) as string);
  i18next.on("languageChanged", () =>
    t.set((k) => i18next.t(k) as string)
  );

  let contracts: PartneredContract[] = [];
  let scrollTarget: HTMLDivElement;
  let errorMsg = "";
  let contractValue = "";
  let isLoading = false;
  let successMsg = "";

  $: contracts = $userStore.user?.userprofile?.showing_common_contracts || [];

  let selectedContract: PartneredContract | null = null;

  let usernames: string[] = [];
  let newUsername = "";

  function addUsername() {
    if (newUsername.trim()) {
      usernames = [...usernames, newUsername.trim()];
      newUsername = "";
    }
  }
  function deleteUsername(index: number) {
    usernames = usernames.filter((_, i) => i !== index);
  }
  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === "Enter") addUsername();
  }

  const selectContract = (contract: PartneredContract) => {
    selectedContract = contract;
    window.scrollTo({ top: scrollTarget.offsetTop, behavior: "smooth" });
  };

  const addContract = async () => {
    errorMsg = "";
    if (!selectedContract || !usernames.length || !contractValue) {
      errorMsg = $t("partneredTable.needFill");
      return;
    }
    try {
      isLoading = true;
      await user.refreshToken();

      const formData = new FormData();
      formData.append("template", selectedContract.id.toString());
      formData.append("initial_contribution", contractValue.toString());
      usernames.forEach((u) => formData.append("invitees", u));

      await axios(`${PUBLIC_BACKEND_URL}/api/v1/contracts/common_contracts/create_common_contract/`, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": window.location.origin,
          Authorization: `Bearer ${$userStore.accessToken}`
        },
        data: formData
      });
      successMsg = $t("partneredTable.successCreated");
      await user.getUser();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        errorMsg =
          e.response?.data?.non_field_errors?.[0] || $t("commonEr.serverError");
      } else {
        errorMsg = $t("commonEr.serverError");
      }
    } finally {
      isLoading = false;
    }
  };
</script>

{#if contracts.length}
  <div class="overflow-x-auto max-w-4xl 2xl:max-w-6xl mt-6 md:mt-12">
    <table class="table table-compact w-full">
      <thead class="text-neutral-content">
        <tr>
          <th class="bg-neutral"></th>
          <th class="bg-neutral text-xs md:text-md">{$t('partneredTable.name')}</th>
          <th class="bg-neutral text-xs md:text-md text-right">{$t('partneredTable.min')}</th>
          <th class="bg-neutral text-xs md:text-md text-right">{$t('partneredTable.max')}</th>
          <th class="bg-neutral text-xs md:text-md text-right">{$t('partneredTable.percent')}</th>
          <th class="bg-neutral text-xs md:text-md text-right">{$t('partneredTable.term')}</th>
          <th class="bg-neutral text-xs md:text-md text-right">{$t('partneredTable.maxPartners')}</th>
        </tr>
      </thead>
      <tbody>
        {#each contracts as contract}
          <tr>
            <th>
              <button
                class="btn btn-xs md:btn-sm btn-outline btn-primary"
                on:click={() => selectContract(contract)}
              >
                {$t('partneredTable.choose')}
              </button>
            </th>
            <td>{contract.name}</td>
            <td class="text-right md:px-4">${contract.min_amount}</td>
            <td class="text-right md:px-4">${contract.max_amount}</td>
            <td class="text-right">{contract.dividend_percentage} %</td>
            <td class="text-right">{contract.period} д.</td>
            <td class="text-right">{contract.max_participants}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/if}

<div bind:this={scrollTarget}></div>

{#if selectedContract}
  <div class="p-4 bg-base-100 max-w-4xl 2xl:max-w-6xl rounded-xl mt-6">
    <h3 class="text-xl">
      {$t('partneredTable.selected')}: <b>{selectedContract.name}</b>
    </h3>

    <div class="max-w-lg mt-5">
      <div class="mt-5 mb-0.5">{$t('partneredTable.initialContribution')}</div>
      <input
        bind:value={contractValue}
        class="input input-bordered w-full max-w-sm"
        placeholder={$t('partneredTable.amountPlaceholder')}
      />

      <div class="mt-5 mb-0.5">{$t('partneredTable.partners')}</div>
      <div class="flex gap-2 mb-2">
        <input
          type="text"
          bind:value={newUsername}
          on:keypress={handleKeyPress}
          placeholder={$t('partneredTable.partnerPlaceholder')}
          class="input input-bordered w-full max-w-sm"
        />
        <button
          on:click={addUsername}
          class="btn btn-secondary btn-outline"
          disabled={!newUsername.trim()}
        >
          {$t('partneredTable.add')}
        </button>
      </div>

      <div class="space-y-2 mb-4">
        {#if usernames.length === 0}
          <p class="text-gray-400 text-center pb-4 max-w-sm">
            {$t('partneredTable.partnersEmpty')}
          </p>
        {/if}

        {#each usernames as username, index (index)}
          <div class="flex items-center justify-between input input-bordered max-w-sm gap-2">
            <span class="font-medium">{username}</span>
            <button
              on:click={() => deleteUsername(index)}
              class="p-1 text-error hover:bg-red-50 rounded-full"
            >
              <!-- svg крестика -->
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        {/each}
      </div>

      <button class="btn btn-primary w-full max-w-sm" on:click={addContract} disabled={isLoading}>
        {#if isLoading}
          <Jellyfish size="35" color="#0000FF" />
        {:else}
          {$t('partneredTable.deposit')}
        {/if}
      </button>

      {#if errorMsg}
        <div class="text-error flex items-center mt-2">{errorMsg}</div>
      {/if}
      {#if successMsg}
        <div class="text-info flex items-center mt-2">{successMsg}</div>
      {/if}
    </div>
  </div>
{:else}
  <div class="mt-12">
    {$t('partneredTable.noContracts')}
  </div>
{/if}
