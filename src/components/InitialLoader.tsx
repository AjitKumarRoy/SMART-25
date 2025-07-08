// FILE: src/components/InitialLoader.tsx
"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
//import { FiLoader } from 'react-icons/fi'; // Keeping FiLoader for potential future use or just as an example
import { useLoading } from '@/context/LoadingContext'; // Import useLoading hook

// --- TypeScript Fix Start ---
// Define colors for different "atom" types globally or outside the effect
const atomColors = [
  '#FF6347', // Tomato (Red)
  '#4682B4', // SteelBlue (Blue)
  '#3CB371', // MediumSeaGreen (Green)
  '#FFD700', // Gold (Yellow)
  '#8A2BE2', // BlueViolet (Purple)
];

// Define the Particle class outside of useEffect
// It needs access to ctx, so we'll pass it in the constructor or manage it via closure if feasible.
// For simplicity and direct context, it's better to pass it.
class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  originalColor: string;
  oscillationOffset: number;
  ctx: CanvasRenderingContext2D; // Add ctx to the Particle class

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.ctx = ctx; // Store the context
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
    this.originalColor = atomColors[Math.floor(Math.random() * atomColors.length)];
    this.color = this.originalColor;
    this.oscillationOffset = Math.random() * Math.PI * 2;
  }

  update(canvas: HTMLCanvasElement) { // Pass canvas to update for boundary checks
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
    if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;

    const pulseFactor = 0.5 + 0.5 * Math.sin(Date.now() * 0.002 + this.oscillationOffset);
    this.size = (Math.random() * 2 + 1) * pulseFactor;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.shadowBlur = 5;
    this.ctx.shadowColor = this.color;
    this.ctx.fill();
    this.ctx.shadowBlur = 0;
  }
}
// --- TypeScript Fix End ---

// Animation variants for the loader container
const loaderVariants: Variants = {
  hidden: { opacity: 0, transition: { duration: 0.5, ease: "easeOut" } },
  visible: { opacity: 1, transition: { duration: 0.5, ease: "easeIn" } },
  exit: { opacity: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

// Animation variants for the inner content (e.g., logo/text)
const contentVariants: Variants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  exit: { scale: 1.2, opacity: 0, transition: { duration: 0.7, ease: "easeIn" } }
};

export default function InitialLoader() {
  const { isLoading } = useLoading();
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setMounted(true);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = []; // Now Particle type is recognized

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles();
    };

    const createParticles = () => {
      particles = [];
      const numberOfParticles = 80;
      for (let i = 0; i < numberOfParticles; i++) {
        // Pass canvas and ctx to the Particle constructor
        particles.push(new Particle(canvas, ctx));
      }
    };

    const connect = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.strokeStyle = `rgba(173, 216, 230, ${1 - distance / 120})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update(canvas); // Pass canvas to update
        particles[i].draw();
      }

      connect();

      animationFrameId = requestAnimationFrame(animate);
    };

    setCanvasSize();
    animate();

    const handleResize = () => {
      setCanvasSize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-indigo-900 dark:from-gray-900 dark:to-black text-white z-[9999]"
          variants={loaderVariants}
          initial="visible"
          animate="visible"
          exit="exit"
        >
          <canvas ref={canvasRef} className="absolute inset-0" />

          <motion.div
            className="relative z-10 flex flex-col items-center p-8 rounded-xl bg-white/10 backdrop-blur-sm shadow-2xl border border-white/20"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <h2 className="mt-8 text-3xl md:text-4xl font-bold text-white text-shadow-lg">
              AMDCG Research Group
            </h2>
            <p className="mt-2 text-blue-200 text-lg opacity-80">IIT Bhilai</p>

            <div className="mt-8 flex space-x-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full bg-white opacity-40 animate-bounce-custom"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}