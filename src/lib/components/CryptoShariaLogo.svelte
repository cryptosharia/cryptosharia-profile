<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import logo1 from '$lib/assets/logo1.png';
	import { resolve } from '$app/paths';
	import { cn } from '$lib/utils';
	import { fly } from 'svelte/transition';

	export type LogoSize = 'sm' | 'md' | 'lg' | 'sm-md';

	type Props = {
		size?: LogoSize;
		href?: string;
		ariaLabel?: string;
		variant?: 'mark' | 'type';
	};

	const {
		size = 'md',
		href = resolve('/'),
		ariaLabel = 'Go to Home',
		variant = 'mark'
	}: Props = $props();

	// Map generic sizes to specific classes for image and text
	const sizeMap = {
		sm: { img: 'size-8', text: 'text-lg' },
		md: { img: 'size-9', text: 'text-xl' },
		lg: { img: 'size-10', text: 'text-2xl' },
		'sm-md': { img: 'fl-size-8/9', text: 'fl-text-lg/xl' }
	};
</script>

<Button variant="blank" size="text" {href} class="gap-2" aria-label={ariaLabel}>
	<img
		src={logo1}
		alt="CryptoSharia Logo"
		class={cn('z-10 object-contain transition-all', sizeMap[size].img)}
	/>
	{#if variant === 'type'}
		<span
			transition:fly={{ x: -40, duration: 1000 }}
			class={cn('font-serif font-bold text-primary transition-all', sizeMap[size].text)}
		>
			CryptoSharia
		</span>
	{/if}
</Button>
