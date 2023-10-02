<script lang="ts">
  import { user as userStore } from "stores/user";
  import { getContext } from "svelte";
  const formatDate = (date: string | Date) => {
    let newDate: String | Date = new Date(date);
    newDate = newDate.toLocaleDateString('ru-RU');
    return newDate;
  };
  
  const status = [{
    name: 'На рассмотрении',
    class: 'badge-outline badge-warning'
  }, {
    name: 'Успех',
    class: ''
  }, {
    name: 'Отклонено',
    class: 'badge-error'
  }]

  const type = [{
    name: 'Пополнение баланса',
    class: 'badge-outline badge-info'
  }, {
    name: 'Вывод со счета',
    class: 'badge-outline'
  }, {
    name: 'Процент от контракта',
    class: 'badge-outline badge-info'
  }, {
    name: 'Бонус от администрации',
    class: 'badge-outline badge-warning'
  }, {
    name: 'Открытие контракта',
    class: 'badge-outline badge-success'
  }, {
    name: 'Закрытие контракта',
    class: 'badge-outline badge-info'
  }, {
    name: 'Реферальный бонус',
    class: 'badge-outline badge-success'
  }]
  const intervalIdCashflow = getContext('intervalIdCashflow') as number;
  const getNextCashflow = () => {
    clearInterval(intervalIdCashflow);
    userStore.getNextCashflow();
  }

</script>
<div class="overflow-x-auto max-w-4xl 2xl:max-w-6xl mt-12">
  {#key $userStore.operations}
  <table class="table w-full">
    <!-- head -->
    <thead class="text-neutral-content">
      <tr>
        <th class="bg-neutral text-xs">Тип</th>
        <th class="bg-neutral text-xs md:text-md">Статус</th>
        <th class="bg-neutral text-xs md:text-md text-right">Начисление</th>
        <th class="bg-neutral text-xs md:text-md text-right">Текущий баланс</th>
        <th class="bg-neutral text-xs md:text-md text-right">Дата</th>
        <th class="bg-neutral text-xs md:text-md text-left">Дополнительно</th>
      </tr>
    </thead>
    {#if $userStore.operations.length}
    <tbody>
      {#each $userStore.operations as operation}
      <tr>
        <td class="sticky left-0">
          <div class={`badge ${type[operation.operation_type].class}`}>
            {type[operation.operation_type].name}
          </div>
        </td>
        <td>
          <div class={`badge ${status[operation.status].class}`}>
            {status[operation.status].name}
          </div>
        </td>
        <td class="text-right">{operation.amount}$</td>
        <td class="text-right"><span class="font-medium">${operation.current_balance}</span></td>
        <td class="text-right">{formatDate(operation.operation_date)}</td>
        <td class="text-left">{operation.reason ? operation.reason : '-'}</td>
      </tr>
      {/each}
    </tbody>
    {/if}
    {#if $userStore.operations.length === 0}
    <tbody>
      <tr>
        <td colspan="6" class="text-center">Нет истории операций</td>
      </tr>
    {/if}
  </table>
  {/key}
</div>
{#if $userStore.next_cashflow}
  <button class="btn btn-outline mt-4" disabled={$userStore.isLoading} on:click={() => getNextCashflow()}>Загрузить больше</button>
{/if}
