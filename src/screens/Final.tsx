import { useAppState } from '../state/context';
import { COPY } from '../data/copy';

export function Final() {
  const { actions } = useAppState();
  const c = COPY.final;
  return (
    <div className="screen screen--centered">
      <h2 className="screen__header">{c.header}</h2>
      <p className="screen__body" style={{ whiteSpace: 'pre-line' }}>
        {c.body1}
        {'\n'}
        {c.body2}
      </p>
      <button type="button" className="btn btn--primary" onClick={actions.completeFinal}>
        {c.button}
      </button>
    </div>
  );
}
