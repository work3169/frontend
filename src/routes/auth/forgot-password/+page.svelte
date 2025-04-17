<script lang="ts">
  import axios, { AxiosError } from 'axios';
  import { goto } from '$app/navigation';
  import { PUBLIC_BACKEND_URL } from '$env/static/public';
  import Input from 'components/Auth/Input.svelte';
  import SignInCard from 'components/Auth/SigninCard.svelte';
  import { Jellyfish } from 'svelte-loading-spinners';

  import i18next from '../../../lib/i18n';
  import { writable } from 'svelte/store';

  const t = writable((k: string) => i18next.t(k));
  i18next.on('languageChanged', () => t.set((k: string) => i18next.t(k)));

  let isLoading = false;
  let form: HTMLFormElement;
  let nameOrEmail = '';

  let errors = { nameOrEmail: '' };
  let serverError = '';

  async function submitForm() {
    isLoading = true;
    try {
      const fd = new FormData(form);
      const res = await axios(`${PUBLIC_BACKEND_URL}/api/v1/user/recovery_password/`, {
        method: 'POST',
        headers: { Accept: '*/*' },
        data: fd
      });
      goto(`/auth/reset?pid=${res.data.profile_id}`);
    } catch (e: unknown | AxiosError) {
      if (axios.isAxiosError(e) && e.response?.data?.non_field_errors) {
        serverError = e.response.data.non_field_errors[0];
      } else {
        serverError = $t('auth.forgot.errors.server');
      }
    } finally {
      isLoading = false;
    }
  }

  function handleSubmit() {
    serverError = '';
    errors = { nameOrEmail: '' };

    if (!nameOrEmail) errors.nameOrEmail = $t('auth.forgot.errors.required');

    if (!errors.nameOrEmail) submitForm();
  }
</script>

<SignInCard>
  {#if isLoading}
    <div class="flex justify-center items-center w-full min-h-[420px]">
      <Jellyfish color="#4E8D8D" />
    </div>
  {:else}
    <form bind:this={form} class="space-y-4" on:submit|preventDefault={handleSubmit}>
      <h1 class="mb-6 font-semibold text-lg text-center">
        {$t('auth.forgot.title')}
      </h1>

      <Input
        bind:value={nameOrEmail}
        name="name_email"
        placeholder={$t('auth.forgot.placeholder')}
        label={$t('auth.forgot.label')}
        error={errors.nameOrEmail}
      />

      {#if serverError}
        <p class="text-error text-sm text-center">{serverError}</p>
      {/if}

      <div class="flex flex-wrap justify-end gap-2">
        <a class="btn btn-outline" href="/auth/login">
          {$t('auth.forgot.back')}
        </a>
        <button class="btn btn-primary">
          {$t('auth.forgot.submit')}
        </button>
      </div>
    </form>
  {/if}
</SignInCard>
