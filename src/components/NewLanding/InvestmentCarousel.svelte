<script lang="ts">
  import { Splide, SplideSlide } from '@splidejs/svelte-splide';
  import '@splidejs/svelte-splide/css'; // Стандартная тема Splide

  interface Investment {
    id: number;
    title: string;
    description: string;
    color: string;
  }

  // Данные для карточек
  const investments: Investment[] = [
    { id: 1, title: 'Складские инвестиции', description: 'Развитие складских помещений и автоматизации.', color: '#f1c40f' },
    { id: 2, title: 'Транспортная инфраструктура', description: 'Инвестиции в развитие транспортных узлов.', color: '#2ecc71' },
    { id: 3, title: 'Цифровизация', description: 'Разработка логистических IT-решений.', color: '#3498db' },
    { id: 4, title: 'Электротранспорт', description: 'Инвестиции в электрогрузовики и экологичный транспорт.', color: '#9b59b6' },
    { id: 5, title: 'Морские перевозки', description: 'Модернизация портов и судоходства.', color: '#e74c3c' },
    { id: 6, title: 'Воздушная логистика', description: 'Развитие авиационной доставки.', color: '#16a085' }
  ];
</script>

<style>
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    height: 80vh;
    overflow: hidden; /* Скрыть элементы, выходящие за пределы */
  }

  .text-section {
    flex: 1;
    padding: 20px;
  }

  .carousel-section {
    justify-content: center;
    flex: 1;
    max-width: 600px; /* Ограничиваем ширину карусели */
    overflow: hidden; /* Скрываем переполнение */
  }

  .carousel-title {
    
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .carousel-description {
    font-size: 1.1rem;
    color: #555;
    margin-bottom: 1rem;
  }

  .splide__slide {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 300px;
    border-radius: 10px;
    background-color: var(--color, #ddd);
    text-align: center;
    color: white;
    padding: 20px;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  .splide__slide:not(.is-active) {
    transform: scale(0.95);
    opacity: 0.7;
  }
</style>

<div class="container ">
  <!-- Текстовая часть -->
  <div class="text-section">
    <h1 class="carousel-title">Инвестиции в логистику</h1>
    <p class="carousel-description">
      Логистика играет важнейшую роль в мировой экономике. Развивайте складские мощности, транспортную инфраструктуру и экологические технологии, чтобы достичь успеха.
    </p>
    <p class="carousel-description">
      Узнайте больше о различных направлениях инвестирования в логистику: складские системы, электротранспорт, морские и воздушные перевозки.
    </p>
  </div>

  <!-- Карусель -->
  <div class="carousel-section">
    <Splide
      options={{
        type: 'loop',
        perPage: 3, /* Показываем 3 слайда одновременно */
        gap: '1rem',
        pagination: false,
        arrows: true,
        height: '350px', /* Фиксируем высоту */
        breakpoints: {
          768: { perPage: 1 }, /* Для мобильных показываем 1 слайд */
        }
      }}
      aria-label="Инвестиции в логистику"
    >
      {#each investments as investment}
        <SplideSlide>
          <div class="splide__slide" style="--color: {investment.color}">
            <h3>{investment.title}</h3>
            <p>{investment.description}</p>
          </div>
        </SplideSlide>
      {/each}
    </Splide>
  </div>
</div>
