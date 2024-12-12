import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

// CUSTOM MODULES...
import './index.css';
import router from './routers/routes';

// COMPONENTS
import SnackbarProvider from './contexts/SnackbarContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SnackbarProvider>
      <RouterProvider router={router} />
    </SnackbarProvider>
  </StrictMode>,
);
