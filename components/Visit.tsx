"use client";

import { motion } from "framer-motion";

export default function Visit() {
  return (
    <section className="border-t border-line px-6 py-28 sm:px-8 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className="mx-auto grid max-w-wrap grid-cols-1 gap-10 sm:grid-cols-2"
      >
        <div>
          <h2 className="mb-5 font-display text-[clamp(1.7rem,3.2vw,2.4rem)]">
            Walk in, or write in first.
          </h2>
          <p className="leading-[1.8] text-cream-dim">
            <strong className="mb-1.5 block font-medium text-cream">White Craft Mens Salon</strong>
            73a, Athipalayam Road,
            <br />
            Sunnambukalvai, Coimbatore,
            <br />
            Tamil Nadu 641046
          </p>
        </div>
        <div className="flex flex-col items-start justify-center gap-4">
          <p className="leading-[1.8] text-cream-dim">
            Fastest way to book: WhatsApp the shop directly. Prefer Instagram? DM
            @whitecraft_salon and Sans&rsquo; team will sort the slot.
          </p>
          <div className="flex flex-wrap gap-3.5">
            <a
              href="https://wa.me/916383368953?text=Hi%20White%20Craft%2C%20I%27d%20like%20to%20book%20a%20cut."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[#25D366] bg-[#25D366] px-7 py-3.5 text-[0.95rem] text-[#0b1710] transition-colors hover:bg-[#1ebd59] hover:border-[#1ebd59]"
            >
              WhatsApp +91 63833 68953
            </a>
            <a
              href="https://www.instagram.com/whitecraft_salon/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-gold bg-gold px-7 py-3.5 text-[0.95rem] text-ink transition-colors hover:bg-[#dcb75d] hover:border-[#dcb75d]"
            >
              DM @whitecraft_salon
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
