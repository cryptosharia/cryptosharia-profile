<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAnchorAttributes, HTMLAttributes } from 'svelte/elements';

	type GradientDirection = 't' | 'tr' | 'r' | 'br' | 'b' | 'bl' | 'l' | 'tl';

	const directionMap: Record<GradientDirection, string> = {
		t: 'bg-linear-to-t',
		tr: 'bg-linear-to-tr',
		r: 'bg-linear-to-r',
		br: 'bg-linear-to-br',
		b: 'bg-linear-to-b',
		bl: 'bg-linear-to-bl',
		l: 'bg-linear-to-l',
		tl: 'bg-linear-to-tl'
	};

	type Props = (HTMLAttributes<HTMLDivElement> | HTMLAnchorAttributes) & {
		direction?: GradientDirection;
		href?: string;
	};

	let { class: className, direction = 'br', children, href, ...rest }: Props = $props();

	const tag = $derived(href ? 'a' : 'div');
</script>

<svelte:element
	this={tag}
	{href}
	class={cn(
		'rounded-3xl border gradient-surface text-faded shadow-md transition-all hover:scale-102 hover:shadow-lg',
		directionMap[direction],
		className
	)}
	{...rest}
>
	{@render children?.()}
</svelte:element>
