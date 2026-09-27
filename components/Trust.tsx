"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedNumber from "./AnimatedNumber";

export default function Trust() {
  return (
    <section className="border-t border-line px-6 py-24 sm:px-8">
      <div className="mx-auto grid max-w-wrap grid-cols-1 items-center gap-9 md:grid-cols-[1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
        >
          <AnimatedNumber
            to={10000}
            suffix="+"
            className="font-display text-[clamp(3rem,9vw,5.6rem)] leading-none text-gold"
          />
          <p className="mt-2.5 max-w-[46ch] text-[1.05rem] text-cream-dim">
            Gents who&rsquo;ve sat in the chair and trusted White Craft with the first
            impression that matters most &mdash; their own. Kids included.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="relative aspect-[353/542] w-full overflow-hidden"
        >
          <Image
            src="/images/kid.jpg"
            alt="Happy young client at White Craft Mens Salon"
            fill
            sizes="(min-width: 768px) 45vw, 90vw"
            className="object-cover saturate-90"
          />
        </motion.div>
      </div>
    </section>
  );
}
