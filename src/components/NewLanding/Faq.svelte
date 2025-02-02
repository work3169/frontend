<script lang="ts">
  import { writable } from 'svelte/store';

  // Состояние открытого вопроса
  const openQuestion = writable<number | null>(null);

  // Функция для переключения открытого вопроса
  function toggleQuestion(index: number) {
    openQuestion.update((current) => (current === index ? null : index));
  }

  // Список вопросов и ответов
  const faq = [
    { question: 'Что такое логистика?', answer: 'Логистика — это управление процессами перемещения товаров от точки производства до конечного потребителя.' },
    { question: 'Каковы основные типы транспорта?', answer: 'Основные типы транспорта включают автомобильный, железнодорожный, морской, воздушный и трубопроводный транспорт.' },
    { question: 'Что такое цепочка поставок?', answer: 'Цепочка поставок — это последовательность процессов и компаний, участвующих в создании и доставке продукта.' },
    { question: 'Как снизить затраты на доставку?', answer: 'Оптимизация маршрутов, использование складов ближе к клиентам и переговоры с поставщиками помогут снизить затраты.' },
    { question: 'Что такое логистический склад?', answer: 'Логистический склад — это место для хранения товаров до их доставки конечному потребителю.' },
    { question: 'Какие технологии используются в логистике?', answer: 'Используются технологии, такие как GPS, автоматизация складов, системы управления запасами и блокчейн.' }
  ];
</script>

<style>
  .faq-container {
    max-width: 800px;
    margin: 40px auto;
    padding: 20px;
    border-radius: 15px;
    background-color: rgba(255, 255, 255, 0.9); /* Полупрозрачный белый для контраста */
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  .faq-item {
    margin-bottom: 10px;
    overflow: hidden;
    border-radius: 10px;
    transition: all 0.3s ease;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }

  .faq-question {
    background: linear-gradient(to right, #4E8D8D, #6DA0A0); /* Градиент из вашей палитры */
    color: white;
    padding: 15px 20px;
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.3s ease;
    border-radius: 10px 10px 0 0; /* Скругление только верхних углов */
  }

  .faq-question:hover {
    background: linear-gradient(to right, #6DA0A0, #8EB3B3); /* Более светлый градиент при наведении */
    transform: scale(1.02); /* Легкое увеличение */
  }

  .faq-answer {
    max-height: 0;
    padding: 0 20px;
    font-size: 1rem;
    color: #555;
    line-height: 1.5;
    background-color: #ecf0f1;
    transition: max-height 0.3s ease, padding 0.3s ease, opacity 0.3s ease;
    opacity: 0;
    overflow: hidden;
    border-radius: 0 0 10px 10px; /* Скругление только нижних углов */
  }

  .faq-answer.open {
    max-height: 200px;
    padding: 15px 20px;
    opacity: 1;
  }

  @media (max-width: 768px) {
    .faq-question {
      font-size: 1rem;
    }

    .faq-answer {
      font-size: 0.9rem;
    }
  }
</style>

<div class="faq-container">
  {#each faq as item, index}
    <div class="faq-item">
      <div
        class="faq-question"
        on:click={() => toggleQuestion(index)}
      >
        {item.question}
      </div>
      <div class="faq-answer {index === $openQuestion ? 'open' : ''}">
        {item.answer}
      </div>
    </div>
  {/each}
</div>