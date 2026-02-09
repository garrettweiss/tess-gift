import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { AppState, Phase } from '../types';
import { getTestPhotoDataUrl } from '../testPhoto';
import { loadState, saveState } from './persistence';
import {
  advanceFurthestTo,
  getCurrentStep,
  getFurthestStep,
  getPreviousStep,
  isStepBeforeOrEqual,
  stateForStep,
} from './stepNavigation';

interface Actions {
  begin: () => void;
  openArrival: () => void;
  openCamera: () => void;
  useTestPhoto: () => void;
  setPendingPhoto: (dataUrl: string) => void;
  confirmPhoto: () => void;
  retakePhoto: () => void;
  setPhase: (phase: Phase) => void;
  setReflectionText: (text: string) => void;
  skipReflection: () => void;
  goToNavigation: () => void;
  takeMeThere: (recommendedMode?: string) => void;
  setEnRoute: (value: boolean) => void;
  completeFinal: () => void;
  completePoster: () => void;
  resetPosterPhase: () => void;
  arriveAtNextStop: () => void;
  goBackToPreviousStep: () => void;
}

const AppStateContext = createContext<{ state: AppState; actions: Actions } | null>(null);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  // #region agent log
  let init: AppState;
  try {
    init = loadState();
    fetch('http://127.0.0.1:7244/ingest/ba18e457-6701-445c-8871-c4576ed0b5fa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'context.tsx:Provider',message:'loadState ok',data:{phase:init.phase},timestamp:Date.now(),hypothesisId:'H3'})}).catch(()=>{});
  } catch (e) {
    fetch('http://127.0.0.1:7244/ingest/ba18e457-6701-445c-8871-c4576ed0b5fa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'context.tsx:Provider',message:'loadState threw',data:{err:String(e)},timestamp:Date.now(),hypothesisId:'H3'})}).catch(()=>{});
    throw e;
  }
  const [state, setState] = useState<AppState>(init);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const actions = useMemo<Actions>(() => {
    return {
      begin() {
        setState((s) => {
          const next = { ...s, phase: 'navigation' as Phase, currentStopIndex: -1 };
          const furthest = advanceFurthestTo(next, { stopIndex: 0, phase: 'navigation' });
          return { ...next, ...furthest };
        });
      },
      openArrival() {
        setState((s) => {
          const next = { ...s, phase: 'arrival' as Phase };
          const furthest = advanceFurthestTo(next, { stopIndex: s.currentStopIndex, phase: 'arrival' });
          return { ...next, ...furthest };
        });
      },
      openCamera() {
        setState((s) => {
          const next = { ...s, phase: 'camera' as Phase, pendingPhotoDataUrl: null };
          const furthest = advanceFurthestTo(next, { stopIndex: s.currentStopIndex, phase: 'camera' });
          return { ...next, ...furthest };
        });
      },
      useTestPhoto() {
        setState((s) => {
          const next = {
            ...s,
            pendingPhotoDataUrl: getTestPhotoDataUrl(),
            phase: 'confirm-photo' as Phase,
          };
          const furthest = advanceFurthestTo(next, { stopIndex: s.currentStopIndex, phase: 'confirm-photo' });
          return { ...next, ...furthest };
        });
      },
      setPendingPhoto(dataUrl: string) {
        setState((s) => {
          const next = { ...s, pendingPhotoDataUrl: dataUrl, phase: 'confirm-photo' as Phase };
          const furthest = advanceFurthestTo(next, { stopIndex: s.currentStopIndex, phase: 'confirm-photo' });
          return { ...next, ...furthest };
        });
      },
      confirmPhoto() {
        setState((s) => {
          const stops = [...s.stops];
          const idx = s.currentStopIndex;
          const current = stops[idx];
          if (idx < stops.length && current && s.pendingPhotoDataUrl) {
            stops[idx] = { ...current, photo: s.pendingPhotoDataUrl, completed: true };
          }
          const next = {
            ...s,
            stops,
            currentStopIndex: idx,
            phase: 'reveal' as Phase,
            pendingPhotoDataUrl: null,
          };
          const furthest = advanceFurthestTo(next, { stopIndex: idx, phase: 'reveal' });
          return { ...next, ...furthest };
        });
      },
      retakePhoto() {
        setState((s) => ({ ...s, phase: 'camera' as Phase, pendingPhotoDataUrl: null }));
      },
      setPhase(phase: Phase) {
        setState((s) => {
          const next = { ...s, phase };
          const step = getCurrentStep(next);
          const furthestStep = getFurthestStep(s);
          // Don't allow jumping past the furthest step we've reached
          if (step !== 'opening' && step !== 'final' && step !== 'poster' && furthestStep !== 'opening') {
            if (!isStepBeforeOrEqual(step, furthestStep)) return s;
          }
          const toAdvance =
            step === 'opening' || step === 'final' || step === 'poster'
              ? undefined
              : step;
          const furthest = toAdvance ? advanceFurthestTo(next, toAdvance) : undefined;
          return furthest ? { ...next, ...furthest } : next;
        });
      },
      setReflectionText(text: string) {
        setState((s) => ({ ...s, reflectionText: text }));
      },
      skipReflection() {
        setState((s) => {
          const idx = s.currentStopIndex;
          const isLast = idx >= s.stops.length - 1;
          const next = {
            ...s,
            reflectionText: '',
            phase: (isLast ? 'final' : 'between-stops') as Phase,
          };
          const furthest = isLast
            ? advanceFurthestTo(next, 'final')
            : advanceFurthestTo(next, { stopIndex: idx, phase: 'between-stops' });
          return { ...next, ...furthest };
        });
      },
      goToNavigation() {
        setState((s) => {
          const nextStopIndex = s.currentStopIndex + 1;
          const next = { ...s, phase: 'navigation' as Phase };
          const furthest = advanceFurthestTo(next, { stopIndex: nextStopIndex, phase: 'navigation' });
          return { ...next, ...furthest };
        });
      },
      takeMeThere(_recommendedMode?: string) {
        setState((s) => {
          const nextStopIndex = s.currentStopIndex + 1;
          const next = { ...s, phase: 'en-route' as Phase, enRoute: true };
          const furthest = advanceFurthestTo(next, { stopIndex: nextStopIndex, phase: 'en-route' });
          return { ...next, ...furthest };
        });
      },
      setEnRoute(value: boolean) {
        setState((s) => ({ ...s, enRoute: value }));
      },
      completeFinal() {
        setState((s) => {
          const next = {
            ...s,
            phase: 'poster' as Phase,
            completedDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
          };
          const furthest = advanceFurthestTo(next, 'poster');
          return { ...next, ...furthest };
        });
      },
      completePoster() {
        setState((s) => ({ ...s }));
      },
      resetPosterPhase() {
        setState((s) => ({ ...s, phase: 'poster' as Phase }));
      },
      arriveAtNextStop() {
        setState((s) => {
          const newIdx = s.currentStopIndex === -1 ? 0 : Math.min(s.currentStopIndex + 1, s.stops.length);
          const next = {
            ...s,
            currentStopIndex: newIdx,
            phase: 'arrival' as Phase,
            enRoute: false,
          };
          const furthest = advanceFurthestTo(next, { stopIndex: newIdx, phase: 'arrival' });
          return { ...next, ...furthest };
        });
      },
      goBackToPreviousStep() {
        setState((s) => {
          const prev = getPreviousStep(s);
          if (!prev) return s;
          if (prev === 'opening') return { ...s, ...stateForStep(s, 'opening') };
          if (prev === 'final') {
            return { ...s, phase: 'final' as Phase, currentStopIndex: s.stops.length - 1 };
          }
          return { ...s, ...stateForStep(s, prev) };
        });
      },
    };
  }, []);

  const value = useMemo(() => ({ state, actions }), [state, actions]);
  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider');
  return ctx;
}
