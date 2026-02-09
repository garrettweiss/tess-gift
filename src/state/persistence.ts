import type { AppState } from '../types';
import { STORAGE_KEY } from '../types';
import { getInitialState } from './initialState';

export function loadState(): AppState {
  // #region agent log
  fetch('http://127.0.0.1:7244/ingest/ba18e457-6701-445c-8871-c4576ed0b5fa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'persistence.ts:loadState',message:'loadState called',data:{},timestamp:Date.now(),hypothesisId:'H2'})}).catch(()=>{});
  // #endregion
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = getInitialState();
      fetch('http://127.0.0.1:7244/ingest/ba18e457-6701-445c-8871-c4576ed0b5fa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'persistence.ts:getInitialState',message:'returning initial',data:{phase:initial.phase},timestamp:Date.now(),hypothesisId:'H2'})}).catch(()=>{});
      return initial;
    }
    const parsed = JSON.parse(raw) as AppState;
    // Restore stops array shape (in case we add new fields later)
    const state: AppState = {
      ...getInitialState(),
      ...parsed,
      stops: parsed.stops ?? getInitialState().stops,
      pendingPhotoDataUrl: null, // never persist blob
    };
    fetch('http://127.0.0.1:7244/ingest/ba18e457-6701-445c-8871-c4576ed0b5fa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'persistence.ts:loadState-parsed',message:'returning persisted',data:{phase:state.phase},timestamp:Date.now(),hypothesisId:'H2'})}).catch(()=>{});
    return state;
  } catch (e) {
    // #region agent log
    fetch('http://127.0.0.1:7244/ingest/ba18e457-6701-445c-8871-c4576ed0b5fa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'persistence.ts:loadState-catch',message:'loadState threw',data:{err:String(e)},timestamp:Date.now(),hypothesisId:'H2'})}).catch(()=>{});
    // #endregion
    return getInitialState();
  }
}

export function saveState(state: AppState): void {
  try {
    const toSave = {
      ...state,
      pendingPhotoDataUrl: null,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch {
    // ignore
  }
}
