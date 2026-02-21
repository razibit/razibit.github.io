import { useState } from "react";
import { publications } from "../data/publications";
import { HiChevronDown, HiClipboardCopy, HiCheck } from "react-icons/hi";

export default function Publications() {
  const [expandedId, setExpandedId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const toggle = (id) =>
    setExpandedId((prev) => (prev === id ? null : id));

  const copyBibtex = (id, bibtex) => {
    navigator.clipboard.writeText(bibtex);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="publications" className="py-20 px-6 bg-white">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Publications
        </h2>

        <div className="space-y-6">
          {publications.map((pub) => {
            const isOpen = expandedId === pub.id;
            return (
              <div
                key={pub.id}
                className="bg-surface rounded-xl border border-gray-100 overflow-hidden"
              >
                {/* Header */}
                <button
                  onClick={() => toggle(pub.id)}
                  className="w-full text-left px-6 py-5 flex items-start gap-4 hover:bg-gray-50 transition-colors"
                >
                  <span className="shrink-0 mt-1 bg-accent text-white text-xs font-bold px-2 py-0.5 rounded">
                    {pub.year}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 leading-snug">
                      {pub.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {pub.authors.map((a, i) => (
                        <span key={a}>
                          {a === "Rajib Dab" ? (
                            <span className="font-semibold text-accent">
                              {a}
                            </span>
                          ) : (
                            a
                          )}
                          {i < pub.authors.length - 1 && ", "}
                        </span>
                      ))}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5 italic">
                      {pub.venue}
                    </p>
                  </div>
                  <HiChevronDown
                    size={20}
                    className={`text-gray-400 shrink-0 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Expandable body */}
                {isOpen && (
                  <div className="px-6 pb-5 space-y-4 border-t border-gray-100">
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1 mt-4">
                        Abstract
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {pub.abstract}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                          BibTeX
                        </h4>
                        <button
                          onClick={() => copyBibtex(pub.id, pub.bibtex)}
                          className="inline-flex items-center gap-1 text-xs text-accent hover:underline"
                        >
                          {copiedId === pub.id ? (
                            <>
                              <HiCheck size={14} /> Copied
                            </>
                          ) : (
                            <>
                              <HiClipboardCopy size={14} /> Copy
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="bg-gray-900 text-green-400 text-xs p-4 rounded-lg overflow-x-auto">
                        {pub.bibtex}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
