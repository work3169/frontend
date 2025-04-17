<script lang="ts">
    import { fade, fly } from 'svelte/transition';
    import i18next from '../../lib/i18n'; // Импортируем i18next
    import { writable } from 'svelte/store';
  
    // Создаем store для перевода
    const t = writable((key: string) => i18next.t(key));
  
    // Обновляем store при изменении языка
    i18next.on('languageChanged', () => {
      t.set((key: string) => i18next.t(key));
    });
  
    let showDetails = false;
    let investmentAmount: number = 110000; // Начальная сумма инвестиций
    let roiPercentage: number = 15; // ROI в процентах
  
    const toggleDetails = (): void => {
        showDetails = !showDetails;
    };
  
    const calculateROI = (): string => {
        return ((investmentAmount * roiPercentage) / 100).toFixed(2);
    };
  </script>
  
  <style>
    .background-image {
        background-image: url('/bgtextures/FutureContainerBg.jpg'); /* Замените путь к вашему изображению */
        background-size: cover;
        background-position: center;
        opacity: 0.6;
    }
  </style>
  
  <div class="min-h-screen text-white flex flex-col items-center justify-center px-4 background-image" in:fade="{{ duration: 1000 }}" id="future-section">
    <!-- Заголовок -->
    <h1 class="text-4xl font-bold mb-8 text-center">
        {$t('futureSection.title')}
    </h1>
  
    <!-- Кнопка для показа деталей -->
    <button
        on:click={toggleDetails}
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300"
        in:fly="{{ y: 20, duration: 1000 }}"
    >
        {showDetails ? $t('futureSection.button.hide') : $t('futureSection.button.show')}
    </button>
  
    <!-- Блок с деталями -->
    {#if showDetails}
    <div
        class="mt-8 max-w-2xl bg-gray-800 p-8 rounded-lg shadow-lg"
        in:fade="{{ duration: 800 }}"
    >
        <h2 class="text-2xl font-semibold mb-4">{$t('futureSection.details.title')}</h2>
        <p class="text-gray-300 mb-6">
            {$t('futureSection.details.description')}
        </p>
  
        <h3 class="text-xl font-semibold mb-3">{$t('futureSection.details.history.title')}</h3>
        <p class="text-gray-300 mb-6">
            {$t('futureSection.details.history.description')}
        </p>
  
        <h3 class="text-xl font-semibold mb-3">{$t('futureSection.details.stability.title')}</h3>
        <p class="text-gray-300 mb-6">
            {$t('futureSection.details.stability.description')}
        </p>
  
        <h3 class="text-xl font-semibold mb-3">{$t('futureSection.details.ai.title')}</h3>
        <p class="text-gray-300 mb-6">
            {$t('futureSection.details.ai.description')}
        </p>
    </div>
    {/if}
  
    <!-- Анимированный фоновый элемент -->
  </div>