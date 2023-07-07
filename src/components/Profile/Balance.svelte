<script lang="ts">
  import { user as userStore } from "stores/user";
  import { Jellyfish } from "svelte-loading-spinners";
</script>
{#if $userStore.isLoading && !($userStore.user?.userprofile.account_balance === 0 || $userStore.user?.userprofile.account_balance)}
  <div class="stats shadow mt-4">
    <div class="stat">
      <Jellyfish size="60" color="blue" />
    </div>
  </div>
{/if}
{#if $userStore.user?.userprofile.account_balance === 0 || $userStore.user?.userprofile.account_balance}
  <div class="stats shadow mt-4">
    <div class="stat">
      <div class="stat-title">Текущий баланс</div>
      <div class="stat-value">${$userStore.user?.userprofile.account_balance}</div>
    </div>
  </div>
{/if}