/**
 * ProductAtmosphere — Unified Celestial Starfield & Atmospheric Glow
 * 
 * Provides a subtle, diamond-sharp starfield and rich responsive nebula glows
 * across all product pages (Aiva, Wellora, CasaMoto, etc.) while preserving
 * each product's bespoke color palette and brand identity.
 */

import { useEffect, useRef } from 'react';

interface ProductAtmosphereProps {
  accentColor: string;       // Primary product color (e.g. '#A66B8E', '#2ECC71', '#FF6B00')
  secondaryAccent?: string;  // Secondary/glow color (e.g. '#E65C8E')
  bgBaseColor?: string;      // Base dark hue (e.g. '#0A0508')
  starCount?: number;        // Total stars (default 220)
}

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  isTinted: boolean;
  driftSpeed: number;
}

// Convert hex to rgb
function hexToRgb(hex: string): [number, number, number] {
  let cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(c => c + c).join('');
  }
  const num = parseInt(cleanHex, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

export default function ProductAtmosphere({
  accentColor,
  secondaryAccent,
  bgBaseColor = '#0A0508',
  starCount = 280,
}: ProductAtmosphereProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const secondary = secondaryAccent || accentColor;
  const rgbAccent = hexToRgb(secondary);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let stars: Star[] = [];

    const initStars = (w: number, h: number) => {
      // Responsive star count: ~180 on mobile, ~280 on desktop
      const count = w < 768 ? Math.round(starCount * 0.65) : starCount;
      const arr: Star[] = [];
      for (let i = 0; i < count; i++) {
        const radius = Math.random() < 0.85 
          ? 0.6 + Math.random() * 0.85 
          : 1.4 + Math.random() * 0.8; // 15% are slightly larger glowing stars
        
        const baseAlpha = 0.25 + Math.random() * 0.60;
        arr.push({
          x: Math.random() * w,
          y: Math.random() * h,
          radius,
          baseAlpha,
          alpha: baseAlpha,
          twinkleSpeed: 0.8 + Math.random() * 2.2,
          twinkleOffset: Math.random() * Math.PI * 2,
          isTinted: Math.random() < 0.30, // 30% are subtly tinted with the product's color
          driftSpeed: 0.04 + Math.random() * 0.08,
        });
      }
      return arr;
    };

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 3);
      width = window.innerWidth;
      height = window.innerHeight;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      
      stars = initStars(width, height);
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      const sec = time / 1000;

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        // Gentle sinusoidal twinkle
        const twinkle = Math.sin(sec * s.twinkleSpeed + s.twinkleOffset) * 0.3;
        s.alpha = Math.max(0.08, Math.min(1.0, s.baseAlpha + twinkle));

        // Very slow ambient upward drift
        s.y -= s.driftSpeed * (dt * 60);
        if (s.y < -5) s.y = height + 5;

        // Draw star
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);

        if (s.isTinted) {
          ctx.fillStyle = `rgba(${rgbAccent[0]}, ${rgbAccent[1]}, ${rgbAccent[2]}, ${s.alpha * 0.85})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
        }
        ctx.fill();

        // Extra soft halo for larger stars
        if (s.radius > 1.3 && s.alpha > 0.4) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = s.isTinted 
            ? `rgba(${rgbAccent[0]}, ${rgbAccent[1]}, ${rgbAccent[2]}, ${s.alpha * 0.15})`
            : `rgba(255, 255, 255, ${s.alpha * 0.15})`;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [starCount, secondary, rgbAccent]);

  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100lvh',
        minHeight: '100vh',
        zIndex: 0,
        backgroundColor: bgBaseColor,
      }}
    >
      {/* ── 1. Themed Radial Atmospheric Nebula Glows (Responsive Mobile + Desktop) ── */}
      {/* Top Hero Glow — Fills mobile and desktop with product color aura */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[140vw] sm:w-[90vw] h-[55vh] sm:h-[65vh] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 15%, ${secondary}30 0%, ${accentColor}12 45%, transparent 75%)`,
        }}
      />

      {/* Floating Ambient Orb (Left) */}
      <div 
        className="absolute top-[35%] -left-[20%] sm:-left-[10%] w-[80vw] sm:w-[45vw] h-[80vw] sm:h-[45vw] rounded-full blur-[100px] sm:blur-[160px] pointer-events-none opacity-40 sm:opacity-25"
        style={{
          background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
        }}
      />

      {/* Floating Ambient Orb (Right) */}
      <div 
        className="absolute top-[65%] -right-[25%] sm:-right-[10%] w-[90vw] sm:w-[50vw] h-[90vw] sm:h-[50vw] rounded-full blur-[110px] sm:blur-[170px] pointer-events-none opacity-35 sm:opacity-25"
        style={{
          background: `radial-gradient(circle, ${secondary} 0%, transparent 70%)`,
        }}
      />

      {/* Bottom CTA Aura */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[130vw] sm:w-[85vw] h-[40vh] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% 100%, ${secondary}22 0%, transparent 70%)`,
        }}
      />

      {/* ── 2. Subtle Starfield Canvas ── */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ opacity: 1.0 }}
      />

      {/* ── 3. Fine Dot-Matrix Grid Texture ── */}
      <div 
        className="absolute inset-0 z-[2] opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />
    </div>
  );
}
