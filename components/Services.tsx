"use client";

import { motion } from "framer-motion";

const services = [
  {
    name: "Cuts",
    desc: "Fades, crops, classic and contemporary \u2014 shaped to your face, not a reference photo.",
    mark: "signature",
  },
  {
    name: "Beard Care",
    desc: "Line-ups, shaping and conditioning that hold their edge for weeks, not days.",
    mark: "precision",
  },
  {
    name: "Spa Bliss",
    desc: "Hot towel, facial and scalp treatments \u2014 the part of the visit you didn\u2019t know you needed.",
    mark: "unwind",
  },
];

export default function Services() {
  return (
    <section className="border-t border-line px-6 py-24 sm:px-8">
      <div className="mx-auto max-w-wrap">
        <h2 className="mb-12 max-w-[16ch] font-display text-[clamp(1.7rem,3.2vw,2.4rem)]">
          Three things we don&rsquo;t rush.
        </h2>
        <div className="flex flex-col">
          {services.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={`grid grid-cols-[1fr_auto] items-center gap-5 border-t border-line py-7 ${
                i === services.length - 1 ? "border-b" : ""
              }`}
            >
              <div>
                <h3 className="font-display text-xl font-medium text-cream sm:text-2xl">{s.name}</h3>
                <p className="mt-1.5 max-w-[48ch] text-[0.95rem] text-cream-dim">{s.desc}</p>
              </div>
              <span className="whitespace-nowrap text-[0.85rem] tracking-wide text-gold-dim">{s.mark}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
