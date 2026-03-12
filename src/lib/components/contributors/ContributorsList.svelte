<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Dialog from '$lib/components/ui/Dialog.svelte';
	import { cn } from '$lib/utils';

	import type { Contributor } from '$lib/data/contributors';

	type Props = {
		contributors: readonly Contributor[];
		variant?: 'home' | 'page';
	};

	let { contributors, variant = 'page' }: Props = $props();

	let selectedContributor = $state<Contributor | null>(null);
</script>

<div class="grid grid-cols-2 fl-gap-3/6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
	{#each contributors as member, i (member.name)}
		<Card
			onclick={() => (selectedContributor = member)}
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
					class="size-full object-cover transition-transform group-hover:scale-105"
				/>
			</div>
			<div class="p-3">
				<h3
					class="line-clamp-1 fl-text-base/lg font-semibold text-foreground underline-offset-2 group-hover:underline"
				>
					{member.name}
				</h3>
				<p class="mb-3 line-clamp-1 text-xs font-medium text-primary sm:text-sm">
					{member.role}
				</p>

				<div class="flex gap-2">
					{#each member.links.slice(0, 3) as link (link.icon)}
						<Button variant="ghost" size="icon-sm" href={link.href} target="_blank" rounded>
							{#snippet prefixIcon({ class: iconClass })}
								<link.icon class={iconClass} />
							{/snippet}
						</Button>
					{/each}
				</div>
			</div>
		</Card>
	{/each}
</div>

<!-- Use just a single dialog, no need to create a new one for each contributor -->
<!-- We simply just update the content of the dialog based on the selected contributor -->
<Dialog
	open={selectedContributor ? true : false}
	onOpenChangeComplete={(open) => !open && (selectedContributor = null)}
	title="Kontributor"
>
	{#if selectedContributor}
		<div class="flex flex-col gap-6">
			<div class="border-border aspect-square w-full overflow-hidden rounded-xl border">
				<img
					src={selectedContributor.image}
					alt={selectedContributor.name}
					class="size-full object-cover"
				/>
			</div>

			<div class="space-y-4">
				<div class="space-y-1">
					<h4 class="text-xl font-bold text-foreground">{selectedContributor.name}</h4>
					<p class="text-sm font-semibold text-primary">{selectedContributor.role}</p>
				</div>

				{#if selectedContributor.bio}
					<p class="text-sm leading-relaxed text-faded">
						{selectedContributor.bio}
					</p>
				{/if}

				{#if selectedContributor.links.length}
					<div class="pt-2">
						<p class="mb-3 text-xs font-bold tracking-wider text-faded uppercase">Links</p>
						<div class="flex flex-wrap gap-2">
							{#each selectedContributor.links as link (link.icon)}
								<Button variant="soft" size="sm" href={link.href} target="_blank" rounded>
									{#snippet prefixIcon({ class: iconClass }: { class: string })}
										<link.icon class={iconClass} />
									{/snippet}
									{link.label}
								</Button>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		</div>
	{/if}
</Dialog>
