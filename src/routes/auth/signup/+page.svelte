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
  let firstname = "";
  let lastname = "";
  let nickname = "";
  let email = "";
  let password = "";
  let confirmPassword = "";
  let errors = {
    firstname: "",
    lastname: "",
    nickname: "",
    email: "",
    password: "",
    confirmPassword: ""
  };
  let serverError = "";
  $: isLoading;

  let ref_link = "";
  if (browser) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    ref_link = urlParams.get('ref_link') || "";

    if (ref_link) {
      localStorage.setItem('ref_link', ref_link);
    } else {
      ref_link = localStorage.getItem('ref_link') || "";
    }
  }

  const submitForm = async () => {
    isLoading = true;
    const formSubmit = new FormData(form);
    formSubmit.append('reffered_by_link', ref_link);
    try {
      const res = await axios(`${PUBLIC_BACKEND_URL}/api/v1/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'Access-Control-Allow-Origin': window?.location.origin,
        },
        data: formSubmit,
      });
      goto(`/auth/confirm?uuid=${res.data.confirmed_link}`);
    } catch (e: unknown | AxiosError) {
      if (axios.isAxiosError(e)) {
        if (e.response?.data?.username) {
          serverError = 'Пользователь с таким именем уже существует';
        } else if (e.response?.data?.email) {
          serverError = 'Пользователь с таким емейлом уже существует';
        } else if (e.response?.data?.non_field_errors) {
          serverError = e.response?.data?.non_field_errors[0];
        }
      } else {
        serverError = "Произошла ошибка. Попробуйте позже или обратитесь в поддержку";
      }
    } finally {
      isLoading = false;
    }
  };

  function handleSubmit() {
    serverError = "";
    errors = {
      firstname: "",
      lastname: "",
      nickname: "",
      email: "",
      password: "",
      confirmPassword: ""
    };

    if (!firstname) {
      errors.firstname = "Введите имя";
    }

    if (!lastname) {
      errors.lastname = "Введите фамилию";
    }

    if (!nickname) {
      errors.nickname = "Введите имя пользователя";
    }

    if (!email) {
      errors.email = "Заполните электронную почту";
    } else if (!isValidEmail(email)) {
      errors.email = "Введите корректную электронную почту";
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
      submitForm();
    }
  }

  function isValidEmail(email: string) {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  }
</script>

<SignInCard>
  {#if isLoading}
    <div class="flex justify-center items-center w-full min-h-[420px]">
      <Jellyfish color="#4E8D8D" />
    </div>
  {:else}
    <form on:submit|preventDefault={handleSubmit} class="space-y-6" bind:this={form}>
      <h1 class="text-2xl font-bold text-center text-[#333333]">Регистрация</h1>

      <!-- Имя -->
      <Input
        type="text"
        bind:value={firstname}
        name="first_name"
        placeholder="Введите имя"
        label="Имя"
        error={errors.firstname}
      />

      <!-- Фамилия -->
      <Input
        type="text"
        bind:value={lastname}
        name="last_name"
        placeholder="Введите фамилию"
        label="Фамилия"
        error={errors.lastname}
      />

      <!-- Имя пользователя -->
      <Input
        type="text"
        bind:value={nickname}
        name="username"
        placeholder="Введите имя пользователя"
        label="Имя пользователя"
        error={errors.nickname}
      />

      <!-- Электронная почта -->
      <Input
        type="email"
        bind:value={email}
        name="email"
        placeholder="Введите электронную почту"
        label="Электронная почта"
        error={errors.email}
      />

      <!-- Пароль -->
      <Input
        type="password"
        bind:value={password}
        name="password"
        placeholder="Введите пароль"
        label="Пароль"
        error={errors.password}
      />

      <!-- Подтверждение пароля -->
      <Input
        type="password"
        bind:value={confirmPassword}
        name="password_confirm"
        placeholder="Подтвердите пароль"
        label="Подтверждение пароля"
        error={errors.confirmPassword}
      />

      <!-- Сообщение об ошибке -->
      {#if serverError}
        <p class="text-[#FF4D4D] text-sm text-center">{serverError}</p>
      {/if}

      <!-- Кнопки -->
      <div class="flex flex-col gap-4">
        <button
          type="submit"
          class="btn bg-[#4E8D8D] text-white font-bold py-3 rounded-md shadow-md hover:bg-[#3A7373] transition-all duration-300"
        >
          Зарегистрироваться
        </button>
        <a
          href="/auth/login"
          class="btn btn-ghost border border-[#4E8D8D] text-[#4E8D8D] font-bold py-3 rounded-md hover:bg-[#4E8D8D] hover:text-white transition-all duration-300"
        >
          Войти
        </a>
      </div>
    </form>
  {/if}
</SignInCard>