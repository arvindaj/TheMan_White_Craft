import type { Metadata } from "next";
import Footer from "@/components/Footer";
import CareersClient from "@/components/CareersClient";

export const metadata: Metadata = {
  title: "Barber & Salon Jobs in Coimbatore — Careers",
  description:
    "Barber and salon jobs in Coimbatore. White Craft Mens Salon is hiring barbers, trainees, spa therapists and front desk. Upload your resume in a minute.",
  keywords: ["barber jobs in Coimbatore", "salon jobs Coimbatore", "hairstylist vacancy Coimbatore", "barber trainee Coimbatore", "men's salon careers"],
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  return (
    <main>
      <section className="px-6 pb-16 pt-44 sm:px-8 sm:pb-20 md:pt-40">
        <div className="mx-auto max-w-wrap">
          <p className="text-sm tracking-wide text-cream-dim sm:text-base">Careers &middot; Coimbatore</p>
          <h1 className="mt-4 max-w-[14ch] font-display text-[clamp(2.4rem,7vw,5rem)] leading-[1] text-cream">
            Join the <em className="italic text-gold">chair.</em>
          </h1>
          <p className="mt-6 max-w-[52ch] text-[1.05rem] leading-[1.7] text-cream-dim">
            We&rsquo;re hiring barbers, trainees and grooming staff. Learn from Sans, work with a
            loyal client base, and grow with a salon that takes the craft seriously.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a href="#open-roles" className="border border-gold bg-gold px-7 py-3.5 text-[0.95rem] text-ink hover:bg-[#dcb75d]">
              See open roles
            </a>
            <a href="#apply" className="border border-gold-dim px-7 py-3.5 text-[0.95rem] text-cream hover:border-gold hover:text-gold">
              Upload resume
            </a>
          </div>
        </div>
      </section>
      <CareersClient />
      <Footer />
    </main>
  );
}
