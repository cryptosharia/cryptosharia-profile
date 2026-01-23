<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = HTMLAttributes<HTMLDivElement>;

	let { class: className, children, ...rest }: Props = $props();
</script>

<div
	class={cn(
		'rounded-3xl border bg-linear-to-br from-primary-50/50 to-surface p-8 text-faded shadow-lg transition-all duration-300 hover:scale-102 dark:from-primary-950/15',
		className
	)}
	{...rest}
>
	{@render children?.()}
</div>
