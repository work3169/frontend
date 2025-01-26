<script lang="ts">
    import axios from 'axios';
    import type { CommonContractItem } from "stores/contracts";
    import { user } from 'stores/user';
    import { PUBLIC_BACKEND_URL } from "$env/static/public";
    import { contracts } from 'stores/contracts';
    import { Jellyfish } from "svelte-loading-spinners";
    export let contract: CommonContractItem;
    export let isInvitation = false;
    export let isCreated = false;
    let isDeclining = false;
    let isAccepting = false;
    let isAdding = false;
    let isLoading = false;
    let username = "";
    let successMsg = "";
    let amount: number;
    let errorMsg = "";

    const inviteAfterStart = async (contract_id: string | number, username: string) => {
        try {
            isLoading = true;
            errorMsg = "";
            successMsg = "";
            
            const accessToken = await user.getAccessToken();
            const formData = new FormData();
            formData.append("contract_id", contract_id.toString());
            formData.append("username", username);

            await axios(`${PUBLIC_BACKEND_URL}/api/v1/contracts/common_contracts/invite_after_start/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                    "Authorization": `Bearer ${accessToken}`,
                },
                data: formData,
            });
            isAdding = false;
            await contracts.getCommonContracts(); // Refresh contracts list
            successMsg = "Пользователь успешно приглашен."
        } catch (e) {
            if (axios.isAxiosError(e)) {
                const { response } = e;
                const errMsg = response?.data?.non_field_errors && response?.data?.non_field_errors[0] || response?.data?.details;
                if (errMsg) {
                    errorMsg = errMsg;
                } else {
                    console.log(e);
                    errorMsg = "Произошла ошибка. Попробуйте позже или обратитесь в поддержку";
                }
            } else {
                console.log(e);
                errorMsg = "Произошла ошибка. Попробуйте позже или обратитесь в поддержку";
            }
        } finally {
            isLoading = false;
        }
    };

    const acceptInvitation = async (invitation: CommonContractItem) => {
      try {
        isLoading = true;
        errorMsg = ""
        if (!amount) {
            errorMsg = "Введите сумму взноса."
        }
        const accessToken = await user.getAccessToken();
        const formData = new FormData();
        formData.append("contract", invitation.contract_id.toString());
        formData.append("decision", "True");
        formData.append("amount", amount?.toString());
        await axios(`${PUBLIC_BACKEND_URL}/api/v1/contracts/common_contracts/contribute/`,{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': '*/*',
                  "Authorization": `Bearer ${accessToken}`,
                },
                data: formData,
            }
        );
        isAccepting = false;
        await contracts.getCommonContracts();
        // Handle successful acceptance
      } catch (e) {
        if (axios.isAxiosError(e)) {
            const { response } = e;
            const errMsg = response?.data?.non_field_errors && response?.data?.non_field_errors[0] || response?.data?.details;
            if (errMsg) {
                errorMsg = errMsg;
            } else {
                console.log(e);
                errorMsg = "Произошла ошибка. Попробуйте позже или обратитесь в поддержку";
            }
        } else {
            console.log(e);
            errorMsg = "Произошла ошибка. Попробуйте позже или обратитесь в поддержку";
        }
      } finally {
        isLoading = false;
      }
    };
  
    const declineInvitation = async (invitation: CommonContractItem) => {
      try {
        isLoading = true;
        errorMsg = ""
        const accessToken = await user.getAccessToken();
        const formData = new FormData();
        formData.append("contract", invitation.contract_id.toString());
        formData.append("decision", "False");
        formData.append("amount", "0");
        await axios(`${PUBLIC_BACKEND_URL}/api/v1/contracts/common_contracts/contribute/`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': '*/*',
                  "Authorization": `Bearer ${accessToken}`,
                },
                data: formData,
            }
        );
        isDeclining = false;
        await contracts.getCommonContracts();
        // Handle successful decline
      } catch (e) {
        if (axios.isAxiosError(e)) {
            const { response } = e;
            const errMsg = response?.data?.non_field_errors && response?.data?.non_field_errors[0] || response?.data?.details;
            if (errMsg) {
                errorMsg = errMsg;
            } else {
                console.log(e);
                errorMsg = "Произошла ошибка. Попробуйте позже или обратитесь в поддержку";
            }
        } else {
            console.log(e);
            errorMsg = "Произошла ошибка. Попробуйте позже или обратитесь в поддержку";
        }
      } finally {
        isLoading = false;
      }
    };
  
    function formatDate(jsTime: Date | string) {
      const date = new Date(jsTime);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = String(date.getFullYear()).slice(-2);
      return `${day}.${month}.20${year}`;
    }
  </script>
  
  <div class="bg-white p-4 rounded-lg shadow-md space-y-2 max-w-2xl ">
    <div class="flex items-center justify-between gap-1 ">
      <h3 class="flex items-center text-lg font-medium">
        {contract.contract_name}
        {#if contract.is_active}
          <div class="ml-1 badge badge-secondary">Активен</div>
        {/if}
      </h3>
      <div class="text-xs text-gray-400 text-right">
        Создан: <span class="text-sm text-black">{formatDate(contract.created_at)}</span>
        -
        Оканчивается: <span class="text-sm text-black">{formatDate(contract.end_date)}</span>
      </div>
    </div>
    <div class="text-gray-400 text-sm">
        Создатель контракта: <span class="text-black text-md">{contract.contract_creator}</span>
    </div>
    {#if isInvitation}
      <div class="flex flex-col gap-2">
        {#if !isAccepting && !isDeclining}
          <div class="flex gap-2">
            <button
              class="btn btn-primary"
              on:click={() => (isAccepting = true)}
              disabled={isLoading}
            >
              Принять
            </button>
            <button
              class="btn btn-outline"
              on:click={() => (isDeclining = true)}
              disabled={isLoading}
            >
              Отклонить
            </button>
          </div>
        {/if}
        {#if isDeclining}
          <div class="flex flex-col gap-2">
            Вы уверены?
            <div class="flex items-center gap-2">
              <button
                class="btn btn-outline"
                on:click={async () => await declineInvitation(contract)}
                disabled={isLoading}
              >
                {#if isLoading}
                    <Jellyfish size="35" color="#eeeeee" />
                {:else}
                    Отклонить
                {/if}
              </button>
              <button
                class="btn btn-outline"
                on:click={() => (isDeclining = false)}
                disabled={isLoading}
              >
                Назад
              </button>
            </div>
          </div>
        {/if}
        {#if isAccepting}
          <div class="flex flex-col gap-2">
            Укажите сумму взноса в партнерский контракт.
            <input bind:value={amount} class="input input-bordered w-full max-w-sm" placeholder="Сумма взноса" />
            <div class="flex gap-2">
                <button
                    class="btn btn-md btn-primary"
                    on:click={async () => await acceptInvitation(contract)}
                >
                    {#if isLoading}
                        <Jellyfish size="35" color="#eeeeee" />
                    {:else}
                        Принять
                    {/if}
                </button>
                <button
                    class="btn btn-md btn-outline"
                    on:click={() => (isAccepting = false)}
                    disabled={isLoading}
                >
                    Назад
                </button>
            </div>
          </div>
        {/if}
      </div>
    {:else}
      <div class="text-gray-400 text-sm">
        Ваш взнос: <span class="text-md text-black font-semibold">{contract.amount}</span>
      </div>
      <div class="text-gray-400 text-sm">
        Планируемый доход: <span class="text-md text-black font-semibold">{contract.dividends}</span>
      </div>
    {/if}
    {#if errorMsg}
      <div class="text-error mt-2">
        {errorMsg}
      </div>
    {/if}
    {#if isCreated}
        {#if !isAdding}
            <button class="btn btn-outline btn-secondary" on:click={() => (isAdding = true)}>Добавить пользователя</button>
        {:else}
            <input class="input input-bordered" bind:value={username} />
            <button class="btn btn-outline btn-secondary" on:click={async () => await inviteAfterStart(contract.contract_id, username)}>Добавить пользователя</button>
            <button
                class="btn btn-md btn-outline"
                on:click={() => (isAdding = false)}
                disabled={isLoading}
            >
                Назад
            </button>
        {/if}
     
    {/if}
    {#if successMsg}
        <div class="text-info">{successMsg}</div>
    {/if}
  </div>