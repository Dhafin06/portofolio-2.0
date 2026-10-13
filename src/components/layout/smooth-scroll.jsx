
import { useEffect } from "react";
import Lenis from "lenis";
import { features } from "@/lib/config";

let lenisInstance = null;

export function scrollToTop() {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, {
      immediate: true,
      force: true,
    });
  } else {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }
}

const LENIS_OPTIONS = {
  duration: 1.6,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: "vertical",
  gestureOrientation: "vertical",
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
};

export function SmoothScroll({ children }) {
  useEffect(() => {
    if (!features.smoothScroll) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis(LENIS_OPTIONS);
    lenisInstance = lenis;

    let rafId;

    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    function handleAnchorClick(e) {
      const target = e.target;

      if (!(target instanceof Element)) return;

      const anchor = target.closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const element = document.querySelector(href);
      if (!element) return;

      e.preventDefault();
      lenis.scrollTo(element, { offset: -100 });
    }

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      cancelAnimationFrame(rafId);

      if (lenisInstance === lenis) {
        lenisInstance = null;
      }

      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
