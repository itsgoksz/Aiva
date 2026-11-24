/**
 * PhilosophySection — Cinematic Scroll Storytelling
 * 
 * Large typography that fades in/out as the user scrolls.
 * Uses GSAP ScrollTrigger for pinning and scrubbed animations.
 * 
 * Flow: Problem → People → Technology → Impact
 */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Ignore mobile vertical address bar resize events so ScrollTrigger doesn't jitter or recalculate pin offsets during scroll
ScrollTrigger.config({
  ignoreMobileResize: true,
});

const slides = [
  {
    text: 'Every technology begins as an idea.',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  {
    text: 'But ideas alone change nothing.',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  {
    text: 'They must solve something real.',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  {
    text: 'A frustration.',
    sub: 'A delay. A missed opportunity.',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  {
    text: 'Intelligence is simply the bridge.',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  {
    text: 'The result?',
    color: 'rgba(255, 255, 255, 0.35)',
  },
  {
    text: 'A better reality.',
    color: '#6D5EF7',
  },
];

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Pin the section while scrolling through all slides
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${window.innerWidth < 768 ? slides.length * 90 : slides.length * 120}%`, // Responsive scroll distance
          scrub: 0.6, // Smooth inertial lerp (eliminates stepped mousewheel lag on Windows and Android)
          pin: true,
          anticipatePin: 1,
          fastScrollEnd: true,
        },
      });

      slidesRef.current.forEach((slide, i) => {
        if (!slide) return;
        const isFirst = i === 0;
        const isLast = i === slides.length - 1;

        // Give each slide a dedicated "time window" in the scrub timeline
        const startTime = i * 3;

        if (isFirst) {
          // First slide: already visible. Stays for a bit, then flies forward into camera
          // Using autoAlpha toggles visibility:hidden when 0 to completely purge from rendering tree
          tl.to(slide, {
            autoAlpha: 0,
            scale: 1.4,
            duration: 1.2,
            ease: 'power2.in'
          }, startTime + 1.2);
        } else {
          // Emerges gracefully with autoAlpha
          tl.fromTo(
            slide,
            {
              autoAlpha: 0,
              scale: 0.7,
              y: 20
            },
            {
              autoAlpha: 1,
              scale: 1.0,
              y: 0,
              duration: 1.2,
              ease: 'power2.out'
            },
            startTime
          );

          if (!isLast) {
            // Flies past camera cleanly before next slide begins (ends at startTime + 2.9; slide i+1 starts at startTime + 3.0)
            tl.to(slide, {
              autoAlpha: 0,
              scale: 1.4,
              duration: 0.9,
              ease: 'power2.in'
            }, startTime + 2.0);
          } else {
            // The final statement lands and slowly breathes
            tl.to(slide, {
              scale: 1.04,
              duration: 2.0,
              ease: 'none'
            }, startTime + 1.5);
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      style={{
        position: 'relative',
        zIndex: 10,
        height: '100lvh', // Large Viewport Height: completely stable across mobile Safari address bar expand/collapse
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        overflow: 'hidden',
        perspective: '1000px', // Adds depth for the scaling
      }}
    >
      {/* Subtle background gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(109, 94, 247, 0.04), transparent)',
          pointerEvents: 'none',
        }}
      />

      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          ref={(el) => { slidesRef.current[i] = el; }}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            opacity: i === 0 ? 1 : 0,
            visibility: i === 0 ? 'visible' : 'hidden',
            transformOrigin: 'center center',
            willChange: 'transform, opacity',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
            pointerEvents: 'none',
          }}
        >
          <h2
            style={{
              fontFamily: "'Space Grotesk', 'Inter', sans-serif",
              fontSize: 'clamp(3rem, 8vw, 7rem)', // Massive typography
              fontWeight: 600,
              color: slide.color,
              textAlign: 'center',
              lineHeight: 1.1,
              letterSpacing: '-0.04em',
              whiteSpace: 'pre-line',
              maxWidth: '1200px',
              textShadow: '0 2px 20px rgba(0, 0, 0, 0.7)', // Clean, hardware-accelerated contrast shadow
            }}
          >
            {slide.text}
          </h2>
          {slide.sub && (
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
                fontWeight: 300,
                color: 'rgba(255, 255, 255, 0.45)',
                textAlign: 'center',
                marginTop: '2rem',
                maxWidth: '800px',
                letterSpacing: '0.02em',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
              }}
            >
              {slide.sub}
            </p>
          )}
        </div>
      ))}
    </section>
  );
}
