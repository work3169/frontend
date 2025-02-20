<script lang="ts">
  import { onMount } from "svelte";
  let canvas: HTMLCanvasElement | null = null;
  let ctx: CanvasRenderingContext2D | null = null;
  const particles: Particle[] = [];
  const particleCount = 150; // Количество частиц
  const maxDistance = 120; // Максимальное расстояние для соединения линиями
  const cursorRadius = 150; // Радиус отталкивания частиц
  // Положение курсора
  let mouse = { x: -cursorRadius, y: -cursorRadius }; // Изначально курсор вне экрана
  // Класс частицы
  class Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    color: string;
    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 3 + 1;
      this.speedX = Math.random() * 3 - 1.5;
      this.speedY = Math.random() * 3 - 1.5;
      this.color = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
        Math.random() * 255
      }, 0.8)`;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      // Отражение от краёв
      if (canvas) {
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      // Отталкивание от курсора
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < cursorRadius) {
        const angle = Math.atan2(dy, dx);
        const force = (cursorRadius - distance) / cursorRadius; // Сила отталкивания
        const directionX = Math.cos(angle) * force * 5;
        const directionY = Math.sin(angle) * force * 5;
        this.x += directionX;
        this.y += directionY;
      }
    }
    draw() {
      if (ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }
  }
  const initParticles = () => {
    if (canvas) {
      for (let i = 0; i < particleCount; i++) {
        particles.push(
          new Particle(
            Math.random() * canvas.width,
            Math.random() * canvas.height
          )
        );
      }
    }
  };
  const drawLines = () => {
    if (ctx && canvas) {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${
              1 - distance / maxDistance
            })`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }
  };
  const animateParticles = () => {
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      drawLines();
      requestAnimationFrame(animateParticles);
    }
  };
  onMount(() => {
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx = canvas.getContext("2d");
      initParticles();
      animateParticles();
      // Обработчик движения мыши
      window.addEventListener("mousemove", (event) => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
      });
      // Обработчик изменения размера окна
      window.addEventListener("resize", () => {
        if (canvas) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        }
      });
    }
  });
</script>

<section
  class="hero-section relative text-white flex min-h-screen"
  style="background: linear-gradient(to right, #4E8D8D, #6DA0A0, #8EB3B3, #AFC6C6);"
>
  <!-- Частицы -->
  <canvas bind:this={canvas} class="absolute inset-0"></canvas>
  <!-- Контент -->
  <div class="relative z-10 w-full flex justify-between items-center px-10">
    <!-- Левая часть: Текст и кнопка -->
    <div class="space-y-12 max-w-md">
      <h1 class="text-4xl md:text-7xl font-extrabold">
        НАЧНИ<br />
        <span class="text-blue-200">ЗАРАБАТЫВАТЬ</span><br />
        <span class="text-purple-200">С НАМИ</span>
      </h1>
      <button
        class="bg-white text-blue-500 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-100 hover:scale-105 transition duration-300"
      >
        Начать сейчас
      </button>
    </div>
    <!-- Правая часть: Анимированная картинка -->
    <div class="hidden md:block relative w-[600px] h-[600px]">
      <img
        src="/bgtextures/HeroImagePng.png"
        alt="Flying image"
        class="absolute top-0 left-0 w-full h-full object-contain floating"
      />
    </div>
  </div>
</section>

<style>
  /* Стиль для летающей картинки */
  .floating {
    animation: float 3s ease-in-out infinite;
  }

  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  /* Стиль для канваса */
  canvas {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  /* Уменьшение расстояния между текстом и изображением */
  .hero-section > div {
    gap: 2rem; /* Расстояние между левой и правой частями */
  }

  /* Адаптивность для мобильных устройств */
  @media (max-width: 768px) {
    .hero-section > div {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .hero-section img {
      display: none; /* Скрываем изображение на мобильных устройствах */
    }
  }
</style>