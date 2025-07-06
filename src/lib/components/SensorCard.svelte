<script lang="ts">
	export let label: string;
	export let value: number;

	let flash = false;

	$: if (typeof value === 'number') {
		flash = false;
		setTimeout(() => {
			flash = true;
		}, 1);
	}
</script>

<div class="card {flash ? 'flash' : ''}">
	<div class="label">{label}</div>
	<div class="value">{value}</div>
</div>

<style>
	.card {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100px;
		height: 100px;
		border: 1px solid #ccc;
		border-radius: 8px;
		background-color: #f9f9f9;
		box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
		text-align: center;
		transition: background-color 0.3s ease;
	}
	.card:hover {
		transform: scale(1.02);
		box-shadow: 0 0 5px #444; /* Subtle shadow on hover */
	}

	.flash {
		animation: flash 0.9s ease;
	}

	.label {
		font-size: 0.9rem;
		font-weight: 600;
		color: #444;
		margin-bottom: 8px;
	}

	.value {
		font-size: 1.2rem;
		font-weight: bold;
		color: #222;
	}

	@keyframes flash {
		0% {
			background-color: #d9eadb;
		}
		100% {
			background-color: #f9f9f9;
		}
	}
</style>
