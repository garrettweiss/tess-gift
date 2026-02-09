import { useState } from 'react';
import { useAppState } from '../state/context';
import { generatePosterPDF, type PosterSize } from '../poster/generatePoster';

export function Poster() {
  const { state } = useAppState();
  const [size, setSize] = useState<PosterSize>('a3');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const photos = state.stops
    .filter((s) => s.photo)
    .map((s) => s.photo as string);
  const date = state.completedDate ?? new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  const handleCreatePreview = () => {
    setPreviewUrl(null);
    // Simple preview: we could render a canvas here; for now we just allow download
    setPreviewUrl('ready');
  };

  const handleDownload = () => {
    if (photos.length === 0) return;
    generatePosterPDF(photos, date, size);
  };

  return (
    <div className="screen">
      <h2 className="screen__header">Complete the Field Guide</h2>
      <p className="screen__body">
        One poster from the day. Your photos, your route.
      </p>

      <p className="screen__body mt-2">Size:</p>
      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        <button
          type="button"
          className="btn btn--secondary"
          style={{ flex: 1 }}
          onClick={() => setSize('a3')}
        >
          A3
        </button>
        <button
          type="button"
          className="btn btn--secondary"
          style={{ flex: 1 }}
          onClick={() => setSize('8x10')}
        >
          8×10
        </button>
      </div>

      {photos.length === 0 ? (
        <p className="screen__body">No photos yet. Complete at least one stop to create your poster.</p>
      ) : previewUrl === 'ready' ? (
        <>
          <p className="screen__subtext">Ready to download. Change size above if you prefer.</p>
          <button type="button" className="btn btn--primary mt-2" onClick={handleDownload}>
            Download PDF
          </button>
        </>
      ) : (
        <button type="button" className="btn btn--primary" onClick={handleCreatePreview}>
          Create your poster
        </button>
      )}

      <p className="screen__subtext mt-3">
        Title: Hidden London: In Plain Sight<br />
        Subtitle: Kyle & Tess • {date}
      </p>
    </div>
  );
}
