<script lang="ts">
  export let imageUrl: string = "/path/to/your/image.jpg"; // URL изображения
</script>

<style>
  /* Основной контейнер */
  .section {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 40px 20px;
    max-width: 1200px;
    margin: 60px auto;
    background: linear-gradient(to right, #4E8D8D, #6DA0A0); /* Градиент из вашей палитры */
    border-radius: 20px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    gap: 30px;
    overflow: hidden;
    position: relative;
  }

  /* Текстовый контент */
  .text-content {
    flex: 1;
    max-width: 500px;
    z-index: 2; /* Текст поверх фоновых элементов */
  }

  .title {
    font-size: 2.5rem;
    font-weight: bold;
    color: white;
    margin-bottom: 20px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); /* Легкая тень для текста */
  }

  .paragraph {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.9); /* Полупрозрачный белый */
    line-height: 1.6;
    margin-bottom: 15px;
  }

  /* Контейнер изображения */
  .image-container {
    flex: 1;
    
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    border-radius: 20px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }

  .image-container img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 20px;
    transition: transform 0.3s ease, filter 0.3s ease;
  }

  .image-container:hover img {
    transform: scale(1.1); /* Эффект увеличения при наведении */
    filter: brightness(1.1); /* Легкое осветление */
  }

  /* Анимация появления */
  .fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  .fade-in-active {
    opacity: 1;
    transform: translateY(0);
  }

  /* Декоративные элементы */
  .decorative-circle {
    position: absolute;
    width: 200px;
    height: 200px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    top: -50px;
    right: -50px;
    z-index: 1;
    filter: blur(30px);
  }

  /* Адаптивность */
  @media (max-width: 768px) {
    .section {
      flex-direction: column;
      text-align: center;
      padding: 20px;
    }

    .text-content {
      max-width: 100%;
    }

    .image-container {
      max-width: 100%;
    }
  }
</style>

<div class="section">
  <!-- Декоративный элемент -->
  <div class="decorative-circle"></div>

  <!-- Текстовый контент -->
  <div class="text-content fade-in fade-in-active">
    <h1 class="title">Инвестиции в логистику</h1>
    <p class="paragraph">
      Логистика — это основа мировой экономики. Развитие складских систем, внедрение цифровых технологий и улучшение транспортной инфраструктуры позволяют компаниям оптимизировать затраты и повысить эффективность.
    </p>
    <p class="paragraph">
      С ростом спроса на экологичные технологии инвестиции в электрический транспорт и снижение углеродного следа становятся приоритетом. Поддержка этих направлений помогает сохранить природу и улучшить качество жизни.
    </p>
    <p class="paragraph">
      Выбирая логистику как сферу для инвестиций, вы вкладываете в будущее глобальной экономики.
    </p>
  </div>

  <!-- Изображение -->
  <div class="image-container">
    <img src="landingImages\LogiPhoto1.jpg" alt="Логистика" />
  </div>
</div>