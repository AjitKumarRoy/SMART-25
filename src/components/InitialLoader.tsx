// FILE: src/app/components/InitialLoader.tsx

"use client";

import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Image from 'next/image';
import { useLoading } from '@/context/LoadingContext';

const amdcgLogo = "/images/amdcg-logo.png";

const atomColors = [
  '#FF6347', // Tomato (Red)
  '#4682B4', // SteelBlue (Blue)
  '#3CB371', // MediumSeaGreen (Green)
  '#FFD700', // Gold (Yellow)
  '#8A2BE2', // BlueViolet (Purple)
];

// Molecule class (keep this exactly as you have it)
class Molecule {
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  initialCentralAtomSize: number; // Added for consistent pulsing
  centralAtomSize: number;
  centralAtomColor: string;
  satelliteAtoms: { x: number; y: number; size: number; color: string; orbitRadius: number; angle: number; speed: number }[];
  ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    // --- INCREASED SPEED HERE ---
    this.speedX = Math.random() * 1 - 0.5; // Increased from 0.5 to 1 (range -0.5 to 0.5)
    this.speedY = Math.random() * 1 - 0.5; // Increased from 0.5 to 1 (range -0.5 to 0.5)
    this.initialCentralAtomSize = Math.random() * 4 + 3; // Store original size
    this.centralAtomSize = this.initialCentralAtomSize; // Initialize with original size
    this.centralAtomColor = atomColors[Math.floor(Math.random() * atomColors.length)];
    this.satelliteAtoms = Array.from({ length: Math.floor(Math.random() * 3) + 2 }, () => ({
      x: 0,
      y: 0,
      size: Math.random() * 2 + 1,
      color: atomColors[Math.floor(Math.random() * atomColors.length)],
      orbitRadius: Math.random() * 20 + 10,
      angle: Math.random() * Math.PI * 2,
      // --- INCREASED SATELLITE ORBIT SPEED HERE ---
      speed: Math.random() * 0.04 + 0.02, // Increased from 0.02+0.01 to 0.04+0.02
    }));
  }

  update(canvas: HTMLCanvasElement) {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
    if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;

    this.satelliteAtoms.forEach(atom => {
      atom.angle += atom.speed;
      atom.x = this.x + Math.cos(atom.angle) * atom.orbitRadius;
      atom.y = this.y + Math.sin(atom.angle) * atom.orbitRadius;
    });

    // Pulse central atom size based on initial size
    const pulseFactor = 0.8 + 0.2 * Math.sin(Date.now() * 0.002);
    this.centralAtomSize = this.initialCentralAtomSize * pulseFactor;
  }

  draw() {
    this.ctx.fillStyle = this.centralAtomColor;
    this.ctx.shadowBlur = 10;
    this.ctx.shadowColor = this.centralAtomColor;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.centralAtomSize, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.shadowBlur = 0;

    this.satelliteAtoms.forEach(atom => {
      this.ctx.strokeStyle = `rgba(255, 255, 255, 0.3)`;
      this.ctx.lineWidth = 0.5;
      this.ctx.setLineDash([2, 3]);
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, atom.orbitRadius, 0, Math.PI * 2);
      this.ctx.stroke();
      this.ctx.setLineDash([]);
    });

    this.satelliteAtoms.forEach(atom => {
      this.ctx.strokeStyle = `rgba(255, 255, 255, 0.5)`;
      this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      this.ctx.moveTo(this.x, this.y);
      this.ctx.lineTo(atom.x, atom.y);
      this.ctx.stroke();

      this.ctx.fillStyle = atom.color;
      this.ctx.shadowBlur = 5;
      this.ctx.shadowColor = atom.color;
      this.ctx.beginPath();
      this.ctx.arc(atom.x, atom.y, atom.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
    });
  }
}

// Animation variants (keep these as is)
const loaderVariants: Variants = {
  hidden: { opacity: 0, transition: { duration: 0.5, ease: "easeOut" } },
  visible: { opacity: 1, transition: { duration: 0.5, ease: "easeIn" } },
  exit: { opacity: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const contentVariants: Variants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  exit: { scale: 1.2, opacity: 0, transition: { duration: 0.7, ease: "easeIn" } },
};

const dotVariants: Variants = {
  animate: {
    scale: [1, 1.5, 1],
    opacity: [0.5, 1, 0.5],
    transition: {
      repeat: Infinity,
      duration: 1.2,
      ease: "easeInOut",
      delay: 0.1, // Fixed delay, as per previous fix
    },
  },
};

export default function InitialLoader() {
  const { isLoading } = useLoading();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // console.log("[InitialLoader] Rendered. Current isLoading:", isLoading);
  // useEffect(() => {
  //   console.log("[InitialLoader] useEffect: isLoading changed to", isLoading);
  // }, [isLoading]);


  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
        // console.log("Canvas ref is not available yet.");
        return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error("Failed to get 2D rendering context for canvas.");
        return;
    }

    let animationFrameId: number;
    let molecules: Molecule[] = [];

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // console.log('Canvas resized to:', canvas.width, canvas.height);
      createMolecules();
    };

    const createMolecules = () => {
      molecules = []; // Clear existing molecules on resize
      // --- INCREASED NUMBER OF MOLECULES HERE ---
      const numberOfMolecules = Math.floor(window.innerWidth / 100) + 10; // Increased density and base count
      // console.log('Animating', numberOfMolecules, 'molecules');
      for (let i = 0; i < numberOfMolecules; i++) {
        molecules.push(new Molecule(canvas, ctx));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // For the trailing effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      molecules.forEach(molecule => {
        molecule.update(canvas);
        molecule.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Initial setup
    setCanvasSize();
    animate();

    // Event listener for window resize
    const handleResize = () => {
      setCanvasSize();
    };
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-indigo-900 dark:from-gray-900 dark:to-black text-white z-[9999]"
          variants={loaderVariants}
          initial="visible"
          animate="visible"
          exit="exit"
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0"
          />
          <motion.div
            className="relative z-10 flex flex-col items-center gap-4"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Image
              src={amdcgLogo}
              alt="AMDCG Logo"
              width={200}
              height={200}
              className="rounded-full shadow-2xl border-2 border-white/20 sm:w-[150px] sm:h-[150px] md:w-[200px] md:h-[200px]"
            />
            <div className="flex flex-col items-center gap-2">
              <span className="text-white text-lg md:text-xl font-jakarta font-medium">IIT Bhilai</span>
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="w-2 h-2 bg-white rounded-full"
                    variants={dotVariants}
                    animate="animate"
                    custom={i}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}