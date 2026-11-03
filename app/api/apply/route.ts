import { NextResponse } from "next/server";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { MAX_RESUME_MB, RESUME_EXT } from "@/lib/jobs";

export const runtime = "nodejs";

const clean = (v: FormDataEntryValue | null, max: number) =>
  typeof v === "string" ? v.replace(/[\r\n]+/g, " ").trim().slice(0, max) : "";
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]!));

// naive per-instance rate limit
const hits = new Map<string, number[]>();

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60_000);
  if (recent.length >= 5) return NextResponse.json({ error: "Too many attempts. Please try later." }, { status: 429 });
  hits.set(ip, [...recent, now]);

  let fd: FormData;
  try {
    fd = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  if (clean(fd.get("website"), 50)) return NextResponse.json({ ok: true }); // bot

  const name = clean(fd.get("name"), 80);
  const phone = clean(fd.get("phone"), 20);
  const email = clean(fd.get("email"), 120);
  const role = clean(fd.get("role"), 80);
  const experience = clean(fd.get("experience"), 40);
  const message = typeof fd.get("message") === "string" ? (fd.get("message") as string).trim().slice(0, 800) : "";
  const resume = fd.get("resume");

  if (name.length < 2) return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  if (!/^[+0-9 ()\-]{8,18}$/.test(phone)) return NextResponse.json({ error: "Please enter a valid phone number." }, { status: 400 });
  if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  if (!(resume instanceof File) || resume.size === 0) return NextResponse.json({ error: "Please attach your resume." }, { status: 400 });

  const ext = path.extname(resume.name).toLowerCase();
  if (!RESUME_EXT.includes(ext)) return NextResponse.json({ error: "Unsupported resume file type." }, { status: 400 });
  if (resume.size > MAX_RESUME_MB * 1024 * 1024) return NextResponse.json({ error: `Resume must be under ${MAX_RESUME_MB} MB.` }, { status: 400 });

  const buf = Buffer.from(await resume.arrayBuffer());
  const safeName = `${name.replace(/[^a-z0-9]+/gi, "_").slice(0, 30)}_resume${ext}`;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CAREERS_TO_EMAIL;

  if (apiKey && to) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CAREERS_FROM_EMAIL || "White Craft Careers <onboarding@resend.dev>",
        to: [to],
        reply_to: email || undefined,
        subject: `New application: ${role} — ${name}`,
        html: `<p><b>Role:</b> ${esc(role)}</p><p><b>Name:</b> ${esc(name)}</p><p><b>Phone:</b> ${esc(phone)}</p><p><b>Email:</b> ${esc(email) || "-"}</p><p><b>Experience:</b> ${esc(experience) || "-"}</p><p><b>Message:</b><br>${esc(message).replace(/\n/g, "<br>") || "-"}</p>`,
        attachments: [{ filename: safeName, content: buf.toString("base64") }],
      }),
    });
    if (!res.ok) {
      console.error("Resend error", res.status, await res.text().catch(() => ""));
      return NextResponse.json({ error: "Couldn't send your application. Please try again." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  }

  // Local/dev fallback: save to ./applications (not available on serverless hosts)
  if (process.env.NODE_ENV !== "production") {
    const dir = path.join(process.cwd(), "applications");
    await mkdir(dir, { recursive: true });
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    await writeFile(path.join(dir, `${stamp}_${safeName}`), buf);
    await writeFile(path.join(dir, `${stamp}.json`), JSON.stringify({ name, phone, email, role, experience, message }, null, 2));
    return NextResponse.json({ ok: true });
  }

  console.error("Careers form: RESEND_API_KEY / CAREERS_TO_EMAIL not configured");
  return NextResponse.json({ error: "Applications are temporarily unavailable." }, { status: 503 });
}
