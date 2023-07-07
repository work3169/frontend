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
      const res = await axios(`${PUBLIC_BACKEND_URL}/api/v1/register/`, {
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
      errors.email = "Заполните емейл";
    } else if (!isValidEmail(email)) {
      errors.email = "Введите корректный емейл";
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

  function isValidEmail(email: string) {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
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
      <h1 class="mb-6 font-semibold text-lg text-center">Регистрация</h1>
  
      <Input type="text" bind:value={firstname} name="first_name" placeholder="Введите имя" label="Имя" error={errors.firstname}/>

      <Input type="text" bind:value={lastname} name="last_name" placeholder="Введите фамилию" label="Фамилия" error={errors.lastname} />

      <Input type="text" bind:value={nickname} name="username" placeholder="Введите имя пользователя" label="Имя пользователя" error={errors.nickname} />

      <Input type="email" bind:value={email} name="email" placeholder="Введите электронную почту" label="Электронная почта" error={errors.email} />

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