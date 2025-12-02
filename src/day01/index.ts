import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';

type Move = {
  direction: string;
  distance: number;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputFileName = 'inputPart1.txt';

// const inputFileName = 'samplePart1.txt';

function readInput(fileName: string) {
  return fs.readFileSync(join(__dirname, fileName), 'utf8').trimEnd();
}

function parseLineInputToMove(input: string): Move {
  return {} as Move;
}

// move: R|405 --> 49
// move: L|253 --> 104 // error going from 49 and move LEFT 253, gets 104
// 49 - 53 = -4

function rotateLeft(position: number, numOfMoves: number): number {
  // reduce full array rotations of 100
  numOfMoves = numOfMoves % 100;

  let newPosition = position - numOfMoves;
  if (newPosition < 0) {
    return 100 + newPosition;
  } else {
    return newPosition;
  }
}

function rotateRight(position: number, numOfMoves: number): number {
  numOfMoves = numOfMoves % 100;

  let newPosition = (position + numOfMoves) % 100;
  return newPosition;
}

function part1() {
  const inputLines = readInput(inputFileName).split('\n');

  const moves: Move[] = [];
  // Parsing each line into Move obj
  for (const line of inputLines) {
    const move: Move = {
      direction: line[0],
      distance: parseInt(line.slice(1)),
    };
    moves.push(move);
  }

  let position = 50; // start position initially
  let zeroCount = 0;

  for (const move of moves) {
    if (move.direction === 'L') {
      position = rotateLeft(position, move.distance);
    } else {
      position = rotateRight(position, move.distance);
    }
    console.log(`move: ${move.direction}|${move.distance} --> ${position}`);
    if (position === 0) zeroCount++;
  }

  console.log(`Zero count = ${zeroCount}`);
}
function main() {
  part1;
}

main();
