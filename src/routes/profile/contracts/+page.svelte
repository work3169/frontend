<script lang="ts">
  import HeaderContainer from "components/Profile/HeaderContainer.svelte";
  import ContractsTable from "components/Profile/ContractsTable.svelte";
</script>

<HeaderContainer>
  <h1 class="font-bold text-2xl text-[#333333]">Управление контрактами</h1>
  <div class="flex flex-wrap gap-4 mt-4">
    <!-- Кнопка "Добавить контракт" -->
    <a
      href="/profile/contracts/new"
      class="btn bg-[#4E8D8D] text-white font-bold py-2 px-4 rounded-md shadow-md hover:bg-[#3A7373] transition-all duration-300"
    >
      Добавить контракт
    </a>

    <!-- Кнопка "Партнерские контракты" -->
    <a
      href="/profile/contracts/partnered"
      class="btn border border-[#4E8D8D] text-[#4E8D8D] font-bold py-2 px-4 rounded-md hover:bg-[#4E8D8D] hover:text-white transition-all duration-300"
    >
      Партнерские контракты
    </a>
  </div>
</HeaderContainer>

<ContractsTable />