<script lang="ts">
	import type { Snippet, Component } from 'svelte';
	import type { HTMLButtonAttributes, HTMLAnchorAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';

	type Props = (HTMLButtonAttributes | HTMLAnchorAttributes) & {
		class?: string;
		href?: string;
		variant?: 'primary' | 'secondary' | 'blank';
		size?: 'md' | 'sm' | 'icon' | 'text';
		rounded?: boolean;
		prefixIcon?: Component;
		suffixIcon?: Component;
		children?: Snippet;
	};

	const {
		class: className,
		children,
		href,
		variant = 'primary',
		size = 'md',
		rounded = false,
		prefixIcon: PrefixIcon,
		suffixIcon: SuffixIcon,
		...rest
	}: Props = $props();

	const base = $derived([
		/*tw*/ 'inline-flex items-center justify-center whitespace-nowrap font-medium transition-all duration-200',
		/*tw*/ 'disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none active:scale-95'
	]);

	const sizes = $derived({
		sm: `h-10 px-4 text-sm gap-1.5 ${rounded ? 'rounded-full' : 'rounded-lg'}`,
		md: `h-12 px-6 text-base gap-2 ${rounded ? 'rounded-full' : 'rounded-xl'}`,
		icon: `h-12 w-12 ${rounded ? 'rounded-full' : 'rounded-xl'}`,
		text: ''
	});

	const variants = {
		primary: [/*tw*/ 'bg-primary text-on-primary shadow-sm', /*tw*/ 'hover:bg-primary-700'],
		secondary: [
			/*tw*/ 'border-2 border-primary text-primary bg-transparent',
			/*tw*/ 'hover:bg-primary/5'
		],
		blank: ''
	};

	const mergedClass = $derived(cn(base, sizes[size], variants[variant], className));

	const iconSize = $derived(size === 'sm' ? 18 : size === 'icon' ? 22 : 20);
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
