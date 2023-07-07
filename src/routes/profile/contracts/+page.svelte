<script lang="ts">
  import FillerTable from "components/Profile/FillerTable.svelte";
  import HeaderContainer from "components/Profile/HeaderContainer.svelte";
  import ContractsTable from "components/Profile/ContractsTable.svelte";
</script>


<HeaderContainer>
  <h1 class="font-medium text-2xl">Управление контрактами</h1>
  <a class="btn btn-primary" href="/profile/contracts/new">Добавить контракт</a>
</HeaderContainer>
<ContractsTable />

