<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
	import Dialog from '$lib/components/ui/Dialog.svelte';
	import { cn } from '$lib/utils';

	import type { ManagementMember } from '$lib/data/management';

	type Props = {
		members: readonly ManagementMember[];
		variant?: 'home' | 'page';
	};

	let { members, variant = 'page' }: Props = $props();

	let selectedMember = $state<ManagementMember | null>(null);
</script>

<div class="grid grid-cols-2 fl-gap-3/6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
	{#each members as member, i (member.name)}
		<Card
			onclick={() => (selectedMember = member)}
			gradient="tl"
			class={cn(
				'group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl transition-all',
				variant === 'home' && i === 8 && 'lg:max-xl:hidden',
				variant === 'home' && i === 9 && 'sm:max-xl:hidden'
			)}
		>
			<div class="aspect-square w-full overflow-hidden">
				<img
					src={member.image}
					alt={member.name}
					class="size-full object-cover object-[50%_24%] transition-transform group-hover:scale-105"
				/>
			</div>
			<div class="p-3">
				<h3
					class="line-clamp-1 text-center fl-text-base/lg font-semibold text-foreground underline-offset-2 group-hover:underline"
				>
					{member.name}
				</h3>
				<p class="mb-3 line-clamp-1 text-center text-xs font-medium text-primary sm:text-sm">
					{member.role}
				</p>
			</div>
		</Card>
	{/each}
</div>

<Dialog
	open={selectedMember ? true : false}
	onOpenChangeComplete={(open) => !open && (selectedMember = null)}
	title="Pengurus"
>
	{#if selectedMember}
		<div class="flex flex-col gap-6">
			<div class="border-border aspect-square w-full overflow-hidden rounded-xl border">
				<img
					src={selectedMember.image}
					alt={selectedMember.name}
					class="size-full object-cover object-[50%_24%]"
				/>
			</div>

			<div class="space-y-4">
				<div class="space-y-1">
					<h4 class="text-center text-xl font-bold text-foreground">{selectedMember.name}</h4>
					<p class="text-center text-sm font-semibold text-primary">{selectedMember.role}</p>
				</div>
			</div>
		</div>
	{/if}
</Dialog>
