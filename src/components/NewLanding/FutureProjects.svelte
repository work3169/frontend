<script lang="ts">
  import i18next from '../../lib/i18n';
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';

  // Шаг 1: создаём store для перевода
  const t = writable((key: string) => i18next.t(key));
  i18next.on('languageChanged', () => {
    t.set((key: string) => i18next.t(key));
  });

  // Данные по секторам: цвет и целевые проценты (анимация)
  let sectors = [
    { color: '#4E8D8D', percentage: 35 },
    { color: '#2C3E50', percentage: 25 },
    { color: '#16A085', percentage: 20 },
    { color: '#F39C12', percentage: 15 },
    { color: '#E74C3C', percentage: 5 },
  ];

  // Начальное состояние анимированных процентов (все 0)
  let animatedPercentages = Array(sectors.length).fill(0);

  // Шаг 2: При монтировании компонента запускаем интервал для «нарастания» процентов
  onMount(() => {
    const interval = setInterval(() => {
      animatedPercentages = animatedPercentages.map((current, index) => {
        const target = sectors[index].percentage;
        return current < target ? Math.min(current + 1, target) : current;
      });

      // Когда все достигли целевых значений, очищаем интервал
      if (animatedPercentages.every((val, idx) => val === sectors[idx].percentage)) {
        clearInterval(interval);
      }
    }, 30);

    // Не забываем очистить интервал, если компонент размонтируют
    return () => clearInterval(interval);
  });
</script>

<style>
  /* Контейнер */
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 900px;
    margin: 0 auto;
    padding: 40px 20px;
    border-radius: 20px;
    background: linear-gradient(to right, #4E8D8D, #6DA0A0);
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

  /* Текст */
  .text-section {
    margin-bottom: 40px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.9);
    font-size: 1.1rem;
    text-align: justify;
  }

  /* Контейнер для столбиков */
  .chart-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  /* Каждая строка (столбик) */
  .bar {
    display: flex;
    align-items: center;
    gap: 10px;
  }

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

<div class="container" id="future-projects-section">
  <!-- Заголовок -->
  <div class="header">
    {$t('futureProjects.title')}
  </div>

  <!-- Текст -->
  <div class="text-section">
    {$t('futureProjects.paragraph')}
  </div>

  <!-- Столбики -->
  <div class="chart-container">
    {#each sectors as sector, index}
      <div class="bar">
        <!-- Название сектора. В i18n: futureProjects.sectors[index].name -->
        <span class="legend-text">
          {$t(`futureProjects.sectors.${index}.name`)}
        </span>

        <div class="progress-bar">
          <div
            class="progress-fill"
            style="background-color: {sector.color}; width: {animatedPercentages[index]}%;"
          ></div>
        </div>

        <!-- Текущее значение процентов -->
        <span class="legend-text">{animatedPercentages[index]}%</span>
      </div>
    {/each}
  </div>
</div>
