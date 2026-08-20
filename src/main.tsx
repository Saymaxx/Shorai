import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './app/globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import Navbar from '@/components/shared/Navbar';
import Preloader from '@/components/shared/Preloader';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <Preloader />
      <SmoothScrollProvider>
        <Navbar />
        <App />
      </SmoothScrollProvider>
    </ThemeProvider>
  </React.StrictMode>
);
