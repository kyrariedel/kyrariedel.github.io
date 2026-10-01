import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import {
  startNewGame,
  isSet,
  findAnySet,
  replaceAfterSet,
  countSets,
  DEFAULT_COLORS,
  ROUND_SECONDS,
  NUMBER_COUNTS,
  SHAPE_NAMES,
  SHADING_NAMES,
} from '../game/setGameUtils';

const TOAST_DURATION_MS = 2200;
const COLOR_LABELS = ['Color A', 'Color B', 'Color C'];

function ShapeGlyph({ shape, shading, color, patternId }) {
  const stroke = color;
  const fill =
    shading === 0 ? color : shading === 2 ? 'transparent' : `url(#${patternId})`;
  const strokeWidth = shading === 2 ? 2.25 : 1.5;

  if (shape === 0) {
    // diamond
    return (
      <polygon
        points="20,4 36,20 20,36 4,20"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    );
  }
  if (shape === 1) {
    // squiggle
    return (
      <path
        d="M10 28 C6 20, 10 10, 18 10 C24 10, 26 16, 30 16 C36 16, 36 8, 30 8 C22 8, 20 14, 14 14 C8 14, 6 22, 10 28 Z"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    );
  }
  // oval
  return (
    <ellipse
      cx="20"
      cy="20"
      rx="12"
      ry="15"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
    />
  );
}

