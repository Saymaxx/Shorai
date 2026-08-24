import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './app/globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { RouterProvider } from '@/context/RouterContext';
import { ContentProvider } from '@/context/ContentContext';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider>
        <ContentProvider>
          <SmoothScrollProvider>
            <App />
          </SmoothScrollProvider>
        </ContentProvider>
      </RouterProvider>
    </ThemeProvider>
  </React.StrictMode>
);
