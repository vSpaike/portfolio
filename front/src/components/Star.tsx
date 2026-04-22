import React, { useRef, useEffect, type RefObject } from 'react';
import { Vec3, type Camera, type Mesh } from 'ogl';

interface StarProps {
  position: [number, number, number];
  size?: number;
  title?: string;
  onClick?: () => void;
  particlesMeshRef: RefObject<Mesh | null>;
  cameraRef: RefObject<Camera | null>;
  containerRef: RefObject<HTMLDivElement | null>;
  background?: string;
}

const Star: React.FC<StarProps> = ({
  position,
  size = 22,
  title = "Etoile interactive",
  onClick,
  particlesMeshRef,
  cameraRef,
  containerRef,
  background = 'rgba(255,255,255,1) 0%, rgba(255,244,196,0.95) 45%, rgba(255,232,120,0.5) 70%, rgba(255,232,120,0) 100%'
}) => {
  const starRef = useRef<HTMLButtonElement>(null);
  const [x, y, z] = position;
  const localPosRef = useRef(new Vec3(x, y, z));
  const worldPosRef = useRef(new Vec3());
  const clipPosRef = useRef(new Vec3());

  useEffect(() => {
    const updatePosition = () => {
      const star = starRef.current;
      const container = containerRef.current;
      const particlesMesh = particlesMeshRef.current;
      const camera = cameraRef.current;

      if (!star || !container || !particlesMesh || !camera) {
        return;
      }

      localPosRef.current.copy(localPosRef.current).set(x, y, z);
      worldPosRef.current.copy(localPosRef.current).applyMatrix4(particlesMesh.worldMatrix);
      clipPosRef.current.copy(worldPosRef.current).applyMatrix4(camera.viewMatrix).applyMatrix4(camera.projectionMatrix);

      const isOutOfView =
        clipPosRef.current.x < -1 ||
        clipPosRef.current.x > 1 ||
        clipPosRef.current.y < -1 ||
        clipPosRef.current.y > 1 ||
        clipPosRef.current.z < -1 ||
        clipPosRef.current.z > 1;

      if (isOutOfView) {
        star.style.opacity = '0';
        star.style.pointerEvents = 'none';
        return;
      }

      const screenX = ((clipPosRef.current.x + 1) * 0.5) * container.clientWidth;
      const screenY = ((1 - clipPosRef.current.y) * 0.5) * container.clientHeight;

      star.style.opacity = '1';
      star.style.pointerEvents = 'auto';
      star.style.transform = `translate(${screenX}px, ${screenY}px) translate(-50%, -50%)`;
    };

    // Call once initially
    updatePosition();

    // Set up RAF for continuous updates
    let animationFrameId: number;
    const update = () => {
      updatePosition();
      animationFrameId = requestAnimationFrame(update);
    };
    animationFrameId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [x, y, z, containerRef, particlesMeshRef, cameraRef]);

  return (
    <button
      ref={starRef}
      type="button"
      aria-label={title}
      title={title}
      onClick={onClick}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '9999px',
        border: 'none',
        background: `radial-gradient(circle, ${background})`,
        boxShadow: '0 0 18px rgba(255, 236, 140, 0.85)',
        cursor: 'pointer',
        zIndex: 2,
        transform: 'translate(-9999px, -9999px)',
        opacity: 0,
        transition: 'opacity 160ms ease'
      }}
    />
  );
};

export default Star;
