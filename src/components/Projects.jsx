import { useState } from "react";
import { projects } from "../data/projects";
import { FiGithub, FiExternalLink } from "react-icons/fi";

const filters = ["All", "AI", "Data", "Web"];

export default function Projects() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="py-20 px-6 bg-surface">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          Projects
        </h2>
        <p className="text-center text-gray-500 mb-10 max-w-xl mx-auto">
          A mix of research concepts, published datasets, and production-ready
          systems.
        </p>

        {/* Filter bar */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                active === f
                  ? "bg-accent text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-accent hover:text-accent"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="bg-card rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow flex flex-col"
            >
              {(p.featured || p.isResearch) && (
                <span
                  className={`self-start text-xs font-semibold uppercase tracking-wide px-2.5 py-0.5 rounded-full mb-3 ${
                    p.isResearch
                      ? "bg-purple-100 text-purple-700"
                      : "bg-accent/10 text-accent"
                  }`}
                >
                  {p.isResearch ? "Research Concept" : "Featured"}
                </span>
              )}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {p.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">
                {p.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="bg-gray-100 text-gray-600 text-xs px-2.5 py-0.5 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Link */}
              {p.github && (
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline font-medium"
                >
                  {p.github.includes("kaggle") ? (
                    <>
                      <FiExternalLink size={14} /> View on Kaggle
                    </>
                  ) : (
                    <>
                      <FiGithub size={14} /> View on GitHub
                    </>
                  )}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
