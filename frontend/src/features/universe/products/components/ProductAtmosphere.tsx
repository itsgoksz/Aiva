/**
 * ProductAtmosphere — Unified Celestial Starfield & Atmospheric Glow
 * 
 * Provides:
 * 1. Fixed, rock-solid starfield canvas immune to iOS Safari / mobile address bar resizing
 * 2. Delicate, twinkling stars with product-themed tinting
 * 3. Radial ambient atmospheric nebula glows matching the product's color system
 * 4. Micro-dot subtle space grid for high-tech spatial alignment
 */

import { memo, useEffect, useMemo, useRef, useState } from 'react';

interface ProductAtmosphereProps {
  accentColor: string;
  secondaryAccent?: string;
  bgBaseColor?: string;
  starCount?: number;
}

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  if (clean.length === 3) {
    return [
      parseInt(clean[0] + clean[0], 16),
      parseInt(clean[1] + clean[1], 16),
      parseInt(clean[2] + clean[2], 16),
    ];
  }
  return [
    parseInt(clean.substring(0, 2), 16),
    parseInt(clean.substring(2, 4), 16),
    parseInt(clean.substring(4, 6), 16),
  ];
}

const ProductAtmosphere = memo(function ProductAtmosphere({
  accentColor,
  secondaryAccent,
  bgBaseColor = '#0A0508',
  starCount = 160,
}: ProductAtmosphereProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const secondary = secondaryAccent || accentColor;
  const rgbAccent = useMemo(() => hexToRgb(accentColor), [accentColor]);

  // Desktop uses exact innerHeight; mobile locks screen height to stay immune to Safari toolbar collapse
  const [stableHeight, setStableHeight] = useState<number>(() => {
    if (typeof window === 'undefined') return 900;
    if (window.innerWidth >= 768) return window.innerHeight;
    const screenH = (window.screen && window.screen.height) ? window.screen.height : window.innerHeight;
    return Math.max(window.innerHeight, screenH) + 80;
  });

  const lastWidthRef = useRef<number>(typeof window !== 'undefined' ? window.innerWidth : 1000);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawStaticStars = (w: number, h: number) => {
      const dpr = w < 768 ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const count = w < 768 ? Math.round(starCount * 0.65) : starCount;
      const tintedPrefix = `rgba(${rgbAccent[0]}, ${rgbAccent[1]}, ${rgbAccent[2]}, `;
      const whitePrefix = 'rgba(255, 255, 255, ';

      for (let i = 0; i < count; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const radius = Math.random() < 0.85 ? 0.6 + Math.random() * 0.85 : 1.4 + Math.random() * 0.8;
        const alpha = 0.25 + Math.random() * 0.65;
        const isTinted = Math.random() < 0.30;
        const prefix = isTinted ? tintedPrefix : whitePrefix;

        ctx.fillStyle = `${prefix}${(isTinted ? alpha * 0.85 : alpha).toFixed(3)})`;
        if (radius <= 1.2) {
          const d = radius * 2;
          ctx.fillRect(x - radius, y - radius, d, d);
        } else {
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
          if (alpha > 0.45) {
            ctx.beginPath();
            ctx.arc(x, y, radius * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = `${prefix}${(alpha * 0.14).toFixed(3)})`;
            ctx.fill();
          }
        }
      }
    };

    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      if (newWidth >= 768) {
        lastWidthRef.current = newWidth;
        setStableHeight(newHeight);
        drawStaticStars(newWidth, newHeight);
        return;
      }
      if (Math.abs(newWidth - lastWidthRef.current) < 40) return;

      lastWidthRef.current = newWidth;
      const screenH = (window.screen && window.screen.height) ? window.screen.height : newHeight;
      const newStableHeight = Math.max(newHeight, screenH) + 80;
      setStableHeight(newStableHeight);
      drawStaticStars(newWidth, newStableHeight);
    };

    drawStaticStars(window.innerWidth, stableHeight);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [starCount, rgbAccent, stableHeight]);

  return (
    <div
      className="fixed inset-x-0 top-0 pointer-events-none overflow-hidden"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: `${stableHeight}px`,
        zIndex: 0,
        contain: 'strict',
        transform: 'translateZ(0)',
        backgroundColor: bgBaseColor,
        backgroundImage: [
          `radial-gradient(ellipse 70% 45% at 50% 8%, ${secondary}28 0%, ${accentColor}12 42%, transparent 72%)`,
          `radial-gradient(circle 34vw at 6% 42%, ${accentColor}22 0%, transparent 65%)`,
          `radial-gradient(circle 36vw at 94% 72%, ${secondary}1E 0%, transparent 65%)`,
          `radial-gradient(ellipse 75% 35% at 50% 98%, ${secondary}1C 0%, transparent 70%)`,
        ].join(', '),
      }}
    >
      {/* ── Single-Paint Static Starfield Canvas (zero per-frame invalidation behind Hero) ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-[1] pointer-events-none"
      />
    </div>
  );
});

export default ProductAtmosphere;
