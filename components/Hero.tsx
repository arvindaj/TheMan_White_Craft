"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  return (
    <section ref={ref} className="relative flex min-h-[96svh] items-end overflow-hidden px-6 pb-16 pt-24 sm:px-8 sm:pb-20">
      <motion.div style={{ y, opacity }} className="absolute inset-0 -z-20">
        <Image
          src="/images/hero-bg.jpg"
          alt="Sans, founder of White Craft, layered editorial portrait"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[65%_20%] saturate-[0.55] brightness-[0.55]"
        />
      </motion.div>
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(20,18,16,0.35) 0%, rgba(20,18,16,0.55) 40%, #141210 92%), linear-gradient(90deg, rgba(20,18,16,0.75) 0%, rgba(20,18,16,0.15) 55%)",
        }}
      />

      <div className="mx-auto w-full max-w-wrap">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-sm tracking-wide text-cream-dim sm:text-base"
        >
          Coimbatore &middot; Men&rsquo;s grooming, done with intent
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65 }}
          className="mt-4 font-display text-[clamp(2.8rem,8.6vw,6.2rem)] leading-[0.98] text-cream [text-shadow:0_2px_30px_rgba(0,0,0,0.4)]"
        >
          White <em className="text-gold not-italic italic">Craft</em>
          <small className="mt-3.5 block font-body text-[clamp(0.85rem,1.6vw,1.05rem)] font-normal tracking-[0.3em] text-cream-dim">
            Mens Salon
          </small>
        </motion.h1>

        <motion.svg
          viewBox="0 0 800 24"
          preserveAspectRatio="none"
          className="my-7 h-6 w-full max-w-md"
          aria-hidden="true"
        >
          <motion.path
            d="M0,12 C120,4 200,20 340,11 C460,4 540,18 620,10 C680,5 740,14 800,9"
            stroke="#c8a24c"
            strokeWidth="1.4"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, delay: 1.15, ease: [0.2, 0.7, 0.2, 1] }}
          />
        </motion.svg>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.25 }}
          className="max-w-[52ch] text-[1.05rem] leading-[1.7] text-cream-dim"
        >
          A chair, a blade, and a man who&rsquo;s been sharpening his craft since
          before it had a name. Cuts, beard care and a bit of spa bliss &mdash;
          for the ones who&rsquo;d rather look sharp than talk about it.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.4 }}
          className="mt-9 flex flex-wrap gap-4"
        >
          <a
            href="https://www.instagram.com/whitecraft_salon/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-gold bg-gold px-7 py-3.5 text-[0.95rem] text-ink transition-colors hover:bg-[#dcb75d] hover:border-[#dcb75d]"
          >
            Book on Instagram
          </a>
          <a
            href="https://wa.me/916383368953?text=Hi%20White%20Craft%2C%20I%27d%20like%20to%20book%20a%20cut."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-gold-dim px-7 py-3.5 text-[0.95rem] text-cream transition-colors hover:border-gold hover:text-gold"
          >
            WhatsApp us
          </a>
          <a
            href="#the-man"
            className="inline-flex items-center gap-2 px-2 py-3.5 text-[0.95rem] text-cream-dim underline-offset-4 transition-colors hover:text-gold hover:underline"
          >
            The story
          </a>
        </motion.div>
      </div>
    </section>
  );
}
