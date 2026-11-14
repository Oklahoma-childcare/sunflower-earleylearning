import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, BadgeCheck, MapPinned, Sun } from "lucide-react";
import { SITE } from "@/lib/site";
import { PhotoSlot } from "@/components/PhotoSlot";
import { Reveal } from "@/components/Reveal";
export const Route = createFileRoute("/about")({ component: About });
function About() { return <main id="main-content">
  <section className="interior-header about-header"><div className="container-wide"><span className="section-label">GET TO KNOW THE CENTER</span><h1>Close to home.<br/><em>Full of possibility.</em></h1><p>Get to know Sunflower Early Learning Center in Tulsa, Oklahoma.</p></div></section>
  <section className="section-space"><div className="container-wide about-grid"><Reveal><PhotoSlot type="wide" photoKey="about" title="A cozy space for early learning"/></Reveal><Reveal className="about-text"><div className="section-label">SUNFLOWER AT A GLANCE</div><h2>Putting the important details <em>first.</em></h2><p>Sunflower Early Learning Center is a year-round child care center in Tulsa, serving families with infants, toddlers, preschoolers, and school-age children.</p><p>Explore the age groups we serve and get in touch to ask about current openings, daily routines, tuition, or scheduling a visit.</p><Link to="/contact" className="button button-dark">Ask a question <ArrowUpRight size={18}/></Link></Reveal></div></section>
  <section className="section-space about-facts"><div className="container-wide"><span className="section-label">GET TO KNOW SUNFLOWER</span><h2>The essentials at a <em>glance.</em></h2><div className="verified-grid"><div><Sun/><span>PROGRAM LEVEL</span><strong>3-star level</strong></div><div><BadgeCheck/><span>CAPACITY</span><strong>25 children</strong></div><div><MapPinned/><span>DIRECTOR</span><strong>{SITE.director}</strong></div></div></div></section>
  <section className="soft-section"><div className="container-wide soft-inner"><MapPinned size={32}/><div><h2>Rooted in Tulsa.</h2><p>{SITE.address}. We look forward to connecting with families in our community.</p></div><Link to="/contact" className="button button-dark">Get directions <ArrowRight size={17}/></Link></div></section>
</main>; }
