<script lang="ts">
  import { onMount } from "svelte";

  let totalInvestment = 100000; // Общая сумма инвестиций
  let sectors = [
    { name: "Складские системы", percentage: 35, color: "#4E8D8D" },
    { name: "Транспортная инфраструктура", percentage: 25, color: "#2C3E50" },
    { name: "Цифровизация", percentage: 20, color: "#16A085" },
    { name: "Экологичный транспорт", percentage: 15, color: "#F39C12" },
    { name: "Морская логистика", percentage: 5, color: "#E74C3C" }
  ];

  let currentPercentage = 0;

  // Анимация заполнения
  onMount(() => {
    const interval = setInterval(() => {
      if (currentPercentage < 100) {
        currentPercentage += 1;
      } else {
        clearInterval(interval);
      }
    }, 30);
  });
</script>

<style>
  /* Основной контейнер */
  .container {
    max-width: 800px;
    margin: 40px auto;
    padding: 40px 20px;
    border-radius: 20px;
    background: linear-gradient(to right, #4E8D8D, #6DA0A0); /* Градиент из вашей палитры */
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    text-align: center;
    font-family: Arial, sans-serif;
    position: relative;
    overflow: hidden;
    color: white;
  }

  /* Заголовок */
  .header {
    font-size: 2.5rem;
    font-weight: bold;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    margin-bottom: 20px;
  }

  /* Прогресс бар */
  .progress-bar {
    display: flex;
    height: 25px;
    border-radius: 15px;
    overflow: hidden;
    margin: 20px 0;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .sector {
    height: 100%;
    transition: width 1s ease;
  }

  /* Детали */
  .details {
    margin-top: 20px;
  }

  .details-item {
    margin: 10px 0;
    font-size: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .details-item .name {
    font-weight: bold;
    color: rgba(255, 255, 255, 0.9);
  }

  .details-item .value {
    color: #16A085;
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

    .progress-bar {
      height: 20px;
    }

    .details-item {
      font-size: 0.9rem;
    }
  }
</style>

<div class="container">
  <!-- Декоративный элемент -->
  <div class="decorative-circle"></div>

  <!-- Заголовок -->
  <div class="header">Распределение инвестиций</div>

  <!-- Прогресс бар -->
  <div class="progress-bar">
    {#each sectors as sector (sector.name)}
      <div
        class="sector"
        style="width: {Math.min(currentPercentage, sector.percentage)}%; background-color: {sector.color};"
        title="{sector.name}: {sector.percentage}%"
      ></div>
    {/each}
  </div>

  <!-- Детали -->
  <div class="details">
    {#each sectors as sector}
      <div class="details-item">
        <span class="name">{sector.name}</span>
        <span class="value">${(totalInvestment * sector.percentage / 100).toFixed(2)}</span>
      </div>
    {/each}
  </div>
</div>