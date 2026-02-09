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
        Your adventure is here
      </h1>
      <p className="screen__body welcome__body">
        Sorry this is late — but we’re so excited for you to discover your city in a new way.
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
