<script lang="ts">
	import axios, { AxiosError } from "axios";
  import { PUBLIC_BACKEND_URL } from "$env/static/public";
  import { user as userStore, type Contract, user } from "stores/user";
	import { Jellyfish } from "svelte-loading-spinners";
  let contracts: Contract[] = [];
  let scrollTarget: HTMLDivElement;
  let errorMsg = "";
  let contractValue = "";
  let isLoading = false;
  let successMsg = "";
  $: contracts = $userStore.user?.userprofile?.showing_contracts || [];
  let selectedContract: Contract | null = null;
  const selectContract = (contract: Contract) => {
    selectedContract = contract;
    window.scrollTo({ top: scrollTarget.offsetTop, behavior: "smooth",  });
  }
  const addContract = async () => {
    if (!selectedContract) return;
    try {
      isLoading = true;
      errorMsg = '';
      await user.refreshToken();
      const formData = new FormData();
      formData.append("selected_contract", selectedContract.id.toString());
      formData.append("offered_rate", contractValue.toString());
      const res = await axios(`${PUBLIC_BACKEND_URL}/user/contracts/new/`, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": window.location.origin,
          "Authorization": `Bearer ${$userStore.accessToken}`,
        },
        data: formData,
      });
      successMsg = 'Контракт успешно добавлен';
      isLoading = false;
      await user.getUser();
    } catch (e: AxiosError | unknown) {
      if (axios.isAxiosError(e)) {
        const { response } = e
        const errMsg = response?.data.non_field_errors[0];
        if (errMsg) {
          errorMsg = errMsg;
        } else {
          console.log(e);
          errorMsg = "Произошла ошибка. Попробуйте позже или обратитесь в поддержку"
        }
      } else {
        console.log(e);
        errorMsg = "Произошла ошибка. Попробуйте позже или обратитесь в поддержку"
      }
    } finally {
      isLoading = false;
    }
  }
</script>

{#if contracts.length}
  <div class="overflow-x-auto max-w-4xl 2xl:max-w-6xl mt-6 md:mt-12">
    <table class="table table-compact w-full">
      <!-- head -->
      <thead class="text-neutral-content">
        <tr >
          <th class="bg-neutral"></th>
          <th class="bg-neutral text-xs md:text-md">Название</th>
          <th class="bg-neutral text-xs md:text-md text-right">Мин. взнос</th>
          <th class="bg-neutral text-xs md:text-md text-right">Макс. взнос</th>
          <th class="bg-neutral text-xs md:text-md text-right">Процент</th>
          <th class="bg-neutral text-xs md:text-md text-right">Срок</th>
        </tr>
      </thead>
      <tbody>
        {#each contracts as contract}
        <tr>
          <th><button class="btn btn-xs md:btn-sm btn-outline btn-primary" on:click={() => selectContract(contract)}>Выбрать</button></th>
          <td>{contract.name}</td>
          <td class="text-right md:px-4">${contract.min_money}</td>
          <td class="text-right md:px-4">${contract.max_money}</td>
          <td class="text-right">{contract.percent_for_day}</td>
          <td class="text-right">{contract.term}д</td>
        </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/if}
<div bind:this={scrollTarget}></div>
{#if selectedContract}
  <div class="p-4 bg-base-100 max-w-4xl 2xl:max-w-6xl rounded mt-6">
    <h3 class="text-xl">Выбранный контракт: <b>{selectedContract.name}</b></h3>
    <div class="flex flex-wrap gap-2 align-middle mt-4">
      <input bind:value={contractValue} class="input input-bordered w-full max-w-sm" placeholder="Сумма взноса" />
      <button class="btn btn-primary" on:click={addContract} disabled={isLoading}>
        {#if isLoading}
          <Jellyfish size="35" color="#0000FF" />
        {:else} 
          Внести взнос
        {/if}
      </button>
      {#if errorMsg}
        <div class="text-error flex items-center">{errorMsg}</div>
      {/if}
      {#if successMsg}
        <div class="text-info flex items-center">{successMsg}</div>
      {/if}
    </div>
  </div>
{/if}