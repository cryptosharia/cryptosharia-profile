<script lang="ts">
	import { ChevronRightIcon } from '@lucide/svelte';

	import PageSection from '$lib/components/PageSection.svelte';
	import ManagementList from '$lib/components/management/ManagementList.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { managementMembers } from '$lib/data/management';

	let { members }: { members?: Array<{ name: string; role: string; imageUrl: string }> } = $props();
	const displayMembers = $derived(members?.map((member) => ({ ...member, image: member.imageUrl })) ?? managementMembers);
</script>

<PageSection
	id="pengurus"
	title="Struktur Organisasi"
	subtitle="Kenali tim profesional dan ahli di balik ekosistem Crypto Sharia"
>
	<ManagementList members={displayMembers.slice(0, 10)} variant="home" />

	<div class="mt-12 flex justify-center">
		<Button size="lg" variant="outline" rounded href="/pengurus">
			{#snippet suffixIcon({ class: iconClass })}
				<ChevronRightIcon class={iconClass} />
			{/snippet}
			Lihat Semua Pengurus
		</Button>
	</div>
</PageSection>
