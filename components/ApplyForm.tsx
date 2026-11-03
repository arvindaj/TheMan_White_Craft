"use client";

import { useRef, useState } from "react";
import { jobs, OPEN_APPLICATION, MAX_RESUME_MB, RESUME_EXT, WHATSAPP_NUMBER } from "@/lib/jobs";

type Status = "idle" | "sending" | "done" | "error";

const field =
  "h-12 w-full border border-line bg-surface px-4 text-base text-cream placeholder:text-cream-dim/60 focus:border-gold focus:outline-none";

export default function ApplyForm({ role, onRoleChange }: { role: string; onRoleChange: (r: string) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [waNote, setWaNote] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileErr, setFileErr] = useState("");
  const [drag, setDrag] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [msg, setMsg] = useState("");

  const pick = (f: File | undefined | null) => {
    setFileErr("");
    if (!f) return;
    const ext = "." + (f.name.split(".").pop() || "").toLowerCase();
    if (!RESUME_EXT.includes(ext)) return setFileErr("Please upload a PDF, Word document or image.");
    if (f.size > MAX_RESUME_MB * 1024 * 1024) return setFileErr(`File is too large. Max ${MAX_RESUME_MB} MB.`);
    setFile(f);
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return setFileErr("Please attach your resume.");
    setStatus("sending");
    setMsg("");
    const fd = new FormData(e.currentTarget);
    fd.set("role", role);
    fd.set("resume", file);
    try {
      const res = await fetch("/api/apply", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  const sendWhatsApp = async () => {
    const form = formRef.current;
    if (!form) return;
    setWaNote("");
    if (!form.reportValidity()) return;
    if (!file) return setFileErr("Please attach your resume.");
    const v = (n: string) => ((form.elements.namedItem(n) as HTMLInputElement | null)?.value || "").trim();
    const text = [
      "Hi White Craft, I'd like to apply.",
      `Role: ${role}`,
      `Name: ${v("name")}`,
      `Phone: ${v("phone")}`,
      v("experience") && `Experience: ${v("experience")}`,
      v("message") && `Note: ${v("message")}`,
    ]
      .filter(Boolean)
      .join("\n");

    // Phones: share the resume file straight into WhatsApp
    try {
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], text });
        setWaNote("Choose WhatsApp, then the White Craft contact, and send.");
        return;
      }
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
    }
    // Desktop / fallback: open chat with details, applicant attaches the resume
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    setWaNote("WhatsApp opened. Tap the paperclip, attach your resume file and send.");
  };

  if (status === "done") {
    return (
      <div role="status" className="border border-gold-dim bg-surface p-8">
        <h3 className="font-display text-2xl text-cream">Application received.</h3>
        <p className="mt-3 text-cream-dim">
          Thank you. Sans&rsquo; team will review your resume and call you if there&rsquo;s a fit.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={submit} className="grid gap-5">
      {/* honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-[0.9rem] text-cream-dim">
          Full name
          <input name="name" required minLength={2} maxLength={80} autoComplete="name" placeholder="Your name" className={field} />
        </label>
        <label className="grid gap-2 text-[0.9rem] text-cream-dim">
          Phone / WhatsApp
          <input
            name="phone"
            required
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            pattern="[+0-9 ()\-]{8,18}"
            title="Enter a valid phone number"
            placeholder="98765 43210"
            className={field}
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-[0.9rem] text-cream-dim">
          Email <span className="sr-only">(optional)</span>
          <input name="email" type="email" maxLength={120} autoComplete="email" placeholder="Optional" className={field} />
        </label>
        <label className="grid gap-2 text-[0.9rem] text-cream-dim">
          Applying for
          <select name="role" value={role} onChange={(e) => onRoleChange(e.target.value)} className={field}>
            {jobs.map((j) => (
              <option key={j.id} value={j.title}>
                {j.title}
              </option>
            ))}
            <option value={OPEN_APPLICATION}>{OPEN_APPLICATION}</option>
          </select>
        </label>
      </div>

      <label className="grid gap-2 text-[0.9rem] text-cream-dim">
        Years of experience
        <input name="experience" maxLength={40} placeholder="e.g. 2 years, or Fresher" className={field} />
      </label>

      <div className="grid gap-2">
        <span className="text-[0.9rem] text-cream-dim">Resume</span>
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDrag(false);
            pick(e.dataTransfer.files?.[0]);
          }}
          className={`flex flex-col items-center gap-3 border border-dashed px-5 py-8 text-center transition-colors ${
            drag ? "border-gold bg-ink" : "border-gold-dim bg-surface"
          }`}
        >
          <input
            ref={fileRef}
            type="file"
            id="resume"
            accept={RESUME_EXT.join(",")}
            className="sr-only"
            onChange={(e) => pick(e.target.files?.[0])}
          />
          {file ? (
            <>
              <p className="max-w-full truncate text-cream">{file.name}</p>
              <p className="text-[0.8rem] text-cream-dim">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  if (fileRef.current) fileRef.current.value = "";
                }}
                className="text-[0.9rem] text-gold underline underline-offset-4"
              >
                Remove
              </button>
            </>
          ) : (
            <>
              <label
                htmlFor="resume"
                className="inline-flex h-12 cursor-pointer items-center border border-gold bg-gold px-7 text-[0.95rem] text-ink hover:bg-[#dcb75d]"
              >
                Upload resume
              </label>
              <p className="text-[0.8rem] text-cream-dim">
                or drag &amp; drop &middot; PDF, Word or photo &middot; max {MAX_RESUME_MB} MB
              </p>
            </>
          )}
        </div>
        {fileErr && (
          <p role="alert" className="text-[0.85rem] text-[#e58a7a]">
            {fileErr}
          </p>
        )}
      </div>

      <label className="grid gap-2 text-[0.9rem] text-cream-dim">
        Anything to add? <span className="sr-only">(optional)</span>
        <textarea
          name="message"
          rows={3}
          maxLength={800}
          placeholder="Optional — your style, past salons, Instagram handle…"
          className={`${field} h-auto py-3`}
        />
      </label>

      {status === "error" && (
        <p role="alert" className="text-[0.9rem] text-[#e58a7a]">
          {msg}{" "}
          <a href="https://www.instagram.com/whitecraft_salon/" className="underline" target="_blank" rel="noopener noreferrer">
            Or DM us on Instagram.
          </a>
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={status === "sending"}
          className="h-14 bg-gold px-7 text-[1rem] text-ink transition-colors hover:bg-[#dcb75d] disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Submit application"}
        </button>
        <button
          type="button"
          onClick={sendWhatsApp}
          className="inline-flex h-14 items-center justify-center gap-2 border border-gold px-7 text-[1rem] text-cream transition-colors hover:bg-gold hover:text-ink"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
            <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.8 14.2c-.2.7-1.4 1.3-1.9 1.3-.5.1-1.1.1-1.8-.1a12 12 0 0 1-5.1-3.4 8.8 8.8 0 0 1-1.8-3c-.3-1.6.5-2.4.8-2.7.3-.3.7-.3.9-.3h.6c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .6l-.4.6-.3.4c-.1.2-.2.3 0 .6.4.7 1 1.3 1.6 1.8.8.6 1.4.8 1.7 1 .2.1.4.1.6-.1l.7-.9c.2-.2.4-.2.6-.1l1.9.9c.2.1.4.2.4.3.1.2.1.8-.1 1.4z" />
          </svg>
          Send on WhatsApp
        </button>
      </div>
      {waNote && (
        <p role="status" className="text-[0.9rem] text-gold">
          {waNote}
        </p>
      )}
    </form>
  );
}
