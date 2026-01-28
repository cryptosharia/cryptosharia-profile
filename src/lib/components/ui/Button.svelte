<script lang="ts" module>
	import { Button as ButtonPrimitive } from 'bits-ui';
	import type { Snippet } from 'svelte';

	export type ButtonVariant =
		| 'solid'
		| 'outline'
		| 'blank'
		| 'soft'
		| 'link'
		| 'ghost'
		| 'link-ghost';

	export type ButtonSize =
		| 'lg'
		| 'md'
		| 'sm'
		| 'md-lg'
		| 'icon-lg'
		| 'icon-md-lg'
		| 'icon-md'
		| 'icon-sm'
		| 'text';

	export type ButtonProps = ButtonPrimitive.RootProps & {
		variant?: ButtonVariant;
		size?: ButtonSize;
		rounded?: boolean;
		prefixIcon?: Snippet<[{ class: string }]>;
		suffixIcon?: Snippet<[{ class: string }]>;
	};
</script>

<script lang="ts">
	import { Button } from 'bits-ui';
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		children,
		variant = 'solid',
		size = 'md',
		rounded = false,
		prefixIcon: PrefixIcon,
		suffixIcon: SuffixIcon,
		class: className,
		...rest
	}: ButtonProps = $props();

	const base = [
		/*tw*/ 'shrink-0 inline-flex items-center justify-center whitespace-nowrap font-semibold transition-all',
		/*tw*/ 'disabled:pointer-events-none disabled:opacity-50 select-none'
	];

	const sizes = $derived({
		sm: /*tw*/ `h-8 px-3 text-xs gap-1 active:scale-95 ${rounded ? 'rounded-full' : 'rounded-md'}`,
		md: /*tw*/ `h-10 px-4 text-sm gap-1.5 active:scale-90 ${rounded ? 'rounded-full' : 'rounded-lg'}`,
		lg: /*tw*/ `h-12 px-6 text-base gap-2 active:scale-90 ${rounded ? 'rounded-full' : 'rounded-xl'}`,
		'md-lg': /*tw*/ `fl-h-10/12 fl-px-4/6 fl-text-sm/base fl-gap-1.5/2 active:scale-90 ${rounded ? 'rounded-full' : 'rounded-xl'}`,
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

	const isInteractive = $derived(!!(rest.onclick || rest.href));

	const mergedClass = $derived(
		cn(
			base,
			sizes[size as keyof typeof sizes],
			variants[variant as keyof typeof variants],
			isInteractive ? 'cursor-pointer' : 'pointer-events-none',
			className
		)
	);

	const iconClasses = $derived(
		cn(
			size === 'sm' && /*tw*/ 'size-3.5',
			size === 'md' && /*tw*/ 'size-4.5',
			size === 'lg' && /*tw*/ 'size-5',
			size === 'md-lg' && /*tw*/ 'fl-size-[1.125rem/1.25rem]',
			size === 'icon-lg' && /*tw*/ 'size-6.5',
			size === 'icon-md-lg' && /*tw*/ 'fl-size-[1.375rem/1.625rem]',
			size === 'icon-md' && /*tw*/ 'size-5.5',
			size === 'icon-sm' && /*tw*/ 'size-4',
			size === 'text' && /*tw*/ 'size-5'
		)
	);
</script>

{#snippet content()}
	{@render PrefixIcon?.({ class: iconClasses })}
	{@render children?.()}
	{@render SuffixIcon?.({ class: iconClasses })}
{/snippet}

{#if rest.onclick || rest.href}
	<Button.Root class={mergedClass} {...rest}>
		{@render content()}
	</Button.Root>
{:else}
	<span class={mergedClass} {...rest as HTMLAttributes<HTMLSpanElement>}>
		{@render content()}
	</span>
{/if}
