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
          chartData = sectors.map((sector) => ({
            ...sector,
            percentage: Math.min(sector.percentage, totalPercentage)
          }));
        } else {
          clearInterval(interval);
        }
      }, 30);
    });
  
    function calculateArc(percentage: number, radius: number) {
      const endAngle = (percentage / 100) * Math.PI * 2;
      const x = radius + radius * Math.sin(endAngle);
      const y = radius - radius * Math.cos(endAngle);
      const largeArc = percentage > 50 ? 1 : 0;
  
      return `M ${radius},${radius} L ${radius},0 A ${radius},${radius} 0 ${largeArc},1 ${x},${y} Z`;
    }
  </script>
  
  <style>
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 900px;
      margin: 0 auto;
      padding: 20px;
      border-radius: 15px;
      background: #ffffff;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
  
    .header {
      font-size: 2rem;
      font-weight: bold;
      color: #4E8D8D;
      margin-bottom: 20px;
      text-align: center;
    }
  
    .text-section {
      margin-bottom: 40px;
      line-height: 1.6;
      color: #2C3E50;
      font-size: 1.1rem;
      text-align: justify;
    }
  
    .chart-container {
      position: relative;
      width: 220px;
      height: 220px;
      margin: 20px auto;
    }
  
    .chart {
      position: absolute;
      top: 0;
      left: 0;
    }
  
    .chart-label {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 1.4rem;
      font-weight: bold;
      color: #34495E;
    }
  
    .legend {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
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
    }
  
    .legend-text {
      color: #2C3E50;
      font-size: 1rem;
    }
  </style>
  
  <div class="container">
    <div class="header">Логистические перспективы</div>
  
    <div class="text-section">
      <p>
        Инвестиции в логистику играют ключевую роль в развитии мировой экономики. Оптимизация складских систем, развитие транспортной инфраструктуры и внедрение цифровых технологий — вот основные направления, которые требуют внимания инвесторов.
      </p>
      <p>
        Использование экологически чистых технологий, таких как электрический транспорт, и модернизация морской логистики позволяют снизить затраты и уменьшить углеродный след.
      </p>
    </div>
  
    <div class="chart-container">
      <svg width="{chartRadius * 2}" height="{chartRadius * 2}">
        {#each chartData as { percentage, color }}
          <path
            class="chart"
            d="{calculateArc(percentage, chartRadius)}"
            fill="{color}"
            style="transition: d 0.5s cubic-out;"
          />
        {/each}
      </svg>
      <div class="chart-label">{totalPercentage}%</div>
    </div>
  
    <div class="legend">
      {#each sectors as { name, color }}
        <div class="legend-item">
          <div class="legend-color" style="background-color: {color};"></div>
          <span class="legend-text">{name}</span>
        </div>
      {/each}
    </div>
  </div>
  