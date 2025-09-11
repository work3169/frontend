<script lang="ts">
  import { onMount } from "svelte";
  import i18next from "../../lib/i18n"; 
  import { writable } from "svelte/store";

  // Создаем store для перевода
  const t = writable((key: string) => i18next.t(key));

  // Обновляем store при изменении языка
  i18next.on("languageChanged", () => {
    t.set((key: string) => i18next.t(key));
  });

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
    const section = document.querySelector(".possibilities-section");
    if (section) observer.observe(section);
  });

  // Массив с ключами переводов вместо прямых строк
  const stats = [
    { labelKey: "possibilities.stats.investors", value: 15000, suffix: "+" },
    { labelKey: "possibilities.stats.assets",    value: 120,   suffix: " M $" },
    { labelKey: "possibilities.stats.projects",  value: 350,   suffix: "+" }
  ];
</script>

<style>
  .possibilities-section {
    padding: 50px 20px;
    text-align: center;
    overflow: hidden;
    position: relative;
    color: white; /* Белый текст для контраста */
  }

  .possibilities-header h2 {
    font-size: 2.5rem;
    margin: 0;
    color: white; /* Белый заголовок */
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); /* Добавляем легкую тень */
  }

  .possibilities-header p {
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
    .possibilities-header h2 {
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

<section id="about-section" class="possibilities-section">
  <div class="possibilities-header">
    <!-- Заголовок и описание теперь берем из possibilities.title / .description -->
    <h2>{$t("possibilities.title")}</h2>
    <p>{$t("possibilities.description")}</p>
  </div>

  <div class="stats-container">
    {#each stats as { labelKey, value, suffix }}
      <div class="stat-item" class:visible={statsVisible}>
        <div class="value">
          {#if statsVisible}
            {value}{suffix}
          {/if}
        </div>
        <!-- Переводим ярлык счётчика через labelKey -->
        <div class="label">{$t(labelKey)}</div>
      </div>
    {/each}
  </div>
</section>
