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
