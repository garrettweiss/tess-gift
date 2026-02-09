import { useAppState } from '../state/context';
import { COPY } from '../data/copy';

export function ConfirmPhoto() {
  const { state, actions } = useAppState();
  const dataUrl = state.pendingPhotoDataUrl;
  const c = COPY.confirmPhoto;

  if (!dataUrl) {
    actions.openCamera();
    return null;
  }

  return (
    <div className="screen">
      <h2 className="screen__header">{c.header}</h2>
      <img src={dataUrl} alt="Captured" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', marginBottom: 20 }} />
      <button type="button" className="btn btn--primary" onClick={actions.confirmPhoto}>
        {c.usePhoto}
      </button>
      <button type="button" className="btn btn--secondary" onClick={actions.retakePhoto}>
        {c.retake}
      </button>
      <p className="screen__subtext">{c.subtext}</p>
    </div>
  );
}
