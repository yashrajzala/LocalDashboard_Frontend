<script lang="ts">
	import { onDestroy } from 'svelte';

	// UI components
	import SensorCard from '$lib/components/SensorCard.svelte';
	import Gauge from '$lib/components/Gauge.svelte';
	import VerticalGauge from '$lib/components/VerticalGauge.svelte';
	import LiveLineChart from '$lib/components/LiveLineChart.svelte';

	// API logic
	import { fetchAllSensorData } from '$lib/api/sensors/fetchAll';
	import type { SensorData } from '$lib/api/sensors/types';

	let raw: SensorData = {};
	let calculated: SensorData = {};
	let interval: number;

	// 🔁 Time-stamped S4 history (reactive array of objects)
	type HistoryEntry = { time: string; value: number };
	let s4History: HistoryEntry[] = [];

	// ➕ Append value with timestamp, keep max 1000 entries
	function updateHistory(newVal: number) {
		const now = new Date().toISOString(); // Safe for chart
		s4History = [...s4History, { time: now, value: newVal }];
		if (s4History.length > 1000) s4History.shift();
	}

	// 🚀 Fetch data and update values
	async function loadData() {
		const data = await fetchAllSensorData('greenhouse1');
		raw = data.raw;
		calculated = data.calculated;

		if (typeof raw?.S4 === 'number' && !isNaN(raw.S4)) {
			updateHistory(raw.S4);
		}
	}

	// 🔁 Start polling
	loadData();
	interval = setInterval(loadData, 5000);
	onDestroy(() => clearInterval(interval));

	// 📊 Utility: sort sensor keys (S1–S9)
	function sortedSensorEntries(data: SensorData) {
		return Object.entries(data).sort(([a], [b]) => {
			const aNum = parseInt(a.replace(/\D/g, ''), 10);
			const bNum = parseInt(b.replace(/\D/g, ''), 10);
			return aNum - bNum;
		});
	}
</script>

<!-- 🏷️ Title -->
<h1>Greenhouse 1 - Live Sensor Data</h1>

<!-- 🌡️ Radial Gauge for S1 -->
<div class="gauge-wrapper">
	<Gauge value={raw.S1} min={0} max={10} unit="%" description="Humidity Sensor" />
</div>

<!-- 🌡️ Vertical Gauge for S4 -->
<div class="gauge-wrapper">
	<VerticalGauge label="S4" value={raw.S4} min={30} max={40} unit="°C" />
</div>

<!-- 📈 Live Chart -->
<div class="chart-wrapper">
	<LiveLineChart label="Sensor S4" unit="°C" values={s4History} min={30} max={40} />
</div>

<!-- 🔳 All sensor values -->
<div class="grid-container">
	{#each sortedSensorEntries(raw) as [key, value] (key)}
		<SensorCard label={key} {value} />
	{/each}
</div>

<style>
	h1 {
		font-size: 1.5rem;
		text-align: center;
		margin-bottom: 1rem;
	}
	.gauge-wrapper {
		display: flex;
		justify-content: center;
		margin-bottom: 1rem;
	}
	.chart-wrapper {
		margin: 1rem auto;
		max-width: 600px;
		padding: 1rem;
		background: white;
		border-radius: 12px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}
	.grid-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-evenly;
		gap: 1rem;
		padding: 1rem;
	}
</style>
