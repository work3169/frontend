<script lang="ts">
  import { browser } from "$app/environment";
  import { contracts } from "stores/contracts";
  import { user } from "stores/user";
  import { Jellyfish } from "svelte-loading-spinners";
  import { onMount } from "svelte";
  import axios from "axios";
  import { PUBLIC_BACKEND_URL as BACKEND_URL } from "$env/static/public";

  import i18next from "../../lib/i18n";
  import { writable } from "svelte/store";

  const t = writable((key: string) => i18next.t(key));
  i18next.on("languageChanged", () =>
    t.set((key: string) => i18next.t(key))
  );

  let isLoading = true;
  let selectedContract: any = null;
  let modalType: "reinvest" | "support" | "stop" | null = null;
  let actionLoading = false;
  let errorMsg = "";
  let successMsg = "";

  onMount(async () => {
    try {
      isLoading = true;
      if (browser) {
        await contracts.getContracts();
      }
    } catch (e) {
      console.error(e);
    } finally {
      isLoading = false;
    }
  });

  const returnDate = (date: string | Date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("ru-RU");
  };

  const money = (v: unknown) => {
    const n = Number(v);
    if (Number.isNaN(n)) return "-";
    return `$${n.toFixed(1)}`;
  };

  async function confirmReinvest(contractId: number) {
    try {
      actionLoading = true;
      errorMsg = "";
      successMsg = "";

      const accessToken = await user.getAccessToken();

      const formData = new FormData();
      formData.append("contract_id", contractId.toString());
      formData.append("reinvest_type", "1");

      await axios(`${BACKEND_URL}/user/contracts/reinvest/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: formData,
      });

      successMsg = "Реинвестирование запущено!";
      await contracts.getContracts();
    } catch (err: any) {
      errorMsg = err.response?.data?.detail || "Ошибка запуска реинвеста";
      console.error("Backend error:", err.response?.data);
    } finally {
      actionLoading = false;
      modalType = null;
    }
  }
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 max-w-6xl">
  {#if $contracts.length === 0}
    {#if isLoading}
      <div class="col-span-full flex justify-center">
        <Jellyfish size="60" color="blue" />
      </div>
    {:else}
      <div class="col-span-full text-center text-gray-500">
        {$t("contractsTable.noContracts")}
      </div>
    {/if}
  {/if}

  {#each $contracts as contract}
    <div
      class="rounded-2xl shadow-lg border border-base-300 bg-base-100 flex flex-col justify-between transition hover:shadow-xl h-auto"
      style={contract.active_reinvestment
        ? "background: linear-gradient(135deg, #e0ffe8, #b3f2c9);" 
        : ""}
    >
      <div class="p-4">
        <h2 class="text-lg font-bold text-primary mb-2">{contract.contract.name}</h2>

        <div class="space-y-1 text-sm">
          <div class="flex justify-between">
            <span class="text-gray-500">{$t("contractsTable.currentProfit")}:</span>
            <span class="font-semibold text-success">
              {money(contract.current_profit || 0)}
            </span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">{$t("contractsTable.duration")}:</span>
            <span class="font-semibold">{contract.days_from_start} d.</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">{$t("contractsTable.deposit")}:</span>
            <span class="font-semibold">{money(contract.deposit_amount)}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">{$t("contractsTable.creationDate")}:</span>
            <span class="font-semibold">{returnDate(contract.creation_date)}</span>
          </div>

          {#if contract.active_reinvestment}
            <div class="mt-3 border-t pt-2 space-y-1">
              <div class="flex justify-between">
                <span class="text-gray-500">{$t("contractsTable.reinvestProfit")}:</span>
                <span class="font-semibold">
                  {money(contract.current_reinvests_session_profit || 0)}
                </span>
              </div>
              <!-- <div class="flex justify-between">
                <span class="text-gray-500">{$t("contractsTable.reinvestTotal")}:</span>
                <span class="font-semibold">
                  {money(contract.total_reinvests_profit || 0)}
                </span>
              </div> -->
              <!-- <div class="flex justify-between">
                <span class="text-gray-500">{$t("contractsTable.reinvestFinished")}:</span>
                <span class="font-semibold">
                  {contract.finished_reinvestments ?? 0}
                </span>
              </div> -->
            </div>
          {/if}
        </div>

        <div class="mt-4">
          <div class="flex justify-between mb-1">
            <span class="text-gray-500">{$t("contractsTable.progress")}</span>
            <span class="font-semibold">{contract.complete_percent}%</span>
          </div>
          <div class="w-full bg-green-100 rounded-full h-2.5">
            <div
              class="bg-green-500 h-2.5 rounded-full transition-all duration-500"
              style="width: {Math.max(0, Math.min(100, Number(contract.complete_percent) || 0))}%"
            ></div>
          </div>
        </div>
      </div>

      {#if contract.active_reinvestment}
        <button
          class="w-full border-none text-white font-semibold 
                 bg-gradient-to-r from-emerald-300 to-emerald-400 
                 hover:from-emerald-400 hover:to-emerald-500 
                 rounded-t-none rounded-b-2xl py-3 transition-colors"
          on:click={() => {
            selectedContract = contract;
            modalType = "stop";
          }}
        >
          {$t("contractsTable.modalStopTitle")}
        </button>
      {:else if contract.can_reinvest}
        <button
          class="w-full border-none text-white font-semibold 
                 bg-gradient-to-r from-green-400 to-green-500 
                 hover:from-green-500 hover:to-green-600 
                 rounded-t-none rounded-b-2xl py-3 transition-colors"
          on:click={() => {
            selectedContract = contract;
            modalType = "reinvest";
          }}
        >
          {$t("contractsTable.modalReinvestTitle")}
        </button>
      {:else}
        <button
          class="w-full border-none text-white font-semibold 
                 bg-gradient-to-r from-red-400 to-red-500 
                 hover:from-red-500 hover:to-red-600 
                 rounded-t-none rounded-b-2xl py-3 transition-colors"
          on:click={() => {
            selectedContract = contract;
            modalType = "support";
          }}
        >
          {$t("contractsTable.modalSupportTitle")}
        </button>
      {/if}
    </div>
  {/each}
</div>

<!-- Модалки -->
{#if modalType === "reinvest" && selectedContract}
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full relative">
      <h2 class="text-xl font-bold mb-4 text-center">{$t("contractsTable.modalReinvestTitle")}</h2>
      <p class="mb-6 text-center text-gray-600">
        {$t("contractsTable.modalReinvestText")} <b>{selectedContract.contract.name}</b>.
      </p>
      <div class="flex justify-center gap-4">
        <button
          class="px-4 py-2 rounded-full border border-gray-300 bg-gray-100 hover:bg-gray-200 transition"
          on:click={() => (modalType = null)}
        >
          {$t("contractsTable.modalReinvestCancel")}
        </button>
        <button
          class="px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition"
          disabled={actionLoading}
          on:click={() => confirmReinvest(selectedContract.id)}
        >
          {actionLoading ? "..." : $t("contractsTable.modalReinvestConfirm")}
        </button>
      </div>
    </div>
  </div>
{/if}

{#if modalType === "support" && selectedContract}
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full relative">
      <h2 class="text-xl font-bold mb-4 text-center">{$t("contractsTable.modalSupportTitle")}</h2>
      <p class="mb-6 text-center text-gray-600">
        {$t("contractsTable.modalSupportText")} 
      </p>
      <div class="flex justify-center">
        <button
          class="px-6 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
          on:click={() => (modalType = null)}
        >
          {$t("contractsTable.modalOk")}
        </button>
      </div>
    </div>
  </div>
{/if}

{#if modalType === "stop" && selectedContract}
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full relative">
      <h2 class="text-xl font-bold mb-4 text-center">{$t("contractsTable.modalStopTitle")}</h2>
      <p class="mb-6 text-center text-gray-600">
        {$t("contractsTable.modalStopText")} 
      </p>
      <div class="flex justify-center gap-4">
        <button
          class="px-4 py-2 rounded-full border border-gray-300 bg-gray-100 hover:bg-gray-200 transition"
          on:click={() => (modalType = null)}
        >
          {$t("contractsTable.modalReinvestCancel")}
        </button>
        <!-- <button
          class="px-4 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition"
          disabled={actionLoading}
          on:click={() => (modalType = null)}
        >
          {actionLoading ? "..." : $t("contractsTable.modalStopConfirm")}
        </button> -->
      </div>
    </div>
  </div>
{/if}

{#if errorMsg}
  <div class="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow">
    {errorMsg}
  </div>
{/if}
{#if successMsg}
  <div class="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow">
    {successMsg}
  </div>
{/if}
