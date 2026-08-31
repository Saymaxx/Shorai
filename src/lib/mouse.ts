import { motionValue } from "framer-motion";

export const globalMouseX = motionValue(0);
export const globalMouseY = motionValue(0);

// Centralized normalized mouse coordinates [-1, 1] for 3D canvases and shaders
export const globalNormalizedMouse = {
  x: 0,
  y: 0,
  targetX: 0,
  targetY: 0,
};

if (typeof window !== "undefined") {
  let ticking = false;
  window.addEventListener(
    "mousemove",
    (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          globalMouseX.set(e.clientX);
          globalMouseY.set(e.clientY);
          const w = window.innerWidth || 1;
          const h = window.innerHeight || 1;
          globalNormalizedMouse.targetX = (e.clientX / w) * 2 - 1;
          globalNormalizedMouse.targetY = (e.clientY / h) * 2 - 1;
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );
}
