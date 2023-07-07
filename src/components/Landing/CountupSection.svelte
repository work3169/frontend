<script lang="ts">
  import { onMount } from 'svelte';
  let countupProjects;
  let countupUsers;
  let countupCities;

  onMount(async () => {
    await import('countup.js').then((module) => {
      const { CountUp } = module;
      countupProjects = new CountUp('projects', 364, { enableScrollSpy: true });
      countupUsers = new CountUp('users', 12173, { enableScrollSpy: true });
      countupCities = new CountUp('cities', 84, { enableScrollSpy: true });
    });
  });
</script>

<div>
  <div class="container mx-auto my-12">
    <h3 class="text-center text-4xl font-semibold my-8">Наши достижения</h3>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="flex flex-col items-center justify-center">
        <div class="text-4xl font-bold" id="projects">0</div>
        <div class="text-xl">Проектов</div>
      </div>
      <div class="flex flex-col items-center justify-center">
        <div class="text-4xl font-bold" id="users">0</div>
        <div class="text-xl">Пользователей</div>
      </div>
      <div class="flex flex-col items-center justify-center">
        <div class="text-4xl font-bold" id="cities">0</div>
        <div class="text-xl">Городов</div>
      </div>
    </div>
  </div>
</div>