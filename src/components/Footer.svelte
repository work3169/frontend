<script lang="ts">
  import i18next from '../lib/i18n';
  import { writable } from 'svelte/store';

  // Создаем store для перевода
  const t = writable((key: string) => i18next.t(key));
  i18next.on('languageChanged', () => {
    t.set((key: string) => i18next.t(key));
  });
</script>

<footer class="footer gap-12 justify-start flex flex-col-reverse md:flex-row p-10 bg-neutral text-neutral-content 2xl:container 2xl:mx-auto">
  <div>
    <p>{$t('footer.copyright')}</p>
    <p class="text-[12px]">{$t('footer.support')}</p>
  </div>
  <div>
    <a href="/terms" class="mr-4 hover:underline">{$t('footer.terms')}</a>
    <a href="/certificate.pdf" target="_blank" class="hover:underline">{$t('footer.certificate')}</a>
  </div>
</footer>

<style>
  .footer {
    position: relative;
    z-index: 10;
    background-color: #1f2937; /* Явно задаем цвет фона */
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  .footer p,
  .footer a {
    
    backface-visibility: hidden;
  }

  
</style>
