<footer class="footer gap-12 justify-start flex flex-col-reverse md:flex-row p-10 bg-neutral text-neutral-content 2xl:container 2xl:mx-auto">
  <div>
    <p>© 2023 Distributed Efficient Shipping LTD - ALL RIGHTS RESERVED</p>
    <p class="text-[12px]">Support email: support-contact@des.com</p>
  </div>
  <div>
    <a href="/terms" class="mr-4 hover:underline">Правила пользования</a>
    <a href="/certificate.pdf" target="_blank" class="hover:underline">Сертификат</a>
  </div>
</footer>

<style>
  /* Убираем возможные артефакты */
  .footer {
    position: relative;
    z-index: 10; /* Убедитесь, что футер выше других элементов */
    background-color: #1f2937; /* Явно задаем цвет фона вместо bg-neutral */
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1); /* Добавляем легкую тень для акцента */
    overflow: hidden; /* Предотвращаем выход содержимого за пределы футера */
  }

  /* Улучшение рендеринга текста */
  .footer p,
  .footer a {
    font-smoothing: antialiased; /* Улучшаем рендеринг текста */
    backface-visibility: hidden; /* Убираем артефакты при прокрутке */
  }

  /* Убираем возможные артефакты прокрутки */
  html,
  body {
    overflow-x: hidden; /* Запрещаем горизонтальную прокрутку */
    scroll-behavior: smooth; /* Плавная прокрутка */
  }
</style>