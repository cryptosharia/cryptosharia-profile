<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';

	type Props = HTMLAttributes<HTMLElement> & {
		as?: string;
		innerClass?: string;
	};

	let { as = 'section', class: className, innerClass, children, ...rest }: Props = $props();
</script>

<svelte:element this={as} class={cn('fl-py-10/16', className)} {...rest}>
	<div class={cn('mx-auto max-w-7xl fl-px-4/6', innerClass)}>
		{@render children?.()}
	</div>
</svelte:element>
