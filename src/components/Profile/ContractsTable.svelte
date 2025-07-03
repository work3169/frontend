<script lang="ts">
  import { browser } from "$app/environment";
  import { contracts } from "stores/contracts";
  import { Jellyfish } from "svelte-loading-spinners";
  import { onMount } from "svelte";

  import i18next from "../../lib/i18n";
  import { writable } from "svelte/store";

  // Переводчик
  const t = writable((key: string) => i18next.t(key));
  i18next.on("languageChanged", () =>
    t.set((key: string) => i18next.t(key))
  );

  let isLoading = true;
  onMount(async () => {
    try {
      isLoading = true;
      if (browser) {
        await contracts.getContracts();
      }
    } catch (e) {
      console.log(e);
    } finally {
      isLoading = false;
    }
  });

  const returnDate = (date: string | Date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("ru-RU");
  };
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 max-w-4xl 2xl:max-w-6xl">
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
    <div class="rounded-2xl shadow-lg border border-base-300 bg-base-100 p-4 transition hover:shadow-xl flex flex-col justify-between">
      <div>
        <h2 class="text-lg font-bold text-primary mb-2">{contract.contract.name}</h2>
      
        <div class="space-y-1 text-sm">
          <div class="flex justify-between">
            <span class="text-gray-500">{$t("contractsTable.currentProfit")}:</span>
            <span class="font-semibold text-success">
              +${contract.current_profit || 0}
            </span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">{$t("contractsTable.duration")}:</span>
            <span class="font-semibold">{contract.days_from_start} д.</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">{$t("contractsTable.deposit")}:</span>
            <span class="font-semibold">${contract.deposit_amount}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">{$t("contractsTable.creationDate")}:</span>
            <span class="font-semibold">{returnDate(contract.creation_date)}</span>
          </div>
        </div>
      </div>

      <!-- Прогресс-бар внизу карточки -->
      <div class="mt-4">
        <div class="flex justify-between mb-1">
          <span class="text-gray-500">{$t("contractsTable.progress")}</span>
          <span class="font-semibold">{contract.complete_percent}%</span>
        </div>
        <div class="w-full bg-green-100 rounded-full h-2.5">
          <div
            class="bg-green-500 h-2.5 rounded-full transition-all duration-500"
            style="width: {contract.complete_percent}%"
          />
        </div>
      </div>
    </div>
  {/each}
</div>


