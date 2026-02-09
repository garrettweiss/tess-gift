import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// #region agent log
fetch('http://127.0.0.1:7244/ingest/ba18e457-6701-445c-8871-c4576ed0b5fa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.tsx:before-mount',message:'before createRoot',data:{rootExists:!!document.getElementById('root')},timestamp:Date.now(),hypothesisId:'H1'})}).catch(()=>{});
// #endregion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
