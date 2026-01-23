<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = HTMLAttributes<HTMLDivElement>;

	let { class: className, children, ...rest }: Props = $props();
</script>

<div
	class={cn('rounded-3xl p-8 shadow-md transition-all duration-300 hover:scale-102', className)}
	{...rest}
>
	{@render children?.()}
</div>
