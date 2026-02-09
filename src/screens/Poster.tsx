import { useState } from 'react';
import { useAppState } from '../state/context';
import { generatePosterPDF, type PosterSize } from '../poster/generatePoster';
import { COPY } from '../data/copy';

export function Poster() {
  const { state } = useAppState();
  const [size, setSize] = useState<PosterSize>('a3');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const c = COPY.poster;

  const photos = state.stops
    .filter((s) => s.photo)
    .map((s) => s.photo as string);
  const date = state.completedDate ?? new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  const handleCreatePreview = () => {
    setPreviewUrl(null);
    setPreviewUrl('ready');
  };

  const handleDownload = () => {
    if (photos.length === 0) return;
    generatePosterPDF(photos, date, size);
  };

  return (
    <div className="screen">
      <h2 className="screen__header">{c.header}</h2>
      <p className="screen__body">
        {c.body}
      </p>

      <p className="screen__body mt-2">{c.sizeLabel}</p>
      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        <button
          type="button"
          className="btn btn--secondary"
          style={{ flex: 1 }}
          onClick={() => setSize('a3')}
        >
          {c.sizeA3}
        </button>
        <button
          type="button"
          className="btn btn--secondary"
          style={{ flex: 1 }}
          onClick={() => setSize('8x10')}
        >
          {c.size8x10}
        </button>
      </div>

      {photos.length === 0 ? (
        <p className="screen__body">{c.noPhotos}</p>
      ) : previewUrl === 'ready' ? (
        <>
          <p className="screen__subtext">{c.readySubtext}</p>
          <button type="button" className="btn btn--primary mt-2" onClick={handleDownload}>
            {c.downloadPdf}
          </button>
        </>
      ) : (
        <button type="button" className="btn btn--primary" onClick={handleCreatePreview}>
          {c.createPoster}
        </button>
      )}

      <p className="screen__subtext mt-3">
        Title: {c.posterTitle}<br />
        Subtitle: {c.posterSubtitlePrefix} • {date}
      </p>
    </div>
  );
}
