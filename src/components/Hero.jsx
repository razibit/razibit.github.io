import { HiArrowDown, HiDocumentDownload } from "react-icons/hi";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-surface dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 px-6"
    >
      <div className="max-w-3xl text-center">
        <p className="text-accent font-medium tracking-wide uppercase text-sm mb-4">
          Welcome
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
          Rajib Dab
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          AI Engineering Student &middot; Founder @ Apostrophe Labs &middot;
          Dataset Creator &middot; Aspiring AI Researcher
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            View Projects
            <HiArrowDown size={18} />
          </a>
          <a
            href="/files/rajib_dab_cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-gray-300 dark:border-gray-600 hover:border-accent text-gray-700 dark:text-gray-300 hover:text-accent px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Download CV
            <HiDocumentDownload size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
