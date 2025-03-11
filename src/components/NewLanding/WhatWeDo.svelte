<script lang="ts">
    import { onMount } from "svelte";
  
    // Углы для анимации покачивания
    let angle1 = 0;
    let angle2 = 180;
    let angle3 = 90;
  
    // Функция для анимации покачивания
    function animate() {
      angle1 = (angle1 + 2) % 360;
      angle2 = (angle2 + 2) % 360;
      angle3 = (angle3 + 2) % 360;
    }
  
    let animationInterval: number;
  
    onMount(() => {
      animationInterval = setInterval(animate, 50); // Обновление анимации каждые 50 мс
      return () => clearInterval(animationInterval); // Очистка интервала при уничтожении компонента
    });
  
    // Данные для карточек
    const cards = [
      {
        title: "Модернизация",
        description:
          "Наша компания ревизирует и имплементирует новые решения в существующие логистические цепи.",
      },
      {
        title: "Создание",
        description:
          "Мы предлагаем комплекс решений для развития новых логистических компаний *под ключ*.",
      },
      {
        title: "Цифровизация ",
        description:
          "Разработка IT-решений для логистической отрасли. Мы внедряем системы управления цепями поставок и аналитические платформы.",
      },
    ];
  </script>
  
  <style>
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      text-align: center;
    }
  
    .title {
      font-size: 2.5rem;
      font-weight: bold;
      color: #2c3e50;
      margin-bottom: 1rem;
    }
  
    .description {
      font-size: 1.2rem;
      color: #393939;
      line-height: 1.6;
      margin-bottom: 2rem;
    }
  
    .cards-container {
      display: flex;
      justify-content: space-between;
      gap: 20px;
      width: 100%;
      flex-wrap: wrap; /* Перенос карточек на новую строку */
    }
  
    .card {
      flex: 1;
      min-width: 300px; /* Минимальная ширина карточки */
      background-color: #83bbbb;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      padding: 20px;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      position: relative;
    }
  
    .card:hover {
      transform: scale(1.05);
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
    }
  
    .card-title {
      font-size: 1.5rem;
      font-weight: bold;
      color: #2c3e50;
      margin-bottom: 1rem;
    }
  
    .card-description {
      font-size: 1rem;
      color: #555;
      line-height: 1.6;
    }
  
    /* Анимация покачивания */
    .card1 {
      transform: translateY(calc(-10px * sin(var(--angle1))));
    }
  
    .card2 {
      transform: translateY(calc(10px * sin(var(--angle2))));
    }
  
    .card3 {
      transform: translateY(calc(-10px * sin(var(--angle3))));
    }
  
    /* Медиа-запросы для мобильных устройств */
    @media (max-width: 768px) {
      .title {
        font-size: 2rem;
      }
  
      .description {
        font-size: 1rem;
      }
  
      .cards-container {
        flex-direction: column; /* Карточки располагаются вертикально */
        align-items: center;
      }
  
      .card {
        min-width: 100%; /* Карточки занимают всю ширину */
      }
    }
  </style>
  
  <div class="container">
    <!-- Заголовок и описание -->
    <h1 class="title">Наш в клад в приумножение капиталов</h1>
    <p class="description">
      Мы предоставляем комплексные решения для транспортной, складской и цифровой логистики, помогая бизнесу расти и развиваться. Наша команда экспертов специализируется на оптимизации всех этапов логистических процессов, начиная от планирования маршрутов и управления транспортными потоками до автоматизации складских операций и внедрения передовых IT-решений. Мы понимаем, что успех современного бизнеса напрямую зависит от эффективности логистики, поэтому предлагаем индивидуальный подход к каждому клиенту, учитывая его уникальные потребности и задачи.
    </p>
  
    <!-- Карточки -->
    <div class="cards-container">
      {#each cards as card, index}
        <div
          class="card card{index + 1}"
          style="--angle{index + 1}: {Math.sin((index === 0 ? angle1 : index === 1 ? angle2 : angle3) * (Math.PI / 180))}"
        >
          <h2 class="card-title">{card.title}</h2>
          <p class="card-description">{card.description}</p>
        </div>
      {/each}
    </div>
  </div>