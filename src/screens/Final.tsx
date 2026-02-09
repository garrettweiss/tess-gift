import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useAppState } from '../state/context';
import { COPY } from '../data/copy';

function fireConfetti() {
  const duration = 2500;
  const end = Date.now() + duration;
  const colors = ['#c4a574', '#e8e6e3', '#9a9590', '#fff'];

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

export function Final() {
  const { actions } = useAppState();
  const c = COPY.final;

  useEffect(() => {
    fireConfetti();
  }, []);

  return (
    <div className="screen screen--centered screen--final">
      <h1 className="final__header">{c.header}</h1>
      <div className="final__photo-wrap">
        <img
          src="/congrats-archie-pint.png"
          alt="Archie ready for a pint"
          className="final__photo"
        />
      </div>
      <p className="screen__body final__body">{c.body}</p>
      <button type="button" className="btn btn--primary" onClick={actions.completeFinal}>
        {c.button}
      </button>
    </div>
  );
}
