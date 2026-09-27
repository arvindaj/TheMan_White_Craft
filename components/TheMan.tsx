"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] as const } },
};

export default function TheMan() {
  return (
    <section id="the-man" className="border-t border-line px-6 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto grid max-w-wrap grid-cols-1 gap-11 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <motion.figure
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="relative"
        >
          <div className="relative aspect-[350/546] w-full max-w-[340px] overflow-hidden">
            <Image
              src="/images/sansmoke.jpg"
              alt="Sans, the barber behind White Craft, working in the chair"
              fill
              sizes="(min-width: 768px) 340px, 60vw"
              className="object-cover grayscale-[0.25] contrast-[1.05]"
            />
          </div>
          <figcaption className="mt-3 text-[0.85rem] text-cream-dim">
            <b className="font-normal text-gold">Sans</b> &middot; @sansmokie &middot; founder
          </figcaption>
        </motion.figure>

        <div>
          <motion.span
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            className="mb-4 block text-[0.95rem] text-gold"
          >
            The man behind the craft
          </motion.span>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            className="mb-6 max-w-[13ch] font-display text-[clamp(1.7rem,3.2vw,2.5rem)] text-cream"
          >
            The Man.
          </motion.h2>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-5 text-[1.05rem] leading-[1.85] text-cream-dim"
          >
            <p>
              Before <strong className="font-medium text-cream">White Craft</strong> had a
              signboard, it had a name people already trusted &mdash;{" "}
              <strong className="font-medium text-cream">Sans</strong>, known across Coimbatore
              as <strong className="font-medium text-cream">@sansmokie</strong>. Years in the
              chair taught him that a good cut isn&rsquo;t a service, it&rsquo;s a decision
              someone makes about how they want to be seen.
            </p>
            <p>
              White Craft is that decision, made permanent. A space built around one rule:
              nothing leaves the chair unfinished. Not a fade, not a beard line, not a
              first-time visitor&rsquo;s nerves.
            </p>
            <p>The shop carries the name. The hands still carry the reputation. That&rsquo;s the whole pitch.</p>

            <div className="mt-6 flex flex-wrap gap-3.5">
              <a
                href="https://www.instagram.com/whitecraft_salon/"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-line px-4 py-2.5 text-sm text-cream-dim transition-colors hover:border-gold hover:text-gold"
              >
                @whitecraft_salon &mdash; the shop
              </a>
              <a
                href="https://www.instagram.com/sansmokie/"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-line px-4 py-2.5 text-sm text-cream-dim transition-colors hover:border-gold hover:text-gold"
              >
                @sansmokie &mdash; the man behind it
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