function SetCardView({ card, colors, selected, onClick, disabled }) {
  const color = colors[card.color];
  const patternId = `stripe-${card.id}`;
  const count = NUMBER_COUNTS[card.number];

  return (
    <button
      type="button"
      className={`set-card${selected ? ' selected' : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      aria-label={`${NUMBER_COUNTS[card.number]} ${SHADING_NAMES[card.shading]} ${SHAPE_NAMES[card.shape]}, color ${card.color + 1}`}
    >
      <svg viewBox={`0 0 ${count * 40} 40`} className="set-card-svg" aria-hidden="true">
        <defs>
          <pattern
            id={patternId}
            width="6"
            height="6"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line x1="0" y1="0" x2="0" y2="6" stroke={color} strokeWidth="2.5" />
          </pattern>
        </defs>
        {Array.from({ length: count }, (_, i) => (
          <g key={i} transform={`translate(${i * 40}, 0)`}>
            <ShapeGlyph
              shape={card.shape}
              shading={card.shading}
              color={color}
              patternId={patternId}
            />
          </g>
        ))}
      </svg>
    </button>
  );
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function SetGame({ isOpen, onClose }) {
  const [board, setBoard] = useState([]);
  const [deck, setDeck] = useState([]);
  const [score, setScore] = useState(0);
  const [selectedIds, setSelectedIds] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(ROUND_SECONDS);
  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [toast, setToast] = useState(null);
  const [colors, setColors] = useState(DEFAULT_COLORS);
  const toastTimeoutRef = useRef(null);

  const setsOnBoard = useMemo(() => countSets(board), [board]);

  const clearToast = useCallback(() => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = null;
    }
    setToast(null);
  }, []);

  const showToast = useCallback((message, kind = 'info') => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast({ message, kind });
    toastTimeoutRef.current = setTimeout(() => {
      setToast(null);
      toastTimeoutRef.current = null;
    }, TOAST_DURATION_MS);
  }, []);

  const resetRound = useCallback(() => {
    const game = startNewGame();
    setBoard(game.board);
    setDeck(game.deck);
    setScore(0);
    setSelectedIds([]);
    setSecondsLeft(ROUND_SECONDS);
    setRunning(true);
    setGameOver(false);
    clearToast();
  }, [clearToast]);

  useEffect(() => {
    if (isOpen) {
      resetRound();
    } else {
      setRunning(false);
      clearToast();
    }
  }, [isOpen, resetRound, clearToast]);

  useEffect(() => {
    if (!isOpen || !running || gameOver) return undefined;
    const id = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          setRunning(false);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [isOpen, running, gameOver]);

  // End when board has no set and deck can't help
  useEffect(() => {
    if (!running || gameOver || board.length === 0) return;
    if (!findAnySet(board) && deck.length < 3) {
      setRunning(false);
      setGameOver(true);
    }
  }, [board, deck, running, gameOver]);

  const handleCardClick = useCallback(
    (cardId) => {
      if (!running || gameOver) return;
      clearToast();

      if (selectedIds.includes(cardId)) {
        setSelectedIds(selectedIds.filter((id) => id !== cardId));
        return;
      }
      if (selectedIds.length >= 3) return;

      const next = [...selectedIds, cardId];
      if (next.length < 3) {
        setSelectedIds(next);
        return;
      }

      const chosen = next
        .map((id) => board.find((c) => c.id === id))
        .filter(Boolean);

      if (chosen.length === 3 && isSet(chosen[0], chosen[1], chosen[2])) {
        const { board: nextBoard, deck: nextDeck } = replaceAfterSet(
          board,
          deck,
          next
        );
        setBoard(nextBoard);
        setDeck(nextDeck);
        setScore((s) => s + 1);
        showToast('Set!', 'success');
      } else {
        showToast('Not a set', 'error');
      }
      setSelectedIds([]);
    },
    [running, gameOver, board, deck, selectedIds, clearToast, showToast]
  );

  const handleHint = useCallback(() => {
    if (!running || gameOver) return;
    const triple = findAnySet(board);
    if (!triple) {
      showToast('No set on the board', 'error');
      return;
    }
    setSelectedIds(triple.map((c) => c.id));
    showToast('Hint highlighted', 'info');
  }, [running, gameOver, board, showToast]);

  const handleAddCards = useCallback(() => {
    if (!running || gameOver || deck.length < 3) return;
    if (findAnySet(board)) {
      showToast('A set still exists', 'error');
      return;
    }
    setBoard((prev) => prev.concat(deck.slice(0, 3)));
    setDeck((prev) => prev.slice(3));
    setSelectedIds([]);
  }, [running, gameOver, deck, board, showToast]);

  const handleColorChange = (index, value) => {
    setColors((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cols = board.length > 12 ? 5 : 4;

  return (
    <div
      className="game-modal-backdrop open"
      onClick={handleBackdropClick}
      aria-hidden="false"
    >
      <div
        className="game-modal set-game-modal"
        onClick={(e) => e.stopPropagation()}
        style={{
          '--set-c0': colors[0],
          '--set-c1': colors[1],
          '--set-c2': colors[2],
        }}
      >
        <div className="game-modal-header">
          <h3>Set</h3>
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
          Find three cards where each feature (color, shape, number, shading) is
          all the same or all different. Race the clock — single player.
        </p>

        <div className="set-hud" aria-live="polite">
          <div className={`set-timer${secondsLeft <= 15 ? ' urgent' : ''}`}>
            {formatTime(secondsLeft)}
          </div>
          <div className="set-score">
            Sets: <strong>{score}</strong>
          </div>
          <div className="set-deck">
            Deck: {deck.length} · On board: {setsOnBoard}
          </div>
        </div>

        <div className="set-color-controls">
          {COLOR_LABELS.map((label, i) => (
            <label key={label} className="set-color-picker">
              <span>{label}</span>
              <input
                type="color"
                value={colors[i]}
                onChange={(e) => handleColorChange(i, e.target.value)}
                aria-label={`Set shape color ${i + 1}`}
              />
            </label>
          ))}
        </div>

        {gameOver ? (
          <div className="set-game-over" role="status">
            <p>
              Time&apos;s up — you found <strong>{score}</strong>{' '}
              {score === 1 ? 'set' : 'sets'}.
            </p>
            <button type="button" className="primary" onClick={resetRound}>
              Play again
            </button>
          </div>
        ) : null}

        <div
          className="set-board"
          style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
          role="group"
          aria-label="Set cards"
        >
          {board.map((card) => (
            <SetCardView
              key={card.id}
              card={card}
              colors={colors}
              selected={selectedIds.includes(card.id)}
              onClick={() => handleCardClick(card.id)}
              disabled={gameOver}
            />
          ))}
        </div>

        <div className="game-actions">
          <button
            type="button"
            className="primary"
            onClick={handleHint}
            disabled={gameOver || !running}
          >
            Hint
          </button>
          <button
            type="button"
            onClick={handleAddCards}
            disabled={gameOver || !running || deck.length < 3}
            title="Add 3 cards only if no set exists"
          >
            +3 cards
          </button>
          <button type="button" onClick={resetRound}>
            New round
          </button>
          <button
            type="button"
            onClick={() => setSelectedIds([])}
            disabled={!selectedIds.length || gameOver}
          >
            Clear
          </button>
        </div>

        {toast && (
          <div
            className={`word-game-toast set-toast set-toast-${toast.kind}`}
            role="status"
            aria-live="polite"
          >
            {toast.message}
          </div>
        )}
      </div>
    </div>
  );
}
