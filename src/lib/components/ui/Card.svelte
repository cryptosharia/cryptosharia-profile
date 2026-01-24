<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

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

	type Props = HTMLAttributes<HTMLDivElement> & {
		direction?: GradientDirection;
	};

	let { class: className, direction = 'br', children, ...rest }: Props = $props();
</script>

<div
	class={cn(
		'rounded-3xl border from-primary-50/50 to-surface p-8 text-faded shadow-md transition-all hover:scale-102 hover:shadow-lg dark:from-primary-950/15',
		directionMap[direction],
		className
	)}
	{...rest}
>
	{@render children?.()}
</div>
