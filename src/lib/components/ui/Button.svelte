<script lang="ts" module>
	import { Button as ButtonPrimitive } from 'bits-ui';
	import type { Component, Snippet } from 'svelte';

	export type ButtonVariant =
		| 'solid'
		| 'outline'
		| 'blank'
		| 'soft'
		| 'link'
		| 'ghost'
		| 'link-ghost';

	export type ButtonSize =
		| 'md'
		| 'sm'
		| 'sm-md'
		| 'icon-lg'
		| 'icon-md-lg'
		| 'icon-md'
		| 'icon-sm'
		| 'text';

	export type ButtonProps = ButtonPrimitive.RootProps & {
		variant?: ButtonVariant;
		size?: ButtonSize;
		rounded?: boolean;
		pointerEvents?: boolean;
		prefixIcon?: Component<Record<string, unknown>> | Snippet<[{ class: string }]>;
		suffixIcon?: Component<Record<string, unknown>> | Snippet<[{ class: string }]>;
	};
</script>

<script lang="ts">
	import { Button } from 'bits-ui';
	import { cn } from '$lib/utils';

	let {
		children,
		variant = 'solid',
		size = 'md',
		rounded = false,
		pointerEvents = true,
		prefixIcon: PrefixIcon,
		suffixIcon: SuffixIcon,
		class: className,
		...rest
	}: ButtonProps = $props();

	const base = [
		/*tw*/ 'shrink-0 inline-flex items-center justify-center whitespace-nowrap font-semibold transition-all',
		/*tw*/ 'disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none'
	];

	const sizes = $derived({
		sm: /*tw*/ `h-10 px-4 text-sm gap-1.5 active:scale-90 ${rounded ? 'rounded-full' : 'rounded-lg'}`,
		md: /*tw*/ `h-12 px-6 text-base gap-2 active:scale-90 ${rounded ? 'rounded-full' : 'rounded-xl'}`,
		'sm-md': /*tw*/ `fl-h-10/12 fl-px-4/6 fl-text-sm/base fl-gap-1.5/2 active:scale-90 ${rounded ? 'rounded-full' : 'rounded-xl'}`,
		'icon-lg': /*tw*/ `size-14 active:scale-80 ${rounded ? 'rounded-full' : 'rounded-2xl'}`,
		'icon-md-lg': /*tw*/ `fl-size-12/14 active:scale-80 ${rounded ? 'rounded-full' : 'rounded-2xl'}`,
		'icon-md': /*tw*/ `size-12 active:scale-80 ${rounded ? 'rounded-full' : 'rounded-xl'}`,
		'icon-sm': /*tw*/ `size-8 active:scale-80 ${rounded ? 'rounded-full' : 'rounded-lg'}`,
		text: /*tw*/ 'active:scale-95'
	});

	const variants = {
		solid: [
			/*tw*/ 'bg-primary text-on-primary shadow-sm',
			/*tw*/ 'hover:bg-[color-mix(in_srgb,var(--color-primary),black_15%)]'
		],
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

	const mergedClass = $derived(
		cn(
			base,
			sizes[size as keyof typeof sizes],
			variants[variant as keyof typeof variants],
			!pointerEvents && 'pointer-events-none',
			className
		)
	);

	const iconClasses = $derived(
		cn(
			size === 'sm' && /*tw*/ 'size-4.5',
			size === 'md' && /*tw*/ 'size-5',
			size === 'sm-md' && /*tw*/ 'fl-size-[1.125rem/1.25rem]',
			size === 'icon-lg' && /*tw*/ 'size-6.5',
			size === 'icon-md-lg' && /*tw*/ 'fl-size-[1.375rem/1.625rem]',
			size === 'icon-md' && /*tw*/ 'size-5.5',
			size === 'icon-sm' && /*tw*/ 'size-4',
			size === 'text' && /*tw*/ 'size-5'
		)
	);
</script>

<Button.Root class={mergedClass} {...rest}>
	{#if PrefixIcon}
		{#if typeof PrefixIcon === 'function'}
			{@const Icon = PrefixIcon as Snippet<[{ class: string }]>}
			{@render Icon({ class: iconClasses })}
		{:else}
			{@const Icon = PrefixIcon as Component<Record<string, unknown>>}
			<Icon class={iconClasses} />
		{/if}
	{/if}
	{@render children?.()}
	{#if SuffixIcon}
		{#if typeof SuffixIcon === 'function'}
			{@const Icon = SuffixIcon as Snippet<[{ class: string }]>}
			{@render Icon({ class: iconClasses })}
		{:else}
			{@const Icon = SuffixIcon as Component<Record<string, unknown>>}
			<Icon class={iconClasses} />
		{/if}
	{/if}
</Button.Root>
