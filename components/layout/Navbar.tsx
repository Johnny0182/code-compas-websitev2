"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site-config";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <nav className="nav-shell" aria-label="Primary navigation">
      <a className="wordmark" href="#home" aria-label={`${siteConfig.agencyName}, home`}>
        {siteConfig.agencyName}
      </a>
      <div className="desktop-nav">
        {siteConfig.navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
      </div>
      <button className="menu-trigger" type="button" aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((value) => !value)}>
        <span /><span /><span />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" className="mobile-menu" initial={reduceMotion ? false : { opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? {} : { opacity: 0, y: -16 }} transition={{ duration: 0.22 }}>
            {siteConfig.navigation.map((item, index) => <a key={item.href} href={item.href} onClick={() => setOpen(false)}><span>0{index + 1}</span>{item.label}</a>)}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
