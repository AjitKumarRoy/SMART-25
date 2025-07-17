"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Image from 'next/image';
import { useLoading } from '@/context/LoadingContext';

const amdcgLogo = "/images/amdcg-logo.png";

// Define colors for atoms
const atomColors = [
  '#FF6347', // Tomato (Red)
  '#4682B4', // SteelBlue (Blue)
  '#3CB371', // MediumSeaGreen (Green)
  '#FFD700', // Gold (Yellow)
  '#8A2BE2', // BlueViolet (Purple)
];

// Molecule class to simulate atoms with orbital paths
class Molecule {
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  centralAtomSize: number;
  centralAtomColor: string;
  satelliteAtoms: { x: number; y: number; size: number; color: string; orbitRadius: number; angle: number; speed: number }[];
  ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.speedX = Math.random() * 0.5 - 0.25; // Slower movement
    this.speedY = Math.random() * 0.5 - 0.25;
    this.centralAtomSize = Math.random() * 4 + 3; // Central atom size
    this.centralAtomColor = atomColors[Math.floor(Math.random() * atomColors.length)];
    // Create 2–4 satellite atoms
    this.satelliteAtoms = Array.from({ length: Math.floor(Math.random() * 3) + 2 }, () => ({
      x: 0,
      y: 0,
      size: Math.random() * 2 + 1,
      color: atomColors[Math.floor(Math.random() * atomColors.length)],
      orbitRadius: Math.random() * 20 + 10,
      angle: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.02 + 0.01,
    }));
  }

  update(canvas: HTMLCanvasElement) {
    this.x += this.speedX;
    this.y += this.speedY;

    // Bounce off canvas edges
    if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
    if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;

    // Update satellite atom positions
    this.satelliteAtoms.forEach(atom => {
      atom.angle += atom.speed;
      atom.x = this.x + Math.cos(atom.angle) * atom.orbitRadius;
      atom.y = this.y + Math.sin(atom.angle) * atom.orbitRadius;
    });

    // Pulse central atom size
    const pulseFactor = 0.8 + 0.2 * Math.sin(Date.now() * 0.002);
    this.centralAtomSize = (Math.random() * 4 + 3) * pulseFactor;
  }

  draw() {
    // Draw central atom
    this.ctx.fillStyle = this.centralAtomColor;
    this.ctx.shadowBlur = 10;
    this.ctx.shadowColor = this.centralAtomColor;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.centralAtomSize, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.shadowBlur = 0;

    // Draw orbital paths (dashed circles)
    this.satelliteAtoms.forEach(atom => {
      this.ctx.strokeStyle = `rgba(255, 255, 255, 0.3)`;
      this.ctx.lineWidth = 0.5;
      this.ctx.setLineDash([2, 3]); // Dashed line
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, atom.orbitRadius, 0, Math.PI * 2);
      this.ctx.stroke();
      this.ctx.setLineDash([]); // Reset to solid line
    });

    // Draw satellite atoms and bonds
    this.satelliteAtoms.forEach(atom => {
      // Draw bond (line to central atom)
      this.ctx.strokeStyle = `rgba(255, 255, 255, 0.5)`;
      this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      this.ctx.moveTo(this.x, this.y);
      this.ctx.lineTo(atom.x, atom.y);
      this.ctx.stroke();

      // Draw satellite atom
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

// Animation variants
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
    let molecules: Molecule[] = [];

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createMolecules();
    };

    const createMolecules = () => {
      molecules = [];
      const numberOfMolecules = Math.floor(window.innerWidth / 200) + 5; // Adjust based on screen size
      for (let i = 0; i < numberOfMolecules; i++) {
        molecules.push(new Molecule(canvas, ctx));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      molecules.forEach(molecule => {
        molecule.update(canvas);
        molecule.draw();
      });

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
          className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-indigo-900 dark:from-gray-900 dark:to-black text-white z-[9999]"
          variants={loaderVariants}
          initial="visible"
          animate="visible"
          exit="exit"
        >
          <canvas ref={canvasRef} className="absolute inset-0" />
          <motion.div
            className="relative z-10"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Image
              src={amdcgLogo} // Replace with your actual logo path
              alt="AMDCG Logo"
              width={200}
              height={200}
              className="rounded-full shadow-2xl border-2 border-white/20 sm:w-[150px] sm:h-[150px] md:w-[200px] md:h-[200px]"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}