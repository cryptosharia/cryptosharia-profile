<script lang="ts">
	import ThemeSwitcher from './ThemeSwitcher.svelte';
	import QuickLinks from './QuickLinks.svelte';

	let { children } = $props();
</script>

{@render children()}

<ThemeSwitcher />
<QuickLinks />
