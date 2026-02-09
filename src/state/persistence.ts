import type { AppState } from '../types';
import { STORAGE_KEY } from '../types';
import { getInitialState } from './initialState';
import { getCurrentStep } from './stepNavigation';

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
    const parsed = JSON.parse(raw) as Partial<AppState>;
    const defaults = getInitialState();
    // Restore stops array shape (in case we add new fields later)
    let state: AppState = {
      ...defaults,
      ...parsed,
      stops: parsed.stops ?? defaults.stops,
      pendingPhotoDataUrl: null, // never persist blob
    };
    // Migrate: if missing furthest, set from current position so user stays at frontier
    if (state.furthestPhase === undefined || state.furthestStopIndex === undefined) {
      const step = getCurrentStep(state);
      if (step === 'opening') {
        state = { ...state, furthestStopIndex: -1, furthestPhase: 'opening' };
      } else if (step === 'final') {
        state = { ...state, furthestStopIndex: state.stops.length, furthestPhase: 'final' };
      } else if (step === 'poster') {
        state = { ...state, furthestStopIndex: state.stops.length, furthestPhase: 'poster' };
      } else {
        state = { ...state, furthestStopIndex: step.stopIndex, furthestPhase: step.phase };
      }
    }
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
