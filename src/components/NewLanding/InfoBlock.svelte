<script lang="ts">
  import { onMount } from "svelte";
  import i18next from "../../lib/i18n";
  import { writable } from "svelte/store";

  let angle1 = 0;
  let angle2 = 180;
  let angle3 = 90;

  // Анимация покачивания
  function animate() {
    angle1 = (angle1 + 2) % 360;
    angle2 = (angle2 + 2) % 360;
    angle3 = (angle3 + 2) % 360;
  }

  let animationInterval: number;

  onMount(() => {
    animationInterval = setInterval(animate, 50); // Обновление каждые 50 мс
    return () => clearInterval(animationInterval); // Очистка интервала при уничтожении
  });

  // Подключаем i18n
  const t = writable((key: string) => i18next.t(key));
  i18next.on("languageChanged", () => {
    t.set((key: string) => i18next.t(key));
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
    justify-content: flex-start;
    align-items: center;
    position: relative;
    overflow-x: auto; /* Добавляем горизонтальную прокрутку */
    white-space: nowrap; /* Запрещаем перенос строк */
    padding: 20px 10px;
    scrollbar-width: thin;
    scrollbar-color: #ccc transparent;
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
    flex-shrink: 0;
    margin: 0 10px;
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
    background-image: url('/bgtextures/1cardbg.png');
  }

  .box2 {
    z-index: 2;
    transform: translateY(calc(10px * sin(var(--angle2))));
    width: 200px;
    height: 300px;
    margin-left: -40px;
    background-image: url('/bgtextures/2cardbg.png');
  }

  .box3 {
    z-index: 1;
    transform: translateY(calc(-10px * sin(var(--angle3))));
    width: 170px;
    height: 250px;
    margin-left: -40px;
    background-image: url('/bgtextures/3cardbg.png');
  }

  /* Медиа-запросы для мобильных */
  @media (max-width: 768px) {
    .container {
      flex-direction: column;
      height: auto;
    }
    .text-section {
      padding-right: 0;
      text-align: center;
      margin-bottom: 20px;
    }
    .text-title {
      font-size: 1.8rem;
    }
    .text-content {
      font-size: 1rem;
    }
    .animation-section {
      gap: 10px;
      padding: 10px;
    }
    .box {
      width: 100px;
      height: 130px;
      font-size: 0.9rem;
    }
    .box1 {
      width: 120px;
      height: 160px;
    }
    .box2 {
      width: 150px;
      height: 200px;
      margin-left: 0;
    }
    .box3 {
      width: 130px;
      height: 180px;
      margin-left: 0;
    }
  }

  @media (max-width: 480px) {
    .text-title {
      font-size: 1.5rem;
    }
    .text-content {
      font-size: 0.9rem;
    }
    .box {
      width: 80px;
      height: 110px;
      font-size: 0.8rem;
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
  <!-- ЛЕВАЯ ЧАСТЬ: Заголовок и параграфы -->
  <div class="text-section">
    <h1 class="text-title">{$t('infoBlock.title')}</h1>

    <p class="text-content">
      {$t('infoBlock.paragraphs.transport')}
    </p>
    <p class="text-content">
      {$t('infoBlock.paragraphs.warehouse')}
    </p>
    <p class="text-content">
      {$t('infoBlock.paragraphs.automation')}
    </p>
  </div>

  <!-- ПРАВАЯ ЧАСТЬ: Анимированные блоки -->
  <div class="animation-section">
    <div 
      class="box box1" 
      style="--angle1: {Math.sin(angle1 * (Math.PI / 180))}"
    >
      {$t('infoBlock.boxes.box1')}
    </div>

    <div 
      class="box box2" 
      style="--angle2: {Math.sin(angle2 * (Math.PI / 180))}"
    >
      {$t('infoBlock.boxes.box2')}
    </div>

    <div 
      class="box box3" 
      style="--angle3: {Math.sin(angle3 * (Math.PI / 180))}"
    >
      {$t('infoBlock.boxes.box3')}
    </div>
  </div>
</div>
