
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToTop } from "@/components/layout/smooth-scroll";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      scrollToTop();
    });

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [pathname]);

  return null;
}
