<script lang="ts">
  import { onMount } from "svelte";
  import { user as userStore } from "stores/user";

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
      <!-- Левая часть -->
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

      <!-- Правая часть -->
      <div class="navbar-end gap-2">
        {#if $userStore.user}
          <a class="btn bg-[#4E8D8D] text-white font-bold py-2 px-4 rounded-md shadow-md hover:bg-[#3A7373] transition-all duration-300" href="/profile">
            Профиль
          </a>
        {:else}
          <a class="btn bg-[#4E8D8D] text-white font-bold py-2 px-4 rounded-md shadow-md hover:bg-[#3A7373] transition-all duration-300 mr-2" href="/auth/login">
            Войти
          </a>
          <a class="btn bg-white text-[#4E8D8D] font-bold py-2 px-4 rounded-md border border-[#4E8D8D] shadow-md hover:bg-[#4E8D8D] hover:text-white transition-all duration-300 hidden md:inline-flex" href="/auth/signup">
            Зарегистрироваться
          </a>
        {/if}
      </div>
    </div>
  </div>
</div>