<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import { LinkIcon, XIcon, MessageCircleIcon } from '@lucide/svelte';
	import { fly, scale } from 'svelte/transition';
	import { browser } from '$app/environment';
	import { cn } from '$lib/utils';
	import { streamPageScroll } from '$lib/runes.svelte';
	import Card from '$lib/components/ui/Card.svelte';

	let isOpen = $state(false);
	const pageScroll = streamPageScroll();

	const shouldHide = $derived.by(() => {
		if (!browser) return false;
		return (pageScroll.isAtBottom || pageScroll.isScrolling) && !isOpen;
	});

	function toggle() {
		isOpen = !isOpen;
	}

	const links = [
		{
			label: 'WhatsApp Community',
			icon: MessageCircleIcon,
			href: '#',
			color: 'bg-green-500 text-white'
		},
		{
			label: 'Discord Community',
			icon: MessageCircleIcon,
			href: '#',
			color: 'bg-blue-700 text-white'
		}
	];
</script>

<div class="fixed right-3 bottom-3 z-50 flex flex-col items-end gap-3">
	{#if isOpen}
		<div class="flex flex-col items-end gap-3" transition:fly={{ y: 25, duration: 300, x: 10 }}>
			{#each links as link (link.label)}
				<Card
					href={link.href}
					target="_blank"
					class="flex items-center gap-3 rounded-full bg-surface py-1 pr-1 pl-4"
				>
					<span class="text-sm font-medium text-foreground">{link.label}</span>
					<div class={cn('flex size-10 items-center justify-center rounded-full', link.color)}>
						<link.icon size={20} />
					</div>
				</Card>
			{/each}
		</div>
	{/if}

	<Button
		variant={isOpen ? 'outline' : 'solid'}
		size="icon-md-lg"
		rounded
		onclick={toggle}
		class={cn(
			'relative shadow-lg duration-500',
			shouldHide ? 'translate-x-15 opacity-0' : 'translate-x-0 opacity-100'
		)}
	>
		{#snippet prefixIcon({ class: iconClass }: { class: string })}
			{#if isOpen}
				<div
					transition:scale={{ duration: 300, start: 0 }}
					class="absolute inset-0 grid place-items-center"
				>
					<XIcon class={iconClass} />
				</div>
			{:else}
				<div
					transition:scale={{ duration: 300, start: 0 }}
					class="absolute inset-0 grid place-items-center"
				>
					<LinkIcon class={iconClass} />
					<!-- Notification dot -->
					<span
						class="absolute top-0.5 right-0.5 size-2.5 rounded-full border border-on-primary bg-primary"
					></span>
				</div>
			{/if}
		{/snippet}
	</Button>
</div>
