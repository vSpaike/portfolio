import React, { useEffect, useRef } from 'react';
import { Renderer, Camera, Geometry, Program, Mesh } from 'ogl';
import Star from './Star';

interface StarConfig {
  position: [number, number, number];
  size?: number;
  title?: string;
  onClick?: () => void;
  background?: string;
}

interface ParticlesProps {
  particleCount?: number;
  particleSpread?: number;
  speed?: number;
  particleColors?: string[];
  moveParticlesOnHover?: boolean;
  particleHoverFactor?: number;
  alphaParticles?: boolean;
  particleBaseSize?: number;
  sizeRandomness?: number;
  cameraDistance?: number;
  disableRotation?: boolean;
  pixelRatio?: number;
  stars?: StarConfig[];
  className?: string;
  interactionEnabled?: boolean;
}

const defaultColors: string[] = ['#ffffff', '#ffffff', '#ffffff'];
const NORMAL_HOVER_DAMPING = 0.09;
const MENU_EXIT_HOVER_DAMPING = 0.015;
const MENU_EXIT_SMOOTHING_MS = 1200;

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

const hexToRgb = (hex: string): [number, number, number] => {
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map(c => c + c)
      .join('');
  }
  const int = parseInt(hex, 16);
  const r = ((int >> 16) & 255) / 255;
  const g = ((int >> 8) & 255) / 255;
  const b = (int & 255) / 255;
  return [r, g, b];
};

