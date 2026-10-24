
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { DEV_PROJECTS } from "./data-dev-projects";

export default function DevProjects() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section
      id="other-projects"
      className="mx-auto w-full max-w-[1280px] px-6 py-16 sm:px-10 sm:py-20"
      aria-labelledby="other-projects-title"
    >
      <div className="border-t border-foreground/10 pt-10 sm:pt-12">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-foreground/50">
              More to Explore
            </p>

            <h2
              id="other-projects-title"
              className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl"
            >
              Dev Projects
              <span className="text-foreground/35">.</span>
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-foreground/60 sm:text-base">
              More projects exploring web applications, inventory
              management, and flood information systems.
            </p>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              key="other-projects-list"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: {
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                },
                opacity: { duration: 0.25 },
              }}
              className="overflow-hidden"
            >
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.08,
                    },
                  },
                }}
                className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
              >
                {DEV_PROJECTS.map((project) => {
                  const Icon = project.icon;

                  return (
                    <motion.article
                      key={project.id}
                      variants={{
                        hidden: { opacity: 0, y: 14 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{
                        duration: 0.35,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="flex h-full flex-col gap-4 rounded-3xl border border-foreground/10 bg-background p-3 transition-colors hover:border-foreground/20 sm:p-4"
                    >
                      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-foreground/5">
                        <img
                          src={project.image}
                          alt={project.alt}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                        />
                      </div>

                      <div className="flex flex-1 flex-col gap-3 px-1">
                        <div className="flex items-center gap-2">
                          <Icon
                            className="h-4 w-4 shrink-0 text-foreground/60"
                            aria-hidden="true"
                          />

                          <span className="text-xs font-medium uppercase tracking-[0.12em] text-foreground/50">
                            {project.category}
                          </span>
                        </div>

                        <h3 className="text-xl font-medium tracking-tight text-foreground">
                          {project.title}
                        </h3>

                        <p className="text-sm leading-6 text-foreground/65">
                          {project.description}
                        </p>

                        <div className="mt-auto flex flex-wrap gap-2 pt-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-foreground/10 px-2.5 py-1 text-xs text-foreground/60"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 flex justify-center sm:mt-10">
          <button
            type="button"
            onClick={() => setIsExpanded((current) => !current)}
            aria-expanded={isExpanded}
            aria-controls="other-projects-list"
            className="group inline-flex items-center gap-2 rounded-full border border-foreground/15 px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2"
          >
            {isExpanded ? "Show less" : "Show other projects"}

            {isExpanded ? (
              <ArrowUp
                className="h-4 w-4 transition-transform group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            ) : (
              <ArrowDown
                className="h-4 w-4 transition-transform group-hover:translate-y-0.5"
                aria-hidden="true"
              />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
