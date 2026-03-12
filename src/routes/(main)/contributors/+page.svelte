<script lang="ts">
	import PageSection from '$lib/components/PageSection.svelte';
	import ContributorsList from '$lib/components/contributors/ContributorsList.svelte';
	import { contributors } from '$lib/data/contributors';
</script>

<main>
	<PageSection
		as="section"
		title="CryptoSharia Contributors"
		subtitle="Daftar lengkap kontributor yang membantu membangun dan mengembangkan CryptoSharia"
	>
		<ContributorsList {contributors} variant="page" />
	</PageSection>
</main>
