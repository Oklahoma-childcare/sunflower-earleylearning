import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { SITE } from "@/lib/site";
import { SunflowerMark } from "./SunflowerMark";
import { SocialLinks } from "./SocialLinks";
export function Footer() {
  return (
    <footer className="footer">
      <div className="container-wide">
        <div className="footer-main">
          <div className="footer-intro"><div className="footer-logo"><SunflowerMark size={46} /><span><strong>sunflower</strong><small>EARLY LEARNING CENTER</small></span></div><p>Explore child care options, opening hours, and ways to connect with our Tulsa center.</p><SocialLinks variant="footer" /></div>
          <div className="footer-col"><h3>Explore</h3><Link to="/">Home</Link><Link to="/age-groups">Age groups</Link><Link to="/about">About</Link><Link to="/faq">FAQs</Link><Link to="/contact">Contact</Link></div>
          <div className="footer-col"><h3>Visit &amp; connect</h3><a href={SITE.mapUrl} target="_blank" rel="noreferrer"><MapPin size={15} /> {SITE.address}</a><a href={SITE.phoneHref}><Phone size={15} /> {SITE.phoneDisplay}</a><a href={SITE.officialListing} target="_blank" rel="noreferrer">State child care listing <ArrowUpRight size={14} /></a></div>
        </div>
        <div className="footer-bottom"><span>Sunflower Early Learning Center &middot; Tulsa, Oklahoma</span><span>Made for families in Tulsa, OK.</span></div>
      </div>
    </footer>
  );
}
