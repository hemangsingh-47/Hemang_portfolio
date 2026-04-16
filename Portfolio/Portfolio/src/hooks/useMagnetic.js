import { useRef, useCallback, useEffect } from "react";

export function useMagnetic(options = {}) {
  const {
    strength = 0.35,
    elasticity = 0.15,
    maxDistance = 150,
  } = options;

  const elementRef = useRef(null);
  const animFrameRef = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);
  const targetX = useRef(0);
  const targetY = useRef(0);

  const animate = useCallback(() => {
    // Spring interpolation
    currentX.current += (targetX.current - currentX.current) * elasticity;
    currentY.current += (targetY.current - currentY.current) * elasticity;

    if (elementRef.current) {
      elementRef.current.style.transform = `translate(${currentX.current}px, ${currentY.current}px)`;
    }

    // Keep animating until close enough to target
    if (
      Math.abs(targetX.current - currentX.current) > 0.01 ||
      Math.abs(targetY.current - currentY.current) > 0.01
    ) {
      animFrameRef.current = requestAnimationFrame(animate);
    }
  }, [elasticity]);

  const handleMouseMove = useCallback(
    (e) => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < maxDistance) {
        // Inside magnetic field — pull toward cursor
        const factor = (1 - distance / maxDistance) * strength;
        targetX.current = deltaX * factor;
        targetY.current = deltaY * factor;
      } else {
        // Outside — snap back to origin
        targetX.current = 0;
        targetY.current = 0;
      }

      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = requestAnimationFrame(animate);
    },
    [strength, maxDistance, animate]
  );

  const handleMouseLeave = useCallback(() => {
    targetX.current = 0;
    targetY.current = 0;
    cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(animate);
  }, [animate]);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Listen on the parent or window so the magnetic field extends beyond the element
    const parent = el.parentElement || document;
    parent.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      parent.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return elementRef;
}
