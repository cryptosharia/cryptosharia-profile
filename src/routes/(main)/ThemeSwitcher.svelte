<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import { MoonIcon, SunIcon, SunMoonIcon, EllipsisIcon } from '@lucide/svelte';
	import { useTheme } from 'svelte-themes';
	import { cn } from '$lib/utils';
	import { streamPageScroll } from '$lib/runes.svelte';
	import { scale } from 'svelte/transition';

	const theme = useTheme();
	const pageScroll = streamPageScroll();

	const isAtTopOrBottom = $derived(
		pageScroll.isAtTop || pageScroll.isAtBottom || pageScroll.isScrolling
	);

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
	size="icon-md-lg"
	aria-label="Switch theme"
	onclick={handleClick}
	rounded
	class={cn(
		'fixed bottom-3 left-3 z-50 duration-500',
		isAtTopOrBottom ? '-translate-x-15 opacity-0' : 'translate-x-0 opacity-100'
	)}
>
	{#snippet prefixIcon({ class: iconClass }: { class: string })}
		{#if theme.theme === 'dark'}
			<div
				transition:scale={{ duration: 300, start: 0 }}
				class="absolute inset-0 grid place-items-center"
			>
				<MoonIcon class={iconClass} />
			</div>
		{:else if theme.theme === 'light'}
			<div
				transition:scale={{ duration: 300, start: 0 }}
				class="absolute inset-0 grid place-items-center"
			>
				<SunIcon class={iconClass} />
			</div>
		{:else if theme.theme === 'system'}
			<div
				transition:scale={{ duration: 300, start: 0 }}
				class="absolute inset-0 grid place-items-center"
			>
				<SunMoonIcon class={iconClass} />
			</div>
		{:else}
			<EllipsisIcon class={iconClass} />
		{/if}
	{/snippet}
</Button>
