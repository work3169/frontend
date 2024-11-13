<script lang="ts">
    import HeaderContainer from "components/Profile/HeaderContainer.svelte";
    import NewPartneredContractsTable from "components/Profile/NewPartneredContractsTable.svelte";
</script>

<HeaderContainer>
    <h1 class="font-medium text-2xl">Создать партнерский контракт</h1>
    <div class="flex flex-wrap gap-2">
      <a class="btn btn-outline btn-neutral" href="/profile/contracts/partnered">Партнерские контракты</a>
      <a class="btn btn-outline btn-neutral" href="/profile/contracts">Все контракты</a>
    </div>
</HeaderContainer>
<NewPartneredContractsTable />