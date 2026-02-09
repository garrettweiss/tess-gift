import type { AppState, Phase } from '../types';

/** Order of phases within a stop (navigation = directions to this stop, then en-route, arrival, etc.) */
const PHASE_ORDER: Phase[] = [
  'navigation',
  'en-route',
  'arrival',
  'camera',
  'confirm-photo',
  'reveal',
  'reflection',
  'between-stops',
];

const PHASE_ORDER_INDEX: Record<Phase, number> = Object.fromEntries(
  PHASE_ORDER.map((p, i) => [p, i])
) as Record<Phase, number>;

/** "Final" and "poster" come after all stops */
function phaseRank(p: Phase): number {
  if (p === 'final') return 1000;
  if (p === 'poster') return 1001;
  if (p === 'opening') return -1;
  return PHASE_ORDER_INDEX[p] ?? -1;
}

/**
 * Step index for navigation/en-route is the stop we're navigating TO (currentStopIndex + 1).
 * For other phases it's the stop we're at (currentStopIndex).
 */
export function getCurrentStep(state: AppState): { stopIndex: number; phase: Phase } | 'opening' | 'final' | 'poster' {
  const { phase, currentStopIndex, stops } = state;
  if (phase === 'opening') return 'opening';
  if (phase === 'final') return 'final';
  if (phase === 'poster') return 'poster';
  if (phase === 'navigation' || phase === 'en-route') {
    const stopIndex = currentStopIndex + 1;
    if (stopIndex >= stops.length) return 'final'; // shouldn't happen
    return { stopIndex, phase };
  }
  return { stopIndex: currentStopIndex, phase };
}

export function getFurthestStep(state: AppState): { stopIndex: number; phase: Phase } | 'opening' | 'final' | 'poster' {
  const { furthestStopIndex, furthestPhase } = state;
  if (furthestPhase === 'opening') return 'opening';
  if (furthestPhase === 'final') return 'final';
  if (furthestPhase === 'poster') return 'poster';
  return { stopIndex: furthestStopIndex, phase: furthestPhase };
}

type Step = { stopIndex: number; phase: Phase } | 'opening' | 'final' | 'poster';

function isOpening(s: Step): boolean {
  return s === 'opening';
}
function isPoster(s: Step): boolean {
  return s === 'poster' || (typeof s === 'object' && s.phase === 'poster');
}
function isFinal(s: Step): boolean {
  return s === 'final' || (typeof s === 'object' && s.phase === 'final');
}

/** Returns true if step A is before or equal to step B in the journey */
export function isStepBeforeOrEqual(a: Step, b: Step): boolean {
  if (isOpening(a)) return true;
  if (isOpening(b)) return false;
  if (isPoster(a)) return isPoster(b);
  if (isPoster(b)) return true;
  if (isFinal(a)) return isFinal(b) || isPoster(b);
  if (isFinal(b)) return !isPoster(a);
  if (typeof a === 'object' && typeof b === 'object') {
    if (a.stopIndex < b.stopIndex) return true;
    if (a.stopIndex > b.stopIndex) return false;
    return phaseRank(a.phase) <= phaseRank(b.phase);
  }
  return false;
}

/** Previous step in the journey, or null if at opening */
export function getPreviousStep(
  state: AppState
): { stopIndex: number; phase: Phase } | 'opening' | 'final' | null {
  const current = getCurrentStep(state);
  if (current === 'opening') return null;
  if (current === 'poster') return 'final';
  if (current === 'final') {
    const lastStop = state.stops.length - 1;
    return { stopIndex: lastStop, phase: 'between-stops' };
  }
  const { stopIndex, phase } = current;
  const idx = PHASE_ORDER.indexOf(phase);
  if (idx > 0) {
    let prevPhase = PHASE_ORDER[idx - 1];
    // Skip camera when going Back — user only sees camera when they tap "Take the photo" (or Test photo)
    if (prevPhase === 'camera') prevPhase = 'arrival';
    return prevPhase ? { stopIndex, phase: prevPhase } : { stopIndex, phase: 'between-stops' };
  }
  if (stopIndex === 0) return 'opening';
  return { stopIndex: stopIndex - 1, phase: 'between-stops' };
}

/** Whether the user can go back from the current step */
export function canGoBack(state: AppState): boolean {
  return getPreviousStep(state) !== null;
}

/**
 * Apply a step to state: set currentStopIndex and phase (and enRoute) to show that step.
 * Used for "go back" only; does not change furthest.
 */
export function stateForStep(
  _state: AppState,
  step: { stopIndex: number; phase: Phase } | 'opening'
): Partial<AppState> {
  if (step === 'opening') {
    return { phase: 'opening', currentStopIndex: 0 };
  }
  const { stopIndex, phase } = step;
  if (phase === 'navigation' || phase === 'en-route') {
    return {
      currentStopIndex: stopIndex - 1,
      phase,
      enRoute: phase === 'en-route',
    };
  }
  return {
    currentStopIndex: stopIndex,
    phase,
    enRoute: false,
  };
}

/** Update furthest to at least the given step (only advances, never goes back) */
export function advanceFurthestTo(
  state: AppState,
  step: { stopIndex: number; phase: Phase } | 'final' | 'poster'
): { furthestStopIndex: number; furthestPhase: Phase } {
  const current = getFurthestStep(state);
  const candidate: { stopIndex: number; phase: Phase } =
    step === 'final'
      ? { stopIndex: state.stops.length, phase: 'final' }
      : step === 'poster'
        ? { stopIndex: state.stops.length, phase: 'poster' }
        : step;
  const useCandidate = current === 'opening' || isStepBeforeOrEqual(current, candidate);
  if (useCandidate) {
    return { furthestStopIndex: candidate.stopIndex, furthestPhase: candidate.phase };
  }
  return { furthestStopIndex: state.furthestStopIndex, furthestPhase: state.furthestPhase };
}
