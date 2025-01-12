<script lang="ts">
  let dynamicComponent: any;
  async function loadComponent() {
    const module = await import('./InvestingTable.svelte');
    dynamicComponent = module.default;
  }
</script>

<div class="flex flex-col-reverse md:flex-row-reverse my-18 p-8 rounded-xl items-center w-full mx-auto">
  <div class="p-4 md:p-8">
    <h3 class="text-2xl font-semibold px-5">Выберите свой план</h3>
    <p class="mt-4 px-5">
      Мы понимаем, насколко важно для вас иметь гибкость и контроль над своими вложениями. На нашем сайте мы предоставляем вам возможность выбрать наиболее подходящие для вас договорные условия. Это может включать в себя различные варианты сроков, ставок, размеров вкладов и других параметров.
    </p>
    <p class="mt-2 px-5">
      <b>Откройте для себя наши опци планов, нажав на кнопку ниже.</b>
    </p>
    <div class="flex px-5 mt-2">
      <button on:click={loadComponent} class="btn btn-outline border-2 btn-primary mt-5 w-full max-w-[300px] rounded-full p-y-4">Открыть список планов</button>
    </div>
  </div>
  <img class="mask mask-squircle w-[75%] md:w-[50%]" src="investing.webp" alt="company" />
</div>
<!-- <InvestingTable /> -->
<svelte:component this={dynamicComponent} />