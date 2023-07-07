
<script lang="ts">
  export let title = "Солнечная Енергия";
  export let text = `Эти технологии позволяют преобразовывать солнечный свет в электрическую энергию с помощью фотоэлектрических панелей либо зеркал.`;
  export let image = "greenenergy.webp";
  export let href = "/infobase/solar";
</script>

<div class="max-w-sm w-full lg:flex shadow hover:shadow-xl">
  <img class=" h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:!rounded-l text-center overflow-hidden w-full object-cover" src={image} alt={title} />
  <div class="rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
    <div class="flex flex-col mb-8 h-full justify-between">
      <div>
        <div class="text-gray-900 font-bold text-xl mb-2">{title}</div>
        <p class="text-gray-700 text-base">{text}</p>
      </div>
      <a href={href} class="btn btn-outline mt-2 self-end">Узнать больше</a>
    </div>
  </div>
</div>