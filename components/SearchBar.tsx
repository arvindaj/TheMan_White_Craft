"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { quickSearches, runSearch } from "@/lib/search";

export default function SearchBar({ onNavigate }: { onNavigate?: () => void }) {
  const router = useRouter();
  const id = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const results = useMemo(() => runSearch(query), [query]);
  const listId = `${id}-list`;

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (e.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const go = (href: string) => {
    setOpen(false);
    setQuery("");
    inputRef.current?.blur();
    onNavigate?.();
    if (href.startsWith("http")) window.open(href, "_blank", "noopener,noreferrer");
    else router.push(href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, Math.max(results.length - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      go(results[active].href);
    } else if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  };

  const showPanel = open;

  return (
    <div ref={wrapRef} className="relative w-full">
      <form role="search" onSubmit={(e) => e.preventDefault()} className="relative">
        <label htmlFor={`${id}-input`} className="sr-only">
          Search barber, haircut, hairstyles
        </label>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-cream-dim"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
        <input
          ref={inputRef}
          id={`${id}-input`}
          type="search"
          role="combobox"
          aria-expanded={showPanel}
          aria-controls={listId}
          aria-activedescendant={results[active] ? `${id}-opt-${active}` : undefined}
          autoComplete="off"
          enterKeyHint="search"
          placeholder="Search barber, haircut, hairstyles…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          className="h-11 w-full rounded-none border border-line bg-surface pl-10 pr-10 text-base text-cream placeholder:text-cream-dim/70 focus:border-gold focus:outline-none sm:text-[0.95rem]"
        />
        <kbd
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 border border-line px-1.5 text-[0.7rem] text-cream-dim lg:block"
        >
          /
        </kbd>
      </form>

      {showPanel && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 border border-line bg-surface shadow-2xl shadow-black/50">
          {query.trim() === "" ? (
            <div className="p-4">
              <p className="mb-3 text-[0.8rem] tracking-wide text-cream-dim">Popular searches</p>
              <div className="flex flex-wrap gap-2">
                {quickSearches.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => {
                      setQuery(q);
                      setActive(0);
                      inputRef.current?.focus();
                    }}
                    className="border border-gold-dim px-4 py-2 text-[0.9rem] text-cream transition-colors hover:border-gold hover:text-gold"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <p className="p-4 text-[0.9rem] text-cream-dim">
              Nothing found for &ldquo;{query}&rdquo;. Try barber, haircut or hairstyles.
            </p>
          ) : (
            <ul id={listId} role="listbox" className="max-h-[60vh] overflow-auto py-1">
              {results.map((r, i) => (
                <li
                  key={r.title}
                  id={`${id}-opt-${i}`}
                  role="option"
                  aria-selected={i === active}
                  onMouseEnter={() => setActive(i)}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => go(r.href)}
                  className={`cursor-pointer px-4 py-3 ${i === active ? "bg-ink" : ""}`}
                >
                  <span className="block text-[0.95rem] text-cream">{r.title}</span>
                  <span className="block text-[0.8rem] text-cream-dim">{r.hint}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
