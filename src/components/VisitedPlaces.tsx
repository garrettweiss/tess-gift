import { useAppState } from '../state/context';
import type { Stop } from '../types';

function summaryFromStory(storyText: string, maxLength = 200): string {
  const firstParagraph = storyText.split(/\n\n+/)[0]?.trim() ?? storyText;
  if (firstParagraph.length <= maxLength) return firstParagraph;
  const cut = firstParagraph.slice(0, maxLength).trim();
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > maxLength * 0.6 ? cut.slice(0, lastSpace) : cut) + '…';
}

function VisitedCard({ stop }: { stop: Stop }) {
  const summary = summaryFromStory(stop.storyText);
  return (
    <article className="visited-card">
      <h3 className="visited-card__name">{stop.hiddenName}</h3>
      <p className="visited-card__summary">{summary}</p>
      {stop.photo && (
        <img src={stop.photo} alt="" className="visited-card__photo" />
      )}
    </article>
  );
}

interface VisitedPlacesOverlayProps {
  open: boolean;
  onClose: () => void;
}

export function VisitedPlacesOverlay({ open, onClose }: VisitedPlacesOverlayProps) {
  const { state } = useAppState();
  const completed = state.stops.filter((s) => s.completed);

  if (!open) return null;

  return (
    <div className="visited-overlay" role="dialog" aria-label="Places you've been">
      <div className="visited-overlay__header">
        <h2 className="visited-overlay__title">Places you&apos;ve been</h2>
        <button
          type="button"
          className="visited-overlay__close"
          onClick={onClose}
          aria-label="Close"
        >
          Close
        </button>
      </div>
      <div className="visited-overlay__list">
        {completed.map((stop) => (
          <VisitedCard key={stop.id} stop={stop} />
        ))}
      </div>
    </div>
  );
}
