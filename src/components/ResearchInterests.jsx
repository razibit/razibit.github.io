import {
  HiEye,
  HiChat,
  HiCube,
  HiChip,
  HiSparkles,
} from "react-icons/hi";

const interests = [
  {
    icon: <HiEye size={28} />,
    title: "Computer Vision",
    description:
      "Image classification, object detection, medical imaging, and visual understanding systems.",
  },
  {
    icon: <HiChat size={28} />,
    title: "Natural Language Processing",
    description:
      "Bangla text recognition, sentiment analysis, and language-aware AI systems.",
  },
  {
    icon: <HiSparkles size={28} />,
    title: "Human-AI Interaction",
    description:
      "Designing AI systems that collaborate naturally with humans in physical environments.",
  },
  {
    icon: <HiCube size={28} />,
    title: "Autonomous AI Systems",
    description:
      "Self-directing intelligent agents — from photography assistants to autonomous devices.",
  },
  {
    icon: <HiChip size={28} />,
    title: "AI Hardware Innovation",
    description:
      "Building intelligent devices that merge software intelligence with physical hardware.",
  },
];

export default function ResearchInterests() {
  return (
    <section id="research" className="py-20 px-6 bg-surface">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          Research Interests
        </h2>
        <p className="text-center text-gray-500 mb-12 max-w-lg mx-auto">
          The areas I actively explore, build in, and aim to publish research
          within.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {interests.map((item) => (
            <div
              key={item.title}
              className="bg-card rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="text-accent mb-3">{item.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
