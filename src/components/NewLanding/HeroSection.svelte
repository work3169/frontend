<script lang="ts">
  import { user as userStore } from "../../stores/user";
  import { onMount } from "svelte";
  import i18next from '../../lib/i18n';
  import { writable } from 'svelte/store';

  // Создаем store для перевода
  const t = writable((key: string, options?: any) => i18next.t(key, options));

  // Обновляем store при изменении языка
  i18next.on('languageChanged', () => {
    t.set((key: string, options?: any) => i18next.t(key, options));
  });

  let canvas: HTMLCanvasElement | null = null;
  let ctx: CanvasRenderingContext2D | null = null;
  const particles: Particle[] = [];
  let particleCount = 30; // Количество частиц
  let maxDistance = 120; // Максимальное расстояние для соединения линиями
  let cursorRadius = 150; // Радиус отталкивания частиц
  let mouse = { x: -150, y: -150 }; // Изначально курсор вне экрана

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
      if (canvas) {
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < cursorRadius) {
        const angle = Math.atan2(dy, dx);
        const force = (cursorRadius - distance) / cursorRadius;
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
    if (typeof window !== "undefined") {
      particleCount = window.innerWidth < 768 ? 25 : 50;
      maxDistance = window.innerWidth < 768 ? 80 : 120;
      cursorRadius = window.innerWidth < 768 ? 100 : 150;

      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx = canvas.getContext("2d");
        initParticles();
        animateParticles();

        window.addEventListener("mousemove", (event) => {
          mouse.x = event.clientX;
          mouse.y = event.clientY;
        });

        window.addEventListener("resize", () => {
          if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particles.length = 0;
            initParticles();
          }
        });
      }
    }
  });
</script>

<section
  id="hero-section"
  class="hero-section relative text-white flex min-h-screen"
  style="background: linear-gradient(to right, #4E8D8D, #6DA0A0, #8EB3B3, #AFC6C6);"
>
  <canvas bind:this={canvas} class="absolute inset-0"></canvas>
  <div class="relative z-10 w-full flex flex-col items-center justify-center px-6">
    <div class="space-y-6 max-w-md text-center">
      <!-- Название -->
      <h1 class="text-4xl font-extrabold sm:text-5xl tracking-tight">
        {$t('hero.title.line1')}<br />
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">
          {$t('hero.title.line2')}
        </span>
      </h1>

      <!-- Подзаголовок -->
      <p class="text-lg sm:text-xl text-gray-200">
        {$t('hero.subtitle')}
      </p>

      <!-- Кнопка -->
      {#if $userStore.user}
        <!-- Если пользователь авторизован -->
        <a 
          href="/profile" 
          class="inline-block mt-8 px-8 py-4 bg-gradient-to-br from-[#295858] to-[#4E8D8D] text-white font-bold rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
        >
          {$t('hero.button.profile')}
        </a>
      {:else}
        <!-- Если пользователь не авторизован -->
        <a 
          href="/auth/login" 
          class="inline-block mt-8 px-8 py-4 bg-gradient-to-br from-[#295858] to-[#4E8D8D] text-white font-bold rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
        >
          {$t('hero.button.start')}
        </a>
      {/if}
    </div>
  </div>
</section>

<style>
  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }

    p {
      font-size: 1rem;
    }

    a {
      padding: 0.75rem 1.5rem;
      font-size: 0.9rem;
    }
  }
</style>