<script lang="ts">
	export let onToggle: () => void;
</script>

<header class="navbar">
	<!-- Left: Hamburger -->
	<div class="left">
		<button class="hamburger" on:click={onToggle} aria-label="Open sidebar"> ☰ </button>
	</div>

	<!-- Center: Logo -->
	<div class="center">
		<h1 class="logo">CRESLA Farms</h1>
	</div>

	<!-- Right (optional space) -->
	<div class="right"></div>
</header>

<style>
	.navbar {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 60px;
		background-color: #0f172a;
		color: white;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 1rem;
		z-index: 1100;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
	}

	.left,
	.center,
	.right {
		flex: 1;
		display: flex;
		align-items: center;
	}

	.center {
		justify-content: center;
	}

	.right {
		justify-content: flex-end;
	}

	.logo {
		font-size: 2rem;
		font-weight: 400;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	.hamburger {
		font-size: 1.5rem;
		background: none;
		border: none;
		color: white;
		cursor: pointer;
		padding: 0.5rem;
	}
</style>
