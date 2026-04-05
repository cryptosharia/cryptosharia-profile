<script lang="ts">
	import PageSection from '$lib/components/PageSection.svelte';
	import ManagementList from '$lib/components/management/ManagementList.svelte';
	import { managementMembers } from '$lib/data/management';
</script>

<main>
	<PageSection
		as="section"
		title="Struktur Organisasi Crypto Sharia"
		subtitle="Daftar lengkap pengurus Crypto Sharia"
	>
		<ManagementList members={managementMembers} variant="page" />
	</PageSection>
</main>
