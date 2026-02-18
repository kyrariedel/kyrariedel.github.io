/** Utilities for Squaredle */

export const LETTERS = 'AAAAAAAAAABBCCDDDDEEEEEEEEEEEEEEEEFFGGHHIIIIIIIIJKLLLMMMNNNNNNOOOOOOOOPPQRRRRRRSSSSSSSTTTTTTUUUUVVWWXYYZ';
export const INITIAL_PATH = [];

export function randomGrid() {
  const grid = [];
  for (let i = 0; i < 16; i++) {
    grid.push(LETTERS[Math.floor(Math.random() * LETTERS.length)]);
  }
  return grid;
}

export function pathToWord(grid, path) {
  return path.map((p) => grid[p.r * 4 + p.c]).join('').toLowerCase();
}

export function isAdjacent(a, b) {
  const dr = Math.abs(a.r - b.r);
  const dc = Math.abs(a.c - b.c);
  return dr <= 1 && dc <= 1 && (dr || dc);
}

export function isInPath(path, r, c) {
  return path.some((p) => p.r === r && p.c === c);
}

// Find a path through the grid that spells the given word. Returns an array of { r, c } or null if no path exists.
export function findPathForWord(grid, word) {
  if (!word || !word.length) return [];
  const target = word.toUpperCase();
  const rows = 4;
  const cols = 4;
  const visited = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => false),
  );
  const path = [];

  function dfs(r, c, idx) {
    if (grid[r * cols + c] !== target[idx]) return false;
    visited[r][c] = true;
    path.push({ r, c });

    if (idx === target.length - 1) return true;

    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (!dr && !dc) continue;
        const nr = r + dr;
        const nc = c + dc;
        if (
          nr >= 0 &&
          nr < rows &&
          nc >= 0 &&
          nc < cols &&
          !visited[nr][nc] &&
          dfs(nr, nc, idx + 1)
        ) {
          return true;
        }
      }
    }

    visited[r][c] = false;
    path.pop();
    return false;
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r * cols + c] === target[0]) {
        if (dfs(r, c, 0)) {
          return [...path];
        }
        path.length = 0;
        for (let i = 0; i < rows; i++) {
          visited[i].fill(false);
        }
      }
    }
  }
  return null;
}
