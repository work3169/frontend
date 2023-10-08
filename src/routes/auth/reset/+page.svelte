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
  let code = "";
  let success = false;
  let errors = {
    password: "",
    confirmPassword: "",
    code: "",
  };
  let serverError = ""
  $: isLoading
  let pid = "";
  if (browser) {
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);

    pid = urlParams.get('pid') || "";

    if (pid) {
      localStorage.setItem('pid', pid)
    } else {
      pid = localStorage.getItem('pid') || ""
    }
  }
  const submitForm = async() => {
    isLoading = true;
    const formSubmit = new FormData(form)
    formSubmit.append('profile_id', pid)
    try {
      const res = await axios(`${PUBLIC_BACKEND_URL}/api/v1/user/recovery_password/`, {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Access-Control-Allow-Origin': window.location.origin,
          // 'Content-Type': 'multipart/form-data',
        },
        data: formSubmit,
      })
      success = true;
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
      confirmPassword: "",
      code: "",
    };

    if (code.length < 4) {
      errors.code = "Некорректный код";
    }
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
    <form on:submit|preventDefault={handleSubmit} class="space-y-4" bind:this={form} autocomplete="off">
      <h1 class="mb-6 font-semibold text-lg text-center">Смена пароля</h1>
      <Input bind:value={code} name="pwd_change_code" placeholder="4321" label="Код" error={errors.code} />

      <Input type="password" bind:value={password} name="new_password" placeholder="Введите пароль" label="Пароль" error={errors.password} />

      <Input type="password" bind:value={confirmPassword} name="new_password_confirm" placeholder="Подтвердите пароль" label="Подтверждение пароля" error={errors.confirmPassword} />
      {#if serverError}
        <p class="text-error text-lg">{serverError}</p>
      {/if}
      {#if !success}
        <div class="flex flex-wrap justify-end gap-2">
          <a class="btn btn-outline" href="/auth/login">Назад</a>
          <button class="btn btn-primary">Сменить Пароль</button>
        </div>
      {:else}
        <div class="flex flex-wrap justify-end gap-2">
          <div class="text-success self-center">Пароль успешно изменен</div>
          <a class="btn btn-outline" href="/auth/login">Войти</a>
        </div>
      {/if}
    </form>
  {/if}

</SignInCard>