<script lang="ts">
  import HeaderContainer from "components/Profile/HeaderContainer.svelte";
  import { user as userStore } from "stores/user";
  import { writable } from "svelte/store";
  import i18next from "../../../lib/i18n";

  /* i18n‑store */
  const t = writable<(k: string) => string>((k) => i18next.t(k) as string);
  i18next.on("languageChanged", () => t.set((k) => i18next.t(k) as string));

  let isHowItWorksOpened = false;
</script>

<HeaderContainer>
  <h1 class="font-medium text-2xl">{$t('profilePage.title')}</h1>
</HeaderContainer>

{#if $userStore?.user?.userprofile.account_status == 0}
  <div class="flex w-full mt-8">
    <div class="alert alert-success rounded-xl shadow-lg max-w-sm">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{$t('profilePage.verified')}</span>
      </div>
    </div>
  </div>
{:else if $userStore?.user?.userprofile.account_status == 1}
  <div class="flex w-full mt-8">
    <div class="alert alert-warning rounded-xl shadow-lg max-w-md">
      <span>{$t('profilePage.needVerification')}</span>
    </div>
  </div>
{:else if $userStore?.user?.userprofile.account_status == 2}
  <div class="flex w-full mt-8">
    <div class="alert alert-error rounded-xl shadow-lg max-w-sm">
      <span>{$t('profilePage.temporaryRestrictions')}</span>
    </div>
  </div>
{/if}

<div class="mt-8 flex flex-col gap-4 bg-neutral-50 shadow-md p-4 rounded-xl max-w-2xl">
  <div class="flex flex-wrap gap-2">
    <div>
      <div class="font-semibold">{$t('profilePage.firstName')}</div>
      <div>{$userStore.user?.first_name}</div>
    </div>
  </div>

  <div>
    <div class="font-semibold">{$t('profilePage.lastName')}</div>
    <div>{$userStore.user?.last_name}</div>
  </div>

  <div>
    <div class="font-semibold">{$t('profilePage.email')}</div>
    <div>{$userStore.user?.email}</div>
  </div>

  <div>
    <div class="font-semibold flex flex-col md:flex-row items-start md:items-center">
      <span>{$t('profilePage.referralLink')}</span>
      <button class="btn btn-sm btn-outline md:ml-2" on:click={() => (isHowItWorksOpened = true)}>
        {$t('profilePage.howItWorks')}
      </button>
    </div>

    <a href={`https://${window.location.host}/auth/signup/?ref_link=${$userStore.user?.userprofile.ref_link}`}>
      https://{window.location.host}/auth/signup/?ref_link={$userStore.user?.userprofile.ref_link}
    </a>

    <a class="block mt-6 text-green-600 font-bold" href="/profile/referrals">
      {$t('profilePage.myReferralSystem')}
    </a>

    {#if isHowItWorksOpened}
      <div class="prose my-4">
        <h3>{$t('profilePage.rewardsHeading')}</h3>
        <p>{$t('profilePage.rewardsIntro')}</p>
        <ul>
          <li>{$t('profilePage.line1')}</li>
          <li>{$t('profilePage.line2')}</li>
          <li>{$t('profilePage.line3')}</li>
        </ul>
        <h3>{$t('profilePage.individualHeading')}</h3>
        <p>{$t('profilePage.individualText')}</p>
      </div>
    {/if}
  </div>

  <div>
    <a class="font-semibold my-3 text-secondary" href="https://t.me/des_logi_support">{$t('profilePage.support')}</a>
  </div>

  <div class="flex flex-wrap gap-4">
    <a class="btn btn-primary" href="/profile/balance/replenish">{$t('profilePage.replenish')}</a>
    <a class="btn btn-primary" href="/profile/balance/withdraw">{$t('profilePage.withdraw')}</a>
  </div>

  <button class="btn btn-outline btn-secondary max-w-sm btn-sm" on:click={userStore.logout}>
    {$t('profilePage.logout')}
  </button>
</div>
