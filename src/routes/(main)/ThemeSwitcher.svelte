<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import { MoonIcon, SunIcon, SunMoonIcon, EllipsisIcon } from '@lucide/svelte';
	import { useTheme } from 'svelte-themes';
	import { browser } from '$app/environment';
	import { cn } from '$lib/utils';
	import { streamPageScroll } from '$lib/runes.svelte';

	const theme = useTheme();
	const scrollState = streamPageScroll();

	const isAtTopOrBottom = $derived.by(() => {
		if (!browser) return true;
		return scrollState.isAtTop || scrollState.isAtBottom;
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

<Button
	variant="solid"
	size="icon-md"
	aria-label="Switch theme"
	onclick={handleClick}
	rounded
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
