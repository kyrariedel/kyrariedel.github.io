import { useState, useMemo } from 'react';
import { WordGame } from './WordGame';
import { randomGrid } from '../game/wordGameUtils';

export function MiniProjects() {
  const [gameOpen, setGameOpen] = useState(false);
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
              onClick={() => setGameOpen(true)}
            >
              Start!
            </button>
          </div>
        </div>
      </section>

      <WordGame isOpen={gameOpen} onClose={() => setGameOpen(false)} />
    </>
  );
}
