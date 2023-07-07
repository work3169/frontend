<script lang="ts">
  import EcologyCard from "./EcologyCard.svelte";
</script>

<div class="text-center mt-28 mb-12">
  <h3 class="block mb-[-5px] text-l text-gray-500">Зеленая энергия</h3>
  <h2 class="text-4xl font-bold">Основные продукты</h2>
  <p class="block text-xl text-gray-500">Наша компания вкладывает во все основные направления возобновляемой энергии</p>
</div>
<div class="flex flex-wrap gap-4 justify-around">
  <EcologyCard
    title="Солнечная Енергия"
    text="Эти технологии позволяют преобразовывать солнечный свет в электрическую энергию с помощью фотоэлектрических панелей либо зеркал."
    image="cards/sun.webp"
    href="/infobase/solar"
  />
  <EcologyCard
    title="Энергия Ветра"
    text="Ветроэнергетика использует кинетическую энергию движущегося воздуха с помощью больших ветряных турбин."
    image="cards/wind.webp"
    href="/infobase/wind"
  />
  <EcologyCard
    title="Геотермальная Энергия"
    text="Геотермальная энергетика использует тепло из геотермальных резервуаров."
    image="cards/geotermal.webp"
    href="/infobase/geo"
  />
  <EcologyCard
    title="Гидроэнергия"
    text="Гидроэнергетика использует энергию воды, перемещающейся с большей высоты на меньшую."
    image="cards/water.webp"
    href="/infobase/hydro"
  />
  <EcologyCard
    title="Энергия Океана"
    text="Для получения энергии океана применяются технологии, основанные на использовании кинетической и тепловой энергии морской воды."
    image="cards/ocean.webp"
    href="/infobase/ocean"
  />
  <EcologyCard
    title="Биоэнергия"
    text="Биоэнергию получают из органических материалов, называемых биомассой, для получения биотоплива."
    image="cards/biomass.webp"
    href="/infobase/bio"
  />
</div>