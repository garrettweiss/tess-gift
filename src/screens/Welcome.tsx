import { useState } from 'react';
import { useAppState } from '../state/context';
import { COPY } from '../data/copy';

export function Welcome() {
  const { actions } = useAppState();
  const [ctaCount, setCtaCount] = useState(0);
  const c = COPY.welcome;

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
          alt={c.photoAlt}
          className="welcome-photo"
        />
      </div>
      <h1 className="screen__title welcome__title">
        {c.title}
      </h1>
      <p className="screen__body welcome__body">
        {c.body1}
      </p>
      <p className="screen__body welcome__body">
        {c.body2}
      </p>

      {ctaCount === 0 ? (
        <button
          type="button"
          className="btn btn--primary welcome__cta"
          onClick={handleFirstCta}
        >
          {c.ctaFirst}
        </button>
      ) : (
        <button
          type="button"
          className="btn btn--primary welcome__cta"
          onClick={handleSecondCta}
        >
          {c.ctaStart}
        </button>
      )}
    </div>
  );
}
