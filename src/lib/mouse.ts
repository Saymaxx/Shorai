import { motionValue } from "framer-motion";

export const globalMouseX = motionValue(0);
export const globalMouseY = motionValue(0);

if (typeof window !== "undefined") {
  let ticking = false;
  window.addEventListener(
    "mousemove",
    (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          globalMouseX.set(e.clientX);
          globalMouseY.set(e.clientY);
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );
}
