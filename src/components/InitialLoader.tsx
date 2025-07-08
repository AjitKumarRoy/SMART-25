// FILE: src/components/Loader.tsx
"use client"; // This is a client component as it uses browser APIs (canvas, window)

import React, { useRef, useEffect } from 'react';

// Define the Particle class with explicit TypeScript types
class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  ctx: CanvasRenderingContext2D; // Add context to particle for drawing

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.ctx = ctx; // Store the context
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 3 - 1.5; // Random speed between -1.5 and 1.5
    this.speedY = Math.random() * 3 - 1.5; // Random speed between -1.5 and 1.5
    this.color = `hsl(${Math.random() * 360}, 70%, 60%)`; // Random HSL color
  }

  // Update particle position
  update(canvas: HTMLCanvasElement) {
    this.x += this.speedX;
    this.y += this.speedY;

    // Bounce off walls
    if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
    if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
  }

  // Draw particle
  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fill();
  }
}

const Loader: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Ensure canvas element exists

    const ctx = canvas.getContext('2d');
    if (!ctx) return; // Ensure 2D context is available

    let animationFrameId: number;
    let particles: Particle[] = [];

    // Function to set canvas size and re-create particles
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles(); // Re-create particles for new dimensions
    };

    // Create particles
    const createParticles = () => {
      particles = []; // Clear existing particles
      const numberOfParticles = 150; // You can adjust this number
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle(canvas, ctx));
      }
    };

    // Connect particles with lines
    const connect = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) { // Only connect if particles are close enough
            ctx.strokeStyle = `rgba(79, 70, 229, ${1 - distance / 100})`; // Fade lines based on distance (blue-600 like color)
            ctx.lineWidth = 0.4;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas for next frame

      for (let i = 0; i < particles.length; i++) {
        particles[i].update(canvas); // Update particle position
        particles[i].draw(); // Draw particle
      }

      connect(); // Draw connections between particles

      animationFrameId = requestAnimationFrame(animate); // Request next frame
    };

    // Initialize on component mount
    setCanvasSize(); // Set initial size and create particles
    animate(); // Start the animation loop

    // Handle resize events
    const handleResize = () => {
      setCanvasSize(); // Recalculate size and re-create particles on resize
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function for useEffect
    return () => {
      window.removeEventListener('resize', handleResize); // Remove resize listener
      cancelAnimationFrame(animationFrameId); // Cancel animation frame to prevent memory leaks
    };
  }, []); // Empty dependency array ensures this runs only once on mount and cleans up on unmount

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-indigo-900 z-[9999]"> {/* High z-index to cover everything */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Animated circle loader */}
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center animate-pulse-custom">
            <div className="w-24 h-24 rounded-full bg-gray-900 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 animate-ping-custom" />
            </div>
          </div>
        </div>

        {/* Text content */}
        <h1 className="mt-8 text-3xl md:text-4xl font-bold text-white text-shadow-lg">
          AMDCG Research Group
        </h1>
        <p className="mt-2 text-blue-200 text-lg opacity-80">IIT Bhilai</p>

        {/* Bouncing dots indicator */}
        <div className="mt-8 flex space-x-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-white opacity-40 animate-bounce-custom"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loader;
