<script lang="ts">
    import { onMount } from "svelte";
  
    interface City {
      name: string;
      x: number; // Координата X в процентах
      y: number; // Координата Y в процентах
    }
  
    const cities: City[] = [
      { name: 'Москва', x: 60, y: 20 },
      { name: 'Нью-Йорк', x: 15, y: 30 }, // Сдвинут левее
      { name: 'Токио', x: 85, y: 60 },   // Сдвинут правее
      { name: 'Лондон', x: 45, y: 35 },
      { name: 'Берлин', x: 40, y: 60 },  // Поднят выше
      { name: 'Сидней', x: 90, y: 90 },  // Опущен ниже
      { name: 'Дубай', x: 45, y: 90 },
      { name: 'Париж', x: 65, y: 40 },   // Сдвинут левее
      // Добавьте ещё города...
    ];
  
    let map: SVGSVGElement | null = null;
  
    onMount(() => {
      // Анимации или дополнительная логика
    });
  </script>
  
  <style>
    .section {
      position: relative;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: flex-start; /* Начинаем с верхней части */
      align-items: center;
      text-align: center;
      background-color: rgba(255, 255, 255, 0.3); /* Полупрозрачный белый фон */
      padding: 20px 0; /* Добавляем отступы сверху и снизу */
      box-sizing: border-box; /* Гарантируем, что padding учитывается */
    }
  
    .header {
      margin-bottom: 10px; /* Уменьшаем отступ после заголовка */
    }
  
    .header h1 {
      font-size: 2.5rem;
      margin: 0;
      color: #333; /* Темно-серый текст */
    }
  
    .header p {
      font-size: 1.2rem;
      color: #666; /* Светло-серый текст */
    }
  
    .map-container {
      position: relative;
      width: 100%;
      height: calc(80vh - 100px); /* Динамическая высота с учетом отступов */
      max-height: 600px; /* Ограничение по высоте */
      max-width: 1200px;
      margin: 10px auto; /* Небольшой вертикальный отступ */
      overflow: hidden;
    }
  
    .map {
      width: 100%;
      height: 100%;
      position: relative;
    }
  
    .city {
      fill: #4E8D8D; /* Цвет из вашей палитры */
      stroke: white;
      stroke-width: 2;
      cursor: pointer;
      animation: pulse 2s infinite;
    }
  
    @keyframes pulse {
      0%, 100% {
        r: 5;
      }
      50% {
        r: 8;
      }
    }
  
    .line {
      stroke: #6DA0A0; /* Более мягкий цвет для линий */
      stroke-width: 2;
      stroke-dasharray: 5 5;
      animation: draw 2s ease-in-out infinite alternate;
    }
  
    @keyframes draw {
      from {
        stroke-dashoffset: 100;
      }
      to {
        stroke-dashoffset: 0;
      }
    }
  
    .city-label {
      fill: #333; /* Темно-серый текст */
      font-size: 8px; /* Уменьшенный размер текста */
      font-weight: bold;
      text-anchor: middle; /* Центр текста относительно координат */
      pointer-events: none; /* Текст не будет перекрывать кликабельность точек */
      transform: translateY(-15px); /* Поднять текст выше точки */
      z-index: 10; /* Размещаем текст поверх линий */
    }
  
    /* Адаптивность */
    @media (max-width: 768px) {
      .map-container {
        height: calc(60vh - 80px); /* Для небольших экранов уменьшить высоту */
        margin: 5px auto; /* Уменьшить отступы */
      }
  
      .header h1 {
        font-size: 2rem; /* Уменьшение размера текста */
      }
  
      .header p {
        font-size: 1rem; /* Уменьшение размера текста */
      }
    }
  </style>
  
  <section class="section">
    <!-- Заголовок -->
    <div class="header">
      <h1>Наши партнёры по всему миру</h1>
      <p>Мы работаем с городами и странами, обеспечивая логистику мирового уровня.</p>
    </div>
  
    <!-- Карта -->
    <div class="map-container">
      <svg bind:this={map} viewBox="0 0 200 100" class="map">
        <!-- Линии -->
        {#each cities.slice(0, cities.length - 1) as { x, y }, i}
        <line
          class="line"
          x1={`${x}%`}
          y1={`${y}%`}
          x2={`${cities[i + 1].x}%`}
          y2={`${cities[i + 1].y}%`}
        />
        {/each}
  
        <!-- Точки и названия -->
        {#each cities as { name, x, y }, i}
        <g>
          <!-- Точка города -->
          <circle
            class="city"
            cx={`${x}%`}
            cy={`${y}%`}
            r="5"
            on:mouseover={() => console.log(name)}
            on:focus={() => console.log(name)}
            role="button"
            tabindex="0"
            aria-label={`Город: ${name}`}
          />
          <!-- Название города -->
          <text
            class="city-label"
            x={`${x}%`}
            y={`${y}%`}
          >
            {name}
          </text>
        </g>
        {/each}
      </svg>
    </div>
  </section>