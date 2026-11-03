import Link from "next/link";

export default function HiringBanner() {
  return (
    <section className="border-t border-line px-6 py-16 sm:px-8">
      <div className="mx-auto flex max-w-wrap flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <p className="text-[0.95rem] text-gold">We&rsquo;re hiring</p>
          <h2 className="mt-2 font-display text-[clamp(1.7rem,3.2vw,2.4rem)]">Barbers &amp; grooming staff wanted.</h2>
        </div>
        <Link href="/careers#apply" className="border border-gold bg-gold px-7 py-3.5 text-[0.95rem] text-ink hover:bg-[#dcb75d]">
          Upload your resume
        </Link>
      </div>
    </section>
  );
}
