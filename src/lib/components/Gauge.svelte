<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	export let value: number;
	export let min: number;
	export let max: number;
	export let unit: string = ''; // e.g., '%', '°C', 'RH'
	export let description: string = ''; // Optional sensor label below gauge

	// Clamp and calculate percent
	$: clamped = Math.max(min, Math.min(max, value));
	$: percent = (clamped - min) / (max - min);
	$: angle = -90 + percent * 180;

	// Tweened angle for needle animation
	const animatedAngle = tweened(angle, {
		duration: 800,
		easing: cubicOut
	});

	$: if (!Number.isNaN(angle)) {
		animatedAngle.set(angle);
	}

	// Fill color based on percentage
	$: color = percent <= 0.3 ? '#f44336' : percent <= 0.7 ? '#ffeb3b' : '#4caf50';

	// Tick marks
	const tickCount = 11;
	const radiusOuter = 45;
	const radiusInner = 41;
	const centerY = 40;

	function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
		const rad = (angleDeg * Math.PI) / 180;
		return {
			x: cx + r * Math.cos(rad),
			y: cy + r * Math.sin(rad)
		};
	}

	$: ticks = Array.from({ length: tickCount }, (_, i) => {
		const pct = i / (tickCount - 1);
		const tickAngle = pct * 180 - 180; // ✅ rotate further counterclockwise
		const p1 = polarToCartesian(50, centerY, radiusInner, tickAngle);
		const p2 = polarToCartesian(50, centerY, radiusOuter, tickAngle);
		return {
			x1: p1.x,
			y1: p1.y,
			x2: p2.x,
			y2: p2.y,
			value: min + pct * (max - min)
		};
	});
</script>

<div class="gauge-card">
	<div class="gauge-container">
		<svg viewBox="0 0 100 60" class="gauge-svg" preserveAspectRatio="xMidYMid meet">
			<!-- Background arc -->
			<path
				d="M10,40 A40,40 0 0,1 90,40"
				fill="none"
				stroke="#eee"
				stroke-width="10"
				stroke-linecap="round"
			/>

			<!-- Fill arc -->
			<path
				d="M10,40 A40,40 0 0,1 90,40"
				fill="none"
				stroke={color}
				stroke-width="10"
				stroke-linecap="round"
				stroke-dasharray="126"
				stroke-dashoffset={126 * (1 - percent)}
				class="gauge-fill"
			/>

			<!-- Tick marks (above fill) -->
			{#each ticks as t}
				<line x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke="#222" stroke-width="1" />
			{/each}

			<!-- Needle -->
			<g transform="translate(50,40) rotate({$animatedAngle})">
				<path d="M0,-25 Q-2.5,-10 -3.5,0 A3.5,3.5 0 0,0 3.5,0 Q2.5,-10 0,-25 Z" fill="#222" />
			</g>
		</svg>

		<!-- Value and description -->
		<div class="gauge-value">{clamped.toFixed(1)} <span class="unit">{unit}</span></div>
		{#if description}
			<div class="gauge-description">{description}</div>
		{/if}
	</div>
</div>

<style>
	.gauge-card {
		background: #fff;
		border-radius: 12px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
		padding: 1rem;
		margin: 0.5rem;
		width: 220px;
		transition: box-shadow 0.3s ease;
		display: inline-block;
	}
	.gauge-card:hover {
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
	}
	.gauge-container {
		width: 200px;
		margin: 10px auto;
		text-align: center;
		font-family: sans-serif;
		position: relative;
	}

	.gauge-svg {
		width: 100%;
		height: auto;
		overflow: visible;
	}

	.gauge-value {
		font-size: 1.5rem;
		margin-top: -20px;
		z-index: 2;
		position: relative;
	}
	.unit {
		font-size: 0.85em;
		color: #555;
	}

	.gauge-fill {
		transition:
			stroke-dashoffset 0.8s ease-out,
			stroke 0.4s ease-in-out;
	}
	.gauge-description {
		font-size: 0.9rem;
		color: #666;
		margin-top: 4px;
	}
	.gauge-fill:hover {
		stroke-width: 12;
	}

	.gauge-description {
		font-size: 0.85rem;
		color: #777;
		margin-top: 2px;
	}
</style>
