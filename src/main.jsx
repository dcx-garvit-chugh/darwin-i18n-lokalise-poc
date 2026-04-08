import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './i18n';
import './index.css';
import App from './App.jsx';

const loadingFallback = (
  <div
    style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '"DM Sans", system-ui, sans-serif',
      color: '#8f8b98',
      background: '#0a0a0c',
    }}
  >
    Loading…
  </div>
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={loadingFallback}>
      <App />
    </Suspense>
  </StrictMode>,
);
