import { describe, it, expect } from 'vitest';
import { cn, formatDate } from './utils';

describe('utils', () => {
	describe('formatDate', () => {
		const date = new Date(2026, 0, 9); // Jan 9, 2026

		it('formats date as text (Indonesian)', () => {
			expect(formatDate(date, 'text')).toBe('09 Januari 2026');
		});

		it('formats date as number', () => {
			expect(formatDate(date, 'number')).toBe('09-01-2026');
		});

		it('pads single digit days and months', () => {
			const date = new Date(2026, 4, 3); // May 3, 2026
			expect(formatDate(date, 'number')).toBe('03-05-2026');
		});
	});

	describe('cn', () => {
		it('merges tailwind classes correctly', () => {
			expect(cn('px-2 py-2', 'px-4')).toBe('py-2 px-4');
		});

		it('handles conditional classes', () => {
			const isTrue = true;
			const isFalse = false;
			expect(cn('base', isTrue && 'is-true', isFalse && 'is-false')).toBe('base is-true');
		});
	});
});
