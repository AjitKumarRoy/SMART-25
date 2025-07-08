// FILE: src/components/InitialLoader.tsx
"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
// Removed: import Image from 'next/image';
import { FiLoader } from 'react-icons/fi'; // Keeping FiLoader for potential future use or just as an example
import { useLoading } from '@/context/LoadingContext'; // Import useLoading hook

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
  const { isLoading } = useLoading(); // Consume isLoading from context
  const [mounted, setMounted] = useState(false); // State to track if component is mounted on client
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setMounted(true); // Component is now mounted on the client

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    // Define colors for different "atom" types
    const atomColors = [
      '#FF6347', // Tomato (Red)
      '#4682B4', // SteelBlue (Blue)
      '#3CB371', // MediumSeaGreen (Green)
      '#FFD700', // Gold (Yellow)
      '#8A2BE2', // BlueViolet (Purple)
    ];

    // Particle class defined inside useEffect to capture canvas/ctx scope
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      originalColor: string; // To keep track of the base color
      oscillationOffset: number; // For subtle pulsing effect

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1; // Smaller base size for atoms
        this.speedX = Math.random() * 1 - 0.5; // Slower movement
        this.speedY = Math.random() * 1 - 0.5; // Slower movement
        this.originalColor = atomColors[Math.floor(Math.random() * atomColors.length)];
        this.color = this.originalColor;
        this.oscillationOffset = Math.random() * Math.PI * 2; // Random phase for pulsing
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges
        if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
        if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;

        // Subtle pulsing effect
        const pulseFactor = 0.5 + 0.5 * Math.sin(Date.now() * 0.002 + this.oscillationOffset);
        this.size = (Math.random() * 2 + 1) * pulseFactor; // Vary size slightly
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // Optional: Add a subtle glow/shadow for a more ethereal look
        ctx.shadowBlur = 5;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow for other drawings
      }
    }

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles();
    };

    const createParticles = () => {
      particles = [];
      const numberOfParticles = 80; // Fewer particles for a clearer molecular look
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };

    const connect = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Connect particles within a certain distance to simulate bonds
          if (distance < 120) { // Increased connection distance for more "molecules"
            ctx.strokeStyle = `rgba(173, 216, 230, ${1 - distance / 120})`; // Light blue for bonds
            ctx.lineWidth = 0.8; // Thicker bonds
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
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Slight fade effect for trails
      ctx.fillRect(0, 0, canvas.width, canvas.height);


      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      connect();

      animationFrameId = requestAnimationFrame(animate);
    };

    // Initialize
    setCanvasSize();
    animate();

    // Handle resize events
    const handleResize = () => {
      setCanvasSize();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // Empty dependency array means this runs only once on mount and cleans up on unmount

  // Render nothing on the server (before mounted) to prevent hydration issues
  if (!mounted) {
    return null;
  }

  return (
    <AnimatePresence>
      {isLoading && ( // Only render the loader if isLoading is true from context
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
            {/* Removed the Image component as requested */}
            <h2 className="mt-8 text-3xl md:text-4xl font-bold text-white text-shadow-lg">
              AMDCG Research Group
            </h2>
            <p className="mt-2 text-blue-200 text-lg opacity-80">IIT Bhilai</p>

            {/* Bouncing dots indicator */}
            <div className="mt-8 flex space-x-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full bg-white opacity-40 animate-bounce-custom" // Using custom animation class
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