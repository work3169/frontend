<script lang="ts">
  import Logo from "components/Logo.svelte";
</script>

<div class="sticky top-0 bg-base-100 z-20 shadow-sm">
  <div class="container mx-auto ">
    <div class="navbar">
      <div class="navbar-start">
        <div class="relative w-[40px]" >
          <a class="absolute block top-[-34px] w-[68px] h-[68px]" href="/">
            <Logo />
          </a>   
        </div>
      </div>
      <div class="navbar-end">
        <a href="/auth/login" class="btn btn-ghost md:mr-2 rounded-md ">Войти</a>
        <a href="/auth/signup" class="btn btn-ghost rounded-md hidden sm:flex">Зарегистрироваться</a>
      </div>
    </div>
  </div>
</div>