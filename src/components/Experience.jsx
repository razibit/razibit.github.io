import { experience } from "../data/experience";
import { HiOfficeBuilding, HiAcademicCap, HiLightningBolt } from "react-icons/hi";

const icons = {
  startup: <HiLightningBolt className="text-accent" size={20} />,
  research: <HiAcademicCap className="text-accent" size={20} />,
  academic: <HiOfficeBuilding className="text-accent" size={20} />,
};

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-6 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          Experience
        </h2>

        {/* Timeline */}
        <div className="relative border-l-2 border-accent/30 ml-4 space-y-10">
          {experience.map((exp) => (
            <div key={exp.id} className="relative pl-8">
              {/* Dot */}
              <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-accent ring-4 ring-white dark:ring-gray-900" />

              <div className="flex items-center gap-2 mb-1">
                {icons[exp.type]}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {exp.role}
                </h3>
              </div>
              <p className="text-sm text-accent font-medium">
                {exp.organization}
              </p>
              <p className="text-xs text-gray-400 mb-3">{exp.period}</p>
              <ul className="space-y-1 text-gray-600 dark:text-gray-300 text-sm">
                {exp.description.map((d, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-accent mt-1 shrink-0">•</span>
                    <span>{d}</span>
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
