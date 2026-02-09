import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { COPY } from './data/copy';
import './index.css';

document.title = COPY.pageTitle;

// Log a visit (IP visible in Vercel dashboard → Project → Logs). No-op in local dev.
fetch('/api/visit', { method: 'POST' }).catch(() => {});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
