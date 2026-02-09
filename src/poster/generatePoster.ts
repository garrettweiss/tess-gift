import { jsPDF } from 'jspdf';
import { COPY } from '../data/copy';

export type PosterSize = 'a3' | '8x10';

const SIZES: Record<PosterSize, { w: number; h: number }> = {
  a3: { w: 841.89, h: 1190.55 },
  '8x10': { w: 576, h: 720 },
};

const MARGIN = 40;
const TITLE_FONT_SIZE = 28;
const SUBTITLE_FONT_SIZE = 14;
const FOOTER_FONT_SIZE = 10;
const GAP = 12;

export function generatePosterPDF(
  photos: string[],
  date: string,
  size: PosterSize
): void {
  const { w: pageW, h: pageH } = SIZES[size];
  const doc = new jsPDF({
    orientation: pageW > pageH ? 'landscape' : 'portrait',
    unit: 'pt',
    format: [pageW, pageH],
  });

  const contentTop = MARGIN;
  const contentBottom = pageH - MARGIN;
  let y = contentTop;

  const pdfCopy = COPY.posterPdf;
  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(TITLE_FONT_SIZE);
  doc.text(pdfCopy.title, MARGIN, y);
  y += TITLE_FONT_SIZE + 6;

  // Subtitle
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(SUBTITLE_FONT_SIZE);
  doc.setTextColor(100, 100, 100);
  doc.text(`${pdfCopy.subtitlePrefix} • ${date}`, MARGIN, y);
  doc.setTextColor(0, 0, 0);
  y += SUBTITLE_FONT_SIZE + 24;

  const gridTop = y;
  const footerHeight = 28;
  const gridBottom = contentBottom - footerHeight;
  const gridW = pageW - 2 * MARGIN;
  const gridH = gridBottom - gridTop;

  const n = photos.length;
  if (n === 0) {
    doc.setFontSize(12);
    doc.text(pdfCopy.noPhotos, MARGIN, y);
  } else {
    const cols = Math.ceil(Math.sqrt(n));
    const rows = Math.ceil(n / cols);
    const cellW = (gridW - (cols - 1) * GAP) / cols;
    const cellH = (gridH - (rows - 1) * GAP) / rows;

    photos.forEach((dataUrl, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = MARGIN + col * (cellW + GAP);
      const yCell = gridTop + row * (cellH + GAP);
      try {
        doc.addImage(dataUrl, 'JPEG', x, yCell, cellW, cellH, undefined, 'FAST');
      } catch {
        doc.setFillColor(240, 240, 240);
        doc.rect(x, yCell, cellW, cellH, 'F');
        doc.setFontSize(10);
        doc.text(pdfCopy.photoPlaceholder, x + cellW / 2 - 15, yCell + cellH / 2);
      }
    });
  }

  // Minimal dotted route line (decorative)
  doc.setDrawColor(180, 180, 180);
  doc.setLineDashPattern([4, 6], 0);
  doc.line(MARGIN, gridBottom - 8, pageW - MARGIN, gridBottom - 8);
  doc.setLineDashPattern([], 0);

  // Footer
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(FOOTER_FONT_SIZE);
  doc.setTextColor(100, 100, 100);
  doc.text(pdfCopy.footer, pageW / 2, contentBottom - 12, { align: 'center' });
  doc.setTextColor(0, 0, 0);

  doc.save(`Hidden-London-${size}-${date.replace(/\s/g, '-')}.pdf`);
}
