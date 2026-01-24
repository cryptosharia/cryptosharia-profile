<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import { MoonIcon, SunIcon, SunMoonIcon, EllipsisIcon } from '@lucide/svelte';
	import { useTheme } from 'svelte-themes';
	import { browser } from '$app/environment';
	import { getViewportHeight, getPageHeight, cn } from '$lib/utils';

	const theme = useTheme();

	let scrollY = $state(0);

	const isAtTopOrBottom = $derived.by(() => {
		if (!browser) return true;

		const viewportHeight = getViewportHeight();
		const pageHeight = getPageHeight();

		// Hide if at top (allow 10px buffer)
		if (scrollY < 10) return true;

		// Hide if at bottom (allow 10px buffer)
		if (scrollY + viewportHeight >= pageHeight - 10) return true;

		return false;
	});

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

<svelte:window bind:scrollY />

<Button
	variant="solid"
	size="icon-md"
	aria-label="Switch theme"
	onclick={handleClick}
	class={cn(
		'fixed bottom-3 left-3 z-50 transition-all duration-500',
		isAtTopOrBottom ? '-translate-x-15 opacity-0' : 'translate-x-0 opacity-100'
	)}
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
