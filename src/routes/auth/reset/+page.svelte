<script lang="ts">
  import axios, { AxiosError } from "axios";
  import { goto } from '$app/navigation';
  import { browser } from "$app/environment";
  import { PUBLIC_BACKEND_URL } from "$env/static/public";
  import Input from "components/Auth/Input.svelte";
	import SignInCard from "components/Auth/SigninCard.svelte";
  import { Jellyfish } from 'svelte-loading-spinners';
  let isLoading = false;
  let form: HTMLFormElement;
  let password = "";
  let confirmPassword = "";
  let errors = {
    password: "",
    confirmPassword: ""
  };
  let serverError = ""
  $: isLoading
  let ref_link = "";
  if (browser) {
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);

    ref_link = urlParams.get('ref_link') || "";

    if (ref_link) {
      localStorage.setItem('ref_link', ref_link)
    } else {
      ref_link = localStorage.getItem('ref_link') || ""
    }
  }
  const submitForm = async() => {
    isLoading = true;
    const formSubmit = new FormData(form)
    formSubmit.append('reffered_by_link', ref_link)
    try {
      const res = await axios(`${PUBLIC_BACKEND_URL}/api/v1/reset/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'Access-Control-Allow-Origin': window.location.origin,
        },
        data: formSubmit,
      })
      goto(`/auth/confirm?uuid=${res.data.confirmed_link}`);
    } catch (e: unknown | AxiosError) {
      if (axios.isAxiosError(e)) {
        if (e.response?.data?.username) {
          serverError = 'Пользователь с таким именем уже существует'
        } else if (e.response?.data?.email) {
          serverError = 'Пользователь с таким емейлом уже существует'
        } else if (e.response?.data?.non_field_errors) {
          serverError = e.response?.data?.non_field_errors[0]
        }
      } else {
        serverError = "Произошла ошибка. Попробуйте позже или обратитесь в поддержку"
      }
    } finally {
      isLoading = false;
    }
  }
  function handleSubmit() {
    serverError = ""
    errors = {
      password: "",
      confirmPassword: ""
    };

    if (!password) {
      errors.password = "Введите пароль";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Пароли не совпадают";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Пароли не совпадают";
    }

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
      <h1 class="mb-6 font-semibold text-lg text-center">Смена пароля</h1>

      <Input type="password" bind:value={password} name="password" placeholder="Введите пароль" label="Пароль" error={errors.password} />

      <Input type="password" bind:value={confirmPassword} name="password_confirm" placeholder="Подтвердите пароль" label="Подтверждение пароля" error={errors.confirmPassword} />
      {#if serverError}
        <p class="text-error text-lg">{serverError}</p>
      {/if}
      <div class="flex flex-wrap justify-end gap-2">
        <a class="btn btn-outline" href="/auth/login">Войти</a>
        <button class="btn btn-primary">Зарегистрироваться</button>
      </div>
    </form>
  {/if}

</SignInCard>