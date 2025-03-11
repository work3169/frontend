<script lang="ts">
  import axios, { AxiosError } from "axios";
  import Input from "components/Auth/Input.svelte";
  import SignInCard from "components/Auth/SigninCard.svelte";
  import { Jellyfish } from 'svelte-loading-spinners';
  import { user } from "stores/user";

  let isLoading = false;
  let form: HTMLFormElement;
  let nickname = "";
  let password = "";
  let errors = {
    nickname: "",
    password: ""
  };
  let serverError = "";

  const submitForm = async () => {
    isLoading = true;
    const formSubmit = new FormData(form);
    try {
      await user.login(formSubmit);
    } catch (e: unknown | AxiosError) {
      if (axios.isAxiosError(e)) {
        serverError = "Неверные данные или неподтверждённый пользователь";
      } else {
        serverError = "Произошла ошибка. Попробуйте позже или обратитесь в поддержку";
      }
    } finally {
      isLoading = false;
    }
  };

  function handleSubmit() {
    // Reset errors
    serverError = "";
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
    if (Object.values(errors).every((error) => !error)) {
      submitForm();
    }
  }
</script>

<SignInCard >
  {#if isLoading}
    <div class="flex justify-center items-center w-full min-h-[420px]">
      <Jellyfish color="#4E8D8D" />
    </div>
  {:else}
    <form on:submit|preventDefault={handleSubmit} class="space-y-6" bind:this={form}>
      <h1 class="text-2xl font-bold text-center text-[#333333]">Войти</h1>

      <!-- Username Field -->
      <Input
        type="text"
        bind:value={nickname}
        name="username"
        placeholder="Введите имя пользователя"
        label="Имя пользователя"
        error={errors.nickname}
      />

      <!-- Password Field -->
      <Input
        type="password"
        bind:value={password}
        name="password"
        placeholder="Введите пароль"
        label="Пароль"
        error={errors.password}
      />

      <!-- Server Error Message -->
      {#if serverError}
        <p class="text-[#FF4D4D] text-sm text-center">{serverError}</p>
      {/if}

      <!-- Buttons -->
      <div class="flex flex-col gap-4">
        <button
          type="submit"
          class="btn bg-[#4E8D8D] text-white font-bold py-3 rounded-md shadow-md hover:bg-[#3A7373] transition-all duration-300"
        >
          Войти
        </button>
        <a
          href="/auth/signup"
          class="btn btn-ghost border border-[#4E8D8D] text-[#4E8D8D] font-bold py-3 rounded-md hover:bg-[#4E8D8D] hover:text-white transition-all duration-300"
        >
          Зарегистрироваться
        </a>
        <a
          href="/auth/forgot-password"
          class="text-[#4E8D8D] text-sm text-center underline hover:text-[#3A7373] transition-colors duration-300"
        >
          Забыли пароль?
        </a>
      </div>
    </form>
  {/if}
</SignInCard>