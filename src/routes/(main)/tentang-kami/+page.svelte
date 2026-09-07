<script lang="ts">
	import VisionMission from '../_sections/VisionMission.svelte';
	import Management from '../_sections/Management.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<main>
	<VisionMission profile={data.profile} />
	<Management members={data.profile?.members} />
</main>
