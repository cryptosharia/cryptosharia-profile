<script lang="ts">
	import FloatingCta from './_components/layout/FloatingCta.svelte';
	import Navbar from './_components/layout/Navbar.svelte';
	import ThemeSwitcher from './_components/layout/ThemeSwitcher.svelte';

	let { children } = $props();
</script>

<main>
	{@render children()}
</main>

<Navbar />
<ThemeSwitcher />
<FloatingCta />
<div class="fixed top-2 right-2 z-50 bg-gray-800 p-2 text-xs font-semibold text-white">
	<span class="sm:hidden">xs</span>
	<span class="hidden sm:inline md:hidden">sm</span>
	<span class="hidden md:inline lg:hidden">md</span>
	<span class="hidden lg:inline xl:hidden">lg</span>
	<span class="hidden xl:inline 2xl:hidden">xl</span>
	<span class="hidden 2xl:inline">2xl</span>
</div>
