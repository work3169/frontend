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

<div class="overflow-x-auto max-w-4xl 2xl:max-w-6xl mt-12">
  <table class="table w-full">
    <!-- head -->
    <thead class="text-neutral-content">
      <tr>
        <th class="bg-[#295858] text-sm">{$t("contractsTable.contract")}</th>
        <th class="bg-[#295858] text-sm">{$t("contractsTable.currentProfit")}</th>
        <th class="bg-[#295858] text-sm">{$t("contractsTable.duration")}</th>
        <th class="bg-[#295858] text-sm">{$t("contractsTable.deposit")}</th>
        <th class="bg-[#295858] text-sm">{$t("contractsTable.progress")}</th>
        <th class="bg-[#295858] text-sm">{$t("contractsTable.creationDate")}</th>
      </tr>
    </thead>

    {#if $contracts.length === 0}
      {#if isLoading}
        <tbody>
          <tr>
            <td colspan="3" />
            <td colspan="1" class="text-center">
              <div class="m-auto">
                <Jellyfish size="60" color="blue" />
              </div>
            </td>
            <td colspan="2" />
          </tr>
        </tbody>
      {:else}
        <tbody>
          <tr>
            <td colspan="6" class="text-center">
              {$t("contractsTable.noContracts")}
            </td>
          </tr>
        </tbody>
      {/if}
    {/if}

    {#if $contracts.length > 0}
      <tbody>
        {#each $contracts as contract}
          <tr>
            <td class="sticky left-0">{contract.contract.name}</td>
            <td>
              {#if contract.current_profit}
                <span class="text-success font-bold">
                  +${contract.current_profit}
                </span>
              {:else}
                0
              {/if}
            </td>
            <td>{contract.days_from_start} д.</td>
            <td>${contract.deposit_amount}</td>
            <td>{contract.complete_percent}%</td>
            <td>{returnDate(contract.creation_date)}</td>
          </tr>
        {/each}
      </tbody>
    {/if}
  </table>
</div>
