<script lang="ts">
  import LandingCard from "./LandingCard.svelte";

  const content1 = `Вся ваша инфа теперь в нашей базе.`
  const content2 = `Ваши деньги теперь отрывают оркам морды.`
  const content3 = `Спасибо за убитых русских и за донаты на ЗСУ.`
</script>

<div class="grid grid-cols-1 sm:grid-cols-3 w-full sm:flex-row gap-[12px] xl:max-w-[1098px] mx-auto mt-[-40px] px-2">
  <LandingCard title="Мнформация" content={content1} />
  <LandingCard title="Финансы" content={content2} icon="target-lock" />
  <LandingCard title="Приятности" content={content3} icon="search" />
</div>