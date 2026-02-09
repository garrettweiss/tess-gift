import { useAppState } from '../state/context';

export function ConfirmPhoto() {
  const { state, actions } = useAppState();
  const dataUrl = state.pendingPhotoDataUrl;

  if (!dataUrl) {
    actions.openCamera();
    return null;
  }

  return (
    <div className="screen">
      <h2 className="screen__header">Hold on to this moment?</h2>
      <img src={dataUrl} alt="Captured" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', marginBottom: 20 }} />
      <button type="button" className="btn btn--primary" onClick={actions.confirmPhoto}>
        Use this photo
      </button>
      <button type="button" className="btn btn--secondary" onClick={actions.retakePhoto}>
        Retake
      </button>
      <p className="screen__subtext">Once you continue, this becomes part of the day.</p>
    </div>
  );
}
