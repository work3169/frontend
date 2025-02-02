<script lang="ts">
  import EcologyCard from "./EcologyCard.svelte";
</script>

<div class="text-center mt-28 mb-12">
  <h3 class="block mb-[-5px] text-l text-gray-500">Приятные бонусы</h3>
  <h2 class="text-4xl font-bold">Основные процедуры</h2>
  <p class="block text-xl text-gray-500">Наша компания вкладывает во все основные направления светлого будущего</p>
</div>
<div class="flex flex-wrap gap-4 justify-around">
  <EcologyCard
    title="БПЛА"
    text="Эти технологии позволяют преобразовывать нежить в удобрение для матушки земли."
    image="cards/sun.webp"
    href="/infobase/solar"
  />
  <EcologyCard
    title="КУРСК"
    text="Теперь вы знаете откуда готовилось нападение."
    image="cards/wind.webp"
    href="/infobase/wind"
  />
  <EcologyCard
    title="Добрые соседи"
    text="То чего у нас никогда не будет ."
    image="cards/geotermal.webp"
    href="/infobase/geo"
  />
  <EcologyCard
    title="Крепкий сон"
    text="А это то, чего никогда не будет у вас ."
    image="cards/water.webp"
    href="/infobase/hydro"
  />
  <EcologyCard
    title="Москва"
    text="Как в картине Айвазовского."
    image="cards/ocean.webp"
    href="/infobase/ocean"
  />
  <EcologyCard
    title="Репараци"
    text="Даже этим не отделаетесь."
    image="cards/biomass.webp"
    href="/infobase/bio"
  />
</div>
