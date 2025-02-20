<script lang="ts">
  import NewsCard from "./NewsCard.svelte";
</script>

<h1 class="text-4xl font-semibold mb-8 text-center">Новости</h1>
<div class="flex flex-wrap justify-around items-stretch  gap-4">
  <NewsCard
    isNew
    title="Думаешь ты не виноват?"
    text="Каждый твой рубль спонсирует ракеты."
    imgSrc="cards/biomass.webp"
  />
  <NewsCard
    title="Думаешь отсидеться?"
    text="У вравосудия замечательное чувство юмора."
    imgSrc="cards/water.webp"
  />
  <NewsCard
    title="Хотела на мальдивы со спиногрызом?"
    text="Теперь только вкусно и точка"
    imgSrc="cards/wind.webp"
  />
</div>