import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [stage, setStage] = useState('entering');
  const [loadingText, setLoadingText] = useState('INITIALIZING KERNEL...');

  useEffect(() => {
    const loadTime = 1000;
    const exitTime = 300;

    const enterTimer = setTimeout(() => {
      setStage('loading');
      setTimeout(() => setLoadingText('ESTABLISHING SECURE CONNECTION...'), 200);
      setTimeout(() => setLoadingText('LOADING UI COMPONENTS...'), 500);
      setTimeout(() => setLoadingText('SYSTEM READY.'), 800);
    }, 50);

    const exitTimer = setTimeout(() => {
      setStage('exiting');
      setTimeout(() => {
        setIsVisible(false);
      }, exitTime);
    }, loadTime);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(exitTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[10000] bg-white dark:bg-[#09090b] flex flex-col items-center justify-center transition-all duration-300 ease-out
        ${stage === 'exiting' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      style={{ perspective: '1200px' }}
    >

      {/* Exactly Match Home Page Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-50" />
      <motion.div 
        animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-[150px] pointer-events-none" 
      />

      {/* Clean Floating Logo Panel */}
      <div
        className="relative z-10 flex flex-col items-center -mt-10 md:-mt-20"
        style={{
          transition: 'all 500ms cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: stage === 'entering'
            ? 'translateY(60px) rotateX(15deg) scale(0.9)'
            : stage === 'exiting'
              ? 'translateY(-20px) scale(1.1) rotateX(-5deg)'
              : 'translateY(0px) rotateX(0deg) scale(1)',
          opacity: stage === 'entering' ? 0 : stage === 'exiting' ? 0 : 1
        }}
      >

        <motion.img
          src="/mindx-logo-final.png"
          alt="MindX Technology"
          className="w-[600px] sm:w-[900px] h-auto object-contain mb-0 relative z-10 mix-blend-multiply dark:mix-blend-screen origin-center"
          animate={{ 
            y: [0, -12, 0],
            rotateX: [0, 3, -3, 0],
            rotateY: [0, -3, 3, 0],
            scale: [1, 1.015, 1],
            filter: [
              "brightness(1)", 
              "brightness(1.08)", 
              "brightness(1)"
            ]
          }}
          transition={{ 
            duration: 8, 
            ease: "easeInOut",
            repeat: Infinity
          }}
        />

        {/* Ultra-Minimalist Progress Line */}
        <div className="relative w-32 h-[2px] bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden -mt-12 sm:-mt-24 md:-mt-36">
          <div
            className="absolute top-0 left-0 h-full bg-blue-600"
            style={{
              width: stage === 'entering' ? '0%' : '100%',
              transition: 'width 1000ms cubic-bezier(0.65, 0, 0.35, 1)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
