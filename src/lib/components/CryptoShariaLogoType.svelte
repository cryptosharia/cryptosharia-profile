<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import logo1 from '$lib/assets/logo1.png';
	import { resolve } from '$app/paths';
	import { cn } from '$lib/utils';

	type Props = {
		size?: 'sm' | 'md' | 'lg';
		href?: string;
		ariaLabel?: string;
	};

	const { size = 'md', href = resolve('/'), ariaLabel = 'Go to Home' }: Props = $props();

	// Map generic sizes to specific classes for image and text
	const sizeMap = {
		sm: { img: 'size-8', text: 'text-lg' },
		md: { img: 'size-9', text: 'text-xl' },
		lg: { img: 'size-10', text: 'text-2xl' }
	};
</script>

<Button variant="blank" size="text" {href} class="gap-2" aria-label={ariaLabel}>
	<img
		src={logo1}
		alt="CryptoSharia Logo"
		class={cn('object-contain transition-all', sizeMap[size].img)}
	/>
	<span class={cn('font-serif font-bold text-primary transition-all', sizeMap[size].text)}>
		CryptoSharia
	</span>
</Button>
