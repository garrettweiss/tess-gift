# Hosting plan: Hidden London for Tess (London, UK)

This doc explains how to host the app so Tess can use it from London, with **camera working** and everything else considered.

---

## 1. Why HTTPS is required (camera and security)

The app uses **`navigator.mediaDevices.getUserMedia()`** for the camera. Browsers (especially Safari on iPhone) **only allow camera access on secure origins**:

- **Allowed:** `https://` and `http://localhost`
- **Blocked:** `http://` on a real host (e.g. your home IP or a staging URL)

So the live site **must** be served over **HTTPS**. All of the options below provide HTTPS by default.

---

## 2. What the app needs from a host

| Requirement | Why |
|-------------|-----|
| **HTTPS** | Camera (getUserMedia) and future geolocation require a secure context. |
| **Static file hosting** | The app is a client-only SPA: no server logic, no API. Just serve the built `dist/` files. |
| **SPA fallback** | All routes (e.g. `/`, `/poster`) must serve `index.html` so the React router can handle them. Every host below supports this. |
| **Global reach** | Tess is in London; any major CDN (Vercel, Netlify, Cloudflare) serves the UK with low latency. |

No database, env vars, or secrets are required. Photos and state stay on the device (localStorage and in-memory).

---

## 3. Recommended hosting options (all free tier, HTTPS, global)

### Option A: Vercel (simplest for Vite)

- **Pros:** One-click Vite support, automatic HTTPS, global CDN, preview deployments from Git.
- **Cons:** None for this use case.
- **Steps:**
  1. Push the project to a Git repo (GitHub/GitLab/Bitbucket).
  2. Go to [vercel.com](https://vercel.com) and sign in with that Git provider.
  3. Import the repo; Vercel will detect Vite and set build command `npm run build` and output `dist`.
  4. Deploy. You get a URL like `hidden-london-xxx.vercel.app` (HTTPS).
  5. Optional: add a custom domain (e.g. `hidden-london.gift`) in Project Settings → Domains.

Vercel automatically serves `index.html` for all paths (SPA), so routing works.

### Option B: Netlify

- **Pros:** Same idea as Vercel: connect repo, auto-detect build, HTTPS + CDN. Drag-and-drop `dist/` also works.
- **Steps:**
  1. Connect the repo at [netlify.com](https://netlify.com) or drag-and-drop the `dist` folder.
  2. Build: `npm run build`; publish directory: `dist`.
  3. Add a `dist/_redirects` file with `/* /index.html 200` if you use drag-and-drop (or Netlify’s “Redirects” in the UI) so SPA routing works.

### Option C: Cloudflare Pages

- **Pros:** Free, fast CDN, good in the UK. Connect Git or upload `dist`.
- **Steps:**
  1. Connect repo at [pages.cloudflare.com](https://pages.cloudflare.com) or upload `dist`.
  2. Build: `npm run build`; output: `dist`.
  3. SPA fallback: in Pages project → Settings → Functions and redirects, add a catch-all so `/*` serves `index.html` (or use a `_redirects` / `_routes` as per Cloudflare docs).

Pick one; for a Vite app with no backend, **Vercel or Netlify** are the fastest to get running.

---

## 4. Pre-deploy cleanup (optional but recommended)

The codebase contains **debug `fetch` calls** to `http://127.0.0.1:7244/ingest/...`. They fail silently in production (`.catch(() => {})`) but can be removed so the production build has no dev-only code and a clean console:

- `src/main.tsx`
- `src/App.tsx`
- `src/state/context.tsx`
- `src/state/persistence.ts`
- `src/screens/Opening.tsx`

Search for `127.0.0.1:7244` and remove those `fetch(...).catch(...)` blocks (and any `#region agent log` / `#endregion` wrappers) before building for Tess.

---

## 5. Build and deploy checklist

1. **Optional:** Remove the debug `fetch` calls above.
2. From project root: `npm run build`.
3. Deploy the `dist/` folder (or connect the repo) to Vercel, Netlify, or Cloudflare Pages.
4. Confirm the live URL is **https** (e.g. `https://hidden-london-xxx.vercel.app`).
5. Open the URL on a phone (ideally iPhone Safari, as in the README) and test:
   - Start the experience.
   - At a stop, open the camera: allow camera when prompted.
   - Take a photo, confirm, and complete at least one stop.
   - At the end, generate the poster (A3 or 8×10) and confirm the PDF downloads.

---

## 6. Sending the link to Tess (London)

- **URL:** Send her the **https** link (e.g. `https://your-app.vercel.app` or your custom domain).
- **Device:** Best on **iPhone Safari** (camera and fullscreen behaviour as in the README). Chrome on Android also supports getUserMedia over HTTPS.
- **Camera:** On first use, the browser will ask for camera permission; she must tap “Allow” for the photo flow to work.
- **Add to Home Screen (optional):** In Safari, Share → “Add to Home Screen” gives an app-like icon and can reduce browser UI for a nicer experience.
- **Data:** Progress and photos are stored in the browser (localStorage and in-memory). Clearing site data or using a private window starts the experience from scratch.

---

## 7. Summary

| Topic | Plan |
|-------|------|
| **Camera** | Host only over **HTTPS** (all options above do this). Tess allows camera when the browser prompts. |
| **Where to host** | Vercel, Netlify, or Cloudflare Pages; static `dist/` + SPA fallback. |
| **London** | All use global CDNs; no extra setup needed for UK access. |
| **Extra checks** | Remove debug `fetch` to 127.0.0.1 before production; test camera + poster on a real phone over the live URL. |

Once the app is deployed at an **https** URL, camera and the rest of the flow will work for Tess in London.
