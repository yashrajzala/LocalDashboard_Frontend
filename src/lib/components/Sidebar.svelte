<script lang="ts">
	export let isOpen: boolean;
	export let close: () => void;

	import { page } from '$app/stores';
	$: currentPath = $page.url.pathname;

	const navItems = [
		{ label: 'Home', path: '/' },
		{ label: 'Greenhouse 1', path: '/greenhouse1' }
	];
</script>

<!-- Click outside to close -->
{#if isOpen}
	<button class="overlay" on:click={close} aria-label="Close sidebar"></button>
{/if}

<!-- Sidebar -->
<aside class="sidebar" class:open={isOpen}>
	<h1 class="logo">🌿 Greenhouse</h1>
	<nav>
		{#each navItems as item}
			<a href={item.path} class:selected={currentPath === item.path} on:click={close}>
				{item.label}
			</a>
		{/each}
	</nav>
</aside>

<style>
	.sidebar {
		position: fixed;
		top: 60px; /* Below the navbar */
		left: 0;
		height: calc(100vh - 60px); /* Full height minus navbar */
		width: 220px;
		background-color: #1e293b;
		color: white;
		padding: 1.5rem 1rem;
		transform: translateX(-100%);
		transition: transform 0.3s ease-in-out;
		z-index: 1000;
	}

	.sidebar.open {
		transform: translateX(0);
	}

	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.3);
		z-index: 999;
		border: none;
		cursor: pointer;
	}

	.logo {
		text-align: center;
		font-size: 1.5rem;
		margin-bottom: 2rem;
	}

	nav {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	a {
		color: #cbd5e1;
		text-decoration: none;
		padding: 10px 15px;
		border-radius: 5px;
		transition: background 0.2s;
	}

	a:hover {
		background-color: #334155;
	}

	a.selected {
		background-color: #0ea5e9;
		color: white;
		font-weight: bold;
	}
</style>
