<script lang="ts">
  import { user as userStore } from "stores/user";
  import { getContext } from "svelte";
  import i18next from '../../lib/i18n';
  import { writable, get } from 'svelte/store';

  // i18n store
  const t = writable((key: string) => i18next.t(key));
  i18next.on('languageChanged', () => t.set((key: string) => i18next.t(key)));

  // date formatter
  const formatDate = (date: string | Date) => {
    let newDate: Date = new Date(date);
    return newDate.toLocaleDateString('ru-RU');
  };

  // status definitions, name → translation key
  const status = [
    { key: 'cashflow.status.pending',    class: 'badge-outline badge-warning' },
    { key: 'cashflow.status.success',    class: '' },
    { key: 'cashflow.status.declined',   class: 'badge-error' }
  ];

  // type definitions, name → translation key
  const type = [
    { key: 'cashflow.type.replenish',      class: 'badge-outline badge-info' },
    { key: 'cashflow.type.withdraw',       class: 'badge-outline' },
    { key: 'cashflow.type.dividend',       class: 'badge-outline badge-info' },
    { key: 'cashflow.type.adminBonus',     class: 'badge-outline badge-warning' },
    { key: 'cashflow.type.contractOpen',   class: 'badge-outline badge-success' },
    { key: 'cashflow.type.contractClose',  class: 'badge-outline badge-info' },
    { key: 'cashflow.type.referralBonus',  class: 'badge-outline badge-success' }
  ];

  // pagination / load more
  const intervalIdCashflow = getContext('intervalIdCashflow') as number;
  const getNextCashflow = () => {
    clearInterval(intervalIdCashflow);
    userStore.getNextCashflow();
  }
</script>

<div class="overflow-x-auto max-w-4xl 2xl:max-w-6xl mt-8">
  {#key $userStore.operations}
    <table class="table w-full">
      <!-- head -->
      <thead class="text-neutral-content">
        <tr>
          <th class="bg-[#295858] text-xs">{$t('cashflow.headers.type')}</th>
          <th class="bg-[#295858] text-xs md:text-md">{$t('cashflow.headers.status')}</th>
          <th class="bg-[#295858] text-xs md:text-md text-right">{$t('cashflow.headers.amount')}</th>
          <th class="bg-[#295858] text-xs md:text-md text-right">{$t('cashflow.headers.currentBalance')}</th>
          <th class="bg-[#295858] text-xs md:text-md text-right">{$t('cashflow.headers.date')}</th>
          <th class="bg-[#295858] text-xs md:text-md text-left">{$t('cashflow.headers.details')}</th>
        </tr>
      </thead>

      {#if $userStore.operations.length}
        <tbody>
          {#each $userStore.operations as operation}
            <tr>
              <td class="sticky left-0">
                <div class={`badge ${type[operation.operation_type].class}`}>
                  {$t(type[operation.operation_type].key)}
                </div>
              </td>
              <td>
                <div class={`badge ${status[operation.status].class}`}>
                  {$t(status[operation.status].key)}
                </div>
              </td>
              <td class="text-right">
                {operation.amount}$
              </td>
              <td class="text-right">
                <span class="font-medium">${operation.current_balance}</span>
              </td>
              <td class="text-right">
                {formatDate(operation.operation_date)}
              </td>
              <td class="text-left">
                {operation.reason ? operation.reason : '-'}
              </td>
            </tr>
          {/each}
        </tbody>
      {/if}

      {#if $userStore.operations.length === 0}
        <tbody>
          <tr>
            <td colspan="6" class="text-center">
              {$t('cashflow.noHistory')}
            </td>
          </tr>
        </tbody>
      {/if}
    </table>
  {/key}
</div>

{#if $userStore.next_cashflow}
  <button
    class="btn btn-outline mt-4"
    disabled={$userStore.isLoading}
    on:click={getNextCashflow}
  >
    {$t('cashflow.loadMore')}
  </button>
{/if}
