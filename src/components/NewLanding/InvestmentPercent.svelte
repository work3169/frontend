<script>
    import { fade, fly } from 'svelte/transition';
  
    let showDetails = false;
    let investmentAmount = 10000; // Начальная сумма инвестиций
    let roiPercentage = 15; // ROI в процентах
  
    const toggleDetails = () => {
      showDetails = !showDetails;
    };
  
    const calculateROI = () => {
      return ((investmentAmount * roiPercentage) / 100).toFixed(2);
    };
  </script>
  
  <div class="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4">
    <!-- Заголовок -->
    <h1 class="text-4xl font-bold mb-8 text-center" in:fade="{{ duration: 1000 }}">
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
        <h2 class="text-2xl font-semibold mb-4">Почему логистика?</h2>
        <p class="text-gray-300 mb-6">
          Логистика — это ключевая отрасль, которая обеспечивает движение товаров по всему миру.
          Инвестиции в логистику приносят стабильный доход благодаря растущему спросу на доставку
          товаров и оптимизацию цепочек поставок.
        </p>
  
        <!-- Интерактивный блок расчета ROI -->
        <div class="mb-6">
            <label for="investmentAmount" class="block text-gray-400 mb-2">
              Сумма инвестиций ($):
            </label>
            <input
              id="investmentAmount"
              type="number"
              bind:value={investmentAmount}
              class="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div class="mb-6">
            <label for="roiPercentage" class="block text-gray-400 mb-2">
              Ожидаемый ROI (%):
            </label>
            <input
              id="roiPercentage"
              type="number"
              bind:value={roiPercentage}
              class="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
        <p class="text-xl font-bold text-green-400">
          Ваша прибыль через год: ${calculateROI()}
        </p>
      </div>
    {/if}
  
    <!-- Анимированный фоновый элемент -->
    <div
      class="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-900 to-transparent"
      in:fade="{{ duration: 1500 }}"
    ></div>
  </div>