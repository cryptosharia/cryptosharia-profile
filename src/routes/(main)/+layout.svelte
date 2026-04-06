<script lang="ts">
	import TopProgressBar from './TopProgressBar.svelte';
	import ThemeSwitcher from './ThemeSwitcher.svelte';
	import QuickLinks from './QuickLinks.svelte';
	import Footer from './_sections/Footer.svelte';
	import Navbar from './Navbar.svelte';

	let { children } = $props();
</script>

<TopProgressBar />
<Navbar />
<!-- Hidden element to fill the space of the fixed Navbar -->
<div class="h-16" aria-hidden="true"></div>

{@render children()}

<Footer />

<ThemeSwitcher />
<QuickLinks />
