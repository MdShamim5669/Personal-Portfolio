import React, { useEffect, useRef } from 'react';

const SplashCursor = ({
  COLOR = '#38bdf8',
  RAINBOW_MODE = false,
  SPLAT_FORCE = 10,
  BIRD_SIZE = 0.35,
  MAX_BIRDS = 90
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const birds = [];

    // Subtle, elegant bird color palette (soft cyan, sky blue, muted indigo, slate white)
    const softPalette = [
      '#38bdf8', // sky blue
      '#06b6d4', // cyan
      '#818cf8', // soft indigo
      '#94a3b8', // slate blue
      '#cbd5e1', // soft silver
      '#e2e8f0'  // soft white
    ];

    let lastMousePos = { x: width / 2, y: height / 2 };
    let colorIndex = 0;

    const getBirdColor = () => {
      if (!RAINBOW_MODE) {
        // Randomly pick from soft subtle palette for natural bird diversity
        return softPalette[Math.floor(Math.random() * softPalette.length)];
      }
      colorIndex = (colorIndex + 1) % softPalette.length;
      return softPalette[colorIndex];
    };

    const spawnBird = (x, y, vx, vy, count = 1) => {
      for (let i = 0; i < count; i++) {
        if (birds.length >= MAX_BIRDS) {
          birds.shift(); // Keep performance crisp by recycling oldest birds
        }

        // Spread out widely behind the cursor motion vector
        const spreadAngle = Math.atan2(vy, vx) + (Math.random() - 0.5) * 1.4;
        const speed = Math.hypot(vx, vy) * 0.25 + Math.random() * 1.8 + 1.2;

        // Wide positional spread so birds fly across a larger background area behind cursor
        const offsetDist = Math.random() * 50;
        const offsetDir = Math.random() * Math.PI * 2;

        birds.push({
          x: x + Math.cos(offsetDir) * offsetDist,
          y: y + Math.sin(offsetDir) * offsetDist,
          vx: Math.cos(spreadAngle) * speed,
          vy: Math.sin(spreadAngle) * speed,
          heading: spreadAngle,
          wingPhase: Math.random() * Math.PI * 2,
          wingSpeed: 0.18 + Math.random() * 0.12,
          size: (0.3 + Math.random() * 0.3) * BIRD_SIZE,
          color: getBirdColor(),
          opacity: 0.85,
          decay: 0.012 + Math.random() * 0.008,
          life: 0
        });
      }
    };

    const handleMouseMove = (e) => {
      const dx = e.clientX - lastMousePos.x;
      const dy = e.clientY - lastMousePos.y;
      const dist = Math.hypot(dx, dy);

      // Spawn delicate birds widely along mouse path
      if (dist > 3) {
        const count = Math.min(Math.floor(dist / 6) + 1, 4);
        spawnBird(e.clientX, e.clientY, dx, dy, count);
      }

      lastMousePos = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = (e) => {
      // Splat effect: release a gentle wide flock of 14 small birds flying outward
      const burstCount = 14;
      for (let i = 0; i < burstCount; i++) {
        const angle = (i / burstCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
        const speed = 3 + Math.random() * 3.5;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        spawnBird(e.clientX, e.clientY, vx, vy, 1);
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const dx = touch.clientX - lastMousePos.x;
        const dy = touch.clientY - lastMousePos.y;
        if (Math.hypot(dx, dy) > 4) {
          spawnBird(touch.clientX, touch.clientY, dx, dy, 2);
        }
        lastMousePos = { x: touch.clientX, y: touch.clientY };
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Draw delicate, small stylized flying bird on Canvas
    const drawBird = (b) => {
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(b.heading);
      ctx.scale(b.size, b.size);
      ctx.globalAlpha = Math.max(0, b.opacity * 0.8);

      // Flapping wings
      const flap = Math.sin(b.wingPhase) * 6;

      ctx.shadowColor = b.color;
      ctx.shadowBlur = 3;
      ctx.fillStyle = b.color;
      ctx.strokeStyle = b.color;
      ctx.lineWidth = 1.0;

      // Draw elegant small bird silhouette
      ctx.beginPath();
      ctx.moveTo(6, 0); // Beak tip
      ctx.quadraticCurveTo(0, -2, -3, -10 + flap); // Right wing tip
      ctx.quadraticCurveTo(-4, -1, -6, 0); // Tail base
      ctx.quadraticCurveTo(-4, 1, -3, 10 - flap); // Left wing tip
      ctx.quadraticCurveTo(0, 2, 6, 0); // Back to beak
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = birds.length - 1; i >= 0; i--) {
        const b = birds[i];

        // Physics update with gentle aerodynamic drift
        b.x += b.vx;
        b.y += b.vy;
        b.wingPhase += b.wingSpeed;
        b.opacity -= b.decay;
        b.life += 1;

        b.vx *= 0.975;
        b.vy *= 0.975;
        b.heading = Math.atan2(b.vy, b.vx);

        if (b.opacity <= 0 || b.x < -60 || b.x > width + 60 || b.y < -60 || b.y > height + 60) {
          birds.splice(i, 1);
        } else {
          drawBird(b);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('touchmove', handleTouchMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [COLOR, RAINBOW_MODE, SPLAT_FORCE, BIRD_SIZE, MAX_BIRDS]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 99999,
      }}
    />
  );
};

export default SplashCursor;
