<script lang="ts">
  import { onMount } from "svelte";

  // Данные для графика
  let sectors = [
    { name: "Складские системы", percentage: 35, color: "#4E8D8D" },
    { name: "Транспортная инфраструктура", percentage: 25, color: "#2C3E50" },
    { name: "Цифровизация", percentage: 20, color: "#16A085" },
    { name: "Экологичный транспорт", percentage: 15, color: "#F39C12" },
    { name: "Морская логистика", percentage: 5, color: "#E74C3C" }
  ];

  let animatedPercentages = Array(sectors.length).fill(0); // Массив для анимации

  // Анимация заполнения столбцов
  onMount(() => {
    const interval = setInterval(() => {
      animatedPercentages = animatedPercentages.map((current, index) => {
        if (current < sectors[index].percentage) {
          return Math.min(current + 1, sectors[index].percentage);
        }
        return current;
      });

      // Останавливаем интервал, если все столбцы достигли целевого значения
      if (animatedPercentages.every((val, index) => val === sectors[index].percentage)) {
        clearInterval(interval);
      }
    }, 30);
  });
</script>

<style>
  /* Основной контейнер */
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 900px;
    margin: 0 auto;
    padding: 40px 20px;
    border-radius: 20px;
    background: linear-gradient(to right, #4E8D8D, #6DA0A0); /* Градиент из вашей палитры */
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15), 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    position: relative;
    color: white;
  }

  /* Заголовок */
  .header {
    font-size: 2.5rem;
    font-weight: bold;
    text-align: center;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    margin-bottom: 20px;
  }

  /* Текстовый блок */
  .text-section {
    margin-bottom: 40px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.9);
    font-size: 1.1rem;
    text-align: justify;
  }

  /* Контейнер для графика */
  .chart-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  /* Столбец */
  .bar {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  /* Прогресс-бар */
  .progress-bar {
    position: relative;
    height: 20px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.2);
    flex: 1;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    border-radius: 10px;
    transition: width 0.3s ease-in-out;
  }

  /* Легенда */
  .legend {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 10px;
    margin-top: 20px;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .legend-color {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }

  .legend-text {
    color: rgba(255, 255, 255, 0.9);
    font-size: 1rem;
    font-weight: bold;
  }

  /* Адаптивность */
  @media (max-width: 768px) {
    .header {
      font-size: 2rem;
    }

    .text-section {
      font-size: 1rem;
    }

    .progress-bar {
      height: 15px;
    }
  }
</style>

<div class="container">
  <!-- Заголовок -->
  <div class="header">Логистические перспективы</div>

  <!-- Текстовый блок -->
  <div class="text-section">
    <p>
      Прогнозы указывают на дальнейший рост мирового рынка логистических услуг, который к 2026 году может достигнуть 100 миллиардов евро, во многом благодаря быстрому развитию электронной торговли.
(FINAM)
    </p>
  </div>

  <!-- Горизонтальные столбцы -->
  <div class="chart-container">
    {#each sectors as sector, index}
      <div class="bar">
        <span class="legend-text">{sector.name}</span>
        <div class="progress-bar">
          <div
            class="progress-fill"
            style="background-color: {sector.color}; width: {animatedPercentages[index]}%;"
          ></div>
        </div>
        <span class="legend-text">{animatedPercentages[index]}%</span>
      </div>
    {/each}
  </div>

  <!-- Легенда -->
  
</div>