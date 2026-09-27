"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const shots = [
  { src: "/images/fade.jpg", alt: "Sharp skin fade finished at White Craft" },
  { src: "/images/master.jpg", alt: "Master barber shaping a cut in the chair" },
  { src: "/images/tattoo.jpg", alt: "Detail shot inside the White Craft studio" },
  { src: "/images/portrait.jpg", alt: "Client portrait after a White Craft visit" },
  { src: "/images/branding.jpg", alt: "White Craft Mens Salon branding" },
  { src: "/images/reelthumb.jpg", alt: "Behind the scenes at White Craft" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] as const } },
};

export default function Gallery() {
  return (
    <section id="gallery" className="border-t border-line px-6 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-wrap">
        <motion.span
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="mb-4 block text-[0.95rem] text-gold"
        >
          The work
        </motion.span>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="mb-12 max-w-[16ch] font-display text-[clamp(1.7rem,3.2vw,2.4rem)] text-cream"
        >
          A few we&rsquo;re proud of.
        </motion.h2>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {shots.map((shot, i) => (
            <motion.div
              key={shot.src}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.06 }}
              className={`relative aspect-square overflow-hidden ${
                i === 0 ? "col-span-2 row-span-2 aspect-square md:aspect-[4/5]" : ""
              }`}
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover grayscale-[0.35] contrast-[1.05] transition-all duration-500 ease-out hover:grayscale-0"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
