"use client";

import { motion } from "framer-motion";

const WHATSAPP_NUMBER = "916383368953"; // India (+91) 63833 68953, wa.me format: country code + number, no plus/spaces
const WHATSAPP_MESSAGE = "Hi White Craft, I'd like to book a cut.";

export default function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message White Craft on WhatsApp"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1.8 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      className="fixed bottom-6 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] py-3.5 pl-3.5 pr-4 text-[#0b1710] shadow-[0_10px_30px_-8px_rgba(0,0,0,0.55)]"
      style={{
        bottom: "max(1.5rem, env(safe-area-inset-bottom, 0px) + 1rem)",
      }}
    >
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
        <path d="M17.47 14.38c-.29-.15-1.7-.84-1.97-.93-.26-.1-.46-.15-.65.15-.2.29-.75.93-.92 1.12-.17.2-.34.22-.63.08-.29-.15-1.22-.45-2.33-1.44-.86-.77-1.44-1.71-1.61-2-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.48.1-.2.05-.37-.02-.51-.08-.15-.65-1.58-.9-2.16-.24-.58-.48-.5-.65-.5-.17-.01-.36-.01-.56-.01s-.51.08-.78.37c-.26.29-1.02 1-1.02 2.43s1.04 2.82 1.19 3.01c.15.2 2.05 3.13 4.96 4.39.69.3 1.24.48 1.66.61.7.22 1.34.19 1.84.11.56-.08 1.7-.7 1.94-1.37.24-.68.24-1.26.17-1.38-.07-.12-.26-.2-.55-.34z"/>
        <path d="M12.02 2C6.5 2 2.02 6.48 2.02 12c0 1.85.5 3.58 1.36 5.07L2 22l5.1-1.34A9.94 9.94 0 0 0 12.02 22C17.53 22 22 17.52 22 12S17.53 2 12.02 2zm0 18.1c-1.6 0-3.1-.44-4.38-1.21l-.31-.19-3.03.79.81-2.95-.2-.3A8.08 8.08 0 0 1 3.9 12c0-4.48 3.65-8.12 8.12-8.12S20.15 7.52 20.15 12s-3.65 8.1-8.13 8.1z"/>
      </svg>
      <span className="hidden text-sm font-medium sm:inline">Chat on WhatsApp</span>
    </motion.a>
  );
}
