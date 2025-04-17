<script lang="ts">
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";
  import i18next from "../../lib/i18n";
  import { writable } from "svelte/store";

  // Подключаем i18n
  const t = writable((key: string) => i18next.t(key));
  i18next.on("languageChanged", () => {
    t.set((key: string) => i18next.t(key));
  });

  let animationInterval: number = 0;

  onMount(() => {
    // Инициализация графика
    const investmentChartCtx = document.getElementById("investmentChart") as HTMLCanvasElement;
    new Chart(investmentChartCtx, {
      type: "line",
      data: {
        labels: ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"],
        datasets: [
          {
            label: $t("investmentInfo.chartTitle"),
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

    return () => clearInterval(animationInterval);
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
      font-size: 1.8rem;
    }
    .text-content {
      font-size: 1rem;
    }
    .box {
      width: 90px;
      height: 120px;
      font-size: 0.8rem;
    }
    canvas {
      height: 200px !important;
    }
  }

  @media (max-width: 480px) {
    .text-title {
      font-size: 1.5rem;
    }
    .text-content {
      font-size: 0.9rem;
    }
    .box {
      width: 80px;
      height: 100px;
      font-size: 0.7rem;
    }
    canvas {
      height: 150px !important;
    }
  }
</style>

<section id="stats-section">
  <div class="container">
    <!-- Заголовок -->
    <div class="text-section">
      <h1 class="text-title">{$t("investmentInfo.title")}</h1>
      <!-- Параграфы -->
      <p class="text-content">
        {$t("investmentInfo.paragraphs.p1")}
      </p>
      <p class="text-content">
        {$t("investmentInfo.paragraphs.p2")}
      </p>
      <p class="text-content">
        {$t("investmentInfo.paragraphs.p3")}
      </p>
    </div>

    <!-- Три синих «коробки» -->
    <div class="animation-section">
      <div class="box">{$t("investmentInfo.boxes.b1")}</div>
      <div class="box">{$t("investmentInfo.boxes.b2")}</div>
      <div class="box">{$t("investmentInfo.boxes.b3")}</div>
    </div>

    <!-- График -->
    <div class="chart-container">
      <h2>{$t("investmentInfo.chartTitle")}</h2>
      <canvas id="investmentChart"></canvas>
    </div>
  </div>
</section>
