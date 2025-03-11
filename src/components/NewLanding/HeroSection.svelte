<script lang="ts">
  import { onMount } from "svelte";
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
      <h1 class="text-3xl font-extrabold sm:text-5xl">
        НАЧНИ<br />
        <span class="text-blue-200">ЗАРАБАТЫВАТЬ</span><br />
        <span class="text-purple-200">С НАМИ</span>
      </h1>
      <button
        class="bg-white text-blue-500 font-bold py-3 px-6 rounded-full shadow-lg hover:bg-blue-100 hover:scale-105 transition duration-300"
      >
        Начать сейчас
      </button>
    </div>
  </div>
</section>

<style>
  @media (max-width: 768px) {
    .hero-section > div {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    h1 {
      font-size: 2rem;
    }

    button {
      padding: 0.75rem 1.5rem;
      font-size: 0.9rem;
    }
  }
</style>