<script>
	import Hero from './_components/sections/Hero.svelte';
	import About from './_components/sections/About.svelte';
	import Team from './_components/sections/Team.svelte';
	import Discord from './_components/sections/Discord.svelte';
	import Partners from './_components/sections/Partners.svelte';
	import Activities from './_components/sections/Activities.svelte';
	import Footer from './_components/sections/Footer.svelte';
</script>

<Hero />
<div class="my-10 space-y-20">
	<About />
	<Partners />
	<Team />
	<Discord />
	<Activities />
	<Footer />
</div>
