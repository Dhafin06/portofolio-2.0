import { useEffect } from "react";
import Lenis from "lenis";
import { features } from "@/lib/config";
const LENIS_OPTIONS = {
    duration: 1.6,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
};
export function SmoothScroll({ children, }) {
    useEffect(() => {
        if (!features.smoothScroll)
            return;
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion)
            return;
        const lenis = new Lenis(LENIS_OPTIONS);
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        const rafId = requestAnimationFrame(raf);
        function handleAnchorClick(e) {
            const target = e.target;
            const anchor = target.closest('a[href^="#"]');
            if (!anchor)
                return;
            const href = anchor.getAttribute("href");
            if (!href || href === "#")
                return;
            const element = document.querySelector(href);
            if (!element)
                return;
            e.preventDefault();
            lenis.scrollTo(element, { offset: -100 });
        }
        document.addEventListener("click", handleAnchorClick);
        return () => {
            document.removeEventListener("click", handleAnchorClick);
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);
    return <>{children}</>;
}
