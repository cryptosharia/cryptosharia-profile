<script lang="ts">
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { onDestroy } from 'svelte';

	const SHOW_DELAY_MS = 100;
	const COMPLETE_HOLD_MS = 180;
	const START_PROGRESS = 8;
	const MAX_PROGRESS_BEFORE_DONE = 92;
	const PROGRESS_TICK_MS = 140;

	let isVisible = $state(false);
	let progress = $state(0);

	let showTimer: ReturnType<typeof setTimeout> | null = null;
	let hideTimer: ReturnType<typeof setTimeout> | null = null;
	let progressTimer: ReturnType<typeof setInterval> | null = null;

	function clearShowTimer() {
		if (!showTimer) return;
		clearTimeout(showTimer);
		showTimer = null;
	}

	function clearHideTimer() {
		if (!hideTimer) return;
		clearTimeout(hideTimer);
		hideTimer = null;
	}

	function clearProgressTimer() {
		if (!progressTimer) return;
		clearInterval(progressTimer);
		progressTimer = null;
	}

	function startProgressLoop() {
		clearProgressTimer();

		progressTimer = setInterval(() => {
			if (progress >= MAX_PROGRESS_BEFORE_DONE) return;

			const remaining = MAX_PROGRESS_BEFORE_DONE - progress;
			const step = Math.max(0.8, remaining * 0.12);
			progress = Math.min(MAX_PROGRESS_BEFORE_DONE, progress + step);
		}, PROGRESS_TICK_MS);
	}

	function startProgress() {
		clearHideTimer();

		if (isVisible || showTimer) return;

		progress = 0;

		showTimer = setTimeout(() => {
			isVisible = true;
			progress = START_PROGRESS;
			showTimer = null;
			startProgressLoop();
		}, SHOW_DELAY_MS);
	}

	function stopProgress() {
		clearShowTimer();
		clearProgressTimer();

		if (!isVisible) {
			progress = 0;
			return;
		}

		progress = 100;

		hideTimer = setTimeout(() => {
			isVisible = false;
			progress = 0;
			hideTimer = null;
		}, COMPLETE_HOLD_MS);
	}

	beforeNavigate(({ to }) => {
		if (!to) return;
		startProgress();
	});

	afterNavigate(() => {
		stopProgress();
	});

	onDestroy(() => {
		clearShowTimer();
		clearHideTimer();
		clearProgressTimer();
	});
</script>

<div class="top-progress" class:is-visible={isVisible} aria-hidden="true">
	<div class="top-progress__bar" style={`transform: scaleX(${progress / 100})`}></div>
</div>

<style>
	.top-progress {
		position: fixed;
		top: 0;
		left: 0;
		height: 0.2rem;
		width: 100%;
		pointer-events: none;
		z-index: 60;
		overflow: hidden;
		opacity: 0;
		transition: opacity 120ms linear;
	}

	.top-progress.is-visible {
		opacity: 1;
	}

	.top-progress__bar {
		height: 100%;
		width: 100%;
		background: var(--color-primary);
		transform-origin: left center;
		transform: scaleX(0);
		transition: transform 160ms ease-out;
		will-change: transform;
	}

	@media (prefers-reduced-motion: reduce) {
		.top-progress__bar {
			transition-duration: 220ms;
		}
	}
</style>
