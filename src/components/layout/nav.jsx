
import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Link, useLocation, useNavigate } from "react-router-dom";
import RubberSegment from "@/components/effects/RubberSegment";
import StaggeredMenu from "@/components/effects/StaggeredMenu";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Certifications", href: "/certifications" },
  { label: "Contact Me", href: "/contact" },
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

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const supportsViewTransitions =
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
      className="focus-ring relative inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-xl text-foreground transition-colors hover:bg-foreground/5"
    >
      <span aria-hidden="true" className="relative h-4 w-4">
        <Sun
          className={`absolute inset-0 h-4 w-4 transition-all duration-300 ${
            isDark
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          }`}
        />
        <Moon
          className={`absolute inset-0 h-4 w-4 transition-all duration-300 ${
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
  const navigate = useNavigate();

  const activeItem = NAV_ITEMS.find((item) => {
    if (item.href === "/") {
      return pathname === "/";
    }

    return (
      pathname === item.href ||
      pathname.startsWith(`${item.href}/`)
    );
  });

  const mobileItems = NAV_ITEMS.map((item) => ({
    label: item.label,
    link: item.href,
    ariaLabel: item.label,
  }));

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        aria-label="Primary"
        className="fixed left-1/2 top-6 z-50 hidden w-[calc(100%-2rem)] max-w-[1280px] -translate-x-1/2 md:block"
      >
        <div className="flex h-12 items-center gap-3 rounded-2xl border border-foreground/10 bg-background/95 px-3 shadow-sm backdrop-blur-xl sm:px-4">
          <Link
            to="/"
            aria-label="Go to homepage"
            className="focus-ring inline-flex h-10 shrink-0 items-center px-2 text-[15px] font-semibold leading-none tracking-tight text-foreground transition-colors"
          >
            Dhafin.
          </Link>

          <div className="min-w-0 flex-1">
            <RubberSegment
              aria-label="Primary navigation"
              items={NAV_ITEMS.map((item) => ({
                value: item.href,
                label: item.label,
              }))}
              value={activeItem?.href ?? ""}
              onChange={(href) => navigate(href)}
              layout="navbar"
              size="lg"
              radius={12}
              inset={3}
              equalSlots={false}
              stretch={0}
              squash={3}
              speed={0.45}
              draggable={false}
              trackColor="transparent"
              thumbColor="color-mix(in srgb, var(--foreground) 8%, var(--background))"
              textColor="var(--foreground)"
              activeTextColor="var(--foreground)"
              className="!bg-transparent"
            />
          </div>

          <div className="flex shrink-0 items-center">
            <NavThemeToggle />
          </div>
        </div>
      </nav>

      {/* Mobile Staggered Menu */}
      <div className="md:hidden">
        <StaggeredMenu
          position="right"
          isFixed={true}
          logoText="Dhafin."
          items={mobileItems}
          mobileFooter={
            <div className="flex items-center justify-between gap-3">
              <span className="sm-mobile-footer-label text-sm font-medium text-foreground">
                Appearance
              </span>

              <NavThemeToggle />
            </div>
          }
          displaySocials={false}
          displayItemNumbering={true}
          menuButtonColor="var(--foreground)"
          openMenuButtonColor="var(--foreground)"
          changeMenuColorOnOpen={false}
          colors={[
            "color-mix(in srgb, var(--background) 92%, transparent)",
            "color-mix(in srgb, var(--background) 82%, transparent)",
          ]}
          accentColor="var(--foreground)"
          onItemClick={(href) => {
            if (href !== pathname) {
              navigate(href);
            }
          }}
        />
      </div>
    </>
  );
}
