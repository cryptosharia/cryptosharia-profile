<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { SvelteTheme } from 'svelte-themes';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<SvelteTheme enableSystem defaultTheme="system" attribute="class" enableColorScheme>
	{@render children()}
</SvelteTheme>
