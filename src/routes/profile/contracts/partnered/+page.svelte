<script lang="ts">
    import HeaderContainer from "components/Profile/HeaderContainer.svelte";
    import { contracts } from 'stores/contracts';
    import type { CommonContracts, CommonContractItem } from 'stores/contracts';
    import PartneredContractCard from "components/Profile/PartneredContractCard.svelte";
	import { browser } from "$app/environment";
    if (browser) {
        contracts.getCommonContracts();
    }
    let partneredContracts: CommonContracts | null  = null
    contracts.commonContracts.subscribe(value => {
        partneredContracts = value
    });
  </script>

  
  <HeaderContainer >
    <h1 class="font-medium text-2xl">Партнерские контракты</h1>
    <div class="flex flex-wrap gap-2">
      <a class="btn btn-primary bg-[#4E8D8D]" href="/profile/contracts/partnered/new">Партнерский контракт</a>
      <a class="btn btn-outline btn-neutral" href="/profile/contracts">Все контракты</a>
    </div>
</HeaderContainer>
  <div class="space-y-8 mt-8">
    <!-- New Invitations -->
    <div>
      <h2 class="text-xl font-semibold mb-2">Новые приглашения</h2>
      {#if (partneredContracts?.new_invitations?.length || 0) > 0}
        <div class="space-y-2 mt-2">
          {#each partneredContracts?.new_invitations || [] as invitation}
            <PartneredContractCard contract={invitation} isInvitation />
          {/each}
        </div>
      {:else}
        <p class="text-gray-500">Нет новых приглашений.</p>
      {/if}
    </div>

    <!-- Created Invitations -->
    <div>
        <h2 class="text-xl font-semibold mb-2">Созданные партнерские контракты</h2>
        {#if (partneredContracts?.created_contracts?.length || 0) > 0}
            <div class="space-y-2 mt-2">
            {#each (partneredContracts?.created_contracts || []) as contract}
                <PartneredContractCard contract={contract} isCreated />
            {/each}
            </div>
        {:else}
            <p class="text-gray-500">Нет созданных контрактов.</p>
        {/if}
    </div>


    <!-- Accepted Invitations -->
    <div>
      <h2 class="text-xl font-semibold mb-2">Принятые приглашения</h2>
      {#if (partneredContracts?.invited_accepted_contracts.length || 0) > 0}
        <div class="space-y-2 mt-2">
          {#each (partneredContracts?.invited_accepted_contracts || []) as contract}
            <PartneredContractCard contract={contract} />
          {/each}
        </div>
      {:else}
        <p class="text-gray-500">Нет принятых приглашений.</p>
      {/if}
    </div>
  
    <!-- Declined Invitations -->
    <div>
      <h2 class="text-xl font-semibold mb-2">Отклоненные приглашения</h2>
      {#if (partneredContracts?.invited_rejected_contracts.length || 0) > 0}
        <div class="space-y-2 mt-2">
            {#each (partneredContracts?.invited_rejected_contracts || []) as contract}
                <PartneredContractCard contract={contract} />
            {/each}
        </div>
      {:else}
        <p class="text-gray-500">Нет отклоненных приглашений.</p>
      {/if}
    </div>
  </div>