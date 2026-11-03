export type SearchItem = {
  title: string;
  hint: string;
  href: string;
  keywords: string[];
};

export const quickSearches = ["Barber", "Haircut", "Hairstyles"] as const;

export const searchIndex: SearchItem[] = [
  { title: "Barber", hint: "Meet Sans, the master barber", href: "/#the-man", keywords: ["barber", "barbers", "sans", "sansmokie", "master", "stylist"] },
  { title: "Barber jobs", hint: "We're hiring barbers", href: "/careers#open-roles", keywords: ["barber job", "barber jobs", "hiring", "work as barber"] },
  { title: "Haircut", hint: "Fades, crops, classic & modern cuts", href: "/#services", keywords: ["haircut", "hair cut", "cut", "cuts", "trim", "fade", "crop"] },
  { title: "Hairstyles", hint: "See the work we're proud of", href: "/#gallery", keywords: ["hairstyle", "hairstyles", "style", "styles", "look", "looks", "fade", "gallery", "photos"] },
  { title: "Beard care", hint: "Line-ups, shaping, conditioning", href: "/#services", keywords: ["beard", "shave", "line up", "lineup", "grooming"] },
  { title: "Spa & facial", hint: "Hot towel, facial, scalp treatment", href: "/#services", keywords: ["spa", "facial", "massage", "scalp", "towel"] },
  { title: "Careers", hint: "Open positions at White Craft", href: "/careers", keywords: ["career", "careers", "job", "jobs", "hiring", "vacancy", "work", "join", "recruit"] },
  { title: "Upload resume", hint: "Apply in under a minute", href: "/careers#apply", keywords: ["resume", "cv", "apply", "application", "upload"] },
  { title: "Book an appointment", hint: "DM @whitecraft_salon on Instagram", href: "https://www.instagram.com/whitecraft_salon/", keywords: ["book", "booking", "appointment", "slot", "instagram"] },
  { title: "Location & directions", hint: "73a Athipalayam Road, Coimbatore", href: "/#visit", keywords: ["location", "address", "map", "visit", "where", "directions", "coimbatore"] },
];

export function runSearch(query: string): SearchItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return searchIndex
    .map((item) => {
      const t = item.title.toLowerCase();
      let score = 0;
      if (t === q) score = 100;
      else if (t.startsWith(q)) score = 80;
      else if (t.includes(q)) score = 60;
      else if (item.keywords.some((k) => k === q)) score = 70;
      else if (item.keywords.some((k) => k.startsWith(q) || q.startsWith(k))) score = 50;
      else if (item.keywords.some((k) => k.includes(q))) score = 30;
      else if (item.hint.toLowerCase().includes(q)) score = 10;
      return { item, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.item)
    .slice(0, 6);
}
