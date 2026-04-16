import { useMagnetic } from "@/hooks/useMagnetic";
import React from "react";

export function MagneticWrapper({
  children,
  strength = 0.35,
  elasticity = 0.15,
  maxDistance = 150,
  className = "",
  as: Tag = "div",
}) {
  const magneticRef = useMagnetic({ strength, elasticity, maxDistance });

  return (
    <Tag ref={magneticRef} className={`magnetic-element inline-block ${className}`} style={{ willChange: "transform" }}>
      {children}
    </Tag>
  );
}
