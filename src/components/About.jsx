export default function About() {
  return (
    <section id="about" className="py-20 px-6 bg-white">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          About Me
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Photo */}
          <div className="shrink-0">
            <img
              src="/images/rajib_dab.jpg"
              alt="Rajib Dab"
              className="w-48 h-48 md:w-56 md:h-56 rounded-2xl object-cover shadow-lg"
            />
          </div>

          {/* Bio */}
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              I am a 3rd-year Computer Science &amp; Engineering student at{" "}
              <span className="font-medium text-gray-800">
                Metropolitan University, Bangladesh
              </span>
              , focused on building intelligent systems that bridge AI research
              and real-world applications.
            </p>
            <p>
              In May 2025, I founded{" "}
              <span className="font-medium text-accent">Apostrophe Labs</span>{" "}
              — a research-driven venture exploring AI hardware innovation,
              intelligent devices, and data engineering. Our flagship vision is
              the <em>AI Photographer Device</em>: an autonomous assistant that
              guides solo travelers with voice instructions and smart framing.
            </p>
            <p>
              My research interests span Computer Vision, Natural Language
              Processing, Human-AI Interaction, and Autonomous AI Systems. I
              believe in building first and publishing second — every project I
              take on is designed to solve a real problem.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
