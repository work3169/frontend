<script lang="ts">
  import LandingCard from "./LandingCard.svelte";

  const content1 = `Сбор информации на рынке для выявления самых волатильных финансовых ниш.`
  const content2 = `Разработка долгосрочных программ для эффективной программы вложений.`
  const content3 = `Собственная научная программа определения потенциальных энергетических проектов.`
</script>

<div class="grid grid-cols-1 sm:grid-cols-3 w-full sm:flex-row gap-[12px] xl:max-w-[1098px] mx-auto mt-[-40px] px-2">
  <LandingCard title="Аналитика" content={content1} />
  <LandingCard title="Стратегия" content={content2} icon="target-lock" />
  <LandingCard title="Исследования" content={content3} icon="search" />
</div>