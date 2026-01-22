<script lang="ts">
	import { GradientDivider, PageSection, Title } from '$lib/components/layout';
	import { DarkOverlay } from '$lib/components/ui/dark-overlay';
	import { InfiniteScroll } from '$lib/components/ui/infinite-scroll';
	import { Button } from '$lib/components/ui/button';
	import {
		background,
		cryptoModule,
		halalCoinCallsDesktop,
		halalCoinCallsMobile,
		informationUpdateDesktop,
		informationUpdateMobile,
		posterDesktop,
		posterMobile,
		shariaModule
	} from '$lib/assets/discord';
	import * as t from '$lib/assets/discord/testimonials';
	import { DiscordIcon } from '$lib/components/icons';

	const testimonials = Object.values(t);
</script>

{#snippet sectionTitle(text: string)}
	<h3 class="mb-2 text-center fl-text-xl/3xl font-bold text-primary-foreground italic">
		{text}
	</h3>
{/snippet}

<div>
	<GradientDivider />
	<div
		id="discord"
		style:--bg-image="url({background})"
		class="w-full bg-(image:--bg-image) bg-cover bg-fixed bg-center bg-no-repeat"
	>
		<DarkOverlay class="pt-5 pb-15">
			<PageSection maxWidth="6xl">
				<div class="flex flex-col gap-20">
					<!-- Poster Section -->
					<div class="order-1 md:order-1">
						<Title
							size="lg"
							useSeparator={false}
							class="font-serif [-webkit-text-stroke:0.08rem_#fff] max-md:hidden"
						>
							JOIN <span class="text-[#5865f2]">Discord Premium</span> CryptoSharia
						</Title>
						<img
							src={posterDesktop}
							alt="Discord Premium Poster"
							class="w-full shadow-2xl max-md:hidden"
						/>
						<img
							src={posterMobile}
							alt="Discord Premium Poster"
							class="w-full shadow-xl md:hidden"
						/>
					</div>

					<!-- Modules Section (Crypto & Sharia) -->
					<!-- Mobile: Crypto Top, Sharia Bottom (via flex-col-reverse on DOM [Sharia, Crypto]) -->
					<!-- Desktop: Sharia Left, Crypto Right -->
					<div class="order-2 flex flex-col-reverse gap-x-4 gap-y-20 md:order-4 md:flex-row">
						<!-- Sharia Module -->
						<div class="flex-1">
							{@render sectionTitle('Modul Syariah')}
							<img src={shariaModule} alt="Modul Syariah" class="w-full shadow-lg" />
						</div>
						<!-- Crypto Module -->
						<div class="flex-1">
							{@render sectionTitle('Modul Crypto')}
							<img src={cryptoModule} alt="Modul Crypto" class="w-full shadow-lg" />
						</div>
					</div>

					<!-- Information Update Section -->
					<div class="order-3 md:order-2">
						{@render sectionTitle('Update Informasi Terbaru')}
						<img
							src={informationUpdateDesktop}
							alt="Information Update"
							class="w-full shadow-2xl max-md:hidden"
						/>
						<img
							src={informationUpdateMobile}
							alt="Information Update"
							class="w-full shadow-xl md:hidden"
						/>
					</div>

					<!-- Halal Coin Calls Section -->
					<div class="order-4 md:order-3">
						{@render sectionTitle('Sinyal Koin Halal')}
						<img
							src={halalCoinCallsDesktop}
							alt="Halal Coin Calls"
							class="w-full shadow-2xl max-md:hidden"
						/>
						<img
							src={halalCoinCallsMobile}
							alt="Halal Coin Calls"
							class="w-full shadow-xl md:hidden"
						/>
					</div>
				</div>
			</PageSection>

			<!-- Testimonials Section -->
			<div class="order-5 my-20 md:order-5">
				{@render sectionTitle('Testimoni')}

				<InfiniteScroll speed="normal" class="gap-4">
					{#each testimonials as testimonial, i (testimonial)}
						<img
							src={testimonial}
							alt="Testimonial {i + 1}"
							class="h-auto fl-w-[24rem/32rem] shrink-0 rounded-2xl border-2 border-primary-foreground shadow-lg"
						/>
					{/each}
				</InfiniteScroll>
			</div>

			<!-- CTA Section -->
			<PageSection maxWidth="6xl" class="flex flex-col items-center gap-8">
				<p class="text-center font-serif fl-text-2xl/3xl text-primary-foreground italic">
					❝Kapan lagi ada komunitas crypto yang bukan cuma ngajarin cuan, tapi juga taat syariat,
					serta melek teknologi masa depan?❞
				</p>
				<div class="flex items-center justify-center">
					<!-- Use "flex order" to solve peer issue -->
					<Button
						variant="default"
						href="https://berbagi.link/cryptosharia"
						size="lg"
						class="peer order-2 border-white fl-text-base/xl hover:border-primary"
						>&lt; Join Sekarang &gt;</Button
					>
					<DiscordIcon
						class="transition-color order-1 size-10 translate-x-2 -rotate-90 text-white peer-hover:text-primary"
					/>
					<DiscordIcon
						class="transition-color order-3 size-10 -translate-x-2 rotate-90 text-white peer-hover:text-primary"
					/>
				</div>
			</PageSection>
		</DarkOverlay>
	</div>
	<GradientDivider reversed />
</div>
