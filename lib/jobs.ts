export type Job = {
  id: string;
  title: string;
  type: string;
  exp: string;
  blurb: string;
  points: string[];
};

export const jobs: Job[] = [
  {
    id: "senior-barber",
    title: "Senior Barber",
    type: "Full-time",
    exp: "3+ years",
    blurb: "Own a chair. Fades, crops and classic cuts with clean, consistent finishing.",
    points: ["Skin fades, scissor work, beard line-ups", "Client consultation & style advice", "Incentives on top of salary"],
  },
  {
    id: "junior-barber",
    title: "Junior Barber / Trainee",
    type: "Full-time",
    exp: "Freshers welcome",
    blurb: "Learn the craft directly under Sans. We train, you bring the hunger.",
    points: ["Paid on-the-job training", "Grow into your own chair", "Basic cutting knowledge is a plus"],
  },
  {
    id: "spa-therapist",
    title: "Spa & Grooming Therapist",
    type: "Full-time",
    exp: "1+ year",
    blurb: "Facials, scalp treatments and hot-towel services that clients remember.",
    points: ["Facial, head massage, cleanup", "Hygiene-first workflow", "Calm, professional attitude"],
  },
  {
    id: "front-desk",
    title: "Front Desk & Social Media",
    type: "Full-time / Part-time",
    exp: "Freshers welcome",
    blurb: "Handle bookings on Instagram, greet clients and help shoot reels.",
    points: ["Fluent Tamil & English", "Comfortable with Instagram & a phone camera", "Friendly and organised"],
  },
];

export const OPEN_APPLICATION = "General application";
export const MAX_RESUME_MB = 5;
export const RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
];
export const RESUME_EXT = [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"];
