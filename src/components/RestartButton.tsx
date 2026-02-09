import { useAppState } from '../state/context';
import { COPY } from '../data/copy';

/**
 * Restart button: sends user back to the very first screen (Welcome).
 * For testing only. To remove from the project:
 * 1. In App.tsx, set SHOW_RESTART_BUTTON to false or delete the RestartButton import and usage.
 * 2. Optionally delete this file.
 */
export function RestartButton() {
  const { actions } = useAppState();
  const c = COPY.restartButton;
  return (
    <button
      type="button"
      className="restart-btn"
      onClick={actions.restartFromBeginning}
      title={c.title}
      aria-label={c.ariaLabel}
    >
      {c.label}
    </button>
  );
}
