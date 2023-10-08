<script lang="ts">
  import axios, { AxiosError } from "axios";
  import { goto } from '$app/navigation';
  import { PUBLIC_BACKEND_URL } from "$env/static/public";
  import Input from "components/Auth/Input.svelte";
	import SignInCard from "components/Auth/SigninCard.svelte";
  import { Jellyfish } from 'svelte-loading-spinners';
  let isLoading = false;
  let form: HTMLFormElement;
  let nameOrEmail = "";
  let errors = {
    nameOrEmail: "",
  };
  let serverError = ""
  $: isLoading
  const submitForm = async() => {
    isLoading = true;
    const formSubmit = new FormData(form)
    try {
      const res = await axios(`${PUBLIC_BACKEND_URL}/api/v1/user/recovery_password/`, {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Access-Control-Allow-Origin': window.location.origin,
        },
        data: formSubmit,
      })
      goto(`/auth/reset?pid=${res.data.profile_id}`);
    } catch (e: unknown | AxiosError) {
      if (axios.isAxiosError(e)) {
        if (e.response?.data?.non_field_errors) {
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
      nameOrEmail: "",
    };

    if (!nameOrEmail) {
      errors.nameOrEmail = "Введите пароль";
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
      <h1 class="mb-6 font-semibold text-lg text-center">Забыли пароль?</h1>

      <Input bind:value={nameOrEmail} name="name_email" placeholder="email@example.com" label="Введите почту или логин" error={errors.nameOrEmail} />
      {#if serverError}
        <p class="text-error text-lg">{serverError}</p>
      {/if}
      <div class="flex flex-wrap justify-end gap-2">
        <a class="btn btn-outline" href="/auth/login">НАЗАД</a>
        <button class="btn btn-primary">СБРОСИТЬ ПАРОЛЬ</button>
      </div>
    </form>
  {/if}

</SignInCard>