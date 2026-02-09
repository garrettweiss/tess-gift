export interface TransportOption {
  mode: 'walk' | 'tube' | 'bus' | 'cycle';
  label: string;
  description: string;
  recommended?: boolean;
}

export interface Stop {
  id: string;
  hiddenName: string;
  storyText: string;
  reflectionPrompt: string;
  /** Optional instruction shown on arrival before taking the photo (e.g. get a beer and cheers) */
  photoInstruction?: string;
  /** Optional directions to help find the spot (shown on navigation and arrival) */
  directions?: string;
  transportRecommendations: TransportOption[];
  lat: number;
  lng: number;
  photo: string | null;
  completed: boolean;
}

export type Phase =
  | 'welcome'
  | 'opening'
  | 'arrival'
  | 'camera'
  | 'confirm-photo'
  | 'reveal'
  | 'reflection'
  | 'between-stops'
  | 'navigation'
  | 'en-route'
  | 'final'
  | 'poster';

export interface AppState {
  currentStopIndex: number;
  stops: Stop[];
  phase: Phase;
  /** Data URL of photo just captured, before confirm */
  pendingPhotoDataUrl: string | null;
  /** Reflection text for current stop (optional) */
  reflectionText: string;
  /** Whether user is considered "en route" (left navigation, not yet at next stop) */
  enRoute: boolean;
  /** Completed date for poster subtitle */
  completedDate: string | null;
  /** Furthest step the user has reached; they can go back to any step before this but not past it */
  furthestStopIndex: number;
  furthestPhase: Phase;
}

export const STORAGE_KEY = 'hidden-london-state';
