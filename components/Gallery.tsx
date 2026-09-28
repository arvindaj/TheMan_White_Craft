"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const photos = [
  {
    src: "/images/branding.jpg",
    alt: "Client mid-cut at White Craft Hair Skin Groom",
    label: "Hair \u00b7 Skin \u00b7 Groom",
    sub: "the studio",
    href: "https://www.instagram.com/p/DYmsOd8SGqt/",
  },
  {
    src: "/images/tattoo.jpg",
    alt: "Sharp fade finished under a gold cape at White Craft",
    label: "Structured fade",
    sub: "finished, gold cape",
    href: "https://www.instagram.com/p/DDJbAT6ShSn/",
  },
  {
    src: "/images/fade.jpg",
    alt: "Textured fringe styling close-up at White Craft",
    label: "Textured crop",
    sub: "in progress",
    href: "https://www.instagram.com/p/C5LkNFwvcvz/",
  },
  {
    src: "/images/kid.jpg",
    alt: "Young client all smiles after his first White Craft cut",
    label: "First cut, big smile",
    sub: "every age, same care",
    href: "https://www.instagram.com/p/C3XqhkiLXBq/",
  },
  {
    src: "/images/reelthumb.jpg",
    alt: "Watch the White Craft reel on Instagram",
    label: "Watch the reel",
    sub: "on Instagram",
    href: "https://www.instagram.com/reel/DctKvYHvros/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==",
    reel: true,
  },
  {
    src: "/images/portrait.jpg",
    alt: "Sans at work, layered portrait of the craft",
    label: "The craft, up close",
    sub: "@whitecraft_salon",
    href: "https://www.instagram.com/whitecraft_salon/",
  },
];

export default function Gallery() {
  return (
    <section className="border-t border-line px-6 py-24 sm:px-8">
      <div className="mx-auto max-w-wrap">
        <div className="mb-11 flex flex-wrap items-end justify-between gap-4">
          <h2 className="max-w-[16ch] font-display text-[clamp(1.7rem,3.2vw,2.4rem)]">
            In the chair, this month.
          </h2>
          <a
            href="https://www.instagram.com/whitecraft_salon/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.9rem] text-cream-dim underline-offset-4 transition-colors hover:text-gold hover:underline"
          >
            From @whitecraft_salon on Instagram
          </a>
        </div>

        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3">
          {photos.map((p, i) => (
            <motion.a
              key={p.src}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative block aspect-[3/4] overflow-hidden bg-surface"
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(min-width: 640px) 33vw, 50vw"
                className="object-cover grayscale-[0.15] transition-transform duration-[600ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.06] group-hover:grayscale-0"
              />
              {p.reel && (
                <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-cream/35 bg-ink/55 text-sm text-cream backdrop-blur-sm">
                  ▶
                </span>
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3.5 pb-3 pt-4 text-[0.8rem] text-cream">
                {p.label}
                <span className="mt-0.5 block text-[0.7rem] tracking-wide text-gold-dim">{p.sub}</span>
              </div>
            </motion.a>
          ))}
        </div>

        <p className="mt-6 text-center text-[0.78rem] text-cream-dim/70 sm:text-left">
          Opens the post on Instagram in a new tab. If Instagram prompts you to log in, tap
          &ldquo;Not now&rdquo; in the corner &mdash; the post itself is public.
        </p>
      </div>
    </section>
  );
}
