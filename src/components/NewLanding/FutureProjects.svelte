<script lang="ts">
  import { onMount } from "svelte";
  import { cubicOut } from "svelte/easing";

  let sectors = [
    { name: "Складские системы", percentage: 35, color: "#4E8D8D" },
    { name: "Транспортная инфраструктура", percentage: 25, color: "#2C3E50" },
    { name: "Цифровизация", percentage: 20, color: "#16A085" },
    { name: "Экологичный транспорт", percentage: 15, color: "#F39C12" },
    { name: "Морская логистика", percentage: 5, color: "#E74C3C" }
  ];

  let chartRadius = 100;
  let chartData: Array<{ percentage: number; color: string }> = [];
  let totalPercentage = 0;

  onMount(() => {
    // Запускаем анимацию заполнения кругового графика
    const interval = setInterval(() => {
      if (totalPercentage < 100) {
        totalPercentage += 1;
        chartData = sectors.map((sector, index) => {
          const cumulativePercentage =
            sectors.slice(0, index).reduce((sum, s) => sum + s.percentage, 0);
          return {
            ...sector,
            percentage: Math.min(
              sector.percentage,
              totalPercentage - cumulativePercentage
            )
          };
        });
      } else {
        clearInterval(interval);
      }
    }, 30);
  });

  function calculateArc(percentage: number, radius: number, offset: number) {
    const startAngle = (offset / 100) * Math.PI * 2;
    const endAngle = ((offset + percentage) / 100) * Math.PI * 2;
    const x1 = radius + radius * Math.cos(startAngle);
    const y1 = radius + radius * Math.sin(startAngle);
    const x2 = radius + radius * Math.cos(endAngle);
    const y2 = radius + radius * Math.sin(endAngle);
    const largeArc = percentage > 50 ? 1 : 0;

    return `M ${radius},${radius} L ${x1},${y1} A ${radius},${radius} 0 ${largeArc},1 ${x2},${y2} Z`;
  }
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
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    position: relative;
    color: white;
  }

  /* Заголовок */
  .header {
    font-size: 2.5rem;
    font-weight: bold;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    margin-bottom: 20px;
    text-align: center;
  }

  /* Текстовый блок */
  .text-section {
    margin-bottom: 40px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.9);
    font-size: 1.1rem;
    text-align: justify;
  }

  /* Контейнер графика */
  .chart-container {
    position: relative;
    width: 220px;
    height: 220px;
    margin: 20px auto;
  }

  /* Анимированный график */
  .chart {
    position: absolute;
    top: 0;
    left: 0;
    transition: d 0.5s cubic-out;
  }

  /* Центральная метка графика */
  .chart-label {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.4rem;
    font-weight: bold;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }

  /* Легенда */
  .legend {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
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

  /* Декоративные элементы */
  .decorative-circle {
    position: absolute;
    width: 200px;
    height: 200px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    top: -50px;
    right: -50px;
    z-index: 1;
    filter: blur(30px);
  }

  /* Адаптивность */
  @media (max-width: 768px) {
    .header {
      font-size: 2rem;
    }

    .text-section {
      font-size: 1rem;
    }

    .chart-container {
      width: 180px;
      height: 180px;
    }

    .chart-label {
      font-size: 1.2rem;
    }
  }
</style>

<div class="container">
  <!-- Декоративный элемент -->
  <div class="decorative-circle"></div>

  <!-- Заголовок -->
  <div class="header">Логистические перспективы</div>

  <!-- Текстовый блок -->
  <div class="text-section">
    <p>
      Прогнозы указывают на дальнейший рост мирового рынка логистических услуг, который к 2026 году может достигнуть 100 миллиардов евро, во многом благодаря быстрому развитию электронной торговли. 
(FINAM)
    </p>
    
  </div>

  <!-- Круговой график -->
  <div class="chart-container">
    <svg width="{chartRadius * 2}" height="{chartRadius * 2}">
      {#each chartData as { percentage, color }, index}
        <path
          class="chart"
          d="{calculateArc(percentage, chartRadius, sectors.slice(0, index).reduce((sum, s) => sum + s.percentage, 0))}"
          fill="{color}"
        />
      {/each}
    </svg>
    <div class="chart-label">{totalPercentage}%</div>
  </div>

  <!-- Легенда -->
  <div class="legend">
    {#each sectors as { name, color }}
      <div class="legend-item">
        <div class="legend-color" style="background-color: {color};"></div>
        <span class="legend-text">{name}</span>
      </div>
    {/each}
  </div>
</div>