# Hidden London: In Plain Sight

A one-device, mobile-first walk through London. At each stop you take a photo to unlock the story and the next location. At the end, the app generates a frameable poster (A3 or 8×10) from your photos.

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown (e.g. http://localhost:5173) on your phone for the full experience. Use iPhone Safari for best camera and fullscreen behaviour.

## Build for production

```bash
npm run build
```

Output is in `dist/`. Serve over HTTPS so the camera and geolocation work.

## Customising stops

Edit `src/data/stops.ts` to add or change locations. Each stop has:

- `hiddenName` — revealed only after the photo is confirmed
- `storyText` — 100–150 words, shown after reveal (paragraphs separated by double newlines)
- `reflectionPrompt`, `transportRecommendations`, `lat`/`lng`

## Poster

The poster uses exactly one photo per completed stop, plus the title *Hidden London: In Plain Sight* and subtitle *Kyle & Tess • [date]*. PDFs are generated client-side (A3 or 8×10, print-ready).

## Tech

- React 18, TypeScript, Vite
- State and progress persisted in `localStorage`
- jsPDF for client-side PDF generation
- No backend; camera and storage stay on device
