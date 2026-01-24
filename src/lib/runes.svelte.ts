import { onMount } from 'svelte';
import { getCurrentBreakpoint } from './utils';

/**
 * Returns a reactive viewport state that updates on window resize.
 * Provides `.width`, `.height`, and `.breakpoint` properties.
 *
 * Breakpoints:
 * - 1 = xs (< 640px)
 * - 2 = sm (>= 640px)
 * - 3 = md (>= 768px)
 * - 4 = lg (>= 1024px)
 * - 5 = xl (>= 1280px)
 * - 6 = 2xl (>= 1536px)
 */
export function streamViewport() {
	// Default for SSR
	let width = $state(0);
	let height = $state(0);
	let breakpoint = $state(1);

	function handleResize() {
		width = window.innerWidth;
		height = window.innerHeight;
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
		get width() {
			return width;
		},
		get height() {
			return height;
		},
		get breakpoint() {
			return breakpoint;
		}
	};
}

/**
 * Returns a reactive scroll state that updates on page scroll.
 * Provides `.y` (scrollY), `.isAtTop`, `.isAtBottom`, and `.isScrolling`.
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
