<script lang="ts">
    import { onMount } from "svelte";
  
    let statsVisible = false;
  
    onMount(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              statsVisible = true;
            }
          });
        },
        { threshold: 0.5 }
      );
      const section = document.querySelector(".investment-section");
      if (section) observer.observe(section);
    });
  
    const stats = [
      { label: "Инвесторов", value: 15000, suffix: "+" },
      { label: "Управляемых активов", value: 120, suffix: " млн $" },
      { label: "Годовая доходность", value: 18, suffix: "%" },
      { label: "Проектов", value: 350, suffix: "+" }
    ];
  </script>
  
  <style>
    .investment-section {
      
      padding: 50px 20px;
      text-align: center;
      overflow: hidden;
      position: relative;
      color: white; /* Белый текст для контраста */
    }
  
    .investment-header h2 {
      font-size: 2.5rem;
      margin: 0;
      color: white; /* Белый заголовок */
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); /* Добавляем легкую тень */
    }
  
    .investment-header p {
      font-size: 1.2rem;
      color: rgba(255, 255, 255, 0.8); /* Полупрозрачный белый */
      margin-top: 10px;
    }
  
    .stats-container {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 40px;
      margin-top: 40px;
    }
  
    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 1.5rem;
      font-weight: bold;
      color: white; /* Белый текст */
      transition: transform 0.3s ease, opacity 0.3s ease;
      opacity: 0; /* Начинаем с прозрачности 0 */
      transform: translateY(20px); /* Начальное положение */
    }
  
    .stat-item.visible {
      opacity: 1; /* Появление */
      transform: translateY(0); /* Возвращаем на место */
    }
  
    .stat-item .value {
      font-size: 3rem;
      color: #fff; /* Белый цвет значений */
      animation: fadeIn 1s ease-out;
    }
  
    .stat-item .label {
      font-size: 1rem;
      margin-top: 10px;
      color: rgba(255, 255, 255, 0.8); /* Полупрозрачный белый */
    }
  
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  
    @media (max-width: 768px) {
      .investment-header h2 {
        font-size: 2rem;
      }
      .stats-container {
        gap: 20px;
      }
      .stat-item .value {
        font-size: 2.5rem;
      }
    }
  </style>
  
  <section class="investment-section">
    <div class="investment-header">
      <h2>Откройте мир инвестиций</h2>
      <p>Присоединяйтесь к тысячам успешных инвесторов и увеличивайте свои активы.</p>
    </div>
    <div class="stats-container">
      {#each stats as { label, value, suffix }, i}
        <div class="stat-item" class:visible={statsVisible}>
          <div class="value">
            {#if statsVisible}
              {value}{suffix}
            {/if}
          </div>
          <div class="label">{label}</div>
        </div>
      {/each}
    </div>
  </section>