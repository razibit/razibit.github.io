import { awards } from "../data/awards";
import { HiStar } from "react-icons/hi";

export default function Awards() {
  return (
    <section id="awards" className="py-20 px-6 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          Honors &amp; Awards
        </h2>

        <div className="space-y-5">
          {awards.map((a) => (
            <div
              key={a.id}
              className="flex items-start gap-4 bg-surface dark:bg-gray-800 rounded-xl px-6 py-4 border border-gray-100 dark:border-gray-700"
            >
              <span className="shrink-0 mt-0.5 bg-accent/10 text-accent p-2 rounded-lg">
                <HiStar size={18} />
              </span>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{a.title}</h3>
                  <span className="text-xs text-gray-400 font-medium whitespace-nowrap">
                    {a.year}
                  </span>
                </div>
                <p className="text-sm text-accent font-medium">
                  {a.organization}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{a.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
