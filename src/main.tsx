import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { DataProvider } from './providers/data.provider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DataProvider>
      <App/>
    </DataProvider>
  </StrictMode>,
);
