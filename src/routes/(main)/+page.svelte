<script lang="ts">
	import Hero from './_sections/Hero.svelte';
	import VisionMission from './_sections/VisionMission.svelte';
	import Principles from './_sections/Principles.svelte';
	import Management from './_sections/Management.svelte';
	import Ecosystem from './_sections/Ecosystem.svelte';
	import Activities from './_sections/Activities.svelte';
	import Contact from './_sections/Contact.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<main>
	<Hero />
	<VisionMission />
	<Principles />
	<Management />
	<Activities activities={data.activities} />
	<Ecosystem />
	<Contact />
</main>
