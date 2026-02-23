import {
  FiMail,
  FiGithub,
  FiLinkedin,
} from "react-icons/fi";
import { SiResearchgate, SiOrcid } from "react-icons/si";

const links = [
  {
    icon: <FiMail size={22} />,
    label: "Email",
    href: "mailto:razibdev7@gmail.com",
  },
  {
    icon: <FiGithub size={22} />,
    label: "GitHub",
    href: "https://github.com/razibit",
  },
  {
    icon: <FiLinkedin size={22} />,
    label: "LinkedIn",
    href: "https://linkedin.com/in/rajibdab",
  },
  {
    icon: <SiResearchgate size={22} />,
    label: "ResearchGate",
    href: "https://www.researchgate.net/profile/Rajib-Dab",
  },
  {
    icon: <SiOrcid size={22} />,
    label: "ORCID",
    href: "https://orcid.org/0009-0003-9057-1711",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-6 bg-surface dark:bg-gray-800">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Get In Touch</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-10">
          Open to research collaborations, internship opportunities, and
          conversations about AI.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-accent hover:text-accent text-gray-600 dark:text-gray-300 px-5 py-3 rounded-xl font-medium text-sm transition-colors shadow-sm"
            >
              {l.icon}
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
