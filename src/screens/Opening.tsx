import { useAppState } from '../state/context';

export function Opening() {
  // #region agent log
  fetch('http://127.0.0.1:7244/ingest/ba18e457-6701-445c-8871-c4576ed0b5fa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Opening.tsx',message:'Opening render',data:{},timestamp:Date.now(),hypothesisId:'H5'})}).catch(()=>{});
  // #endregion
  const { actions } = useAppState();
  return (
    <div className="screen screen--centered">
      <h1 className="screen__title">London, But Not the Bits Everyone Sees</h1>
      <p className="screen__body">
        This is not a tour.<br />
        It's a walk through things people pass forever without stopping.
      </p>
      <p className="screen__body">
        You'll be given directions, but not explanations.<br />
        Names will come later.
      </p>
      <button type="button" className="btn btn--primary" onClick={actions.begin}>
        Begin
      </button>
      <p className="screen__subtext">Take your time. Skip anything that doesn't feel right.</p>
    </div>
  );
}
