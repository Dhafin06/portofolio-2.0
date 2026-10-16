import { Hero } from "@/components/hero/hero";
import ProjectGallery from "@/components/projects/project-gallery";

export default function HomePage() {
  return (
    <main
      id="main-content"
      className="flex flex-1 flex-col gap-2 sm:gap-4"
    >
      <Hero />
      <ProjectGallery />
      <div className="h-1 sm:h-2" />
    </main>
  );
}