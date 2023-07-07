<script lang="ts">
  export let imgSrc = "";
  export let title = "";
  export let isNew = false;
  export let text = "";
</script>

<div class="card w-80 md:w-96 bg-base-100 shadow hover:shadow-xl">
  <figure><img src={imgSrc} alt={title} class="h-[250px] w-full" /></figure>
  <div class="card-body">
    <h2 class="card-title">
      {title}
      {#if isNew}
        <div class="badge badge-secondary">NEW</div>
      {/if}
    </h2>
    <p>{text}</p>
    <div class="card-actions justify-end">
      <div class="badge badge-outline">Аналитика</div>
      <div class="badge badge-outline">Энергетика</div>
    </div>
  </div>
</div>