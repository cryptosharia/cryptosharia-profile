<script lang="ts">
	import { Button as ButtonPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	type GradientDirection = 't' | 'tr' | 'r' | 'br' | 'b' | 'bl' | 'l' | 'tl' | 'none';

	const gradientMap: Record<GradientDirection, string> = {
		t: 'bg-linear-to-t',
		tr: 'bg-linear-to-tr',
		r: 'bg-linear-to-r',
		br: 'bg-linear-to-br',
		b: 'bg-linear-to-b',
		bl: 'bg-linear-to-bl',
		l: 'bg-linear-to-l',
		tl: 'bg-linear-to-tl',
		none: ''
	};

	type Props = ButtonPrimitive.RootProps & {
		gradient?: GradientDirection;
		interactive?: boolean;
	};

	let {
		class: className,
		gradient = 'br',
		interactive = true,
		children,
		...rest
	}: Props = $props();

	const mergedClass = $derived(
		cn(
			'rounded-3xl border gradient-surface text-start text-faded shadow-md transition-all',
			interactive && 'hover:scale-102 hover:shadow-lg',
			gradientMap[gradient],
			(rest.onclick || rest.href) && 'cursor-pointer',
			className
		)
	);
</script>

{#if rest.onclick || rest.href}
	<ButtonPrimitive.Root class={mergedClass} {...rest}>
		{@render children?.()}
	</ButtonPrimitive.Root>
{:else}
	<div class={mergedClass} {...rest as HTMLAttributes<HTMLDivElement>}>
		{@render children?.()}
	</div>
{/if}
