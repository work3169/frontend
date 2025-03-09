<script lang="ts">
	import { browser } from "$app/environment";
  import { contracts } from "stores/contracts";
  import { Jellyfish } from "svelte-loading-spinners";
  // import type { Contract } from "stores/contracts";
	import { onMount } from "svelte";
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
        <th class="bg-neutral text-sm">Контракт</th>
        <th class="bg-neutral text-sm">Текущая прибыль</th>
        <th class="bg-neutral text-sm">Длительность</th>
        <th class="bg-neutral text-sm">Депозит</th>
        <th class="bg-neutral text-sm">Прогресс</th>
        <th class="bg-neutral text-sm">Дата создания</th>
      </tr>
    </thead>
    {#if $contracts.length === 0}
 
      {#if isLoading}
        <tbody>
          <tr>
            <td colspan="3" />
            <td colspan="1" class="text-center"><div class="m-auto"><Jellyfish size="60" color="blue" /></div></td>
            <td colspan="2" />
          </tr>
        </tbody>
      {:else}
      <tbody>
        <tr>
          <td colspan="6" class="text-center">У вас нет контрактов</td>
        </tr>
      </tbody>
      {/if}
    {/if}
    {#if $contracts.length > 0}
      <tbody>
    
        <!-- row 1 -->
          {#each $contracts as contract}
            <tr>
              <td class="sticky left-0">{contract.contract.name}</td>
              <td>
                {#if contract.current_profit}
                  <span class="text-success font-bold">+${contract.current_profit}</span>
                {/if}
                {#if !contract.current_profit}
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