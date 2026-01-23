<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';

	type Props = HTMLAttributes<HTMLElement> & {
		innerClass?: string;
	};

	let { class: className, innerClass, children, ...rest }: Props = $props();
</script>

<section class={cn('fl-py-10/16', className)} {...rest}>
	<div class={cn('mx-auto max-w-7xl fl-px-4/6', innerClass)}>
		{@render children?.()}
	</div>
</section>
