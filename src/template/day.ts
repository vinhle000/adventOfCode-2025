/*
Run cmd >
cp -r src/template src/day03
# rename file(s) and update dev script


*/

import fs from 'node:fs';
import path from 'node:path';

function readInput(fileName: string) {
  return fs.readFileSync(path.join(__dirname, fileName), 'utf8').trimEnd();
}

export function part1(input: string): number | string {
  // TODO: implement
  return 0;
}

export function part2(input: string): number | string {
  // TODO: implement
  return 0;
}

if (require.main === module) {
  const input = readInput('input.txt');
  console.log('Part 1:', part1(input));
  console.log('Part 2:', part2(input));
}
