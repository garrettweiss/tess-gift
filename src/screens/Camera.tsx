import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppState } from '../state/context';
import { COPY } from '../data/copy';

export function Camera() {
  const { actions } = useAppState();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;
    const video = videoRef.current;
    async function start() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false,
        });
        streamRef.current = stream;
        if (video) {
          video.srcObject = stream;
          await video.play();
        }
      } catch (e) {
        const notSecure = !window.isSecureContext;
        setError(
          notSecure
            ? COPY.camera.errorInsecure
            : COPY.camera.errorNoPermission
        );
      }
    }
    start();
    return () => {
      stream?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    };
  }, []);

  const capture = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.videoWidth) return;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    actions.setPendingPhoto(dataUrl);
  }, [actions]);

  if (error) {
    return (
      <div className="screen screen--centered">
        <p className="screen__body">{error}</p>
        <button type="button" className="btn btn--secondary" onClick={actions.goBackToPreviousStep}>
          {COPY.camera.backButton}
        </button>
      </div>
    );
  }

  return (
    <div className="camera-wrap">
      <video ref={videoRef} className="camera-video" playsInline muted />
      <p className="camera-overlay" style={{ whiteSpace: 'pre-line' }}>
        {COPY.camera.overlayLine1}
        {'\n'}
        {COPY.camera.overlayLine2}
      </p>
      <div className="camera-capture-bar">
        <button type="button" className="btn btn--primary" onClick={capture}>
          {COPY.camera.captureButton}
        </button>
      </div>
    </div>
  );
}
