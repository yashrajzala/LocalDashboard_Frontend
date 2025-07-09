<script lang="ts">
	export let label: string = 'Sensor';
	export let value: number = 0;
	export let min: number = 0;
	export let max: number = 100;
	export let unit: string = '';

	$: clamped = Math.min(Math.max(value, min), max);
	$: percent = ((clamped - min) / (max - min)) * 100;
	$: fillColor = percent <= 30 ? '#f44336' : percent <= 70 ? '#ffeb3b' : '#4caf50';
</script>

<div class="card">
	<div class="gauge-container">
		<div class="gauge-body">
			<div class="gauge-ticks">
				{#each Array(10) as _, i}
					<div class="tick-mark"></div>
				{/each}
			</div>
			<div class="gauge-bar">
				<div class="gauge-fill" style="height: {percent}%; background-color: {fillColor};"></div>
			</div>
		</div>
		<div class="gauge-value">{value} {unit}</div>
		<div class="gauge-label">{label}</div>
	</div>
</div>

<style>
	.card {
		padding: 1rem;
		margin: 0.5rem;
		background-color: #fff;
		border: 1px solid #ccc;
		border-radius: 10px;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
		width: fit-content;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: box-shadow 0.3s ease;
	}

	.card:hover {
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
	}

	.gauge-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 60px;
	}

	.gauge-body {
		display: flex;
		flex-direction: row;
		align-items: flex-end;
	}

	.gauge-ticks {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 150px;
		margin-right: -10px;
		z-index: 1;
	}

	.tick-mark {
		width: 8px;
		height: 2px;
		background-color: #444;
		margin-top: 5px;
		margin-bottom: 8px;
	}

	.gauge-bar {
		height: 150px;
		width: 24px;
		background-color: #e0e0e0;
		border: 2px solid #888;
		border-radius: 20px;
		overflow: hidden;
		display: flex;
		flex-direction: column-reverse;
	}

	.gauge-fill {
		width: 100%;
		transition:
			height 0.5s ease-in-out,
			background-color 0.3s ease,
			transform 0.2s ease;
	}

	.gauge-fill:hover {
		transform: scaleX(1.5);
		box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
	}

	.gauge-label {
		margin-top: 4px;
		font-size: 0.9rem;
		text-align: center;
	}

	.gauge-value {
		font-size: 1rem;
		font-weight: bold;
		margin-top: 8px;
		text-align: center;
	}
</style>
