<script lang="ts">
  import axios, { AxiosError } from 'axios';
  import Input from 'components/Auth/Input.svelte';
  import SignInCard from 'components/Auth/SigninCard.svelte';
  import { Jellyfish } from 'svelte-loading-spinners';
  import { user } from 'stores/user';

  import i18next from '../../../lib/i18n';
  import { writable } from 'svelte/store';

  /* == перевод == */
  const t = writable((k: string) => i18next.t(k));
  i18next.on('languageChanged', () => t.set((k: string) => i18next.t(k)));

  let isLoading = false;
  let form: HTMLFormElement;
  let nickname = '';
  let password = '';

  let errors = { nickname: '', password: '' };
  let serverError = '';

  async function submitForm() {
    isLoading = true;
    try {
      await user.login(new FormData(form));
    } catch (e: unknown | AxiosError) {
      if (axios.isAxiosError(e)) {
        serverError = $t('auth.signin.errors.wrongCreds');
      } else {
        serverError = $t('auth.signin.errors.server');
      }
    } finally {
      isLoading = false;
    }
  }

  function handleSubmit() {
    serverError = '';
    errors = { nickname: '', password: '' };

    if (!nickname) errors.nickname = $t('auth.signin.errors.requiredUsername');
    if (!password) errors.password = $t('auth.signin.errors.requiredPassword');

    if (!errors.nickname && !errors.password) submitForm();
  }
</script>

<SignInCard>
  {#if isLoading}
    <div class="flex justify-center items-center w-full min-h-[420px]">
      <Jellyfish color="#4E8D8D" />
    </div>
  {:else}
    <form bind:this={form} class="space-y-6" on:submit|preventDefault={handleSubmit}>
      <h1 class="text-2xl font-bold text-center text-[#333333]">
        {$t('auth.signin.title')}
      </h1>

      <!-- Username -->
      <Input
        type="text"
        bind:value={nickname}
        name="username"
        placeholder={$t('auth.signin.usernamePlaceholder')}
        label={$t('auth.signin.usernameLabel')}
        error={errors.nickname}
      />

      <!-- Password -->
      <Input
        type="password"
        bind:value={password}
        name="password"
        placeholder={$t('auth.signin.passwordPlaceholder')}
        label={$t('auth.signin.passwordLabel')}
        error={errors.password}
      />

      {#if serverError}
        <p class="text-[#FF4D4D] text-sm text-center">{serverError}</p>
      {/if}

      <!-- Buttons -->
      <div class="flex flex-col gap-4">
        <button
          type="submit"
          class="btn bg-[#4E8D8D] text-white font-bold py-3 rounded-md shadow-md hover:bg-[#3A7373] transition-all duration-300"
        >
          {$t('auth.signin.submit')}
        </button>

        <a
          href="/auth/signup"
          class="btn btn-ghost border border-[#4E8D8D] text-[#4E8D8D] font-bold py-3 rounded-md hover:bg-[#4E8D8D] hover:text-white transition-all duration-300"
        >
          {$t('auth.signin.signup')}
        </a>

        <a
          href="/auth/forgot-password"
          class="text-[#4E8D8D] text-sm text-center underline hover:text-[#3A7373] transition-colors duration-300"
        >
          {$t('auth.signin.forgot')}
        </a>
      </div>
    </form>
  {/if}
</SignInCard>
