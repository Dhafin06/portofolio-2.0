import { Hero } from "@/components/hero/hero";
import { Projects } from "@/components/projects/projects";
export default function HomePage() {
    return (<main id="main-content" className="flex flex-1 flex-col gap-16 sm:gap-15">
      <Hero />
      <Projects withHeadline viewMoreVisible/>
      <div className="h-12 sm:h-16"/>
    </main>);
}
