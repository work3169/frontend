<script lang="ts">
  import '../app.css'; // Глобальные стили
  import { browser } from '$app/environment';

  if (browser) {
    // @ts-ignore next line
    import('boxicons');
  }
</script>

<svelte:head>
  <title>DES</title>
</svelte:head>

<!-- Анимированный фон -->
<div class="background-animation">
  <div class="circle circle-1"></div>
  <div class="circle circle-2"></div>
  <div class="circle circle-3"></div>
  <div class="circle circle-4"></div>
</div>

<!-- Основной контент -->
<div class="content">
  <slot />
</div>

<style>
  :global(html),
  :global(body) {
    margin: 0;
    padding: 0;
    height: 100%; /* Устанавливаем полную высоту для html и body */
    overflow-x: hidden; /* Убираем горизонтальную прокрутку */
  }

  :global(body) {
    background: linear-gradient(to right, #4E8D8D, #6DA0A0, #8EB3B3, #AFC6C6); /* Градиентный фон */
    
    font-family: Arial, sans-serif;
  }

  .content {
    position: relative;
    z-index: 10; /* Контент поверх фона */
    min-height: 100vh; /* Минимальная высота контента = высота экрана */
    
    box-sizing: border-box; /* Учитываем padding в высоте */
  }

  /* Анимированные кружочки */
  .background-animation {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none; /* Чтобы кружочки не мешали взаимодействию */
    z-index: 1;
  }

  .circle {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1); /* Полупрозрачный белый */
    animation: float 10s infinite ease-in-out;
  }

  .circle-1 {
    width: 180px;
    height: 180px;
    top: 10%;
    left: 20%;
    animation-delay: 0s;
  }

  .circle-2 {
    width: 1160px;
    height: 1160px;
    top: 50%;
    right: 10%;
    animation-delay: 2s;
  }

  .circle-3 {
    width: 1100px;
    height: 1100px;
    bottom: 20%;
    left: 30%;
    animation-delay: 4s;
  }

  .circle-4 {
    width: 140px;
    height: 140px;
    bottom: 10%;
    right: 20%;
    animation-delay: 6s;
  }

  /* Анимация "плавания" */
  @keyframes float {
    0% {
      transform: translateY(0) scale(1);
    }
    50% {
      transform: translateY(-20px) scale(1.1);
    }
    100% {
      transform: translateY(0) scale(1);
    }
  }
</style>