import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './i18n';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense
      fallback={
        <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
          Loading translations…
        </div>
      }
    >
      <App />
    </Suspense>
  </StrictMode>,
);
