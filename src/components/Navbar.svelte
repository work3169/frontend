<script lang="ts">
  import { onMount } from "svelte";
  import { writable } from 'svelte/store';
  import i18next from '../lib/i18n';
  import { user as userStore } from "stores/user"; // Импортируем userStore

  // Создаем store для перевода
  const t = writable((key: string, options?: any) => i18next.t(key, options));

  // Обновляем store при изменении языка
  i18next.on('languageChanged', () => {
    t.set((key: string, options?: any) => i18next.t(key, options));
  });

  // Функция для смены языка
  const changeLanguage = (lng: string) => {
    i18next.changeLanguage(lng);
  };

  export let activeSection = '';

  let isNavbarScrolled = false;

  const handleScroll = () => {
    const heroHeight = (document.querySelector(".hero-section") as HTMLElement)?.offsetHeight || 0;
    isNavbarScrolled = window.scrollY > heroHeight;
  };

  onMount(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
</script>

<div
  class="fixed w-full top-0 z-20 shadow-xl transition-colors duration-300"
  style:background-color={isNavbarScrolled ? 'white' : 'transparent'}
  style:color={isNavbarScrolled ? 'black' : 'white'}
>
  <div class="container mx-auto">
    <div class="navbar">
      <div class="navbar-start">
        <div class="flex items-center">
          <!-- Логотип -->
          <a href="/" class="inline-block mr-2">
            <img
              src="/favicon.png"
              alt="Company Logo"
              class="h-[30px] inline-block"
              style="vertical-align: middle;"
            />
          </a>
          <!-- Текст "DES" -->
          <a
            class="btn btn-link decoration no-underline normal-case text-xl flex items-center"
            href="/"
            style:color={isNavbarScrolled ? 'black' : 'white'}
          >
            DES
          </a>
        </div>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1 gap-1 text-sm">
          <li>
            <a
              href="#hero-section"
              class:active={activeSection === "mainSection"}
              on:click={(e) => {
                e.preventDefault();
                const target = document.getElementById("hero-section");
                target?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {$t('home')}
            </a>
          </li>
          <li>
            <a
              href="#future-section"
              class:active={activeSection === "mainSection"}
              on:click={(e) => {
                e.preventDefault();
                const target = document.getElementById("future-section");
                target?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {$t('future')}
            </a>
          </li>
          <li>
            <a
              href="#about-section"
              class:active={activeSection === "mainSection"}
              on:click={(e) => {
                e.preventDefault();
                const target = document.getElementById("about-section");
                target?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {$t('about')}
            </a>
          </li>
          <li>
            <a
              href="#qa-section"
              class:active={activeSection === "mainSection"}
              on:click={(e) => {
                e.preventDefault();
                const target = document.getElementById("qa-section");
                target?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {$t('qa')}
            </a>
          </li>
          <li>
            <a
              href="#stats-section"
              class:active={activeSection === "mainSection"}
              on:click={(e) => {
                e.preventDefault();
                const target = document.getElementById("stats-section");
                target?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {$t('stats')}
            </a>
          </li>
        </ul>
      </div>
      <div class="navbar-end gap-2">
        <!-- Language switcher -->
        <div class="flex items-center space-x-2 mr-2">
          <button on:click={() => changeLanguage('ru')} class="text-sm hover:underline">🇷🇺</button>
          <button on:click={() => changeLanguage('en')} class="text-sm hover:underline">🇬🇧</button>
        </div>

        {#if $userStore.user}
          <a
            class="btn bg-[#4E8D8D] text-white font-bold py-2 px-4 rounded-md shadow-md hover:bg-[#3A7373] transition-all duration-300"
            href="/profile"
          >
            {$t('profile')}
          </a>
        {:else}
          <a
            class="btn bg-[#4E8D8D] text-white font-bold py-2 px-4 rounded-md shadow-md hover:bg-[#3A7373] transition-all duration-300 mr-2"
            href="/auth/login"
          >
            {$t('login')}
          </a>
          <a
            class="btn bg-white text-[#4E8D8D] font-bold py-2 px-4 rounded-md border border-[#4E8D8D] shadow-md hover:bg-[#4E8D8D] hover:text-white transition-all duration-300 hidden md:inline-flex"
            href="/auth/signup"
          >
            {$t('signup')}
          </a>
        {/if}
      </div>
    </div>
  </div>
</div>