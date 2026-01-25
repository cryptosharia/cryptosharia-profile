<script lang="ts">
	import type { Snippet, Component } from 'svelte';
	import type { HTMLButtonAttributes, HTMLAnchorAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';

	type Props = (HTMLButtonAttributes | HTMLAnchorAttributes) & {
		class?: string;
		href?: string;
		variant?: 'solid' | 'outline' | 'blank' | 'soft' | 'link' | 'ghost' | 'link-ghost';
		size?: 'md' | 'sm' | 'icon-md' | 'icon-sm' | 'text';
		rounded?: boolean;
		pointerEvents?: boolean;
		prefixIcon?: Component;
		suffixIcon?: Component;
		children?: Snippet;
	};

	const {
		class: className,
		children,
		href,
		variant = 'solid',
		size = 'md',
		rounded = false,
		pointerEvents = true,
		prefixIcon: PrefixIcon,
		suffixIcon: SuffixIcon,
		...rest
	}: Props = $props();

	const base = $derived([
		/*tw*/ 'shrink-0 inline-flex items-center justify-center whitespace-nowrap font-semibold transition-all',
		/*tw*/ 'disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none',
		!pointerEvents && 'pointer-events-none'
	]);

	const sizes = $derived({
		sm: `h-10 px-4 text-sm gap-1.5 active:scale-90 ${rounded ? 'rounded-full' : 'rounded-lg'}`,
		md: `h-12 px-6 text-base gap-2 active:scale-90 ${rounded ? 'rounded-full' : 'rounded-xl'}`,
		'icon-md': `size-12 active:scale-80 ${rounded ? 'rounded-full' : 'rounded-xl'}`,
		'icon-sm': `size-8 active:scale-80 ${rounded ? 'rounded-full' : 'rounded-lg'}`,
		text: 'active:scale-95'
	});

	const variants = {
		solid: [/*tw*/ 'bg-primary text-on-primary shadow-sm', /*tw*/ 'hover:bg-primary-700'],
		outline: [
			/*tw*/ 'border-2 border-primary text-primary bg-transparent',
			/*tw*/ 'hover:bg-primary/5'
		],
		soft: [/*tw*/ 'bg-primary/5 text-primary', /*tw*/ 'hover:bg-primary hover:text-on-primary'],
		link: [
			/*tw*/ 'text-primary hover:underline underline-offset-4',
			/*tw*/ 'bg-transparent shadow-none'
		],
		ghost: [
			/*tw*/ 'bg-foreground/5 text-foreground/75 shadow-none',
			/*tw*/ 'hover:bg-primary hover:text-on-primary'
		],
		'link-ghost': [
			/*tw*/ 'text-faded decoration-faded hover:text-primary hover:underline underline-offset-4',
			/*tw*/ 'bg-transparent shadow-none'
		],
		blank: ''
	};

	const mergedClass = $derived(cn(base, sizes[size], variants[variant], className));

	const iconSize = $derived(
		size === 'sm' ? 18 : size === 'icon-md' ? 22 : size === 'icon-sm' ? 16 : 20
	);
</script>

<svelte:element this={href ? 'a' : 'button'} {href} class={mergedClass} {...rest}>
	{#if PrefixIcon}
		<PrefixIcon size={iconSize} />
	{/if}
	{@render children?.()}
	{#if SuffixIcon}
		<SuffixIcon size={iconSize} />
	{/if}
</svelte:element>
