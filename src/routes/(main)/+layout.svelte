<script lang="ts">
	import ThemeSwitcher from './ThemeSwitcher.svelte';
	import QuickLinks from './QuickLinks.svelte';
	import Footer from './_sections/Footer.svelte';
	import Navbar from './Navbar.svelte';

	let { children } = $props();
</script>

<Navbar />
<!-- Hidden element to fill the space of the fixed Navbar -->
<div class="h-16" aria-hidden="true"></div>

{@render children()}

<Footer />

<ThemeSwitcher />
<QuickLinks />
