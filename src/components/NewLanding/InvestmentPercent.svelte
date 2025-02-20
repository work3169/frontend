<script>
  import { fade, fly } from 'svelte/transition';

  let showDetails = false;
  let investmentAmount = 110000; // Начальная сумма инвестиций
  let roiPercentage = 15; // ROI в процентах

  const toggleDetails = () => {
      showDetails = !showDetails;
  };

  const calculateROI = () => {
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

<div class="min-h-screen text-white flex flex-col items-center justify-center px-4 background-image" in:fade="{{ duration: 1000 }}">
  <!-- Заголовок -->
  <h1 class="text-4xl font-bold mb-8 text-center">
      Инвестируйте в логистику — будущее начинается сегодня!
  </h1>

  <!-- Кнопка для показа деталей -->
  <button
      on:click={toggleDetails}
      class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300"
      in:fly="{{ y: 20, duration: 1000 }}"
  >
      {showDetails ? 'Скрыть детали' : 'Узнать больше'}
  </button>

  <!-- Блок с деталями -->
  {#if showDetails}
  <div
      class="mt-8 max-w-2xl bg-gray-800 p-8 rounded-lg shadow-lg"
      in:fade="{{ duration: 800 }}"
  >
      <h2 class="text-2xl font-semibold mb-4">Почему логистика — это будущее?</h2>
      <p class="text-gray-300 mb-6">
          Логистика — это основа глобальной торговли и экономики. С древних времен, начиная с торговых маршрутов
          Шелкового пути и заканчивая современными контейнерными перевозками, логистика позволяла связывать рынки
          и ускорять экономический рост.
      </p>

      <h3 class="text-xl font-semibold mb-3">Историческая устойчивость</h3>
      <p class="text-gray-300 mb-6">
          С момента создания первых торговых караванов и морских путей логистика постоянно развивалась. Промышленная революция
          дала толчок железнодорожным и морским перевозкам, а в XX веке появились авиационные и контейнерные перевозки,
          изменившие мир навсегда. Сегодня логистика остается устойчивой отраслью, на которую влияет лишь технологический прогресс.
      </p>

      <h3 class="text-xl font-semibold mb-3">Безопасность и перспективы</h3>
      <p class="text-gray-300 mb-6">
          Инвестиции в логистику считаются одними из самых стабильных. Даже в кризисные времена товары должны
          передвигаться, а технологии делают процесс более безопасным и предсказуемым.
      </p>

      <h3 class="text-xl font-semibold mb-3">Влияние ИИ на логистику</h3>
      <p class="text-gray-300 mb-6">
          Искусственный интеллект меняет правила игры в логистике. Алгоритмы машинного обучения позволяют прогнозировать
          спрос, оптимизировать маршруты, сокращать издержки и улучшать доставку. Беспилотные автомобили и дроны
          скоро станут стандартом в логистике, а умные склады значительно повысят эффективность хранения и отправки товаров.
      </p>
  </div>
{/if}

  <!-- Анимированный фоновый элемент -->
  <div
      class="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-900 to-transparent"
      in:fade="{{ duration: 1500 }}"
  ></div>
</div>

