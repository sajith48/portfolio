import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Lenis from 'lenis';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';

import { ThemeProvider } from '../../context/ThemeContext';
import { Header } from './Header';
import { Footer } from './Footer';
import { AnimatedCursor } from './AnimatedCursor';
import { InteractiveBg } from './InteractiveBg';
import { ScrollProgress } from './ScrollProgress';
import { BackToTop } from './BackToTop';
import { CommandPalette } from './CommandPalette';
import { LoadingScreen } from './LoadingScreen';

export const LayoutWrapper = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Initial Loading Screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // minimal loading time
    return () => clearTimeout(timer);
  }, []);

  // Lenis Smooth Scroll Setup
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5
    });

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <HelmetProvider>
      <ThemeProvider>
        <Helmet>
          <title>Sajith R | Full Stack Developer</title>
          <meta name="description" content="Portfolio of Sajith R, a Full Stack Developer specializing in React, Node, and AI integrations." />
          <meta property="og:title" content="Sajith R | Portfolio" />
          <meta property="og:description" content="Portfolio of Sajith R, a Full Stack Developer specializing in React, Node, and AI integrations." />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
        </Helmet>

        <div className="relative min-h-screen font-sans antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
          <AnimatePresence mode="wait">
            {isLoading && <LoadingScreen key="loading" />}
          </AnimatePresence>
          
          <ScrollProgress />
          <InteractiveBg />
          <AnimatedCursor />
          <CommandPalette />
          
          <Header />
          
          <main className="max-w-7xl mx-auto px-4 md:px-8 pt-32 space-y-32 relative z-10 pb-20">
            {children}
          </main>

          <Footer />
          <BackToTop />
          
          <Toaster 
            position="bottom-right"
            toastOptions={{
              style: {
                background: 'var(--card-bg)',
                color: 'var(--text-color)',
                backdropFilter: 'blur(16px)',
                border: '1px solid var(--card-border)',
              }
            }}
          />
        </div>
      </ThemeProvider>
    </HelmetProvider>
  );
};
