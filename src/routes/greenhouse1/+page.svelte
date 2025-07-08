<script lang="ts">
	import { onDestroy } from 'svelte';
	import SensorCard from '$lib/components/SensorCard.svelte';
	import Gauge from '$lib/components/Gauge.svelte';
	import { fetchAllSensorData } from '$lib/api/sensors/fetchAll';
	import type { SensorData } from '$lib/api/sensors/types';

	let raw: SensorData = {};
	let calculated: SensorData = {};
	let interval: number;

	async function loadData() {
		const data = await fetchAllSensorData('greenhouse1');
		raw = data.raw;
		calculated = data.calculated;
	}

	loadData();
	interval = setInterval(loadData, 5000);
	onDestroy(() => clearInterval(interval));

	function sortedSensorEntries(data: SensorData) {
		return Object.entries(data).sort(([a], [b]) => {
			const aNum = parseInt(a.replace(/\D/g, ''), 10);
			const bNum = parseInt(b.replace(/\D/g, ''), 10);
			return aNum - bNum;
		});
	}
</script>

<h1>Greenhouse 1 - Live Sensor Data</h1>

<!-- 🔁 Live Gauge for S1 -->
<div class="gauge-wrapper">
	<Gauge value={raw.S1} min={0} max={10} unit="%" description="Humidity Sensor" />
</div>

<div class="grid-container">
	{#each sortedSensorEntries(raw) as [key, value] (key)}
		<SensorCard label={key} {value} />
	{/each}
</div>

<style>
	h1 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
		text-align: center;
	}

	.gauge-wrapper {
		display: flex;
		justify-content: center;
		margin-bottom: 1rem;
	}

	.grid-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-evenly;
		gap: 1rem;
		padding: 1rem;
		box-sizing: border-box;
	}
</style>
