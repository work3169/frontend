<script lang="ts">
  import { onMount } from "svelte";

  let angle1 = 0;
  let angle2 = 180;
  let angle3 = 90;

  // Анимация покачивания
  function animate() {
    angle1 = (angle1 + 2) % 360;
    angle2 = (angle2 + 2) % 360;
    angle3 = (angle3 + 2) % 360;
  }

  let animationInterval: number; // Заменено с NodeJS.Timeout на number

  onMount(() => {
    animationInterval = setInterval(animate, 50); // Обновление анимации каждые 50 мс
    return () => clearInterval(animationInterval); // Очистка интервала при уничтожении компонента
  });
</script>

  
<style>
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    height: 100vh;
    box-sizing: border-box;
  }

  .text-section {
    flex: 1;
    padding-right: 20px;
  }

  .text-title {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: #2c3e50;
  }

  .text-content {
    font-size: 1.2rem;
    color: #393939;
    line-height: 1.6;
  }

  .animation-section {
    flex: 1;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
  }

  .box {
    width: 120px;
    height: 150px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 10px;
    position: relative;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .box:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  }

  .box1 {
    z-index: 3;
    transform: translateY(calc(-14px * sin(var(--angle1))));
    width: 140px;
    height: 180px;
    background-image: url('bgtextures/1cardbg.png'); /* Замените путь к вашему изображению */
  }

  .box2 {
    z-index: 2;
    transform: translateY(calc(10px * sin(var(--angle2))));
    width: 200px;
    height: 300px;
    margin-left: -40px;
    background-image: url('bgtextures/2cardbg.png'); /* Замените путь к вашему изображению */
  }

  .box3 {
    z-index: 1;
    transform: translateY(calc(-10px * sin(var(--angle3))));
    width: 170px;
    height: 250px;
    margin-left: -40px;
    background-image: url('bgtextures/3cardbg.png'); /* Замените путь к вашему изображению */
  }

  /* Медиа-запросы для мобильных устройств */
  @media (max-width: 768px) {
    .container {
      flex-direction: column; /* Изменяем расположение на вертикальное */
      height: auto; /* Убираем фиксированную высоту */
    }

    .text-section {
      padding-right: 0; /* Убираем отступ справа */
      text-align: center; /* Центрируем текст */
      margin-bottom: 20px; /* Добавляем отступ между текстом и анимацией */
    }

    .text-title {
      font-size: 1.8rem; /* Уменьшаем заголовок */
    }

    .text-content {
      font-size: 1rem; /* Уменьшаем основной текст */
    }

    .animation-section {
      flex-direction: column; /* Располагаем блоки вертикально */
      align-items: center; /* Центрируем блоки по центру */
    }

    .box {
      width: 100px; /* Уменьшаем ширину блоков */
      height: 130px; /* Уменьшаем высоту блоков */
      font-size: 0.9rem; /* Уменьшаем текст внутри блоков */
      margin-bottom: 15px; /* Добавляем отступ между блоками */
    }

    .box1 {
      width: 120px;
      height: 160px;
    }

    .box2 {
      width: 150px;
      height: 200px;
      margin-left: 0; /* Убираем отрицательный отступ */
    }

    .box3 {
      width: 130px;
      height: 180px;
      margin-left: 0; /* Убираем отрицательный отступ */
    }
  }

  @media (max-width: 480px) {
    .text-title {
      font-size: 1.5rem; /* Еще больше уменьшаем заголовок */
    }

    .text-content {
      font-size: 0.9rem; /* Еще больше уменьшаем основной текст */
    }

    .box {
      width: 80px; /* Еще больше уменьшаем ширину блоков */
      height: 110px; /* Еще больше уменьшаем высоту блоков */
      font-size: 0.8rem; /* Еще больше уменьшаем текст внутри блоков */
    }

    .box1 {
      width: 100px;
      height: 140px;
    }

    .box2 {
      width: 130px;
      height: 180px;
    }

    .box3 {
      width: 110px;
      height: 160px;
    }
  }
</style>
  
  <div class="container">
    <div class="text-section">
      <h1 class="text-title">Информация о логистике</h1>
      <p class="text-content">
        Транспорт – вложения в покупку и обновление автопарка, ж/д вагонов, судов и авиафлота. Это повышает скорость, надежность и гибкость поставок, снижая затраты на перевозки.
      </p>
      <p class="text-content">
        Складская инфраструктура – строительство и модернизация складов, терминалов и распределительных центров. Оптимизация складской сети позволяет ускорить обработку грузов и снизить издержки хранения.
      </p>
      <p class="text-content">
        Автоматизация – инвестиции в цифровые технологии, роботизацию, WMS-системы и искусственный интеллект. Они повышают эффективность логистических процессов, сокращают ошибки и ускоряют выполнение заказов.
      </p>
    </div>
  
    <div class="animation-section">
      <div class="box box1" style="--angle1: {Math.sin(angle1 * (Math.PI / 180))}">Склад</div>
      <div class="box box2" style="--angle2: {Math.sin(angle2 * (Math.PI / 180))}">Автоматизация</div>
      <div class="box box3" style="--angle3: {Math.sin(angle3 * (Math.PI / 180))}">Транспорт</div>
    </div>
  </div>
  