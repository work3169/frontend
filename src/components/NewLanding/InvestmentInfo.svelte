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
    .container {
      max-width: 800px;
      margin: 40px auto;
      padding: 20px;
      border-radius: 15px;
      background: #ffffff;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      text-align: center;
      font-family: Arial, sans-serif;
    }
  
    .header {
      font-size: 2rem;
      font-weight: bold;
      color: #4E8D8D;
      margin-bottom: 20px;
    }
  
    .progress-bar {
      display: flex;
      height: 20px;
      border-radius: 10px;
      overflow: hidden;
      margin: 20px 0;
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  
    .sector {
      transition: width 1s ease;
    }
  
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
      color: #34495E;
    }
  
    .details-item .value {
      color: #16A085;
    }
  </style>
  
  <div class="container">
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
  