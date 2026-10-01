import { useState, useMemo } from 'react';
import { WordGame } from './WordGame';
import { SetGame } from './SetGame';
import { randomGrid } from '../game/wordGameUtils';
import { DEFAULT_COLORS, NUMBER_COUNTS } from '../game/setGameUtils';

const SET_PREVIEW_CARDS = [
  { color: 0, shape: 0, number: 0, shading: 0 },
  { color: 1, shape: 1, number: 1, shading: 1 },
  { color: 2, shape: 2, number: 2, shading: 2 },
];

function PreviewShape({ shape, shading, color }) {
  const fill =
    shading === 0 ? color : shading === 2 ? 'transparent' : color;
  const opacity = shading === 1 ? 0.45 : 1;
  const strokeWidth = shading === 2 ? 2.25 : 1.5;

  if (shape === 0) {
    return (
      <polygon
        points="20,4 36,20 20,36 4,20"
        fill={fill}
        fillOpacity={opacity}
        stroke={color}
        strokeWidth={strokeWidth}
      />
    );
  }
  if (shape === 1) {
    return (
      <path
        d="M10 28 C6 20, 10 10, 18 10 C24 10, 26 16, 30 16 C36 16, 36 8, 30 8 C22 8, 20 14, 14 14 C8 14, 6 22, 10 28 Z"
        fill={fill}
        fillOpacity={opacity}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    );
  }
  return (
    <ellipse
      cx="20"
      cy="20"
      rx="12"
      ry="15"
      fill={fill}
      fillOpacity={opacity}
      stroke={color}
      strokeWidth={strokeWidth}
    />
  );
}

function SetPreviewCard({ card }) {
  const color = DEFAULT_COLORS[card.color];
  const count = NUMBER_COUNTS[card.number];
  return (
    <div className="set-card set-preview-card" aria-hidden="true">
      <svg viewBox={`0 0 ${count * 40} 40`} className="set-card-svg">
        {Array.from({ length: count }, (_, i) => (
          <g key={i} transform={`translate(${i * 40}, 0)`}>
            <PreviewShape
              shape={card.shape}
              shading={card.shading}
              color={color}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

export function MiniProjects() {
  const [wordGameOpen, setWordGameOpen] = useState(false);
  const [setGameOpen, setSetGameOpen] = useState(false);
  const previewGrid = useMemo(() => randomGrid(), []);

  return (
    <>
      <section id="mini-projects">
        <h2 className="section-title">Mini-Projects</h2>
        <p className="mini-projects-intro">
          I love the mini-games from NYT, LinkedIn, and other smaller sites! Here are my
          attempts at recreating them to some degree.
        </p>

        <div className="word-game-preview">
          <p
            style={{
              margin: '0 0 0.75rem',
              fontSize: '0.95rem',
              color: 'var(--text)',
            }}
          >
            Boggle/
            <a
              href="https://squaredle.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Squaredle
            </a>
            -inspired! 4×4 grid of letters — swipe/type to form words. Valid words are
            shown below.
          </p>
          <div className="word-game-preview-overlay">
            <div className="word-grid word-grid-preview" aria-hidden="true">
              {previewGrid.map((letter, i) => (
                <div key={i} className="word-cell">
                  {letter}
                </div>
              ))}
            </div>
            <button
              type="button"
              className="play-game-btn play-game-btn-overlay"
              onClick={() => setWordGameOpen(true)}
            >
              Start!
            </button>
          </div>
        </div>

        <div className="word-game-preview">
          <p
            style={{
              margin: '0 0 0.75rem',
              fontSize: '0.95rem',
              color: 'var(--text)',
            }}
          >
            <a
              href="https://www.setgame.com/set/puzzle"
              target="_blank"
              rel="noopener noreferrer"
            >
              Set
            </a>
            -inspired! Spot three cards where every feature is all same or all
            different. Timed solo round — customize the shape colors.
          </p>
          <div className="word-game-preview-overlay">
            <div className="set-preview-row" aria-hidden="true">
              {SET_PREVIEW_CARDS.map((card, i) => (
                <SetPreviewCard key={i} card={card} />
              ))}
            </div>
            <button
              type="button"
              className="play-game-btn play-game-btn-overlay"
              onClick={() => setSetGameOpen(true)}
            >
              Start!
            </button>
          </div>
        </div>
      </section>

      <WordGame isOpen={wordGameOpen} onClose={() => setWordGameOpen(false)} />
      <SetGame isOpen={setGameOpen} onClose={() => setSetGameOpen(false)} />
    </>
  );
}
