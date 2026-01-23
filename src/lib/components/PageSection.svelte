<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';

	type Props = HTMLAttributes<HTMLElement>;

	let { class: className, children, ...rest }: Props = $props();
</script>

<section class={cn('', className)} {...rest}>
	<div class="mx-auto max-w-7xl fl-px-4/6">
		{@render children?.()}
	</div>
</section>
