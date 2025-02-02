<script lang="ts">
  import { browser } from "$app/environment";
  import { contracts } from "stores/contracts";
  import { user, user as userStore } from "stores/user";
  import Input from "components/Auth/Input.svelte";
  import { onDestroy, onMount } from "svelte";

  let inputVal: string = "";
  let output = "";
  let contractId = -1;
  let unsubscribe: () => void;
  let info = "";
  let contractsList: Array<any> = [];

  onMount(() => {
    if (browser) {
      if (!$userStore.accessToken) {
        contracts.getPublicContracts();
      }
      unsubscribe = contracts.subscribe(() => {
        contractsList = $contracts;
      });
    }
  });

  $: {
    contractsList = $user.accessToken
      ? $userStore.user?.userprofile.showing_contracts!
      : $contracts.filter((contract: any) => contract.show_to_all === true);
  }

  $: {
    inputVal = inputVal.replace(/\D/g, '');
    inputVal = Math.max(0, Number(inputVal)).toString();
  }

  $: {
    if (contractId != -1 && (+inputVal >= 0)) {
      const contract = contractsList.find((contract: any) => contract.id === contractId);
      if (contract) {
        const contractPercent = contract.percent_for_day;
        const contractTerm = contract.term;
        const initialValue = +inputVal;
        const finalValue = initialValue + initialValue * (contractPercent / 100) * contractTerm;
        output = finalValue.toFixed(2).toString();
      }
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

<style>
  .fade-enter {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  .fade-enter-active {
    opacity: 1;
    transform: translateY(0);
  }

  .custom-gradient {
    background: linear-gradient(to right, #4E8D8D, #6DA0A0, #8EB3B3, #AFC6C6);
  }

  .custom-shadow {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  .hover-scale {
    transition: transform 0.3s ease;
  }

  .hover-scale:hover {
    transform: scale(1.02);
  }
</style>

<div class="min-h-screen  flex items-center justify-center">
  <div class="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full custom-shadow">
    <!-- Заголовок -->
    <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">Калькулятор прибыли</h1>

    <!-- Таблица контрактов -->
    <div class="overflow-x-auto ">
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-200">
            <th class="p-3 text-left font-semibold">Название</th>
            <th class="p-3 text-left font-semibold">Процент</th>
            <th class="p-3 text-left font-semibold">Длительность</th>
            <th class="p-3 text-left font-semibold">Мин. взнос</th>
            <th class="p-3 text-left font-semibold">Макс. взнос</th>
          </tr>
        </thead>
        <tbody>
          {#if contractsList.length === 0}
            <tr>
              <td colspan="5" class="text-center py-4">Загрузка...</td>
            </tr>
          {:else}
            {#each contractsList as contract}
              <tr class="border-b hover:bg-gray-100 transition">
                <td class="p-3">{contract.name}</td>
                <td class="p-3">{contract.percent_for_day}%</td>
                <td class="p-3">{contract.term} д.</td>
                <td class="p-3">${contract.min_money}</td>
                <td class="p-3">${contract.max_money}</td>
              </tr>
            {/each}
          {/if}
        </tbody>
      </table>
    </div>

    <!-- Форма -->
    <div class="space-y-4">
      <select
        bind:value={contractId}
        class="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 hover-scale"
      >
        <option disabled selected value={-1}>Выберите контракт</option>
        {#each contractsList as contract}
          <option value={contract.id}>{contract.name}</option>
        {/each}
      </select>

      <Input
        type="text"
        bind:value={inputVal}
        name="investment"
        placeholder="Введите сумму"
        label="Сумма вклада"
        
      />

      <div class="text-right">
        <button
          disabled={!output || +output <= 0}
          class="bg-[#4E8D8D] text-white px-4 py-2 rounded hover:bg-[#6DA0A0] transition disabled:bg-gray-400 hover-scale"
        >
          Рассчитать
        </button>
      </div>
    </div>

    <!-- Результаты -->
    {#if output && +output > 0}
      <div class="mt-6 space-y-4 fade-enter fade-enter-active">
        <div class="text-green-600 text-xl font-bold text-center">
          Ваша прибыль: <span class="text-2xl">${(+output - +inputVal).toFixed(2)}</span>
        </div>
        <div class="text-gray-600 text-center">
          Итоговая сумма: <span class="font-bold">${output}</span>
        </div>
      </div>
    {/if}

    <!-- Сообщение об ошибке -->
    {#if info}
      <div class="mt-4 text-red-500 text-center">{info}</div>
    {/if}
  </div>
</div>