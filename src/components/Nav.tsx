import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { SunflowerMark } from "./SunflowerMark";
import { SITE } from "@/lib/site";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/age-groups", label: "Age groups" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQs" },
  { to: "/contact", label: "Contact" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <>
      <header className="site-header">
        <div className="container-wide nav-inner">
          <Link to="/" className="brand" aria-label="Sunflower Early Learning Center home" onClick={() => setOpen(false)}>
            <SunflowerMark size={43} />
            <span className="brand-text"><strong>sunflower</strong><small>EARLY LEARNING CENTER</small></span>
          </Link>
          <nav className="desktop-links" aria-label="Main navigation">
            {LINKS.map((link) => <Link key={link.to} to={link.to} className={`nav-link ${pathname === link.to ? "is-active" : ""}`}>{link.label}</Link>)}
          </nav>
          <a className="nav-cta" href={SITE.phoneHref}>Get in touch <ArrowUpRight size={16} aria-hidden="true" /></a>
          <button type="button" className="mobile-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Close menu" : "Open menu"}>{open ? <X size={24} /> : <Menu size={24} />}</button>
        </div>
        <nav id="mobile-nav" className={`mobile-panel ${open ? "open" : ""}`} aria-label="Mobile navigation">
          {LINKS.map((link) => <Link key={link.to} to={link.to} className={pathname === link.to ? "is-active" : ""} onClick={() => setOpen(false)}>{link.label}<ArrowUpRight size={16} /></Link>)}
          <a href={SITE.phoneHref} onClick={() => setOpen(false)}>Call the center <ArrowUpRight size={16} /></a>
        </nav>
      </header>
    </>
  );
}
