<script lang="ts">
  import HeaderContainer from "components/Profile/HeaderContainer.svelte";
  import NewPartneredContractsTable from "components/Profile/NewPartneredContractsTable.svelte";

  /* --- i18n --- */
  import i18next from "../../../../../lib/i18n";           /* поправьте путь, если нужно */
  import { writable } from "svelte/store";
  const t = writable<(k: string) => string>((k) => i18next.t(k) as string);
  i18next.on("languageChanged", () =>
    t.set((k) => i18next.t(k) as string)
  );
</script>

<HeaderContainer>
  <h1 class="font-bold text-2xl text-[#333333]">
    {$t('partneredAdd.title')}
  </h1>

  <div class="flex flex-wrap gap-2 mt-4">
    <a
      href="/profile/contracts/partnered"
      class="btn border border-[#4E8D8D] text-[#4E8D8D] font-bold py-2 px-4 rounded-md hover:bg-[#4E8D8D] hover:text-white transition-all duration-300"
    >
      {$t('partneredAdd.partneredBtn')}
    </a>

    <a
      href="/profile/contracts"
      class="btn border border-[#4E8D8D] text-[#4E8D8D] font-bold py-2 px-4 rounded-md hover:bg-[#4E8D8D] hover:text-white transition-all duration-300"
    >
      {$t('partneredAdd.allBtn')}
    </a>
  </div>
</HeaderContainer>

<NewPartneredContractsTable />
