import React, { useEffect, useRef } from 'react';

const SplashCursor = ({
  COLOR = '#06b6d4',
  RAINBOW_MODE = true,
  SPLAT_FORCE = 10,
  BIRD_SIZE = 1.2,
  MAX_BIRDS = 60
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
    const colors = [
      '#06b6d4', // cyan
      '#38bdf8', // sky blue
      '#818cf8', // indigo
      '#a855f7', // purple
      '#ec4899', // pink
      '#34d399'  // emerald
    ];

    let lastMousePos = { x: width / 2, y: height / 2 };
    let mouseVelocity = { x: 0, y: 0 };
    let colorIndex = 0;

    const getRandomColor = () => {
      if (!RAINBOW_MODE) return COLOR;
      colorIndex = (colorIndex + 1) % colors.length;
      return colors[colorIndex];
    };

    const spawnBird = (x, y, vx, vy, count = 1) => {
      for (let i = 0; i < count; i++) {
        if (birds.length >= MAX_BIRDS) {
          birds.shift(); // Keep performance crisp by recycling oldest birds
        }

        const angle = Math.atan2(vy, vx) + (Math.random() - 0.5) * 0.6;
        const speed = Math.hypot(vx, vy) * 0.3 + Math.random() * 2 + 1.5;

        birds.push({
          x: x + (Math.random() - 0.5) * 15,
          y: y + (Math.random() - 0.5) * 15,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          heading: angle,
          wingPhase: Math.random() * Math.PI * 2,
          wingSpeed: 0.15 + Math.random() * 0.1,
          size: (0.8 + Math.random() * 0.7) * BIRD_SIZE,
          color: getRandomColor(),
          opacity: 1,
          decay: 0.015 + Math.random() * 0.01,
          life: 0
        });
      }
    };

    const handleMouseMove = (e) => {
      const dx = e.clientX - lastMousePos.x;
      const dy = e.clientY - lastMousePos.y;
      const dist = Math.hypot(dx, dy);

      mouseVelocity = { x: dx, y: dy };

      // Spawn birds along movement vector if mouse moved noticeably
      if (dist > 3) {
        const count = Math.min(Math.floor(dist / 8) + 1, 4);
        spawnBird(e.clientX, e.clientY, dx, dy, count);
      }

      lastMousePos = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = (e) => {
      // Splat effect: burst 12 birds flying in 360-degree flock!
      const burstCount = 12;
      for (let i = 0; i < burstCount; i++) {
        const angle = (i / burstCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
        const speed = 4 + Math.random() * 4;
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

    // Draw single stylized bird on Canvas
    const drawBird = (b) => {
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(b.heading);
      ctx.scale(b.size, b.size);
      ctx.globalAlpha = Math.max(0, b.opacity);

      // Smooth wing flapping angle
      const flap = Math.sin(b.wingPhase) * 7;

      ctx.shadowColor = b.color;
      ctx.shadowBlur = 10;
      ctx.fillStyle = b.color;
      ctx.strokeStyle = b.color;
      ctx.lineWidth = 1.2;

      // Draw graceful V-bird silhouette
      ctx.beginPath();
      ctx.moveTo(7, 0); // Beak tip
      ctx.quadraticCurveTo(0, -2, -3, -12 + flap); // Right wing tip
      ctx.quadraticCurveTo(-4, -1, -7, 0); // Right wing inner
      ctx.quadraticCurveTo(-4, 1, -3, 12 - flap); // Left wing tip
      ctx.quadraticCurveTo(0, 2, 7, 0); // Back to beak
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = birds.length - 1; i >= 0; i--) {
        const b = birds[i];

        // Update physics
        b.x += b.vx;
        b.y += b.vy;
        b.wingPhase += b.wingSpeed;
        b.opacity -= b.decay;
        b.life += 1;

        // Aerodynamic air resistance & slight curve
        b.vx *= 0.97;
        b.vy *= 0.97;
        b.heading = Math.atan2(b.vy, b.vx);

        if (b.opacity <= 0 || b.x < -50 || b.x > width + 50 || b.y < -50 || b.y > height + 50) {
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
