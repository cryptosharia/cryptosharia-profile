import { browser } from '$app/environment';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * The ultimate 'cn' utility.
 * It uses 'clsx' to handle the logic (arrays, objects, conditionals)
 * and 'tailwind-merge' to handle the Tailwind conflict resolution.
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Returns the current breakpoint based on the window width.
 * - 1 = xs
 * - 2 = sm
 * - 3 = md
 * - 4 = lg
 * - 5 = xl
 * - 6 = 2xl
 */
export function getCurrentBreakpoint() {
	if (!browser) {
		throw new Error('getCurrentBreakpoint() must be used within a client-side environment');
	}

	const width = window.innerWidth;

	if (width >= 1536) return 6;
	if (width >= 1280) return 5;
	if (width >= 1024) return 4;
	if (width >= 768) return 3;
	if (width >= 640) return 2;
	return 1;
}

/**
 * Gets the current viewport height.
 */
export function getViewportHeight() {
	if (!browser) {
		throw new Error('getViewportHeight() must be used within a client-side environment');
	}
	return window.innerHeight;
}

/**
 * Gets the total height of the entire page document.
 */
export function getPageHeight() {
	if (!browser) {
		throw new Error('getPageHeight() must be used within a client-side environment');
	}
	return Math.max(
		document.body.scrollHeight,
		document.documentElement.scrollHeight,
		document.body.offsetHeight,
		document.documentElement.offsetHeight,
		document.body.clientHeight,
		document.documentElement.clientHeight
	);
}