const vertex = /* glsl */ `
  attribute vec3 position;
  attribute vec4 random;
  attribute vec3 color;
  
  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uSpread;
  uniform float uBaseSize;
  uniform float uSizeRandomness;
  
  varying vec4 vRandom;
  varying vec3 vColor;
  
  void main() {
    vRandom = random;
    vColor = color;
    
    vec3 pos = position * uSpread;
    pos.z *= 10.0;
    
    vec4 mPos = modelMatrix * vec4(pos, 1.0);
    float t = uTime;
    mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);
    mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);
    mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);
    
    vec4 mvPos = viewMatrix * mPos;
    if (uSizeRandomness == 0.0) {
      gl_PointSize = uBaseSize;
    } else {
      gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);
    }
    
    gl_Position = projectionMatrix * mvPos;
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  
  uniform float uTime;
  uniform float uAlphaParticles;
  varying vec4 vRandom;
  varying vec3 vColor;
  
  void main() {
    vec2 uv = gl_PointCoord.xy;
    float d = length(uv - vec2(0.5));
    
    if(uAlphaParticles < 0.5) {
      if(d > 0.5) {
        discard;
      }
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), 1.0);
    } else {
      float circle = smoothstep(0.5, 0.4, d) * 0.8;
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), circle);
    }
  }
`;
const Particles: React.FC<ParticlesProps> = ({
  particleCount = 320,
  particleSpread = 10,
  speed = 0.12,
  particleColors,
  moveParticlesOnHover = true,
  particleHoverFactor = 1,
  alphaParticles = false,
  particleBaseSize = 100,
  sizeRandomness = 1,
  cameraDistance = 20,
  disableRotation = true,
  pixelRatio = 1,
  stars = [],
  className,
  interactionEnabled = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<Camera | null>(null);
  const particlesMeshRef = useRef<Mesh | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const hasMouseRef = useRef(false);
  const interactionEnabledRef = useRef(interactionEnabled);
  const wasInteractionEnabledRef = useRef(interactionEnabled);
  const menuExitSmoothStartRef = useRef(0);
  const menuExitSmoothUntilRef = useRef(0);
  const menuExitPendingRef = useRef(false);

  useEffect(() => {
    const wasEnabled = wasInteractionEnabledRef.current;
    interactionEnabledRef.current = interactionEnabled;

    if (!wasEnabled && interactionEnabled) {
      hasMouseRef.current = false;
      menuExitPendingRef.current = true;
    }

    if (!interactionEnabled) {
      hasMouseRef.current = false;
      menuExitPendingRef.current = false;
      menuExitSmoothStartRef.current = 0;
      menuExitSmoothUntilRef.current = 0;
    }

    wasInteractionEnabledRef.current = interactionEnabled;
  }, [interactionEnabled]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({
      dpr: pixelRatio,
      depth: false,
      alpha: true
    });
    const gl = renderer.gl;
    gl.canvas.style.pointerEvents = 'none';
    container.appendChild(gl.canvas);
    gl.clearColor(0, 0, 0, 0);

    const camera = new Camera(gl, { fov: 15 });
    camera.position.set(0, 0, cameraDistance);
    cameraRef.current = camera;

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
    };
    window.addEventListener('resize', resize, false);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactionEnabledRef.current) {
        return;
      }

      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      if (menuExitPendingRef.current) {
        const now = performance.now();
        menuExitSmoothStartRef.current = now;
        menuExitSmoothUntilRef.current = now + MENU_EXIT_SMOOTHING_MS;
        menuExitPendingRef.current = false;
      }

      mouseRef.current = { x, y };
      hasMouseRef.current = true;
    };

    if (moveParticlesOnHover) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    const count = particleCount;
    const positions = new Float32Array(count * 3);
    const randoms = new Float32Array(count * 4);
    const colors = new Float32Array(count * 3);
    const palette = particleColors && particleColors.length > 0 ? particleColors : defaultColors;

    for (let i = 0; i < count; i++) {
      let x: number, y: number, z: number, len: number;
      do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        z = Math.random() * 2 - 1;
        len = x * x + y * y + z * z;
      } while (len > 1 || len === 0);
      const r = Math.cbrt(Math.random());
      positions.set([x * r, y * r, z * r], i * 3);
      randoms.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);
      const col = hexToRgb(palette[Math.floor(Math.random() * palette.length)]);
      colors.set(col, i * 3);
    }

    const geometry = new Geometry(gl, {
      position: { size: 3, data: positions },
      random: { size: 4, data: randoms },
      color: { size: 3, data: colors }
    });

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uSpread: { value: particleSpread },
        uBaseSize: { value: particleBaseSize * pixelRatio },
        uSizeRandomness: { value: sizeRandomness },
        uAlphaParticles: { value: alphaParticles ? 1 : 0 }
      },
      transparent: true,
      depthTest: false
    });

    const particles = new Mesh(gl, { mode: gl.POINTS, geometry, program });
    particlesMeshRef.current = particles;

    let animationFrameId: number;
    let lastTime = performance.now();
    let elapsed = 0;

    const update = (t: number) => {
      animationFrameId = requestAnimationFrame(update);
      const delta = t - lastTime;
      lastTime = t;
      elapsed += delta * speed;

      program.uniforms.uTime.value = elapsed * 0.001;

      const hoverActive =
        moveParticlesOnHover && interactionEnabledRef.current && hasMouseRef.current;
      const targetX = hoverActive
        ? -mouseRef.current.x * particleHoverFactor
        : particles.position.x;
      const targetY = hoverActive
        ? -mouseRef.current.y * particleHoverFactor
        : particles.position.y;

      let hoverDamping = NORMAL_HOVER_DAMPING;
      if (menuExitSmoothUntilRef.current > 0 && t < menuExitSmoothUntilRef.current) {
        const smoothingProgress = clamp01(
          (t - menuExitSmoothStartRef.current) / MENU_EXIT_SMOOTHING_MS
        );
        const easing = 1 - Math.pow(1 - smoothingProgress, 3);
        hoverDamping =
          MENU_EXIT_HOVER_DAMPING +
          (NORMAL_HOVER_DAMPING - MENU_EXIT_HOVER_DAMPING) * easing;
      }

      particles.position.x += (targetX - particles.position.x) * hoverDamping;
      particles.position.y += (targetY - particles.position.y) * hoverDamping;

      if (!disableRotation) {
        particles.rotation.x = Math.sin(elapsed * 0.0002) * 0.1;
        particles.rotation.y = Math.cos(elapsed * 0.0005) * 0.15;
        particles.rotation.z += 0.01 * speed;
      }

      renderer.render({ scene: particles, camera });
    };

    animationFrameId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('resize', resize);
      if (moveParticlesOnHover) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
      cancelAnimationFrame(animationFrameId);
      if (container.contains(gl.canvas)) {
        container.removeChild(gl.canvas);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    particleCount,
    particleSpread,
    speed,
    moveParticlesOnHover,
    particleHoverFactor,
    alphaParticles,
    particleBaseSize,
    sizeRandomness,
    cameraDistance,
    disableRotation,
    pixelRatio
  ]);

  return (
    <div ref={containerRef} className={`particles-container ${className}`}>
      {stars.map((star, index) => (
        <Star
          key={index}
          position={star.position}
          size={star.size}
          title={star.title}
          onClick={star.onClick}
          particlesMeshRef={particlesMeshRef}
          cameraRef={cameraRef}
          containerRef={containerRef}
          background={star.background}
        />
      ))}
    </div>
  );
};

export default Particles;
