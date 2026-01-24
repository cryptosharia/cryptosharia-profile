<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	type Props = {
		label: string;
		forId?: string;
		description?: string;
		class?: string;
		children: Snippet;
	};

	let { label, forId, description, class: className, children }: Props = $props();
</script>

<div class={cn('space-y-2', className)}>
	<label for={forId} class="block text-sm font-semibold text-foreground">
		{label}
	</label>

	{@render children()}

	{#if description}
		<p class="text-xs text-faded">
			{description}
		</p>
	{/if}
</div>
