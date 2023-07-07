<script lang="ts">
  export let title: string;
  export let content: string;
  export let icon: string = "bar-chart-alt-2";
</script>

<div class="card shadow-md hover:shadow-lg p-5 sm:px-4 md:px-5 bg-base-100 flex flex-row gap-4 sm:gap-2 md:gap-4">
  <div class="pt-[1px] min-w-[24px]">
    <box-icon name={icon}></box-icon>
  </div>
  <div>
    <div class="card-title">{title}</div>
    <div class="card-content text-gray-500 font-light mt-2">{content}</div>
  </div>
</div>