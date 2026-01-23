<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import { MoonIcon, SunIcon, SunMoonIcon, EllipsisIcon } from '@lucide/svelte';
	import { useTheme } from 'svelte-themes';

	const theme = useTheme();

	function handleClick() {
		switch (theme.theme) {
			case 'system':
				theme.theme = 'dark';
				break;
			case 'dark':
				theme.theme = 'light';
				break;
			default:
				theme.theme = 'system';
		}
	}
</script>

<Button
	variant="primary"
	size="icon"
	aria-label="Switch theme"
	onclick={handleClick}
	class="fixed bottom-3 left-3 z-50"
>
	{#if theme.theme === 'dark'}
		<MoonIcon />
	{:else if theme.theme === 'light'}
		<SunIcon />
	{:else if theme.theme === 'system'}
		<SunMoonIcon />
	{:else}
		<EllipsisIcon />
	{/if}
</Button>
