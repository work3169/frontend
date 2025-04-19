<script lang="ts">
  import HeaderContainer from "components/Profile/HeaderContainer.svelte";
  import NewContractsTable from "components/Profile/NewContractsTable.svelte";

  /* --- i18n --- */
  import i18next from "../../../../lib/i18n";              /* скорректируйте путь при необходимости */
  import { writable } from "svelte/store";
  const t = writable<(k: string) => string>((k) => i18next.t(k) as string);
  i18next.on("languageChanged", () =>
    t.set((k) => i18next.t(k) as string)
  );
</script>

<HeaderContainer>
  <h1 class="font-medium text-2xl">{$t('newContractsPage.title')}</h1>
  <a class="btn btn-outline" href="/profile/contracts">{$t('newContractsPage.allContracts')}</a>
</HeaderContainer>

<NewContractsTable />
