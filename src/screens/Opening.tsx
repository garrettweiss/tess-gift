import { useAppState } from '../state/context';
import { COPY } from '../data/copy';

export function Opening() {
  // #region agent log
  fetch('http://127.0.0.1:7244/ingest/ba18e457-6701-445c-8871-c4576ed0b5fa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Opening.tsx',message:'Opening render',data:{},timestamp:Date.now(),hypothesisId:'H5'})}).catch(()=>{});
  // #endregion
  const { actions } = useAppState();
  const c = COPY.opening;
  return (
    <div className="screen screen--centered">
      <h1 className="screen__title">{c.title}</h1>
      <p className="screen__body" style={{ whiteSpace: 'pre-line' }}>{c.body1}</p>
      <p className="screen__body" style={{ whiteSpace: 'pre-line' }}>{c.body2}</p>
      <button type="button" className="btn btn--primary" onClick={actions.begin}>
        {c.button}
      </button>
      <p className="screen__subtext">{c.subtext}</p>
    </div>
  );
}
