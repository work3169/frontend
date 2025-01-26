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
      color: #555;
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
      background-color: #3498db;
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
    }
  
    .box:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
    }
  
    .box1 {
      z-index: 3;
      transform: translateY(calc(-10px * sin(var(--angle1))));
      width: 140px;
      height: 180px;
    }
  
    .box2 {
      z-index: 2;
      transform: translateY(calc(10px * sin(var(--angle2))));
      width: 160px;
      height: 200px;
      margin-left: -40px;
    }
  
    .box3 {
      z-index: 1;
      transform: translateY(calc(-10px * sin(var(--angle3))));
      width: 120px;
      height: 150px;
      margin-left: -40px;
    }
  </style>
  
  <div class="container">
    <div class="text-section">
      <h1 class="text-title">Информация о логистике</h1>
      <p class="text-content">
        Логистика играет важную роль в обеспечении глобальных поставок. Инвестируйте в инфраструктуру, чтобы повысить
        эффективность.
      </p>
      <p class="text-content">
        Карточки справа представляют основные направления инвестиций: транспорт, автоматизация и складские системы.
      </p>
    </div>
  
    <div class="animation-section">
      <div class="box box1" style="--angle1: {Math.sin(angle1 * (Math.PI / 180))}">Карточка 1</div>
      <div class="box box2" style="--angle2: {Math.sin(angle2 * (Math.PI / 180))}">Карточка 2</div>
      <div class="box box3" style="--angle3: {Math.sin(angle3 * (Math.PI / 180))}">Карточка 3</div>
    </div>
  </div>
  