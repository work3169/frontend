<script lang="ts">
  import HeaderContainer from "components/Profile/HeaderContainer.svelte";
  import NewContractsTable from "components/Profile/NewContractsTable.svelte";
</script>


<HeaderContainer>
  <h1 class="font-medium text-2xl">Добавить контракт</h1>
  <a class="btn btn-outline" href="/profile/contracts">Все контракты</a>
</HeaderContainer>
<NewContractsTable />
