import type { AppState } from '../types';
import { STOPS } from '../data/stops';

export function getInitialState(): AppState {
  return {
    currentStopIndex: 0,
    stops: STOPS.map((s) => ({ ...s, photo: null, completed: false })),
    phase: 'opening',
    pendingPhotoDataUrl: null,
    reflectionText: '',
    enRoute: false,
    completedDate: null,
    furthestStopIndex: -1,
    furthestPhase: 'opening',
  };
}
