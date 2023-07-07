<script lang="ts">
	import { browser } from "$app/environment";
  import { contracts } from "stores/contracts";
  import Input from "components/Auth/Input.svelte";
  // import type { Contract } from "stores/contracts";
	import { onDestroy, onMount } from "svelte";
  
  let inputVal: string = "";
  let output = "";
  let contractId = -1;
  let unsubscribe: () => void;
  let info = "";
  onMount(() => {
    if (browser) {
      contracts.getPublicContracts();
      unsubscribe = contracts.subscribe(() => {
        contractsList = $contracts;
      });
    }
  });
  const returnDate = (date: string | Date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("ru-RU");
  };
  let contractsList: Array<any> = [];
  $: contractsList = $contracts.filter((contract: any) => contract.show_to_all === true);
  $: {
    // Remove non-digit characters
    inputVal = inputVal.replace(/\D/g, '');

    // Convert the string to a number
    inputVal = Math.max(0, Number(inputVal)).toString();
  }
  $: {
    if (contractId != -1 && (+inputVal >= 0)) {
      let contractPercent = contractsList.find((contract: any) => contract.id === contractId).percent_for_day;
      let initialValue = +inputVal;
     
      initialValue += initialValue * contractPercent * 365 / 100;
      
      output = initialValue.toFixed(2).toString();
    }
    info = checkContractError();
  }
  
  const checkContractError = () => {
    if (contractId === -1) {
      return "Выберите контракт";
    }
    if (+inputVal <= 0) {
      return "Введите сумму";
    }
    const contract = contractsList.find((contract: any) => contract.id === contractId);
    if (+inputVal < +contract.min_money) {
      return `Минимальная сумма вклада ${contract.min_money}$`;
    }
    return "";
  };
</script>

<div class="overflow-x-auto mx-auto max-w-4xl 2xl:max-w-6xl mt-12">
  <table class="table w-full">
    <!-- head -->
    <thead class="text-neutral-content">
      <tr>
        <th class="bg-neutral text-sm">Название</th>
        <th class="bg-neutral text-sm">Процент</th>
        <th class="bg-neutral text-sm">Длительность</th>
        <th class="bg-neutral text-sm">Мин. взнос</th>
        <th class="bg-neutral text-sm">Макс. взнос</th>
      </tr>
    </thead>
    {#if $contracts.length === 0}
      <tbody>
        <tr>
          <td colspan="6" class="text-center">Загрузка...</td>
        </tr>
      </tbody>
    {/if}
    {#if $contracts.length > 0}
      <tbody>
    
        <!-- row 1 -->
          {#each contractsList as contract}
            <tr>
              <td class="sticky left-0">{contract.name}</td>
              <td>
                {contract.percent_for_day}%
              </td>
              <td>{contract.term} д.</td>
              <td>${contract.min_money}</td>
              <td>${contract.max_money}</td>
            </tr>
          {/each}
      </tbody>
    {/if}
  </table>
</div>
<div class="flex flex-wrap items-center gap-4 gap-y-2 mt-4 justify-center">
  <select class="select select-bordered w-[212px] mt-8" bind:value={contractId}>
    <option disabled selected value={-1}>Выберите контракт</option>
    {#each contractsList as contract}
      <option value={contract.id}>{contract.name}</option>
    {/each}
  </select>
  {#key contractId}
    <Input type="text" bind:value={inputVal} name="first_name" placeholder="0" label="Вклад" />
  {/key}
  <Input disabled={true} type="text" bind:value={output} name="output" placeholder="0" label="Прибыль" />

  <div class="flex flex-wrap items-center min-w-[212px] h-[84px] pt-[30px] text-success text-xl font-semibold">
    {#if +output - +inputVal > 0}
      <div class="px-4">
      +{(+output - +inputVal).toFixed(1)}$
      </div>
    {/if}
    <div class="text-info text-xl font-light px-4">
      {#if info}
        {info}
      {/if}
    </div>
  </div>
</div>
