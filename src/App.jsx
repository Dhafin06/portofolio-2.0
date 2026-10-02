import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Nav } from "@/components/layout/nav";
import { PageBackdrop } from "@/components/layout/page-backdrop";
import { SkipToContent } from "@/components/layout/skip-to-content";
import { Providers } from "@/components/layout/providers";
import HomePage from "@/pages/Home";
import AboutPage from "@/pages/About";
import ProjectsPage from "@/pages/Projects";
import ContactPage from "@/pages/Contact";

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
};

function RouteMetadata() {
  const { pathname } = useLocation();
  const meta = ROUTE_META[pathname] ?? ROUTE_META["/"];

  useEffect(() => {
    document.title = meta.title;
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute("content", meta.description);
  }, [meta]);

  return null;
}

function SiteShell({ children }) {
  return (
    <Providers>
      <div className="site-frame site-frame--top" aria-hidden="true" />
          <div className="site-frame site-frame--left" aria-hidden="true" />
          <div className="site-frame site-frame--right" aria-hidden="true" />

          <svg
            className="site-corner site-corner--top-left"
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M5.50871e-06 0C-0.00788227 37.3001 8.99616 50.0116 50 50H5.50871e-06V0Z"
              fill="currentColor"
            />
          </svg>
          <svg
            className="site-corner site-corner--top-right"
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M5.50871e-06 0C-0.00788227 37.3001 8.99616 50.0116 50 50H5.50871e-06V0Z"
              fill="currentColor"
            />
          </svg>

          <SkipToContent />
          <PageBackdrop />
          <Nav />
      {children}
    </Providers>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <RouteMetadata />
      <SiteShell>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </SiteShell>
    </BrowserRouter>
  );
}
