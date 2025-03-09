<div class="container">
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
        perPage: 3,
        gap: '1rem',
        pagination: false,
        arrows: true,
        height: '340px',
        breakpoints: {
          768: { perPage: 1 },
        }
      }}
      aria-label="Инвестиции в логистику"
    >
      {#each investments as investment}
        <SplideSlide>
          <div class="splide__slide" style="--color: {investment.color}">
            <img src={`/icons/${investment.icon}.png`} alt={investment.title} style="width: 50px; height: 50px;" />
            <h3>{investment.title}</h3>
            <p>{investment.description}</p>
            <p>{getShortDescription(investment)}</p>
          </div>
        </SplideSlide>
      {/each}
    </Splide>
  </div>
</div>

<script lang="ts">
  import { Splide, SplideSlide } from '@splidejs/svelte-splide';
  import '@splidejs/svelte-splide/css';

  interface Investment {
    id: number;
    title: string;
    description: string;
    color: string;
    icon: string;
  }

  const investments: Investment[] = [
    { id: 1, title: 'Сушей', description: 'Передвижение товаров грузовиками.', color: '#f1c40f', icon: 'cargoIcon' },
    { id: 2, title: 'Сушей', description: 'Передвижение товаров грузовиками.', color: '#2ecc71', icon: 'truckIcon' },
    { id: 3, title: 'Цифровизация', description: 'Разработка логистических IT-решений.', color: '#3498db', icon: 'internetIcon' },
    { id: 4, title: 'Электротранспорт', description: 'Инвестиции в электрогрузовики и экологичный транспорт.', color: '#9b59b6', icon: 'trainIcon' },
    { id: 5, title: 'Морские перевозки', description: 'Модернизация портов и судоходства.', color: '#e74c3c', icon: 'planeIcon' },
    { id: 6, title: 'Воздушная логистика', description: 'Развитие авиационной доставки.', color: '#16a085', icon: 'papersIcon' }
  ];

  function getShortDescription(investment: Investment): string {
    switch (investment.icon) {
      case 'planeIcon':
        return '10-20 млрд $ в год';
      case 'truckIcon':
        return '50-70 млрд $ в год';
      case 'cargoIcon':
        return '50-60 млрд $ в год';
      case 'internetIcon':
        return '150-170 млрд $ в год';
      case 'trainIcon':
        return '90-95 млрд $ в год';
      case 'papersIcon':
        return '5-7 млрд $ в год';
      default:
        return '';
    }
  }
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
    height: auto; /* Убираем фиксированную высоту */
    overflow: hidden;
    flex-direction: row; /* Горизонтальное расположение по умолчанию */
  }

  .text-section {
    flex: 1;
    padding: 20px;
  }

  .carousel-section {
    flex: 1;
    max-width: 600px;
    overflow: hidden;
    align-items: center;
    justify-content: center;
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
    padding: 10px;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  .splide__slide:not(.is-active) {
    transform: scale(0.95);
    opacity: 0.7;
  }

  /* Медиа-запросы для мобильных устройств */
  @media (max-width: 768px) {
    .container {
      flex-direction: column; /* Вертикальное расположение */
      align-items: stretch; /* Растягиваем элементы по ширине */
      gap: 1rem; /* Уменьшаем отступ между элементами */
    }

    .text-section {
      text-align: center; /* Центрируем текст */
      padding: 10px; /* Уменьшаем отступы */
    }

    .carousel-section {
      max-width: 100%; /* Карусель занимает всю ширину */
    }

    .carousel-title {
      font-size: 1.5rem; /* Уменьшаем заголовок */
    }

    .carousel-description {
      font-size: 1rem; /* Уменьшаем описание */
    }

    .splide__slide {
      height: 250px; /* Уменьшаем высоту слайдов */
    }
  }

  @media (max-width: 480px) {
    .carousel-title {
      font-size: 1.2rem; /* Еще больше уменьшаем заголовок */
    }

    .carousel-description {
      font-size: 0.9rem; /* Еще больше уменьшаем описание */
    }

    .splide__slide {
      height: 200px; /* Еще больше уменьшаем высоту слайдов */
    }
  }
</style>