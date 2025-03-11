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

