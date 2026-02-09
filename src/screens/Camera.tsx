import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppState } from '../state/context';

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
            ? 'The camera only works on a secure connection (https). Open this page using the https:// URL from the dev server, then on your phone accept the certificate warning so the camera can run.'
            : 'Camera access is needed to take the photo. Check that Safari has permission for this site in Settings → Safari → Camera.'
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
        <button type="button" className="btn btn--secondary" onClick={() => actions.setPhase('arrival')}>
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="camera-wrap">
      <video ref={videoRef} className="camera-video" playsInline muted />
      <p className="camera-overlay">
        Find something worth remembering.<br />
        You can include yourself if you want.
      </p>
      <div className="camera-capture-bar">
        <button type="button" className="btn btn--primary" onClick={capture}>
          Capture
        </button>
      </div>
    </div>
  );
}
