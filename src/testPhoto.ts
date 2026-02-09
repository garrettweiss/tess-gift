/**
 * Temporary: fake photo for testing without camera.
 * To remove: delete this file, remove useTestPhoto action and "Test photo" button from Arrival screen.
 */
export function getTestPhotoDataUrl(): string {
  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 300;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  ctx.fillStyle = '#2a2a2a';
  ctx.fillRect(0, 0, 400, 300);
  ctx.fillStyle = '#888';
  ctx.font = '24px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Test photo', 200, 150);
  return canvas.toDataURL('image/jpeg', 0.8);
}
