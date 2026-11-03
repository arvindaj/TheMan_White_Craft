"use client";

import { useState } from "react";
import { jobs } from "@/lib/jobs";
import ApplyForm from "./ApplyForm";

export default function CareersClient() {
  const [role, setRole] = useState(jobs[0].title);

  const applyFor = (title: string) => {
    setRole(title);
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <section id="open-roles" className="scroll-mt-32 md:scroll-mt-20 border-t border-line px-6 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-wrap">
          <h2 className="mb-10 font-display text-[clamp(1.7rem,3.2vw,2.4rem)]">Open positions</h2>
          <ul className="grid gap-4 md:grid-cols-2">
            {jobs.map((j) => (
              <li key={j.id} className="flex flex-col border border-line bg-surface p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-xl text-cream">{j.title}</h3>
                  <span className="text-[0.8rem] tracking-wide text-gold-dim">{j.type}</span>
                </div>
                <p className="mt-1 text-[0.85rem] text-gold">{j.exp}</p>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-cream-dim">{j.blurb}</p>
                <ul className="mt-4 grid gap-1.5 text-[0.9rem] text-cream-dim">
                  {j.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span aria-hidden="true" className="text-gold">
                        &ndash;
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => applyFor(j.title)}
                  className="mt-6 h-12 w-full border border-gold text-[0.95rem] text-cream transition-colors hover:bg-gold hover:text-ink sm:w-fit sm:px-8"
                >
                  Apply for this role
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="apply" className="scroll-mt-32 md:scroll-mt-20 border-t border-line px-6 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-wrap gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <div>
            <h2 className="font-display text-[clamp(1.7rem,3.2vw,2.4rem)]">Send your resume.</h2>
            <p className="mt-4 max-w-[38ch] leading-[1.8] text-cream-dim">
              Takes under a minute. Upload a PDF, Word file or even a photo of your resume. No
              account needed.
            </p>
            <p className="mt-6 text-[0.9rem] leading-[1.8] text-cream-dim">
              73a, Athipalayam Road, Sunnambukalvai, Coimbatore 641046
            </p>
          </div>
          <ApplyForm role={role} onRoleChange={setRole} />
        </div>
      </section>
    </>
  );
}
