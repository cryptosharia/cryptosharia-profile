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
