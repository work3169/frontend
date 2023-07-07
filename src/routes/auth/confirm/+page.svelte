<script lang="ts">
  import SigninCard from "components/Auth/SigninCard.svelte";
  import { browser } from "$app/environment";
  let uuid = "";
  if (browser) {
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);

    uuid = urlParams.get('uuid') || "";
  }

</script>

<SigninCard>
  <h1 class="mb-6 font-semibold text-lg text-center">Подтверждение регистрации</h1>
  <p class="text-center">Подтвердите регистрацию, перейдя в телеграм.</p>
  <p class="text-center my-3"><a class="link-primary" href={uuid}>{uuid}</a></p>
  <p class="text-center my-2">После подтверждения регистрации, вы можете войти в свой аккаунт.</p>
  <a class="btn btn-outline rounded-xl btn-block mt-4" href="/auth/login">Войти</a>
</SigninCard>