<script lang="ts">
  import { onMount } from "svelte";
  import i18next from '../../lib/i18n';
  import { writable } from 'svelte/store';

  // Создаем store для перевода
  const t = writable((key: string) => i18next.t(key));

  // Обновляем store при изменении языка
  i18next.on('languageChanged', () => {
    t.set((key: string) => i18next.t(key));
  });

  interface City {
    key: string; // Ключ для перевода названия города
    x: number;   // Координата X в процентах
    y: number;   // Координата Y в процентах
  }

  // Список городов с ключами для перевода
  const cities: City[] = [
    { key: 'cities.moscow', x: 60, y: 20 },
    { key: 'cities.newyork', x: 15, y: 30 },
    { key: 'cities.tokyo', x: 85, y: 60 },
    { key: 'cities.london', x: 45, y: 35 },
    { key: 'cities.berlin', x: 40, y: 60 },
    { key: 'cities.sydney', x: 90, y: 90 },
    { key: 'cities.dubai', x: 45, y: 90 },
    { key: 'cities.paris', x: 65, y: 40 }
  ];

  let map: SVGSVGElement | null = null;

  onMount(() => {
    // Анимации или дополнительная логика
  });
</script>

<style>
  .section {
    position: relative;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.3);
    padding: 20px 0;
    box-sizing: border-box;
  }

  .header {
    margin-bottom: 10px;
  }

  .header h1 {
    font-size: 2.5rem;
    margin: 0;
    color: #333;
  }

  .header p {
    font-size: 1.2rem;
    color: #666;
  }

  .map-container {
    position: relative;
    width: 100%;
    height: calc(80vh - 100px);
    max-height: 600px;
    max-width: 1200px;
    margin: 10px auto;
    overflow: hidden;
  }

  .map {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .city {
    fill: #4E8D8D;
    stroke: white;
    stroke-width: 2;
    cursor: pointer;
    animation: pulse 2s infinite;
  }

  .line {
    stroke: #6DA0A0;
    stroke-width: 2;
    stroke-dasharray: 5 5;
    animation: draw 2s ease-in-out infinite alternate;
  }

  @keyframes draw {
    from {
      stroke-dashoffset: 100;
    }
    to {
      stroke-dashoffset: 0;
    }
  }

  .city-label {
    fill: #333;
    font-size: 8px;
    font-weight: bold;
    text-anchor: middle;
    pointer-events: none;
    transform: translateY(-15px);
    z-index: 10;
  }

  @media (max-width: 768px) {
    .map-container {
      height: calc(60vh - 80px);
      margin: 5px auto;
    }

    .header h1 {
      font-size: 2rem;
    }

    .header p {
      font-size: 1rem;
    }
  }
</style>

<section class="section">
  <!-- Заголовок -->
  <div class="header">
    <h1>{$t('partners.title')}</h1>
    <p>{$t('partners.subtitle')}</p>
  </div>

  <!-- Карта -->
  <div class="map-container">
    <svg bind:this={map} viewBox="0 0 200 100" class="map">
      <!-- Линии -->
      {#each cities.slice(0, cities.length - 1) as { x, y }, i}
      <line
        class="line"
        x1={`${x}%`}
        y1={`${y}%`}
        x2={`${cities[i + 1].x}%`}
        y2={`${cities[i + 1].y}%`}
      />
      {/each}

      <!-- Точки и названия -->
      {#each cities as { key, x, y }, i}
      <g>
        <!-- Точка города -->
        <circle
          class="city"
          cx={`${x}%`}
          cy={`${y}%`}
          r="5"
          on:mouseover={() => console.log($t(key))}
          on:focus={() => console.log($t(key))}
          role="button"
          tabindex="0"
          aria-label={$t(key)}
        />
        <!-- Название города -->
        <text
          class="city-label"
          x={`${x}%`}
          y={`${y}%`}
        >
          {$t(key)}
        </text>
      </g>
      {/each}
    </svg>
  </div>
</section>