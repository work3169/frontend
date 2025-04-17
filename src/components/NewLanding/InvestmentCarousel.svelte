<div class="container">
  <!-- Текстовая часть -->
  <div class="text-section">
    <h1 class="carousel-title">{$t('investments.title')}</h1>
    <p class="carousel-description">
      {$t('investments.description1')}
    </p>
    <p class="carousel-description">
      {$t('investments.description2')}
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
      aria-label={$t('investments.carouselLabel')}
    >
      {#each investments as investment}
        <SplideSlide>
          <div class="splide__slide" style="--color: {investment.color}">
            <img src={`/icons/${investment.icon}.png`} alt={$t(`investments.icons.${investment.icon}`)} style="width: 50px; height: 50px;" />
            <h3>{$t(`investments.titles.${investment.title}`)}</h3>
            <p>{$t(`investments.descriptions.${investment.description}`)}</p>
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
  import i18next from '../../lib/i18n';
  import { writable } from 'svelte/store';

  // Создаем store для перевода
  const t = writable((key: string) => i18next.t(key));

  // Обновляем store при изменении языка
  i18next.on('languageChanged', () => {
    t.set((key: string) => i18next.t(key));
  });

  interface Investment {
    id: number;
    title: string;
    description: string;
    color: string;
    icon: string;
  }

  const investments: Investment[] = [
    { id: 1, title: 'seaTransport', description: 'seaTransportDesc', color: '#f1c40f', icon: 'cargoIcon' },
    { id: 2, title: 'landTransport', description: 'landTransportDesc', color: '#2ecc71', icon: 'truckIcon' },
    { id: 3, title: 'digitalization', description: 'digitalizationDesc', color: '#3498db', icon: 'internetIcon' },
    { id: 4, title: 'electricTransport', description: 'electricTransportDesc', color: '#9b59b6', icon: 'trainIcon' },
    { id: 5, title: 'airTransport', description: 'airTransportDesc', color: '#e74c3c', icon: 'planeIcon' },
    { id: 6, title: 'optimization', description: 'optimizationDesc', color: '#16a085', icon: 'papersIcon' }
  ];

  function getShortDescription(investment: Investment): string {
    switch (investment.icon) {
      case 'planeIcon':
        return $t('investments.shortDescriptions.plane');
      case 'truckIcon':
        return $t('investments.shortDescriptions.truck');
      case 'cargoIcon':
        return $t('investments.shortDescriptions.cargo');
      case 'internetIcon':
        return $t('investments.shortDescriptions.internet');
      case 'trainIcon':
        return $t('investments.shortDescriptions.train');
      case 'papersIcon':
        return $t('investments.shortDescriptions.papers');
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
    height: auto;
    overflow: hidden;
    flex-direction: row;
    margin-top: 48px;
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

  @media (max-width: 768px) {
    .container {
      flex-direction: column;
      align-items: stretch;
      gap: 1rem;
    }

    .text-section {
      text-align: center;
      padding: 10px;
    }

    .carousel-section {
      max-width: 100%;
    }

    .carousel-title {
      font-size: 1.5rem;
    }

    .carousel-description {
      font-size: 1rem;
    }

    .splide__slide {
      height: 250px;
    }
  }

  @media (max-width: 480px) {
    .carousel-title {
      font-size: 1.2rem;
    }

    .carousel-description {
      font-size: 0.9rem;
    }

    .splide__slide {
      height: 200px;
    }
  }
</style>