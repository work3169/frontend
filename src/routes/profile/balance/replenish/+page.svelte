<script lang="ts">
  import { PUBLIC_BACKEND_URL } from "$env/static/public";
  import { user as userStore } from "stores/user";
  import HeaderContainer from "components/Profile/HeaderContainer.svelte";
  import Balance from "components/Profile/Balance.svelte";
  import axios from "axios";
  import { browser } from "$app/environment";

  // i18n (force string return)
  import i18next from '../../../../lib/i18n';
  import { writable } from 'svelte/store';
  const t = writable<(key: string, opts?: any) => string>(
    (key, opts) => i18next.t(key, opts) as string
  );
  i18next.on('languageChanged', () =>
    t.set((key, opts) => i18next.t(key, opts) as string)
  );

  if (browser) userStore.getCashflow();

  let walletType = '4';
  let value = "";
  let error = "";
  let wallet = "";

  const replenish = async () => {
    error = '';
    const numValue = parseFloat(value.trim());
    if (isNaN(numValue) || !isFinite(numValue)) {
      error = $t('replenishPage.invalidFormat');
      return;
    }
    const accessToken = await userStore.getAccessToken();
    const formData = new FormData();
    formData.append("amount", numValue.toString());
    const res = await axios(`${PUBLIC_BACKEND_URL}/api/v1/user/user_balance_supplement/`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": window.location.origin,
        "Authorization": `Bearer ${accessToken}`,
      },
      data: formData,
    });
    wallet = res?.data?.wallet;
  };
</script>

<HeaderContainer>
  <h1 class="font-medium text-2xl">{$t('replenishPage.title')}</h1>
  <div class="flex gap-4">
    <a class="btn btn-outline" href="/profile/balance">
      {$t('replenishPage.back')}
    </a>
  </div>
</HeaderContainer>

<Balance />

<div class="bg-base-100 overflow-x-auto max-w-4xl mt-8 min-h-[40px] rounded-xl p-3 md:p-4 shadow-xl">
  <div class="flex-col md:flex-row flex md:items-center gap-8 mb-8">
    <label class="flex items-center cursor-pointer gap-2">
      <input
        class="radio radio-primary"
        type="radio"
        name="radio"
        value="1"
        bind:group={walletType}
      />
      <img class="h-8" src="/visamastercard.png" alt="visa" />
    </label>
    <label class="flex items-center cursor-pointer gap-2">
      <input
        class="radio radio-primary"
        type="radio"
        name="radio"
        value="2"
        bind:group={walletType}
      />
      <img class="h-6" src="/btc.png" alt="btc" />
    </label>
    <label class="flex items-center cursor-pointer gap-2">
      <input
        class="radio radio-primary"
        type="radio"
        name="radio"
        value="3"
        bind:group={walletType}
      />
      <img class="h-12" src="/eth.png" alt="eth" />
    </label>
    <label class="flex items-center cursor-pointer gap-2">
      <input
        class="radio radio-primary"
        type="radio"
        name="radio"
        value="4"
        checked
        bind:group={walletType}
      />
      <img class="h-10" src="/tether.png" alt="tether" />
    </label>
  </div>

  {#if walletType === '4'}
    <div class="flex flex-wrap w-full gap-2 max-w-xl">
      <input
        bind:value={value}
        class="input input-bordered w-full max-w-sm"
        placeholder={$t('replenishPage.amountPlaceholder')}
      />
      <button
        on:click={replenish}
        class="btn btn-primary px-8 w-full max-w-[150px] bg-[#4E8D8D]"
      >
        {$t('replenishPage.replenish')}
      </button>
    </div>

    {#if error}
      <div class="text-error mt-1">
        {error}
      </div>
    {/if}

    {#if wallet}
      <div class="mt-1 text-lg">
        {@html $t('replenishPage.pleaseReplenish', { value, wallet })}
      </div>
    {/if}
  {:else}
    <div class="text-error">
      {$t('replenishPage.support')}
    </div>
  {/if}
</div>
