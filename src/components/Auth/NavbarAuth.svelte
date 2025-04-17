<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import i18next from '../../lib/i18n';   // ← проверьте относительный путь
  import { user as userStore } from 'stores/user';

  /* i18n‑store */
  const t = writable((k: string, o?: any) => i18next.t(k, o));
  i18next.on('languageChanged', () =>
    t.set((k: string, o?: any) => i18next.t(k, o))
  );

  const changeLanguage = (lng: 'ru' | 'en') => i18next.changeLanguage(lng);

  /* прокрутка */
  let isNavbarScrolled = false;
  function handleScroll() {
    const hero = document.querySelector('.hero-section') as HTMLElement | null;
    isNavbarScrolled = hero ? window.scrollY > hero.offsetHeight : false;
  }

  onMount(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  });
</script>


<div
  class="fixed w-full top-0 z-20 shadow-xl transition-colors duration-300"
  style:background-color={isNavbarScrolled ? 'white' : 'transparent'}
  style:color={isNavbarScrolled ? 'black' : 'white'}
>
  <div class="container mx-auto">
    <div class="navbar">
      <!-- Логотип + название -->
      <div class="navbar-start">
        <div class="flex items-center">
          <a href="/" class="inline-block mr-2">
            <img
              src="/favicon.png"
              alt="Company Logo"
              class="h-[30px] inline-block"
              style="vertical-align: middle;"
            />
          </a>
          <a
            href="/"
            class="btn btn-link no-underline normal-case text-xl flex items-center"
            style:color={isNavbarScrolled ? 'black' : 'white'}
          >
            DES
          </a>
        </div>
      </div>

      <!-- Правая часть: языки + авторизация -->
      <div class="navbar-end gap-4">
        <!-- Переключатель языка -->
        <div class="flex items-center space-x-2">
          <button class="text-sm hover:underline" on:click={() => changeLanguage('ru')}>🇷🇺</button>
          <button class="text-sm hover:underline" on:click={() => changeLanguage('en')}>🇬🇧</button>
        </div>

        <!-- Авторизация / профиль -->
        {#if $userStore.user}
          <a
            href="/profile"
            class="btn bg-[#4E8D8D] text-white font-bold py-2 px-4 rounded-md shadow-md hover:bg-[#3A7373] transition-all duration-300"
          >
            {$t('profile')}
          </a>
        {:else}
          <a
            href="/auth/login"
            class="btn bg-[#4E8D8D] text-white font-bold py-2 px-4 rounded-md shadow-md hover:bg-[#3A7373] transition-all duration-300 mr-2"
          >
            {$t('login')}
          </a>

          <a
            href="/auth/signup"
            class="hidden md:inline-flex btn bg-white text-[#4E8D8D] font-bold py-2 px-4 rounded-md border border-[#4E8D8D] shadow-md hover:bg-[#4E8D8D] hover:text-white transition-all duration-300"
          >
            {$t('signup')}
          </a>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  /* можно оставить прежние стили либо Tailwind‑классы */
</style>
