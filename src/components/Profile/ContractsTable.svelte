<script lang="ts">
	import { browser } from "$app/environment";
	import { contracts } from "stores/contracts";
	import { onMount } from "svelte";

	// Флаг загрузки
	let isLoading = true;

	// Монтируем данные
	onMount(async () => {
		try {
			isLoading = true;
			if (browser) {
				await contracts.getContracts();
			}
		} catch (e) {
			console.error("Ошибка загрузки контрактов:", e);
		} finally {
			isLoading = false;
		}
	});

	// Возвращает дату в формате "dd.mm.yyyy"
	const returnDate = (date: string | Date) => {
		const newDate = new Date(date);
		return newDate.toLocaleDateString("ru-RU");
	};

	// Возвращает цвет карточки в зависимости от названия контракта
	const getCardColor = (name: string) => {
		switch (name.toLowerCase()) {
			case "lite":
				return "bg-gradient-to-r from-blue-200 to-blue-400 text-blue-800";
			case "comfort":
				return "bg-gradient-to-r from-green-200 to-green-400 text-green-800";
			case "pro":
				return "bg-gradient-to-r from-orange-300 to-orange-500 text-orange-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};
</script>

<div class="max-w-6xl  rounded-3xl bg-red-100 overflow-y-auto  "style="
background-color: #4E8D8D;
height: 427px;
border: 4px solid #000000;
box-shadow: inset 0 4px 6px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1);
" >
	<h1 class="text-3xl font-bold mb-4 mt-4 text-center ">Ваши Контракты</h1>

	{#if $contracts.length === 0}
		{#if isLoading}
			<div class="flex justify-center items-center h-64">
				<p class="text-lg text-gray-500">Загрузка...</p>
			</div>
		{:else}
			<div class="flex justify-center items-center h-64">
				<p class="text-lg text-gray-500">У вас нет активных контрактов</p>
			</div>
		{/if}
	{/if}

	{#if $contracts.length > 0}
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-4">
			{#each $contracts as contract}
				<div
					class={`p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 cursor-pointer ${getCardColor(
						contract.contract.name
					)}`}
				>
					<h2 class="text-xl font-semibold mb-2">{contract.contract.name}</h2>
					<p class="text-lg font-bold mb-2">Доход: +${contract.current_profit || 0}</p>
					<p class="text-sm mb-2">Длительность: {contract.days_from_start} дней</p>
					<p class="text-sm mb-2">Депозит: ${contract.deposit_amount}</p>
					<div class="mt-4">
						<p class="text-sm text-gray-700">Создано: {returnDate(contract.creation_date)}</p>
						<div class="w-full h-2 bg-gray-300 rounded-full mt-2">
							<div
								class="h-2 bg-blue-500 rounded-full"
								style="width: {contract.complete_percent}%"
							></div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	/* Анимация для карточек */
	.card:hover {
		transform: scale(1.05);
		box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
	}
</style>
