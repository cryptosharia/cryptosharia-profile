<script lang="ts">
	import { Dialog, Separator } from 'bits-ui';
	import { XIcon } from '@lucide/svelte';
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	type Props = {
		open?: boolean;
		onOpenChange?: (open: boolean) => void;
		onOpenChangeComplete?: (open: boolean) => void;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		trigger?: Snippet<[any]>;
		title?: string | Snippet;
		description?: string | Snippet;
		footer?: Snippet;
		children?: Snippet;
		class?: string;
		usePortal?: boolean;
		showCloseButton?: boolean;
	};

	let {
		open = $bindable(false),
		onOpenChange,
		onOpenChangeComplete,
		trigger,
		title,
		description,
		footer,
		children,
		class: className,
		usePortal = false,
		showCloseButton = true
	}: Props = $props();
</script>

<Dialog.Root bind:open {onOpenChange} {onOpenChangeComplete}>
	{#if trigger}
		<Dialog.Trigger>
			{#snippet child({ props })}
				{@render trigger?.(props)}
			{/snippet}
		</Dialog.Trigger>
	{/if}

	<Dialog.Portal disabled={usePortal}>
		<Dialog.Overlay
			class="fixed inset-0 z-50 bg-black/80 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0"
		/>
		<Dialog.Content
			preventScroll={true}
			onOpenAutoFocus={(e) => e.preventDefault()}
			class={cn(
				'fixed top-[50%] left-[50%] z-50 flex max-h-[calc(100%-2rem)] w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] flex-col overflow-hidden rounded-3xl border gradient-background p-0 shadow-md data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:max-w-md',
				className
			)}
		>
			{#if title}
				<div class="px-5 pt-5 pb-4">
					<Dialog.Title class="flex w-full items-center justify-center text-lg font-semibold">
						{#if typeof title === 'string'}
							{title}
						{:else}
							{@render title()}
						{/if}
					</Dialog.Title>
				</div>
				<Separator.Root class="block h-px bg-line" />
			{/if}

			<div class="flex-1 overflow-y-auto p-5">
				{#if description}
					<Dialog.Description class="mb-4 text-sm text-faded">
						{#if typeof description === 'string'}
							{description}
						{:else}
							{@render description()}
						{/if}
					</Dialog.Description>
				{/if}

				{@render children?.()}
			</div>

			{#if footer}
				<Separator.Root class="block h-px bg-line" />
				<div class="flex w-full justify-end p-5">
					{@render footer()}
				</div>
			{/if}

			{#if showCloseButton}
				<Dialog.Close
					class="absolute top-5 right-5 cursor-pointer rounded-full text-faded outline-primary/10 hover:bg-primary/10 hover:text-primary hover:outline-4"
					aria-label="Close"
				>
					<XIcon />
				</Dialog.Close>
			{/if}
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
