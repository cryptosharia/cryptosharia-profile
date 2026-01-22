<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes, HTMLAnchorAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';

	type Props = (HTMLButtonAttributes | HTMLAnchorAttributes) & {
		class?: string;
		href?: string;
		variant?: 'primary' | 'secondary' | 'text';
		rounded?: boolean;
		children?: Snippet;
	};

	let {
		class: className,
		children,
		href,
		variant = 'primary',
		rounded = false,
		...rest
	}: Props = $props();

	const base = $derived([
		/*tw*/ 'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all duration-200',
		/*tw*/ 'disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none active:scale-95',
		rounded ? 'rounded-full' : 'rounded-lg'
	]);

	const variants = {
		primary: [
			/*tw*/ 'bg-primary text-on-primary shadow-sm px-4 h-10',
			/*tw*/ 'hover:bg-primary-700'
		],
		secondary: [
			/*tw*/ 'border-2 border-primary text-primary bg-transparent px-4 h-10',
			/*tw*/ 'hover:bg-primary/5'
		],
		text: /*tw*/ 'text-foreground hover:text-primary'
	};

	let mergedClass = $derived(cn(base, variants[variant], className));
</script>

<svelte:element this={href ? 'a' : 'button'} {href} class={mergedClass} {...rest}>
	{@render children?.()}
</svelte:element>
