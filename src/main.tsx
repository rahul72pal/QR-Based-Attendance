import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';

const root = createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
        <App />
      <Toaster />
    </BrowserRouter>
  </StrictMode>,
);

// Optionally, you can keep the reportWebVitals call if you want to measure performance
// reportWebVitals();