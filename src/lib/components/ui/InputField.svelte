<script lang="ts">
	import type { HTMLInputAttributes, HTMLTextareaAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';

	type Props = (HTMLInputAttributes | HTMLTextareaAttributes) & {
		multiline?: boolean;
	};

	let { multiline = false, class: className, ...rest }: Props = $props();

	const baseClass = [
		/*tw*/ 'w-full rounded-xl border border-line outline-none gradient-surface px-4 py-3 text-foreground transition-all',
		/*tw*/ 'placeholder:text-faded focus:ring-2 focus:ring-primary/20 focus:border-primary'
	];
</script>

{#if !multiline}
	<input class={cn(baseClass, className)} {...rest as HTMLInputAttributes} />
{:else}
	<textarea
		class={cn(baseClass, 'min-h-32 resize-none', className)}
		{...rest as HTMLTextareaAttributes}
	></textarea>
{/if}
