<script lang="ts">
	import PageSection from '$lib/components/PageSection.svelte';
	import ManagementList from '$lib/components/management/ManagementList.svelte';
	import { managementMembers } from '$lib/data/management';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const members = $derived(data.members?.map((member) => ({ ...member, image: member.imageUrl })) ?? managementMembers);
</script>

<main>
	<PageSection
		as="section"
		title="Struktur Organisasi Crypto Sharia"
		subtitle="Daftar lengkap pengurus Crypto Sharia"
	>
		<ManagementList {members} variant="page" />
	</PageSection>
</main>
