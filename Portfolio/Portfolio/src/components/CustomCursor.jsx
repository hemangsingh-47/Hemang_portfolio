import { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isHovering = false;
    let isClicking = false;
    let isVisible = false;
    let animationFrameId;

    document.body.classList.add("custom-cursor-active");

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const isOnScrollbar = e.clientX >= document.documentElement.clientWidth;
      if (isOnScrollbar) {
        isVisible = false;
        dot.style.opacity = "0";
        ring.style.opacity = "0";
      } else {
        if (!isVisible) {
          isVisible = true;
          dot.style.opacity = "1";
          ring.style.opacity = isHovering ? "0.5" : "1";
        }
      }

      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(${isClicking ? 0.8 : isHovering ? 1.5 : 1})`;
    };

    const render = () => {
      // Smooth lerp for ring
      ringX += (mouseX - ringX) * 0.2;
      ringY += (mouseY - ringY) * 0.2;

      const scale = isClicking ? 1.5 : isHovering ? 1.5 : 1;
      const opacity = isVisible ? (isHovering ? "0.5" : "1") : "0";
      
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${scale})`;
      ring.style.opacity = opacity;

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    const handleMouseEnter = () => {
      isHovering = true;
    };

    const handleMouseLeave = () => {
      isHovering = false;
    };

    const handleMouseDown = () => {
      isClicking = true;
    };

    const handleMouseUp = () => {
      isClicking = false;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    const interactiveElements = document.querySelectorAll("a, button, [role='button'], input, textarea");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      document.body.classList.remove("custom-cursor-active");
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary pointer-events-none z-[9999] opacity-0 transition-opacity duration-150"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-primary pointer-events-none z-[9999] opacity-0 transition-opacity duration-150"
      />
    </>
  );
}
