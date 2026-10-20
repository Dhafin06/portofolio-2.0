
import AboutIntro from "@/components/about/intro";
import WhatCanIDo from "@/components/about/what-can-i-do";

export default function AboutPage() {
  return (
    <main id="main-content" className="flex flex-1 flex-col gap-3 sm:gap-5">
      <AboutIntro />

      <WhatCanIDo />

      <div className="h-8 sm:h-12" />
    </main>
  );
}
