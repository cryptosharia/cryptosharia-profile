<script lang="ts">
	import { ChevronRightIcon } from '@lucide/svelte';

	import PageSection from '$lib/components/PageSection.svelte';
	import ContributorsList from '$lib/components/contributors/ContributorsList.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { contributors } from '$lib/data/contributors';
</script>

<PageSection
	id="contributors"
	title="Siapa Kami?"
	subtitle="Kenali tim profesional berpengalaman di balik organisasi kami"
>
	<ContributorsList contributors={contributors.slice(0, 10)} variant="home" />

	<div class="mt-12 flex justify-center">
		<Button size="lg" variant="outline" rounded href="/contributors">
			{#snippet suffixIcon({ class: iconClass })}
				<ChevronRightIcon class={iconClass} />
			{/snippet}
			Lihat Semua Kontributor
		</Button>
	</div>
</PageSection>
