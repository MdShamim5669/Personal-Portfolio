import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Procedural Moon Texture Generator (Canvas-based realistic craters & maria)
function generateMoonTexture(size = 1024) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  const baseGrad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  baseGrad.addColorStop(0, '#c8c8c8');
  baseGrad.addColorStop(0.5, '#b0b0b0');
  baseGrad.addColorStop(1, '#909090');
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, size, size);

  for (let i = 0; i < 8; i++) {
    const x = Math.random() * size, y = Math.random() * size, r = 40 + Math.random() * 120;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, `rgba(80,80,90,${0.3 + Math.random() * 0.25})`);
    grad.addColorStop(0.7, `rgba(90,90,100,${0.15 + Math.random() * 0.1})`);
    grad.addColorStop(1, 'rgba(100,100,110,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(x, y, r * (0.8 + Math.random() * 0.4), r, Math.random() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }

  for (let i = 0; i < 15; i++) {
    const x = Math.random() * size, y = Math.random() * size, r = 15 + Math.random() * 55;
    const sg = ctx.createRadialGradient(x - r * 0.15, y - r * 0.15, 0, x, y, r);
    sg.addColorStop(0, `rgba(50,50,55,${0.5 + Math.random() * 0.3})`);
    sg.addColorStop(0.6, `rgba(70,70,75,${0.3 + Math.random() * 0.2})`);
    sg.addColorStop(1, 'rgba(100,100,105,0)');
    ctx.fillStyle = sg;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = `rgba(200,200,205,${0.3 + Math.random() * 0.3})`;
    ctx.lineWidth = 1.5 + Math.random() * 2;
    ctx.beginPath(); ctx.arc(x, y, r * 0.95, -0.8, 1.2); ctx.stroke();
  }

  for (let i = 0; i < 40; i++) {
    const x = Math.random() * size, y = Math.random() * size, r = 4 + Math.random() * 18;
    const g = ctx.createRadialGradient(x - r * 0.2, y - r * 0.2, 0, x, y, r);
    g.addColorStop(0, `rgba(60,60,65,${0.4 + Math.random() * 0.3})`);
    g.addColorStop(0.8, `rgba(85,85,90,${0.2 + Math.random() * 0.15})`);
    g.addColorStop(1, 'rgba(110,110,115,0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }

  for (let i = 0; i < 200; i++) {
    const x = Math.random() * size, y = Math.random() * size, r = 1 + Math.random() * 5;
    ctx.fillStyle = `rgba(${55 + Math.random() * 40},${55 + Math.random() * 40},${60 + Math.random() * 40},${0.25 + Math.random() * 0.35})`;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }

  const imageData = ctx.getImageData(0, 0, size, size);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const n = (Math.random() - 0.5) * 18;
    data[i] += n; data[i + 1] += n; data[i + 2] += n;
  }
  ctx.putImageData(imageData, 0, 0);
  return new THREE.CanvasTexture(canvas);
}

function generateMoonBumpMap(size = 1024) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, size, size);

  for (let i = 0; i < 20; i++) {
    const x = Math.random() * size, y = Math.random() * size, r = 15 + Math.random() * 50;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, `rgba(40,40,40,${0.5 + Math.random() * 0.3})`);
    g.addColorStop(0.7, 'rgba(80,80,80,0.2)');
    g.addColorStop(1, 'rgba(128,128,128,0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }
  for (let i = 0; i < 50; i++) {
    const x = Math.random() * size, y = Math.random() * size, r = 3 + Math.random() * 12;
    ctx.fillStyle = `rgba(180,180,180,${0.2 + Math.random() * 0.3})`;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }

  const imageData = ctx.getImageData(0, 0, size, size);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const n = (Math.random() - 0.5) * 25;
    data[i] += n; data[i + 1] += n; data[i + 2] += n;
  }
  ctx.putImageData(imageData, 0, 0);
  return new THREE.CanvasTexture(canvas);
}

// Procedural Planet Texture Generator
function generatePlanetTexture(size, baseColor, bandColors, hasBands) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, size, size);

  if (hasBands && bandColors) {
    for (let i = 0; i < bandColors.length; i++) {
      const y = (size / (bandColors.length + 1)) * (i + 1) + (Math.random() - 0.5) * 20;
      const h = 8 + Math.random() * 25;
      ctx.fillStyle = bandColors[i];
      ctx.fillRect(0, y - h / 2, size, h);
    }
  }

  // Surface noise
  const imageData = ctx.getImageData(0, 0, size, size);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const n = (Math.random() - 0.5) * 20;
    data[i] += n; data[i + 1] += n; data[i + 2] += n;
  }
  ctx.putImageData(imageData, 0, 0);
  return new THREE.CanvasTexture(canvas);
}

