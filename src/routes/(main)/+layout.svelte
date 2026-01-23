<script lang="ts">
	import ThemeSwitcher from './ThemeSwitcher.svelte';

	let { children } = $props();
</script>

{@render children()}

<ThemeSwitcher />
