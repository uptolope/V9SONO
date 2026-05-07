"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  pulseSpeed: number;
  pulseOffset: number;
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    let mouseX = 0;
    let mouseY = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.005,
      pulseOffset: Math.random() * Math.PI * 2,
    });

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 80);
      for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle());
      }
    };

    const drawParticle = (p: Particle, time: number) => {
      const pulse = Math.sin(time * p.pulseSpeed + p.pulseOffset);
      const currentOpacity = p.opacity * (0.7 + pulse * 0.3);

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * (1 + pulse * 0.2), 0, Math.PI * 2);

      // Create gradient for each particle
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2);
      gradient.addColorStop(0, `rgba(20, 184, 166, ${currentOpacity})`);
      gradient.addColorStop(0.5, `rgba(13, 148, 136, ${currentOpacity * 0.5})`);
      gradient.addColorStop(1, "rgba(20, 184, 166, 0)");

      ctx.fillStyle = gradient;
      ctx.fill();
    };

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const opacity = (1 - distance / 150) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(20, 184, 166, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const updateParticle = (p: Particle, time: number) => {
      // Mouse interaction
      const dx = mouseX - p.x;
      const dy = mouseY - p.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 150) {
        const force = (150 - distance) / 150 * 0.02;
        p.vx -= (dx / distance) * force;
        p.vy -= (dy / distance) * force;
      }

      // Apply velocity with damping
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.99;
      p.vy *= 0.99;

      // Add subtle floating motion
      p.y += Math.sin(time * 0.001 + p.pulseOffset) * 0.1;
      p.x += Math.cos(time * 0.0008 + p.pulseOffset) * 0.05;

      // Wrap around edges
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
    };

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particles.forEach((p) => {
        updateParticle(p, time);
        drawParticle(p, time);
      });

      // Draw connections between nearby particles
      drawConnections();

      animationId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Initialize
    resizeCanvas();
    initParticles();
    animate(0);

    // Event listeners
    window.addEventListener("resize", () => {
      resizeCanvas();
      initParticles();
    });
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
      aria-hidden="true"
    />
  );
}