export default function Hero3DCanvas({ mode = 'SPHERE' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    let outerMesh, innerMesh, particlesMesh, moonGlowMesh;
    let outerGeo, outerMat, innerGeo, innerMat, particlesGeo, particlesMat;
    let moonTexture, moonBumpMap;
    const extraDisposables = [];
    const planetPivots = []; // For Solar System orbital animation

    // BUILD MODE 1: ANTARCTIC SNOWFALL CONTINENT
    if (mode === 'ANTARCTICA') {
      outerGeo = new THREE.IcosahedronGeometry(4, 2);
      outerMat = new THREE.MeshBasicMaterial({ color: 0xa5f3fc, wireframe: true, transparent: true, opacity: 0.35 });
      outerMesh = new THREE.Mesh(outerGeo, outerMat);
      innerGeo = new THREE.DodecahedronGeometry(2.2, 0);
      innerMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.5 });
      innerMesh = new THREE.Mesh(innerGeo, innerMat);
    }
    // BUILD MODE 4: MILKY WAY GALAXY
    else if (mode === 'MILKYWAY') {
      outerGeo = new THREE.SphereGeometry(1.8, 16, 16);
      outerMat = new THREE.MeshBasicMaterial({ color: 0x8b5cf6, wireframe: true, transparent: true, opacity: 0.5 });
      outerMesh = new THREE.Mesh(outerGeo, outerMat);
      innerGeo = new THREE.TorusGeometry(4, 0.7, 16, 100);
      innerMat = new THREE.MeshBasicMaterial({ color: 0xec4899, wireframe: true, transparent: true, opacity: 0.3 });
      innerMesh = new THREE.Mesh(innerGeo, innerMat);
      innerMesh.rotation.x = Math.PI / 3;
    }
    // BUILD MODE 5: REALISTIC 3D LUNAR MOON
    else if (mode === 'MOON') {
      moonTexture = generateMoonTexture(1024);
      moonBumpMap = generateMoonBumpMap(1024);

      const sunLight = new THREE.DirectionalLight(0xfff8e1, 1.8);
      sunLight.position.set(10, 5, 8);
      scene.add(sunLight);
      extraDisposables.push({ remove: () => scene.remove(sunLight) });

      const ambientLight = new THREE.AmbientLight(0x334466, 0.35);
      scene.add(ambientLight);
      extraDisposables.push({ remove: () => scene.remove(ambientLight) });

      const rimLight = new THREE.DirectionalLight(0x6688cc, 0.6);
      rimLight.position.set(-8, -2, -6);
      scene.add(rimLight);
      extraDisposables.push({ remove: () => scene.remove(rimLight) });

      outerGeo = new THREE.SphereGeometry(2.5, 64, 64);
      outerMat = new THREE.MeshStandardMaterial({
        map: moonTexture, bumpMap: moonBumpMap, bumpScale: 0.2, roughness: 0.95, metalness: 0.02,
      });
      outerMesh = new THREE.Mesh(outerGeo, outerMat);

      const glowGeo = new THREE.SphereGeometry(2.9, 48, 48);
      const glowMat = new THREE.MeshBasicMaterial({ color: 0x8899bb, transparent: true, opacity: 0.08, side: THREE.BackSide });
      moonGlowMesh = new THREE.Mesh(glowGeo, glowMat);
      scene.add(moonGlowMesh);
      extraDisposables.push({ remove: () => { scene.remove(moonGlowMesh); glowGeo.dispose(); glowMat.dispose(); } });

      innerGeo = new THREE.SphereGeometry(0.5, 16, 16);
      innerMat = new THREE.MeshBasicMaterial({ color: 0xddeeff, transparent: true, opacity: 0.0 });
      innerMesh = new THREE.Mesh(innerGeo, innerMat);
    }
    // BUILD MODE 4: REALISTIC 3D SOLAR SYSTEM (All 8 Planets + Sun)
    else if (mode === 'SOLARSYSTEM') {
      // Tilt the camera for a 3D perspective view of orbits
      camera.position.set(0, 8, 22);
      camera.lookAt(0, 0, 0);

      // Sunlight (point light from center)
      const sunPointLight = new THREE.PointLight(0xffdd44, 2.5, 60);
      sunPointLight.position.set(0, 0, 0);
      scene.add(sunPointLight);
      extraDisposables.push({ remove: () => scene.remove(sunPointLight) });

      const ambLight = new THREE.AmbientLight(0x222244, 0.4);
      scene.add(ambLight);
      extraDisposables.push({ remove: () => scene.remove(ambLight) });

      // ☀️ SUN — Glowing emissive sphere at center
      const sunTexture = generatePlanetTexture(512, '#FDB813', ['#FF9500', '#FFB800', '#FF6B00'], true);
      outerGeo = new THREE.SphereGeometry(1.0, 32, 32);
      outerMat = new THREE.MeshBasicMaterial({ map: sunTexture, color: 0xffcc33 });
      outerMesh = new THREE.Mesh(outerGeo, outerMat);
      extraDisposables.push({ remove: () => sunTexture.dispose() });

      // Sun glow corona
      const sunGlowGeo = new THREE.SphereGeometry(1.4, 32, 32);
      const sunGlowMat = new THREE.MeshBasicMaterial({
        color: 0xffaa00, transparent: true, opacity: 0.12, side: THREE.BackSide,
      });
      const sunGlow = new THREE.Mesh(sunGlowGeo, sunGlowMat);
      scene.add(sunGlow);
      extraDisposables.push({ remove: () => { scene.remove(sunGlow); sunGlowGeo.dispose(); sunGlowMat.dispose(); } });

      // Inner mesh placeholder (not visible)
      innerGeo = new THREE.SphereGeometry(0.1, 8, 8);
      innerMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.0 });
      innerMesh = new THREE.Mesh(innerGeo, innerMat);

      // 🪐 PLANET DEFINITIONS: [name, radius, orbitRadius, color, speed, hasBands, bandColors, hasRing]
      const planetDefs = [
        { name: 'Mercury',  radius: 0.15, orbit: 2.0,  base: '#8C7E6E', speed: 4.8,  bands: false, bandColors: null, ring: false },
        { name: 'Venus',    radius: 0.22, orbit: 2.8,  base: '#E6C88C', speed: 3.5,  bands: false, bandColors: null, ring: false },
        { name: 'Earth',    radius: 0.25, orbit: 3.6,  base: '#1E5C8A', speed: 3.0,  bands: true,  bandColors: ['#2E8B57', '#1565a0', '#228B22'], ring: false },
        { name: 'Mars',     radius: 0.18, orbit: 4.4,  base: '#C1440E', speed: 2.4,  bands: false, bandColors: null, ring: false },
        { name: 'Jupiter',  radius: 0.48, orbit: 5.8,  base: '#C88B3A', speed: 1.3,  bands: true,  bandColors: ['#A0522D', '#DEB887', '#8B6914', '#CD853F', '#D2B48C'], ring: false },
        { name: 'Saturn',   radius: 0.40, orbit: 7.2,  base: '#EAD6B8', speed: 0.95, bands: true,  bandColors: ['#D2B48C', '#F5DEB3', '#C8A96E'], ring: true },
        { name: 'Uranus',   radius: 0.28, orbit: 8.5,  base: '#7EC8E3', speed: 0.65, bands: false, bandColors: null, ring: false },
        { name: 'Neptune',  radius: 0.26, orbit: 9.6,  base: '#3F54BA', speed: 0.5,  bands: true,  bandColors: ['#2E4A9E', '#5B7FCC'], ring: false },
      ];

      planetDefs.forEach((p) => {
        // Orbital path ring (thin, transparent)
        const orbitGeo = new THREE.TorusGeometry(p.orbit, 0.02, 8, 120);
        const orbitMat = new THREE.MeshBasicMaterial({ color: 0x445566, transparent: true, opacity: 0.2 });
        const orbitRing = new THREE.Mesh(orbitGeo, orbitMat);
        orbitRing.rotation.x = Math.PI / 2;
        scene.add(orbitRing);
        extraDisposables.push({ remove: () => { scene.remove(orbitRing); orbitGeo.dispose(); orbitMat.dispose(); } });

        // Planet texture
        const pTex = generatePlanetTexture(256, p.base, p.bandColors, p.bands);

        // Planet mesh (lit with MeshStandardMaterial)
        const pGeo = new THREE.SphereGeometry(p.radius, 24, 24);
        const pMat = new THREE.MeshStandardMaterial({ map: pTex, roughness: 0.7, metalness: 0.05 });
        const pMesh = new THREE.Mesh(pGeo, pMat);

        // Pivot group for orbital revolution
        const pivot = new THREE.Group();
        pMesh.position.x = p.orbit;
        pivot.add(pMesh);

        // Saturn's ring
        if (p.ring) {
          const ringGeo = new THREE.TorusGeometry(p.radius * 1.8, p.radius * 0.25, 2, 60);
          const ringMat = new THREE.MeshBasicMaterial({ color: 0xF5DEB3, transparent: true, opacity: 0.55, side: THREE.DoubleSide });
          const ringMesh = new THREE.Mesh(ringGeo, ringMat);
          ringMesh.position.x = p.orbit;
          ringMesh.rotation.x = 1.2;
          pivot.add(ringMesh);
          extraDisposables.push({ remove: () => { ringGeo.dispose(); ringMat.dispose(); } });
        }

        // Random initial orbital position
        pivot.rotation.y = Math.random() * Math.PI * 2;

        scene.add(pivot);
        planetPivots.push({ pivot, speed: p.speed, mesh: pMesh });
        extraDisposables.push({ remove: () => { scene.remove(pivot); pGeo.dispose(); pMat.dispose(); pTex.dispose(); } });
      });
    }
    // DEFAULT FALLBACK
    else {
      outerGeo = new THREE.BoxGeometry(8, 8, 8, 4, 4, 4);
      outerMat = new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true, transparent: true, opacity: 0.25 });
      outerMesh = new THREE.Mesh(outerGeo, outerMat);
      innerGeo = new THREE.OctahedronGeometry(4, 0);
      innerMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4, wireframe: true, transparent: true, opacity: 0.5 });
      innerMesh = new THREE.Mesh(innerGeo, innerMat);
    }

    scene.add(outerMesh);
    scene.add(innerMesh);

    // Particle Cloud Points (Snowfall across all modes)
    const particlesCount = mode === 'MILKYWAY' ? 1200 : mode === 'SOLARSYSTEM' ? 1000 : mode === 'MOON' ? 1000 : 800;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 45;
    }

    particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particleColor =
      mode === 'MILKYWAY' ? 0xf0abfc :
      mode === 'SOLARSYSTEM' ? 0xfff5ea :
      mode === 'MOON' ? 0xe2e8f0 :
      mode === 'ANTARCTICA' ? 0xffffff : 0x38bdf8;

    particlesMat = new THREE.PointsMaterial({
      size: mode === 'MILKYWAY' ? 0.15 : mode === 'SOLARSYSTEM' ? 0.14 : 0.14,
      color: particleColor,
      transparent: true,
      opacity: 0.9,
    });
    particlesMesh = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particlesMesh);

    // Mouse Interaction
    let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onMouseMove = (e) => { mouseX = e.clientX - windowHalfX; mouseY = e.clientY - windowHalfY; };
    window.addEventListener('mousemove', onMouseMove);

    const onWindowResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onWindowResize);

    // Animation Loop
    let animationFrameId;
    let elapsed = 0;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      elapsed += 0.016;

      targetX = mouseX * 0.001;
      targetY = mouseY * 0.001;

      // Universal continuous snowfall animation for all modes
      if (particlesGeo) {
        const positions = particlesGeo.attributes.position.array;
        const fallSpeed = mode === 'MILKYWAY' ? 0.12 : mode === 'SOLARSYSTEM' ? 0.10 : 0.09;
        for (let i = 0; i < particlesCount; i++) {
          positions[i * 3 + 1] -= fallSpeed;
          if (positions[i * 3 + 1] < -22) positions[i * 3 + 1] = 22;
        }
        particlesGeo.attributes.position.needsUpdate = true;
      }

      // Solar System mode: orbit planets around the Sun
      if (mode === 'SOLARSYSTEM') {
        outerMesh.rotation.y += 0.005; // Sun self-rotation
        // Orbit each planet
        planetPivots.forEach(({ pivot, speed, mesh }) => {
          pivot.rotation.y += speed * 0.002;
          mesh.rotation.y += 0.01; // Planet self-rotation
        });
      }
      // Moon mode
      else if (mode === 'MOON') {
        outerMesh.rotation.y += 0.001;
        if (moonGlowMesh) moonGlowMesh.rotation.y += 0.001;
      }
      // Default modes (Milky Way, Antarctica)
      else {
        outerMesh.rotation.y += 0.003;
        outerMesh.rotation.x += 0.0015;
        innerMesh.rotation.y -= 0.004;
        if (mode === 'MILKYWAY') {
          particlesMesh.rotation.y += 0.002;
        }
      }

      // Mouse easing
      if (mode === 'MOON') {
        outerMesh.rotation.x += 0.02 * (targetY * 3 - outerMesh.rotation.x);
        if (moonGlowMesh) moonGlowMesh.rotation.x = outerMesh.rotation.x;
      } else if (mode === 'SOLARSYSTEM') {
        // Gentle scene tilt based on mouse
        scene.rotation.x += 0.02 * (targetY * 2 - scene.rotation.x);
        scene.rotation.y += 0.02 * (targetX * 2 - scene.rotation.y);
      } else {
        outerMesh.rotation.y += 0.05 * (targetX - outerMesh.rotation.y);
        outerMesh.rotation.x += 0.05 * (targetY - outerMesh.rotation.x);
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onWindowResize);
      if (container && renderer.domElement) container.removeChild(renderer.domElement);
      outerGeo.dispose();
      outerMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      if (moonTexture) moonTexture.dispose();
      if (moonBumpMap) moonBumpMap.dispose();
      extraDisposables.forEach((d) => d.remove());
      renderer.dispose();
    };
  }, [mode]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
    />
  );
}
