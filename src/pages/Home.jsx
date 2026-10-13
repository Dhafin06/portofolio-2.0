import { Hero } from "@/components/hero/hero";
import ProjectGallery from "@/components/projects/project-gallery";

export default function HomePage() {
  return (
    <main
      id="main-content"
      className="flex flex-1 flex-col gap-16 sm:gap-20"
    >
      <Hero />
      <ProjectGallery />
      <div className="h-12 sm:h-16" />
    </main>
  );
}