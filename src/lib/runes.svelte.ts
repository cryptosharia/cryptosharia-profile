import { onMount } from 'svelte';
import { getCurrentBreakpoint } from './utils';

/**
 * Returns a reactive breakpoint value that updates on window resize.
 * - 1 = xs
 * - 2 = sm
 * - 3 = md
 * - 4 = lg
 * - 5 = xl
 * - 6 = 2xl
 */
export function streamBreakpoint() {
	let breakpoint: number = $state(1); // Default for SSR

	function handleResize() {
		breakpoint = getCurrentBreakpoint();
	}

	onMount(() => {
		handleResize(); // Initial client-side check
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});

	return {
		get value() {
			return breakpoint;
		}
	};
}

/**
 * Returns a reactive scroll state that updates on window scroll.
 * Provides `.y` (scrollY), `.isAtTop`, and `.isAtBottom`.
 */
export function streamPageScroll() {
	// Default for SSR
	let scrollY = $state(0);
	let isScrolling = $state(false);
	let viewportHeight = $state(0);
	let pageHeight = $state(0);
	let scrollTimeout: ReturnType<typeof setTimeout>;

	// Derived state for position checks
	const isAtTop = $derived(scrollY < 10);
	const isAtBottom = $derived(scrollY + viewportHeight >= pageHeight - 10);

	function updateHeight() {
		viewportHeight = window.innerHeight;
		pageHeight = document.documentElement.scrollHeight;
	}

	function handleScroll() {
		scrollY = window.scrollY;
		isScrolling = true;

		// Clear existing timeout
		clearTimeout(scrollTimeout);

		// Set scrolling to false after 150ms of no scroll events
		scrollTimeout = setTimeout(() => {
			isScrolling = false;
		}, 150);

		// Update heights on scroll too, in case of dynamic content resizing
		updateHeight();
	}

	onMount(() => {
		updateHeight();
		handleScroll(); // Initial check

		// 'passive: true' tells the browser we won't call preventDefault(),
		// allowing the scrolling to remain smooth while our logic runs.
		window.addEventListener('scroll', handleScroll, { passive: true });
		window.addEventListener('resize', updateHeight);

		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', updateHeight);
			clearTimeout(scrollTimeout);
		};
	});

	return {
		get y() {
			return scrollY;
		},
		get isScrolling() {
			return isScrolling;
		},
		get isAtTop() {
			return isAtTop;
		},
		get isAtBottom() {
			return isAtBottom;
		}
	};
}
