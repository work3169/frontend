<script lang="ts">
  import Logo from "components/Logo.svelte";

  export let activeSection = '';
</script>

<div class="fixed w-full top-0 bg-base-100 z-20 shadow-xl">
  <div class="container mx-auto ">
    <div class="navbar">
      <div class="navbar-start">
        <div class="flex">
          <div class="relative w-[40px]" >
            <a class="absolute block left-0 top-[-34px] w-[68px] h-[68px]" href="/">
              <Logo />
            </a>   
          </div>
        </div>
        <a class="btn btn-link decoration no-underline text-black normal-case text-xl" href="/">GEEF</a>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1 gap-1 text-sm">
          <li><a href="#main" class:active={activeSection === 'mainSection'}>Главная</a></li>
          <li><a href="#products" class:active={activeSection === 'productsSection'}>Продукты</a></li>
          <li><a href="#news" class:active={activeSection === 'newsSection'}>Новости</a></li>
          <li><a href="#reviews" class:active={activeSection === 'reviewsSection'}>Отзывы</a></li>
          <li><a href="#contracts" class:active={activeSection === 'contractsSection'}>Контракты</a></li>
        </ul>
      </div>
      <div class="navbar-end gap-2">
        <a class="btn btn-outline rounded-md" href="/auth/login">Войти</a>
        <a class="btn btn-sm sm:btn-md rounded-md hidden md:flex" href="/auth/signup">Зарегистрироваться</a>
      </div>
    </div>
  </div>
</div>