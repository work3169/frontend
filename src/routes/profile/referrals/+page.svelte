<script lang="ts">
  import HeaderContainer from "components/Profile/HeaderContainer.svelte";
  import { browser } from '$app/environment';
  import { referralsStore } from 'stores/referrals';
  import { user as userStore } from 'stores/user';
  import { Jellyfish } from "svelte-loading-spinners";
  import { onMount } from "svelte";
  import ReferralsBlock from "components/Profile/ReferralsBlock.svelte";

  /* --- i18n --- */
  import i18next from '../../../lib/i18n';       /* поправьте путь при необходимости */
  import { writable } from 'svelte/store';
  const t = writable<(k: string) => string>((k) => i18next.t(k) as string);
  i18next.on('languageChanged', () =>
    t.set((k) => i18next.t(k) as string)
  );

  let isLoading = true;
  onMount(async () => {
    try {
      isLoading = true;
      if (browser) {
        await referralsStore.getReferrals();
        if (!$userStore.user) userStore.getUser();
      }
    } catch (e) {
      console.log(e);
    } finally {
      isLoading = false;
    }
  });
</script>

<HeaderContainer>
  <h1 class="font-medium text-2xl">{$t('referralsPage.title')}</h1>
  <div class="flex gap-4">
    <a class="btn btn-outline" href="/profile/balance">{$t('common.back')}</a>
  </div>
</HeaderContainer>

{#if !isLoading}
  <div class="flex gap-2 flex-wrap max-w-4xl mt-2">
    <div class="flex stats shadow mt-4 w-full">
      <div class="stat">
        <div class="stat-title">{$t('referralsPage.totalContracts')}</div>
        <div class="stat-value">{Math.ceil($referralsStore.total_contracts)}</div>
      </div>
      <div class="stat">
        <div class="stat-title">{$t('referralsPage.totalValue')}</div>
        <div class="stat-value">${Math.ceil($referralsStore.total_contracts_value)}</div>
      </div>
      <div class="stat">
        <div class="stat-title">{$t('referralsPage.totalProfit')}</div>
        <div class="stat-value">${Math.ceil($referralsStore.total_profit)}</div>
      </div>
    </div>

    <div class="flex stats shadow mt-4 w-full">
      <div class="stat">
        <div class="stat-title">{$t('referralsPage.firstLine')}</div>
        <div class="stat-value">${Math.ceil($referralsStore.first_line_profit)}</div>
      </div>
      <div class="stat">
        <div class="stat-title">{$t('referralsPage.secondLine')}</div>
        <div class="stat-value">${Math.ceil($referralsStore.second_line_profit)}</div>
      </div>
      <div class="stat">
        <div class="stat-title">{$t('referralsPage.thirdLine')}</div>
        <div class="stat-value">${Math.ceil($referralsStore.third_line_profit)}</div>
      </div>
    </div>
  </div>
{/if}

<div class="overflow-x-auto max-w-6xl 2xl:max-w-fit mt-12">
  <table class="table w-full">
    <thead class="text-neutral-content">
      <tr>
        <th class="bg-[#295858] text-sm">{$t('referralsPage.username')}</th>
        <th class="bg-[#295858] text-sm">{$t('referralsPage.contractsCount')}</th>
        <th class="bg-[#295858] text-sm">{$t('referralsPage.contractsValue')}</th>
        <th class="bg-[#295858] text-sm">{$t('referralsPage.income')}</th>
        <th class="bg-[#295858] text-sm">{$t('referralsPage.line')}</th>
        <th class="bg-[#295858] text-sm">{$t('referralsPage.parentUsername')}</th>
      </tr>
    </thead>

    {#if $referralsStore.details?.length === 0}
      {#if isLoading}
        <tbody>
          <tr>
            <td colspan="2" />
            <td colspan="2" class="text-center">
              <div class="m-auto flex justify-center">
                <Jellyfish size="60" color="blue" />
              </div>
            </td>
            <td colspan="2" />
          </tr>
        </tbody>
      {:else}
        <tbody>
          <tr>
            <td colspan="6" class="text-center">
              {$t('referralsPage.empty')}<br />
              <a href={`https://${window.location.host}/auth/signup/?ref_link=${$userStore?.user?.userprofile.ref_link}`}>
                https://{window.location.host}/auth/signup/?ref_link={$userStore.user?.userprofile.ref_link}
              </a>
            </td>
          </tr>
        </tbody>
      {/if}
    {/if}

    {#if $referralsStore.details?.length > 0}
      <tbody>
        {#each $referralsStore.details as referral}
          <ReferralsBlock referral={referral} />
        {/each}
      </tbody>
    {/if}
  </table>
</div>
