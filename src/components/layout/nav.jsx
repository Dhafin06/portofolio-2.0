import { Moon, Sun } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { Link, useLocation } from "react-router-dom";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Certifications", href: "/certifications" },
];

function useIsMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

function NavThemeToggle() {
  const mounted = useIsMounted();
  const { setTheme, resolvedTheme } = useTheme();

  const isDark = mounted && resolvedTheme === "dark";

  const toggleTheme = (event) => {
    const next = isDark ? "light" : "dark";

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const supportsViewTransitions =
      typeof document !== "undefined" &&
      typeof document.startViewTransition === "function";

    if (!supportsViewTransitions || prefersReducedMotion) {
      setTheme(next);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();

    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const radius = Math.hypot(
      Math.max(cx, window.innerWidth - cx),
      Math.max(cy, window.innerHeight - cy),
    );

    const root = document.documentElement;

    root.style.setProperty("--theme-cx", `${cx}px`);
    root.style.setProperty("--theme-cy", `${cy}px`);
    root.style.setProperty("--theme-r", `${radius}px`);
    root.dataset.themeAnim = "1";

    const transition = document.startViewTransition(() => {
      setTheme(next);
    });

    transition.finished.finally(() => {
      delete root.dataset.themeAnim;
    });
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        mounted
          ? isDark
            ? "Switch to light theme"
            : "Switch to dark theme"
          : "Toggle theme"
      }
      aria-pressed={mounted ? isDark : undefined}
      className="focus-ring relative inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-foreground transition-colors hover:bg-foreground/5"
    >
      <span aria-hidden="true" className="relative h-4 w-4">
        <Sun
          className={`absolute inset-0 h-4 w-4 text-foreground transition-all duration-300 ${
            mounted && isDark
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          }`}
        />

        <Moon
          className={`absolute inset-0 h-4 w-4 text-foreground transition-all duration-300 ${
            mounted && !isDark
              ? "rotate-0 scale-100 opacity-100"
              : "rotate-90 scale-0 opacity-0"
          }`}
        />
      </span>
    </button>
  );
}

export function Nav() {
  const { pathname } = useLocation();

  const listRef = useRef(null);
  const itemRefs = useRef([]);

  const [pillRect, setPillRect] = useState(null);
  const [hasMeasured, setHasMeasured] = useState(false);

  const activeIndex = NAV_ITEMS.findIndex((item) => {
    if (item.href === "/") {
      return pathname === "/";
    }

    return (
      pathname === item.href || pathname.startsWith(`${item.href}/`)
    );
  });

  const isContactActive = pathname === "/contact";

  useLayoutEffect(() => {
    const list = listRef.current;
    const activeEl =
      activeIndex >= 0 ? itemRefs.current[activeIndex] : null;

    if (!list || !activeEl) {
      setPillRect(null);
      return;
    }

    const listRect = list.getBoundingClientRect();
    const itemRect = activeEl.getBoundingClientRect();

    setPillRect({
      x: itemRect.left - listRect.left,
      width: itemRect.width,
    });
  }, [activeIndex, pathname]);

  useEffect(() => {
    if (!pillRect) {
      return;
    }

    const id = requestAnimationFrame(() => {
      setHasMeasured(true);
    });

    return () => cancelAnimationFrame(id);
  }, [pillRect]);

  return (
    <nav
        aria-label="Primary"
        className="fixed left-1/2 top-6 z-50 w-[calc(100%-2rem)] max-w-[1180px] -translate-x-1/2"
        >
        <div className="flex items-center justify-between gap-3">
            {/* Logo */}
            <Link
            to="/"
            aria-label="Go to homepage"
            className="focus-ring inline-flex h-11 shrink-0 items-center rounded-full bg-background px-5 text-sm font-semibold tracking-tight text-foreground shadow-sm ring-1 ring-foreground/8 transition-colors"
            >
            Dhafin.
            </Link>

            {/* Main Navigation */}
            <ul
            ref={listRef}
            className="relative hidden h-11 items-center gap-1 rounded-full bg-background px-1.5 shadow-sm ring-1 ring-foreground/8 md:flex"
            >
            {pillRect && (
                <motion.span
                aria-hidden="true"
                initial={false}
                animate={{
                    x: pillRect.x,
                    width: pillRect.width,
                }}
                transition={
                    hasMeasured
                    ? {
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                        }
                    : {
                        duration: 0,
                        }
                }
                style={{
                    left: 0,
                    top: 6,
                    bottom: 6,
                }}
                className="absolute rounded-full bg-foreground/5 ring-1 ring-foreground/8"
                />
            )}

            {NAV_ITEMS.map((item, index) => {
                const isActive = index === activeIndex;

                return (
                <li
                    key={item.href}
                    ref={(el) => {
                    itemRefs.current[index] = el;
                    }}
                    className="relative"
                >
                    <Link
                    to={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className="focus-ring relative inline-flex h-9 cursor-pointer items-center justify-center rounded-full px-3.5 text-sm font-medium transition-colors duration-300"
                    >
                    <span
                        className={
                        isActive
                            ? "relative z-10 text-foreground"
                            : "relative z-10 text-foreground/60 hover:text-foreground"
                        }
                    >
                        {item.label}
                    </span>
                    </Link>
                </li>
                );
            })}
            </ul>

            {/* Right Actions */}
            <div className="flex h-11 shrink-0 items-center gap-1 rounded-full bg-background px-1.5 shadow-sm ring-1 ring-foreground/8">
            <Link
                to="/contact"
                aria-current={isContactActive ? "page" : undefined}
                className={`focus-ring relative inline-flex h-9 items-center justify-center rounded-full px-4 text-sm font-medium transition-colors duration-300 ${
                isContactActive
                    ? "bg-foreground/5 text-foreground ring-1 ring-foreground/8"
                    : "text-foreground/60 hover:text-foreground"
                }`}
            >
                Contact Me
            </Link>

            <NavThemeToggle />
            </div>
        </div>
        </nav>
  );
}