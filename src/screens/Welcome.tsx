import { useState } from 'react';
import { useAppState } from '../state/context';

export function Welcome() {
  const { actions } = useAppState();
  const [ctaCount, setCtaCount] = useState(0);

  const handleFirstCta = () => {
    setCtaCount(1);
  };

  const handleSecondCta = () => {
    actions.completeWelcome();
  };

  return (
    <div className="screen screen--centered screen--welcome">
      <div className="welcome-photo-wrap">
        <img
          src="/welcome-photo.png"
          alt="From us — with love"
          className="welcome-photo"
        />
      </div>
      <h1 className="screen__title welcome__title">
        Your delayed Christmas gift adventure is here
      </h1>
      <p className="screen__body welcome__body">
        Sorry this is late but we couldn’t figure out what to get you lol. We decided on a chance to see London in a new way… hopefully see some stuff that a local wouldn’t even know about, but really make. We think these are the things that truly make London great… not the creation of Greenwich or 6 professional soccer teams or the red coats taking over the world.
      </p>
      <p className="screen__body welcome__body">
        You’ll need the full day for this. Only start when you’re really ready.
      </p>

      {ctaCount === 0 ? (
        <button
          type="button"
          className="btn btn--primary welcome__cta"
          onClick={handleFirstCta}
        >
          Yes, I have a full day and I’m willing to commit it for an adventure I don’t know the details of.
        </button>
      ) : (
        <button
          type="button"
          className="btn btn--primary welcome__cta"
          onClick={handleSecondCta}
        >
          Start my adventure
        </button>
      )}
    </div>
  );
}
