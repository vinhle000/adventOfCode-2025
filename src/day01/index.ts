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

function getMoves(inputLines: string[]): Move[] {
  const moves: Move[] = [];
  // Parsing each line into Move obj
  for (const line of inputLines) {
    const move: Move = {
      direction: line[0],
      distance: parseInt(line.slice(1)),
    };
    moves.push(move);
  }
  return moves;
}

function rotateLeftPart1(position: number, numOfMoves: number): number {
  // reduce full array rotations of 100
  numOfMoves = numOfMoves % 100;

  let newPosition = position - numOfMoves;
  if (newPosition < 0) {
    return 100 + newPosition;
  } else {
    return newPosition;
  }
}

function rotateRightPart1(position: number, numOfMoves: number): number {
  numOfMoves = numOfMoves % 100;

  let newPosition = (position + numOfMoves) % 100;
  return newPosition;
}

function part1() {
  const inputLines = readInput(inputFileName).split('\n');

  const moves = getMoves(inputLines);

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

function rotateLeftPart2(
  position: number,
  numOfMoves: number
): [number, number] {
  let zeroCount = Math.floor(numOfMoves / 100);
  let realNumMoves = numOfMoves % 100;

  let newPosition = position - realNumMoves;

  if (newPosition === 0) {
    zeroCount++;
  } else if (newPosition < 0) {
    newPosition = 100 + newPosition;
    if (position !== 0) zeroCount++; // EDGE case to NOT count when starting position = 0
  }
  return [newPosition, zeroCount];
}

function rotateRightPart2(
  position: number,
  numOfMoves: number
): [number, number] {
  let zeroCount = Math.floor(numOfMoves / 100);
  const realNumMoves = numOfMoves % 100;

  let newPosition = position + realNumMoves;

  if (newPosition === 0) {
    zeroCount++;
  } else if (newPosition >= 100) {
    //tried changing this from '>' to '>='
    newPosition = newPosition % 100;
    zeroCount++;
  }

  return [newPosition, zeroCount];
}

function part2() {
  const inputLines = readInput(inputFileName).split('\n');
  const moves = getMoves(inputLines);
  let position = 50;
  let total = 0;

  for (const move of moves) {
    if (move.direction === 'L') {
      const [newPosition, zeroCount] = rotateLeftPart2(position, move.distance);
      position = newPosition;
      total += zeroCount;
      // console.log(
      //   `${move.direction}|${move.distance}  ---> ${newPosition} ---- zero's added:${zeroCount}`
      // );
    } else {
      const [newPosition, zeroCount] = rotateRightPart2(
        position,
        move.distance
      );
      position = newPosition;
      total += zeroCount;
      // console.log(
      //   `${move.direction}|${move.distance}  ---> ${newPosition} ---- zero's added:${zeroCount}`
      // );
    }
  }
  console.log(`       total zeroes = ${total}\n`);
}
function main() {
  part2();
  process.exit(0);
}

main();
