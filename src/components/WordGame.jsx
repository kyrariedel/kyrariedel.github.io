import { useState, useCallback, useEffect, useRef } from 'react';
import { loadValidWords } from '../data/validWords';
import {
  randomGrid,
  pathToWord,
  isAdjacent,
  isInPath,
  INITIAL_PATH,
  findPathForWord,
} from '../game/wordGameUtils';

const TOAST_DURATION_MS = 2500;


// TODO: change to reset daily like app, save progress in between, add scoring function,
// recognize common words only, sort by word length and state how many in each category
// add count for letters (starting and in word), make a letter faded when all instances are used,
// if a letter is not found in any words at starting create new grid
// add accuracy and timer that is displayed when completed
export function WordGame({ isOpen, onClose }) {
  const [grid, setGrid] = useState(() => randomGrid());
  const [path, setPath] = useState(INITIAL_PATH);
  const [foundWords, setFoundWords] = useState([]);
  const [toast, setToast] = useState(null);
  const [validWords, setValidWords] = useState(null);
  const [dictionaryError, setDictionaryError] = useState(null);
  const gridRef = useRef(null);
  const pathRef = useRef(path);
  const gridStateRef = useRef(grid);
  const foundWordsRef = useRef(foundWords);
  const validWordsRef = useRef(validWords);
  const typedRef = useRef('');
  const toastTimeoutRef = useRef(null);

  validWordsRef.current = validWords;

  pathRef.current = path;
  gridStateRef.current = grid;
  foundWordsRef.current = foundWords;

  const clearToast = useCallback(() => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = null;
    }
    setToast(null);
  }, []);

  const showToast = useCallback((message) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast({ message });
    toastTimeoutRef.current = setTimeout(() => {
      setToast(null);
      toastTimeoutRef.current = null;
    }, TOAST_DURATION_MS);
  }, []);

  const canRemoveFromPath = path.length > 0;

  const currentWord = pathToWord(grid, path);
  const displayWord = currentWord || '';

  const addToPath = useCallback(
    (r, c) => {
      clearToast();
      setPath((prev) => {
        if (prev.length === 0) return [{ r, c }];
        const last = prev[prev.length - 1];
        const already = isInPath(prev, r, c);
        if (already || !isAdjacent(last, { r, c })) return prev;
        return [...prev, { r, c }];
      });
    },
    [clearToast]
  );

  const removeLastFromPath = useCallback(() => {
    if (!canRemoveFromPath) return;
    setPath((prev) => prev.slice(0, -1));
  }, [canRemoveFromPath]);

  const resetPathToInitial = useCallback(() => {
    clearToast();
    setPath(INITIAL_PATH);
    typedRef.current = '';
  }, [clearToast]);

  const submitWord = useCallback(() => {
    const currentPath = pathRef.current;
    const currentGrid = gridStateRef.current;
    const word = pathToWord(currentGrid, currentPath);

    console.log('Word submitted:', word);

    // clear path/selection after submission
    setPath(INITIAL_PATH);
    pathRef.current = INITIAL_PATH;
    typedRef.current = '';

    if (word.length < 3) {
      showToast('Word must be at least 3 letters');
      return;
    }
    if (foundWordsRef.current.includes(word)) {
      showToast('Already found');
      return;
    }
    const wordsSet = validWordsRef.current;
    if (!wordsSet || !wordsSet.has(word)) {
      showToast('Not a valid word');
      return;
    }
    setFoundWords((prev) => [...prev, word]);
  }, [showToast]);

  // Reset game state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      const newGrid = randomGrid();
      setGrid(newGrid);
      setPath(INITIAL_PATH);
      setFoundWords([]);
      gridStateRef.current = newGrid;
      pathRef.current = INITIAL_PATH;
      typedRef.current = '';
    } else {
      clearToast();
    }
  }, [isOpen, clearToast]);

  // load dictionary when modal opens
  useEffect(() => {
    if (!isOpen) return;
    if (validWords) return;
    setDictionaryError(null);
    loadValidWords()
      .then((set) => {
        setValidWords(set);
      })
      .catch((err) => {
        console.error('Dictionary load failed:', err);
        setDictionaryError('Could not load dictionary. Check your connection.');
      });
  }, [isOpen, validWords]);

  // Letters: build a word and search for ANY path that spells it using DFS
  // Backspace: remove last letter and recompute path
  // Enter: submit current word
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      const key = e.key.toUpperCase();
      if (key.length === 1 && key >= 'A' && key <= 'Z') {
        e.preventDefault();
        clearToast();
        const next = (typedRef.current || '') + key;
        const gridSnapshot = gridStateRef.current;
        const newPath = findPathForWord(gridSnapshot, next);
        if (newPath && newPath.length) {
          typedRef.current = next;
          setPath(newPath);
        } 
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        const current = typedRef.current || '';
        if (current.length === 0) {
          removeLastFromPath();
          return;
        }
        const next = current.slice(0, -1);
        typedRef.current = next;
        if (!next.length) {
          setPath(INITIAL_PATH);
          return;
        }
        const gridSnapshot = gridStateRef.current;
        const newPath = findPathForWord(gridSnapshot, next);
        if (newPath && newPath.length) {
          setPath(newPath);
        } else {
          setPath(INITIAL_PATH);
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        submitWord();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, path, grid, addToPath, removeLastFromPath, submitWord, onClose, clearToast, showToast]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleCellMouseDown = (r, c) => {
    addToPath(r, c);
  };

  const handleCellMouseEnter = (e, r, c) => {
    if (e.buttons !== 1) return;
    addToPath(r, c);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length !== 1) return;
    const t = e.touches[0];
    const el = document.elementFromPoint(t.clientX, t.clientY);
    if (el?.dataset?.r != null && el?.dataset?.c != null) {
      const r = parseInt(el.dataset.r, 10);
      const c = parseInt(el.dataset.c, 10);
      addToPath(r, c);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length !== 1) return;
    e.preventDefault();
    const t = e.touches[0];
    const el = document.elementFromPoint(t.clientX, t.clientY);
    if (el?.dataset?.r != null && el?.dataset?.c != null) {
      const r = parseInt(el.dataset.r, 10);
      const c = parseInt(el.dataset.c, 10);
      addToPath(r, c);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="game-modal-backdrop open"
      onClick={handleBackdropClick}
      aria-hidden="false"
    >
      <div className="game-modal" onClick={(e) => e.stopPropagation()}>
        <div className="game-modal-header">
          <h3>Word Game</h3>
          <button
            type="button"
            className="game-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        <p className="word-game-instructions">
          Swipe or type to select letters and form words. Submit to score (only valid
          words count).
        </p>
        {dictionaryError && (
          <p className="word-game-dictionary-error" role="alert">
            {dictionaryError}
          </p>
        )}
        {!validWords && !dictionaryError && (
          <p className="word-game-loading">Loading dictionary…</p>
        )}
        <div className="game-current-word" aria-live="polite">
          {displayWord}
        </div>
        <div
          ref={gridRef}
          className="word-grid"
          role="grid"
          aria-label="4 by 4 letter grid"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          style={{ touchAction: 'none' }}
        >
          {[0, 1, 2, 3].map((r) =>
            [0, 1, 2, 3].map((c) => {
              const i = r * 4 + c;
              const selected = isInPath(path, r, c);
              return (
                <div
                  key={`${r}-${c}`}
                  className={`word-cell${selected ? ' selected' : ''}`}
                  data-r={r}
                  data-c={c}
                  onMouseDown={() => handleCellMouseDown(r, c)}
                  onMouseEnter={(e) => handleCellMouseEnter(e, r, c)}
                  role="gridcell"
                  aria-selected={selected}
                >
                  {grid[i]}
                </div>
              );
            })
          )}
        </div>
        <div className="game-actions">
          <button
            type="button"
            className="primary"
            onClick={submitWord}
            disabled={!validWords}
            title={!validWords ? 'Loading dictionary…' : undefined}
          >
            Submit word
          </button>
          <button
            type="button"
            onClick={resetPathToInitial}
            title="Clear selection"
          >
            Clear
          </button>
        </div>
        <div className="game-found-words">
          <h4>Found words</h4>
          <div className="game-found-list">
            {foundWords.length ? foundWords.join(', ') : '—'}
          </div>
        </div>
        {toast && (
          <div className="word-game-toast" role="status" aria-live="polite">
            {toast.message}
          </div>
        )}
      </div>
    </div>
  );
}
