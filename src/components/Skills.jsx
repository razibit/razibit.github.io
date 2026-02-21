import { skillCategories } from "../data/skills";

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-6 bg-surface">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Skills
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((cat) => (
            <div
              key={cat.title}
              className="bg-card rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider text-accent mb-4">
                {cat.title}
              </h3>
              <ul className="space-y-2">
                {cat.skills.map((s) => (
                  <li key={s}>
                    <span className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">
                      {s}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
