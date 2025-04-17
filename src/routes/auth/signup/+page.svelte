<script lang="ts">
  import axios, { AxiosError } from 'axios';
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';
  import { PUBLIC_BACKEND_URL } from '$env/static/public';
  import Input from 'components/Auth/Input.svelte';
  import SignInCard from 'components/Auth/SigninCard.svelte';
  import { Jellyfish } from 'svelte-loading-spinners';

  import i18next from '../../../lib/i18n';
  import { writable } from 'svelte/store';

  /* == перевод == */
  const t = writable((k: string) => i18next.t(k));
  i18next.on('languageChanged', () => t.set((k: string) => i18next.t(k)));

  let isLoading = false;
  let form: HTMLFormElement;

  let firstname = '';
  let lastname = '';
  let nickname = '';
  let email = '';
  let password = '';
  let confirmPassword = '';

  let errors = {
    firstname: '',
    lastname: '',
    nickname: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  let serverError = '';

  /* реф‑ссылка */
  let ref_link = '';
  if (browser) {
    const params = new URLSearchParams(window.location.search);
    ref_link = params.get('ref_link') || localStorage.getItem('ref_link') || '';
    if (ref_link) localStorage.setItem('ref_link', ref_link);
  }

  async function submitForm() {
    isLoading = true;
    const fd = new FormData(form);
    fd.append('reffered_by_link', ref_link);

    try {
      const res = await axios(`${PUBLIC_BACKEND_URL}/api/v1/register/`, {
        method: 'POST',
        headers: { Accept: '*/*' },
        data: fd
      });
      goto(`/auth/confirm?uuid=${res.data.confirmed_link}`);
    } catch (e: unknown | AxiosError) {
      if (axios.isAxiosError(e) && e.response?.data) {
        const d = e.response.data as any;
        if (d.username)   serverError = $t('auth.signup.errors.userExists');
        else if (d.email) serverError = $t('auth.signup.errors.emailExists');
        else if (d.non_field_errors) serverError = d.non_field_errors[0];
        else serverError = $t('auth.signup.errors.server');
      } else {
        serverError = $t('auth.signup.errors.server');
      }
    } finally {
      isLoading = false;
    }
  }

  function isValidEmail(val: string) {
    return /^\S+@\S+\.\S+$/.test(val);
  }

  function handleSubmit() {
    serverError = '';
    errors = { firstname: '', lastname: '', nickname: '', email: '', password: '', confirmPassword: '' };

    if (!firstname)         errors.firstname       = $t('auth.signup.errors.requiredFirst');
    if (!lastname)          errors.lastname        = $t('auth.signup.errors.requiredLast');
    if (!nickname)          errors.nickname        = $t('auth.signup.errors.requiredUsername');
    if (!email)             errors.email           = $t('auth.signup.errors.requiredEmail');
    else if (!isValidEmail(email)) errors.email     = $t('auth.signup.errors.invalidEmail');
    if (!password)          errors.password        = $t('auth.signup.errors.requiredPassword');
    if (!confirmPassword || password !== confirmPassword)
                           errors.confirmPassword  = $t('auth.signup.errors.mismatch');

    if (Object.values(errors).every(e => !e)) submitForm();
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
        {$t('auth.signup.title')}
      </h1>

      <Input
        type="text"  bind:value={firstname} name="first_name"
        placeholder={$t('auth.signup.firstNamePlaceholder')}
        label={$t('auth.signup.firstNameLabel')}
        error={errors.firstname}
      />

      <Input
        type="text"  bind:value={lastname} name="last_name"
        placeholder={$t('auth.signup.lastNamePlaceholder')}
        label={$t('auth.signup.lastNameLabel')}
        error={errors.lastname}
      />

      <Input
        type="text"  bind:value={nickname} name="username"
        placeholder={$t('auth.signup.usernamePlaceholder')}
        label={$t('auth.signup.usernameLabel')}
        error={errors.nickname}
      />

      <Input
        type="email" bind:value={email} name="email"
        placeholder={$t('auth.signup.emailPlaceholder')}
        label={$t('auth.signup.emailLabel')}
        error={errors.email}
      />

      <Input
        type="password" bind:value={password} name="password"
        placeholder={$t('auth.signup.passwordPlaceholder')}
        label={$t('auth.signup.passwordLabel')}
        error={errors.password}
      />

      <Input
        type="password" bind:value={confirmPassword} name="password_confirm"
        placeholder={$t('auth.signup.confirmPlaceholder')}
        label={$t('auth.signup.confirmLabel')}
        error={errors.confirmPassword}
      />

      {#if serverError}
        <p class="text-[#FF4D4D] text-sm text-center">{serverError}</p>
      {/if}

      <div class="flex flex-col gap-4">
        <button type="submit" class="btn bg-[#4E8D8D] text-white hover:bg-[#3A7373]">
          {$t('auth.signup.submit')}
        </button>

        <a href="/auth/login"
          class="btn btn-ghost border border-[#4E8D8D] text-[#4E8D8D] hover:bg-[#4E8D8D] hover:text-white">
          {$t('auth.signup.login')}
        </a>
      </div>
    </form>
  {/if}
</SignInCard>
