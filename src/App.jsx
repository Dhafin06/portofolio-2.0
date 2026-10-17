
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";

import { Nav } from "@/components/layout/nav";
import { PageBackdrop } from "@/components/layout/page-backdrop";
import { SkipToContent } from "@/components/layout/skip-to-content";
import { Providers } from "@/components/layout/providers";
import { Footer } from "@/components/layout/footer";
import ScrollToTop from "@/components/layout/scroll-to-top";

// Lazy loading untuk setiap halaman
const HomePage = lazy(() => import("@/pages/Home"));
const AboutPage = lazy(() => import("@/pages/About"));
const ProjectsPage = lazy(() => import("@/pages/Projects"));
const ContactPage = lazy(() => import("@/pages/Contact"));
const CertificationsPage = lazy(() => import("@/pages/Certifications"));

const ROUTE_META = {
  "/": {
    title: "Home | Portfolio",
    description: "Dhafin Aksanidra portfolio.",
  },
  "/about": {
    title: "About | Portfolio",
    description: "About Dhafin Aksanidra, background, and experience.",
  },
  "/projects": {
    title: "Projects | Portfolio",
    description: "Selected projects and work by Dhafin Aksanidra.",
  },
  "/contact": {
    title: "Contact | Portfolio",
    description: "Get in touch with Dhafin Aksanidra.",
  },
  "/certifications": {
    title: "Certifications | Portfolio",
    description: "Certifications earned by Dhafin Aksanidra.",
  },
};

function RouteMetadata() {
  const { pathname } = useLocation();
  const meta = ROUTE_META[pathname] ?? ROUTE_META["/"];

  useEffect(() => {
    document.title = meta.title;

    const description = document.querySelector(
      'meta[name="description"]'
    );

    description?.setAttribute("content", meta.description);
  }, [meta]);

  return null;
}

function SiteShell({ children }) {
  const { pathname } = useLocation();
  const showFooter = pathname !== "/contact";

  return (
    <Providers>
      <div className="relative isolate min-h-screen">
        <PageBackdrop />

        <div className="relative z-10">
          <div
            className="site-frame site-frame--top"
            aria-hidden="true"
          />
          <div
            className="site-frame site-frame--left"
            aria-hidden="true"
          />
          <div
            className="site-frame site-frame--right"
            aria-hidden="true"
          />

          {/* Pertahankan kedua SVG site-corner di sini */}

          <SkipToContent />
          <Nav />

          {children}

          {showFooter && <Footer />}
        </div>
      </div>
    </Providers>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <RouteMetadata />
      <ScrollToTop />

      <SiteShell>
        <Suspense
          fallback={
            <div
              className="flex min-h-[50vh] items-center justify-center"
              role="status"
              aria-live="polite"
            >
              <span className="text-sm text-muted-foreground">
                Loading page...
              </span>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route
              path="/certifications"
              element={<CertificationsPage />}
            />
            <Route path="/contact" element={<ContactPage />} />
            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />
          </Routes>
        </Suspense>
      </SiteShell>
    </BrowserRouter>
  );
}
