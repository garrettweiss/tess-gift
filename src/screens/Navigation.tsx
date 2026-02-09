import { useAppState } from '../state/context';

function getTravelMode(mode: string): string {
  switch (mode) {
    case 'walk': return 'walking';
    case 'cycle': return 'bicycling';
    case 'tube':
    case 'bus': return 'transit';
    default: return 'walking';
  }
}

function buildMapsUrl(lat: number, lng: number, mode: string): string {
  const travelmode = getTravelMode(mode);
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=${travelmode}`;
}

export function Navigation() {
  const { state, actions } = useAppState();
  const idx = state.currentStopIndex + 1;
  const nextStop = state.stops[idx];
  if (!nextStop) return null;

  const recommended = nextStop.transportRecommendations.find((r) => r.recommended)
    ?? nextStop.transportRecommendations[0];
  const recommendedMode = recommended?.mode ?? 'walk';

  const handleTakeMeThere = () => {
    const url = buildMapsUrl(nextStop.lat, nextStop.lng, recommendedMode);
    window.open(url, '_blank', 'noopener');
    actions.takeMeThere(recommendedMode);
  };

  const mapsEmbedUrl = `https://www.google.com/maps?q=${nextStop.lat},${nextStop.lng}&output=embed`;

  return (
    <div className="screen">
      <p className="screen__body">When you're ready, here's where to go next.</p>
      <div className="map-embed">
        <iframe
          title="Route to next stop"
          src={mapsEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <p className="screen__body mb-2">Best way to get there:</p>
      <ul className="transport-list">
        {nextStop.transportRecommendations.map((opt) => (
          <li key={opt.mode} className={opt.recommended ? 'recommended' : ''}>
            <span>
              {opt.mode === 'walk' && '🚶'}
              {opt.mode === 'tube' && '🚇'}
              {opt.mode === 'bus' && '🚌'}
              {opt.mode === 'cycle' && '🚴'}
            </span>
            <span>
              {opt.label} — {opt.description}
              {opt.recommended ? ' (recommended)' : ''}
            </span>
          </li>
        ))}
      </ul>
      <button type="button" className="btn btn--primary mt-2" onClick={handleTakeMeThere}>
        Take me there
      </button>
      <p className="screen__subtext mt-2">
        Coordinates (for manual search): {nextStop.lat}, {nextStop.lng}
      </p>
    </div>
  );
}
