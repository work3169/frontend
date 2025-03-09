<script lang="ts">
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";

  let animationInterval: number;

  onMount(() => {
    // Инициализация графика объема инвестиций
    const investmentChartCtx = document.getElementById("investmentChart") as HTMLCanvasElement;
    new Chart(investmentChartCtx, {
      type: "line",
      data: {
        labels: ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"],
        datasets: [
          {
            label: "Инвестиции (млрд USD)",
            data: [5.2, 6.8, 8.4, 10.1, 11.3, 15.6, 24.6, 34, 38],
            borderColor: "#007bff",
            backgroundColor: "rgba(0, 123, 255, 0.2)",
            borderWidth: 2,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true, position: "top" },
        },
        scales: {
          x: { grid: { display: false } },
          y: { beginAtZero: true },
        },
      },
    });

    return () => clearInterval(animationInterval); // Очистка интервала при уничтожении компонента
  });
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    box-sizing: border-box;
  }

  .text-section {
    text-align: center;
    margin-bottom: 40px;
  }

  .text-title {
    font-size: 2.5rem;
    font-weight: bold;
    color: #2c3e50;
    margin-bottom: 1rem;
  }

  .text-content {
    font-size: 1.2rem;
    color: #393939;
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  .animation-section {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 40px;
  }

  .box {
    width: 120px;
    height: 150px;
    background-color: #007bff;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .box:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  }

  .chart-container {
    width: 100%;
    margin-bottom: 40px;
  }

  canvas {
    width: 100% !important;
    height: 300px !important;
  }

  /* Медиа-запросы для мобильных устройств */
  @media (max-width: 768px) {
    .text-title {
      font-size: 1.8rem; /* Уменьшаем заголовок */
    }

    .text-content {
      font-size: 1rem; /* Уменьшаем основной текст */
    }

    .box {
      width: 90px; /* Уменьшаем ширину блоков */
      height: 120px; /* Уменьшаем высоту блоков */
      font-size: 0.8rem; /* Уменьшаем текст внутри блоков */
    }

    canvas {
      height: 200px !important; /* Уменьшаем высоту графика */
    }
  }

  @media (max-width: 480px) {
    .text-title {
      font-size: 1.5rem; /* Еще больше уменьшаем заголовок */
    }

    .text-content {
      font-size: 0.9rem; /* Еще больше уменьшаем основной текст */
    }

    .box {
      width: 80px; /* Еще больше уменьшаем ширину блоков */
      height: 100px; /* Еще больше уменьшаем высоту блоков */
      font-size: 0.7rem; /* Еще больше уменьшаем текст внутри блоков */
    }

    canvas {
      height: 150px !important; /* Еще больше уменьшаем высоту графика */
    }
  }
</style>

<div class="container">
  <div class="text-section">
    <h1 class="text-title">Информация о логистике</h1>
    <p class="text-content">
      Глобальная логистическая отрасль демонстрирует значительный рост и привлекает существенные инвестиции. В 2021 году объем инвестиций в логистические стартапы достиг рекордных 24,6 миллиарда долларов США, что почти вдвое превышает показатель 2020 года (12,6 миллиарда долларов США). Этот рост обусловлен повышенным вниманием к цепочкам поставок и необходимости их модернизации в условиях пандемии COVID-19.(TRANS.INFO)
    </p>
    <p class="text-content">
      В первой половине 2022 года инвестиции в логистическую инфраструктуру составили около 34 миллиардов долларов США, что на 13% больше по сравнению с аналогичным периодом предыдущего года. Основным драйвером этого роста является развитие электронной коммерции, объем которой в 2021 году увеличился на 13,3% и достиг примерно 88,1 миллиарда евро.
(MORDOR INTELLIGENCE)
    </p>
    <p class="text-content">
      В целом, несмотря на текущие экономические и геополитические вызовы, логистическая отрасль продолжает привлекать значительные инвестиции, отражая ее ключевую роль в обеспечении эффективных цепочек поставок и удовлетворении растущих потребностей мировой экономики.(PWC)
    </p>
  </div>

  <div class="animation-section">
    <div class="box">TRANS.INFO</div>
    <div class="box">M.INT</div>
    <div class="box">PWC</div>
  </div>

  <div class="chart-container">
    <h2>График объема инвестиций в логистические стартапы</h2>
    <canvas id="investmentChart"></canvas>
  </div>
</div>