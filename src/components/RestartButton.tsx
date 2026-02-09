import { useAppState } from '../state/context';

/**
 * Restart button: sends user back to the very first screen (Welcome).
 * For testing only. To remove from the project:
 * 1. In App.tsx, set SHOW_RESTART_BUTTON to false or delete the RestartButton import and usage.
 * 2. Optionally delete this file.
 */
export function RestartButton() {
  const { actions } = useAppState();
  return (
    <button
      type="button"
      className="restart-btn"
      onClick={actions.restartFromBeginning}
      title="Restart from beginning (testing)"
      aria-label="Restart from beginning"
    >
      Restart
    </button>
  );
}
