<script lang="ts">
  import { writable } from 'svelte/store';
  import i18next from '../../lib/i18n';

  // Храним, какой вопрос «раскрыт» (null если ни один)
  const openQuestion = writable<number | null>(null);

  // Переключение раскрытого вопроса
  function toggleQuestion(index: number) {
    openQuestion.update((current) => (current === index ? null : index));
  }

  

  // Вместо статического массива вопросов/ответов, мы просто определяем индексы
  const faqIndexes = [0, 1, 2, 3, 4, 5, 6, 7];

  // Подключаем i18n
  const t = writable((key: string) => i18next.t(key));
  i18next.on('languageChanged', () => {
    t.set((key: string) => i18next.t(key));
  });
</script>

<style>
  .faq-container {
    max-width: 800px;
    margin: 40px auto;
    padding: 20px;
    border-radius: 15px;
    background-color: rgba(255, 255, 255, 0.9);
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
    background: linear-gradient(to right, #4E8D8D, #6DA0A0);
    color: white;
    padding: 15px 20px;
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.3s ease;
    border-radius: 10px 10px 0 0;
  }

  .faq-question:hover {
    background: linear-gradient(to right, #6DA0A0, #8EB3B3);
    transform: scale(1.02);
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
    border-radius: 0 0 10px 10px;
  }

  .faq-answer.open {
    max-height: 400px;
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

<div class="faq-container" id="qa-section">
  {#each faqIndexes as index}
    <div class="faq-item">
      <!-- QUESTION -->
      <div
        class="faq-question"
        on:click={() => toggleQuestion(index)}
      >
        <!-- question = faq.{index}.question -->
        {$t(`faq.${index}.question`)}
      </div>
      <!-- ANSWER -->
      <div class="faq-answer {index === $openQuestion ? 'open' : ''}">
        <!-- answer = faq.{index}.answer -->
        {$t(`faq.${index}.answer`)}
      </div>
    </div>
  {/each}
</div>
