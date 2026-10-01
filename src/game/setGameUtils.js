/** Utilities for the Set card game */

export const COLORS = [0, 1, 2];
export const SHAPES = [0, 1, 2]; // diamond, squiggle, oval
export const NUMBERS = [0, 1, 2]; // one, two, three
export const SHADINGS = [0, 1, 2]; // solid, striped, open

export const SHAPE_NAMES = ['diamond', 'squiggle', 'oval'];
export const SHADING_NAMES = ['solid', 'striped', 'open'];
export const NUMBER_COUNTS = [1, 2, 3];

export const DEFAULT_COLORS = ['#e23d3d', '#2a9d5c', '#7b4fcf'];
export const ROUND_SECONDS = 120;
export const INITIAL_BOARD_SIZE = 12;

/** @typedef {{ id: string, color: number, shape: number, number: number, shading: number }} SetCard */

/** Build all 81 unique cards. */
export function createDeck() {
  /** @type {SetCard[]} */
  const deck = [];
  for (const color of COLORS) {
    for (const shape of SHAPES) {
      for (const number of NUMBERS) {
        for (const shading of SHADINGS) {
          deck.push({
            id: `${color}-${shape}-${number}-${shading}`,
            color,
            shape,
            number,
            shading,
          });
        }
      }
    }
  }
  return deck;
}

export function shuffle(array) {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Three cards form a set iff for every feature, values are all same or all different.
 * Equivalent: sum of each feature mod 3 === 0.
 */
export function isSet(a, b, c) {
  if (!a || !b || !c) return false;
  if (a.id === b.id || a.id === c.id || b.id === c.id) return false;
  return (
    (a.color + b.color + c.color) % 3 === 0 &&
    (a.shape + b.shape + c.shape) % 3 === 0 &&
    (a.number + b.number + c.number) % 3 === 0 &&
    (a.shading + b.shading + c.shading) % 3 === 0
  );
}

/** @returns {[SetCard, SetCard, SetCard] | null} */
export function findAnySet(board) {
  const n = board.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      for (let k = j + 1; k < n; k++) {
        if (isSet(board[i], board[j], board[k])) {
          return [board[i], board[j], board[k]];
        }
      }
    }
  }
  return null;
}

export function countSets(board) {
  let count = 0;
  const n = board.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      for (let k = j + 1; k < n; k++) {
        if (isSet(board[i], board[j], board[k])) count++;
      }
    }
  }
  return count;
}

/**
 * Deal initial board: at least INITIAL_BOARD_SIZE cards, adding 3 at a time
 * until a set exists or the deck is empty.
 */
export function dealInitial(deck) {
  let remaining = [...deck];
  let board = remaining.splice(0, INITIAL_BOARD_SIZE);
  while (!findAnySet(board) && remaining.length >= 3) {
    board = board.concat(remaining.splice(0, 3));
  }
  return { board, deck: remaining };
}

/**
 * Remove three cards from the board. Prefer refilling to 12 when possible;
 * if no set remains in 12, add 3 more until a set exists or deck is empty.
 */
export function replaceAfterSet(board, deck, removedIds) {
  const removeSet = new Set(removedIds);
  let nextBoard = board.filter((c) => !removeSet.has(c.id));
  let remaining = [...deck];

  const target = Math.max(INITIAL_BOARD_SIZE, nextBoard.length);
  while (nextBoard.length < target && remaining.length > 0) {
    nextBoard.push(remaining.shift());
  }

  while (
    nextBoard.length >= 3 &&
    !findAnySet(nextBoard) &&
    remaining.length >= 3
  ) {
    nextBoard = nextBoard.concat(remaining.splice(0, 3));
  }

  return { board: nextBoard, deck: remaining };
}

export function startNewGame() {
  const shuffled = shuffle(createDeck());
  const { board, deck } = dealInitial(shuffled);
  return { board, deck, score: 0 };
}
