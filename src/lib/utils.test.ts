import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn() utility', () => {
  it('returns a single class unchanged', () => {
    expect(cn('text-red-500')).toBe('text-red-500');
  });

  it('merges multiple class strings', () => {
    expect(cn('px-4', 'py-2', 'rounded')).toBe('px-4 py-2 rounded');
  });

  it('handles conditional classes (falsy values are ignored)', () => {
    expect(cn('base', false && 'not-included', 'included')).toBe('base included');
    expect(cn('base', undefined, null, 'end')).toBe('base end');
  });

  it('handles object syntax from clsx', () => {
    expect(cn({ 'text-red-500': true, 'text-blue-500': false })).toBe('text-red-500');
  });

  it('merges conflicting Tailwind classes, keeping the last one', () => {
    // tailwind-merge resolves conflicts: px-4 wins over px-2
    expect(cn('px-2', 'px-4')).toBe('px-4');
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });

  it('handles array syntax from clsx', () => {
    expect(cn(['flex', 'items-center'], 'gap-2')).toBe('flex items-center gap-2');
  });

  it('returns an empty string when called with no arguments', () => {
    expect(cn()).toBe('');
  });

  it('deduplicates identical classes via tailwind-merge', () => {
    // tailwind-merge handles same-utility duplicates
    expect(cn('p-4', 'p-4')).toBe('p-4');
  });
});
