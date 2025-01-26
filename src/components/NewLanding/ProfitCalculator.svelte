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
      let contract = contractsList.find((contract: any) => contract.id === contractId);
      let contractPercent = contract.percent_for_day;
      let contractTerm = contract.term;
      let initialValue = +inputVal;
      initialValue += initialValue * (contractPercent / 100) * contractTerm;
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

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 15px;
    background: #ffffff;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    position: relative;
  }

  .header {
    text-align: center;
    margin-bottom: 20px;
    color: #2c3e50;
    font-size: 1.8rem;
    font-weight: bold;
  }

  .table-container {
    margin-top: 20px;
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 1rem;
  }

  th,
  td {
    text-align: left;
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }

  th {
    background: #4e8d8d;
    color: white;
    text-transform: uppercase;
    font-weight: bold;
  }

  .form-section {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 20px;
    justify-content: center;
  }

  .select {
    padding: 10px;
    border: 2px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
    width: 200px;
  }

  .select:focus {
    border-color: #4e8d8d;
    outline: none;
  }

  .result-box {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 20px;
    background: #f7f9fa;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  .result-box .info {
    color: #2c3e50;
    font-size: 1.2rem;
  }

  .result-box .profit {
    color: #16a085;
    font-size: 1.4rem;
    font-weight: bold;
  }

  .result-box .error {
    color: #e74c3c;
    font-size: 1rem;
    margin-top: 10px;
  }
</style>
<div class="h-[80vh] flex items-center justify-center"> 
<div class="container">
  <div class="header">Калькулятор прибыли</div>

  <!-- Таблица контрактов -->
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Название</th>
          <th>Процент</th>
          <th>Длительность</th>
          <th>Мин. взнос</th>
          <th>Макс. взнос</th>
        </tr>
      </thead>
      <tbody>
        {#if $contracts.length === 0}
          <tr>
            <td colspan="5" class="text-center">Загрузка...</td>
          </tr>
        {/if}
        {#each contractsList as contract}
          <tr>
            <td>{contract.name}</td>
            <td>{contract.percent_for_day}%</td>
            <td>{contract.term} д.</td>
            <td>${contract.min_money}</td>
            <td>${contract.max_money}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <!-- Форма -->
  <div class="form-section">
    <select class="select" bind:value={contractId}>
      <option disabled selected value={-1}>Выберите контракт</option>
      {#each contractsList as contract}
        <option value={contract.id}>{contract.name}</option>
      {/each}
    </select>

    {#key contractId}
      <Input type="text" bind:value={inputVal} name="investment" placeholder="0" label="Вклад" />
    {/key}

    <Input disabled={true} type="text" bind:value={output} name="output" placeholder="0" label="Прибыль" />
  </div>

  <!-- Результаты -->
  <div class="result-box">
    {#if +output - +inputVal > 0}
      <div class="profit">+{(+output - +inputVal).toFixed(1)}$</div>
    {/if}
    <div class="info">{info}</div>
  </div>
</div>
</div>
