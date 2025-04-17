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


<!-- Основной контент -->
<div class="content">
  <slot />
</div>

