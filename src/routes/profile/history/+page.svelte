<script lang="ts">
  import FillerTable from "components/Profile/FillerTable.svelte";
  import HeaderContainer from "components/Profile/HeaderContainer.svelte";
</script>


<HeaderContainer>
  <h1 class="font-medium text-2xl">История баланса</h1>
  <div class="flex gap-4">
    <button class="btn btn-primary">Внести средства</button>
    <button class="btn btn-primary">Вывести средства</button>
  </div>
</HeaderContainer>
<div class="flex flex-wrap gap-4 mt-16">
<div class="stats stats-vertical shadow"> 
  <div class="stat">
    <div class="stat-title">Общий баланс</div>
    <div class="stat-value text-primary">89,400</div>
    <div class="stat-desc">21% заработка</div>
  </div>
</div>
<div class="stats stats-vertical shadow"> 
  <div class="stat">
    <div class="stat-title">Cредний баланс или что угодно</div>
    <div class="stat-value text-secondary-focus">49,400</div>
    <div class="stat-desc">На 41% заработка больше среднего</div>
  </div>
</div>
<div class="stats stats-vertical shadow"> 
  <div class="stat">
    <div class="stat-title">Cредний баланс или что угодно</div>
    <div class="stat-value text-secondary-focus">49,400</div>
    <div class="stat-desc">На 41% заработка больше среднего</div>
  </div>
</div>
</div>
<FillerTable />
