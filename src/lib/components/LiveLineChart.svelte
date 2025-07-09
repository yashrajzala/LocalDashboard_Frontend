<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Chart from 'chart.js/auto';

	export let label = 'Sensor';
	export let unit = '';
	export let values: { time: string; value: number }[] = [];
	export let min = 0;
	export let max = 100;

	let canvasEl: HTMLCanvasElement;
	let chart: Chart;

	function formatTime(ts: string) {
		const date = new Date(ts);
		return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	}

	onMount(() => {
		chart = new Chart(canvasEl, {
			type: 'line',
			data: {
				labels: values.map((v) => v.time),
				datasets: [
					{
						label: `${label} (${unit})`,
						data: values.map((v) => v.value),
						borderColor: '#4caf50',
						backgroundColor: 'rgba(76, 175, 80, 0.1)',
						pointBackgroundColor: '#222',
						pointBorderColor: '#222',
						pointRadius: 3,
						pointHoverRadius: 5,
						fill: true,
						tension: 0.2
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				animation: false,
				scales: {
					x: { display: false },
					y: { min, max }
				},
				plugins: {
					tooltip: {
						callbacks: {
							label: (ctx) => `${formatTime(ctx.label as string)}: ${ctx.formattedValue} ${unit}`
						}
					}
				}
			}
		});
	});

	onDestroy(() => chart?.destroy());

	// ✅ Reactive update
	$: if (chart && values.length) {
		chart.data.labels = values.map((v) => v.time);
		chart.data.datasets[0].data = values.map((v) => v.value);
		if (chart.options.scales?.y) {
			chart.options.scales.y.min = min;
			chart.options.scales.y.max = max;
		}
		chart.update();
	}
</script>

<div class="chart-container">
	<canvas bind:this={canvasEl}></canvas>
</div>

<style>
	.chart-container {
		width: 100%;
		height: 220px;
		position: relative;
	}
	canvas {
		width: 100%;
		height: 100%;
	}
</style>
