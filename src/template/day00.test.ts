//Example test for day01 in src/day01/day01.test.ts:
import { test, expect } from 'vitest';
// import { part1, part2 } from './part1';

const sample = `
1
2
3
`.trim();

test('day01 part1 sample', () => {
  expect(part1(sample)).toBe(6);
});

test('day01 part2 sample', () => {
  expect(part2(sample)).toBe(6);
});
