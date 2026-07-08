"use client";

import { Reveal } from "@/components/motion/Reveal";
import type { LegalDocument } from "@/lib/legal";

type LegalContentProps = {
  document: LegalDocument;
};

export function LegalContent({ document }: LegalContentProps) {
  return (
    <article className="bg-white pb-20 pt-10 sm:pb-28 sm:pt-14">
      <div className="container-fluid min-w-0 max-w-4xl">
        <Reveal>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-secondary sm:text-sm">
            Legal
          </p>
          <h1 className="text-balance text-[clamp(2rem,6vw,3.5rem)] font-bold leading-tight text-title">
            {document.title}
          </h1>
          <p className="mt-4 text-sm text-title/60">Last updated: {document.lastUpdated}</p>
        </Reveal>

        <Reveal className="mt-8">
          <p className="text-base leading-relaxed text-title/80 sm:text-lg">{document.intro}</p>
        </Reveal>

        <div className="mt-10 space-y-10">
          {document.sections.map((section) => (
            <Reveal key={section.title}>
              <section>
                <h2 className="mb-4 text-xl font-bold text-title sm:text-2xl">{section.title}</h2>
                <div className="space-y-4 text-sm leading-relaxed text-title/75 sm:text-base">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.bullets && (
                    <ul className="list-disc space-y-2 pl-5">
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            </Reveal>
          ))}
        </div>
      </div>
    </article>
  );
}
