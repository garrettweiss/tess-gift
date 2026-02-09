import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { AppState, Phase } from '../types';
import { getTestPhotoDataUrl } from '../testPhoto';
import { loadState, saveState } from './persistence';

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
        setState((s) => ({ ...s, phase: 'arrival', currentStopIndex: 0 }));
      },
      openArrival() {
        setState((s) => ({ ...s, phase: 'arrival' }));
      },
      openCamera() {
        setState((s) => ({ ...s, phase: 'camera', pendingPhotoDataUrl: null }));
      },
      useTestPhoto() {
        setState((s) => ({
          ...s,
          pendingPhotoDataUrl: getTestPhotoDataUrl(),
          phase: 'confirm-photo',
        }));
      },
      setPendingPhoto(dataUrl: string) {
        setState((s) => ({ ...s, pendingPhotoDataUrl: dataUrl, phase: 'confirm-photo' }));
      },
      confirmPhoto() {
        setState((s) => {
          const stops = [...s.stops];
          const idx = s.currentStopIndex;
          const current = stops[idx];
          if (idx < stops.length && current && s.pendingPhotoDataUrl) {
            stops[idx] = { ...current, photo: s.pendingPhotoDataUrl, completed: true };
          }
          return {
            ...s,
            stops,
            currentStopIndex: idx,
            phase: 'reveal',
            pendingPhotoDataUrl: null,
          };
        });
      },
      retakePhoto() {
        setState((s) => ({ ...s, phase: 'camera', pendingPhotoDataUrl: null }));
      },
      setPhase(phase: Phase) {
        setState((s) => ({ ...s, phase }));
      },
      setReflectionText(text: string) {
        setState((s) => ({ ...s, reflectionText: text }));
      },
      skipReflection() {
        setState((s) => {
          const idx = s.currentStopIndex;
          const isLast = idx >= s.stops.length - 1;
          return {
            ...s,
            reflectionText: '',
            phase: isLast ? 'final' : 'between-stops',
          };
        });
      },
      goToNavigation() {
        setState((s) => ({ ...s, phase: 'navigation' }));
      },
      takeMeThere(_recommendedMode?: string) {
        setState((s) => ({
          ...s,
          phase: 'en-route',
          enRoute: true,
        }));
      },
      setEnRoute(value: boolean) {
        setState((s) => ({ ...s, enRoute: value }));
      },
      completeFinal() {
        setState((s) => ({
          ...s,
          phase: 'poster',
          completedDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
        }));
      },
      completePoster() {
        setState((s) => ({ ...s }));
      },
      resetPosterPhase() {
        setState((s) => ({ ...s, phase: 'poster' }));
      },
      arriveAtNextStop() {
        setState((s) => ({
          ...s,
          currentStopIndex: Math.min(s.currentStopIndex + 1, s.stops.length),
          phase: 'arrival',
          enRoute: false,
        }));
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
