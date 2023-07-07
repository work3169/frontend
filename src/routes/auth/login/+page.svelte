<script lang="ts">
  import axios, { AxiosError } from "axios";
  import { PUBLIC_BACKEND_URL } from "$env/static/public";
  import { goto } from '$app/navigation';
  import nookies from 'nookies';
  import Input from "components/Auth/Input.svelte";
	import SignInCard from "components/Auth/SigninCard.svelte";
  import { Jellyfish } from 'svelte-loading-spinners';
  let isLoading = false;
  let form: HTMLFormElement;
  let nickname = "";
  let password = "";
  let errors = {
    nickname: "",
    password: ""
  };
  let serverError = ""
  $: isLoading
  const submitForm = async() => {
    isLoading = true;
    const formSubmit = new FormData(form)
    try {
      const res = await axios(`${PUBLIC_BACKEND_URL}/api/v1/token/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'Access-Control-Allow-Origin': window.location.origin,
        },
        data: formSubmit,
      })
      nookies.set(null, "access_token", res.data.access, {
        maxAge: 300 * 24 * 60 * 60,
        path: "/",
      })
      nookies.set(null, "refresh_token", res.data.refresh, {
        maxAge: 300 * 24 * 60 * 60,
        path: "/",
      })
      goto(`/profile`);
    } catch (e: unknown | AxiosError) {
      if (axios.isAxiosError(e)) {
        serverError = "Неверные данные или неподтверждённый пользователь"
      } else {
        serverError = "Произошла ошибка. Попробуйте позже или обратитесь в поддержку"
      }
    } finally {
      isLoading = false;
    }
  }
  function handleSubmit() {
    // Reset errors
    serverError = ""
    errors = {
      nickname: "",
      password: ""
    };

    // Validate form fields
    if (!nickname) {
      errors.nickname = "Заполните имя пользователя";
    }

    if (!password) {
      errors.password = "Введите пароль";
    }

    // If there are no errors, submit the form
    if (Object.values(errors).every(error => !error)) {
      submitForm()
    }
  }
</script>

<SignInCard>
  {#if isLoading}
    <div class="flex justify-center items-center w-full min-h-[420px]">
      <Jellyfish color="#0000FF" />
    </div>
  {/if}
  {#if !isLoading}
    <form on:submit|preventDefault={handleSubmit} class="space-y-4" bind:this={form}>
      <h1 class="mb-6 font-semibold text-lg text-center">Войти</h1>
  
      <Input type="text" bind:value={nickname} name="username" placeholder="Введите имя пользователя" label="Имя пользователя" error={errors.nickname} />

      <Input type="password" bind:value={password} name="password" placeholder="Введите пароль" label="Пароль" error={errors.password} />

      {#if serverError}
        <p class="text-error text-lg">{serverError}</p>
      {/if}
      <div class="flex flex-wrap justify-end gap-2">
        <a class="btn btn-outline" href="/auth/signup">Зарегистрироваться</a>
        <button class="btn btn-primary">Войти</button>
      </div>
    </form>
  {/if}
</SignInCard>