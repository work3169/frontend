<script lang="ts">
  import SigninCard from "components/Auth/SigninCard.svelte";
  import { browser } from "$app/environment";
  let uuid = "";
  if (browser) {
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);

    uuid = urlParams.get('uuid') || "";

    
  }
  /* --- i18n --- */
  import i18next from "../../../lib/i18n";              /* скорректируйте путь при необходимости */
  import { writable } from "svelte/store";
  const t = writable<(k: string) => string>((k) => i18next.t(k) as string);
  i18next.on("languageChanged", () =>
    t.set((k) => i18next.t(k) as string)
  );

</script>

<SigninCard>
  <h1 class="mb-6 font-semibold text-lg text-center">{$t("registrationConfirmation.title")}</h1>
  <p class="text-center">{$t("registrationConfirmation.instruction")}</p>
  <p class="text-center my-3"><a class="link-primary fw-bold text-success" href={uuid}>{uuid}</a></p>
  <p class="text-center my-2">{$t("registrationConfirmation.afterConfirmation")}</p>
  
</SigninCard>