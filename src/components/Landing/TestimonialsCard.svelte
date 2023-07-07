<script lang="ts">
  export let title: string = '';
  export let text: string = '';
  export let image: string = '';
  export let name: string = '';
  export let position: string = '';
</script>

<div class="card w-96 rounded-xl border-primary shadow hover:shadow-xl">
  <div class="card-body">
    <box-icon class="w-[32px] h-[32px] ml-[-18px] mt-[-18px] fill-current text-primary" type='solid' name='quote-alt-left'></box-icon> 
    <h2 class="card-title">{title}</h2>
    <p>{text}</p>
    <div class="card-actions justify-start mt-4 items-center">
      <div class="avatar ">
        <div class="w-16 mask mask-hexagon">
          <img src={image} alt="avatar" />
        </div>
      </div>
      <div class="flex flex-col">
        <p class="text-lg">{name}</p>
        <p class="italic">{position}</p>
      </div>
    </div>
  </div>
</div>