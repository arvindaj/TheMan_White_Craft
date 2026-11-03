"use client";

import { useRef, useState } from "react";
import { jobs, OPEN_APPLICATION, MAX_RESUME_MB, RESUME_EXT } from "@/lib/jobs";

type Status = "idle" | "sending" | "done" | "error";

const field =
  "h-12 w-full border border-line bg-surface px-4 text-base text-cream placeholder:text-cream-dim/60 focus:border-gold focus:outline-none";

export default function ApplyForm({ role, onRoleChange }: { role: string; onRoleChange: (r: string) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
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
    <form onSubmit={submit} className="grid gap-5" noValidate={false}>
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

      <button
        type="submit"
        disabled={status === "sending"}
        className="h-14 bg-gold px-7 text-[1rem] text-ink transition-colors hover:bg-[#dcb75d] disabled:opacity-60 sm:w-fit"
      >
        {status === "sending" ? "Sending…" : "Submit application"}
      </button>
    </form>
  );
}
