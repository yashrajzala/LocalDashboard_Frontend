<script lang="ts">
	import Sidebar from '$lib/components/Sidebar.svelte';
	import Navbar from '$lib/components/Navbar.svelte';

	let isSidebarOpen = false;

	function toggleSidebar() {
		isSidebarOpen = !isSidebarOpen;
	}

	function closeSidebar() {
		isSidebarOpen = false;
	}
</script>

<Navbar onToggle={toggleSidebar} />
<Sidebar isOpen={isSidebarOpen} close={closeSidebar} />

<!-- Push content down below navbar -->
<div class="page">
	<slot />
</div>

<style>
	.page {
		padding-top: 60px; /* height of navbar */
	}
</style>
