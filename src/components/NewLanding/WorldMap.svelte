<script lang="ts">
    import { onMount } from "svelte";

    interface City {
        name: string;
        x: number; // Координата X в процентах
        y: number; // Координата Y в процентах
    }

    const cities: City[] = [
        { name: 'Москва', x: 60, y: 40 },
        { name: 'Нью-Йорк', x: 32, y: 40 },
        { name: 'Токио', x: 85, y: 50 },
        { name: 'Лондон', x: 49, y: 37 },
        { name: 'Берлин', x: 45, y: 30 },
        { name: 'Сидней', x: 75, y: 85 },
        { name: 'Дубай', x: 65, y: 60 },
        { name: 'Париж', x: 42, y: 28 },
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
    background-color: #f4f4f4;
    padding: 20px 0; /* Добавляем отступы сверху и снизу */
    box-sizing: border-box; /* Гарантируем, что padding учитывается */
}

.header {
    margin-bottom: 10px; /* Уменьшаем отступ после заголовка */
}

.header h1 {
    font-size: 2.5rem;
    margin: 0;
}

.header p {
    font-size: 1.2rem;
    color: #666;
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
    fill: #ff5733;
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
    stroke: lightgray; /* Светло-серый цвет для пунктиров */
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
    fill: black;
    font-size: 14px;
    font-weight: bold;
    text-anchor: middle; /* Центр текста относительно координат */
    pointer-events: none; /* Текст не будет перекрывать кликабельность точек */
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
        <svg bind:this={map} viewBox="0 0 1920 1080" class="map">
            <!-- Фоновая карта -->
            <image href="/images/world-map.svg" width="1920" height="1080" />

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
                    y={`${y - 2}%`} 
                >
                    {name}
                </text>
            </g>
            {/each}

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
        </svg>
    </div>
</section>
