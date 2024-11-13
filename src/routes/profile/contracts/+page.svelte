<script lang="ts">
  import HeaderContainer from "components/Profile/HeaderContainer.svelte";
  import ContractsTable from "components/Profile/ContractsTable.svelte";
</script>


<HeaderContainer>
  <h1 class="font-medium text-2xl">Управление контрактами</h1>
  <div class="flex flex-wrap gap-2">
    <a class="btn btn-primary" href="/profile/contracts/new">Добавить контракт</a>
    <a class="btn btn-outline btn-neutral" href="/profile/contracts/partnered">Партнерские контракты</a>
  </div>
</HeaderContainer>
<ContractsTable />

