import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Heart, MapPin, Sun, Clock3, ChevronRight, Sprout, ShieldCheck } from "lucide-react";
import { SITE, AGE_GROUPS } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { PhotoSlot } from "@/components/PhotoSlot";
import { SunflowerMark } from "@/components/SunflowerMark";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <main id="main-content">
    <section className="hero-section">
      <div className="hero-ambient hero-ambient-a" /><div className="hero-ambient hero-ambient-b" />
      <div className="container-wide hero-grid">
        <div className="hero-content">
          <div className="eyebrow"><span className="eyebrow-dot"/> CHILD CARE IN TULSA, OKLAHOMA</div>
          <h1>Little moments.<br/><em>Bright futures.</em></h1>
          <p className="hero-description">Explore early childhood care with <strong>Sunflower Early Learning Center</strong> - serving Tulsa families from infancy through school age.</p>
          <div className="hero-actions"><Link to="/age-groups" className="button button-dark">Explore age groups <ArrowUpRight size={19}/></Link><Link to="/contact" className="text-link">Find us in Tulsa <ArrowRight size={17}/></Link></div>
          <div className="hero-proof"><div className="proof-icon"><Heart size={19}/></div><span>Infants through school-age children<br/><strong>Child care in Tulsa, Oklahoma</strong></span></div>
        </div>
        <div className="hero-art">
          <div className="flower-circle"><SunflowerMark size={168}/><span className="flower-circle-caption">a place to<br/>grow &amp; discover</span></div>
          <div className="hero-photo-wrapper"><PhotoSlot type="hero" photoKey="hero" title="A bright early learning space" /></div>
          <div className="hero-photo-ticket"><Sun size={24}/><span><strong>Growing together</strong><small>One little day at a time</small></span></div>
          <div className="hero-squiggle" aria-hidden="true">*</div>
        </div>
      </div>
      <div className="container-wide hero-bottom"><div className="hero-bottom-copy">LITTLE DAYS. BIG POSSIBILITIES.</div><div className="hero-bottom-line"/><span>SCROLL TO EXPLORE <span aria-hidden="true">&#8595;</span></span></div>
    </section>
    <section className="facts-band" aria-label="Verified center facts"><div className="container-wide facts-grid"><div className="fact"><Sun size={24}/><div><b>3-star</b><span>Oklahoma program level</span></div></div><div className="fact"><Sprout size={24}/><div><b>4 age groups</b><span>Infant through school-age</span></div></div><div className="fact"><Clock3 size={24}/><div><b>Year-round</b><span>Daytime child care</span></div></div><div className="fact"><ShieldCheck size={24}/><div><b>Subsidy accepted</b><span>Child care support</span></div></div></div></section>
    <section className="section-space age-section"><div className="container-wide"><Reveal><div className="section-topline"><span className="section-label">01 / EVERY STAGE MATTERS</span><span className="pill">FROM THE VERY BEGINNING</span></div><div className="section-title-row"><h2>Room to <em>grow.</em></h2><p>Every stage deserves room to grow. Explore care options from infancy to the school-age years.</p></div></Reveal><div className="age-cards">{AGE_GROUPS.map((group, i) => <Reveal key={group.label} delay={i * .08}><div className={`age-card age-${group.color}`}><div className="age-card-head"><span>{group.number} / 04</span><SunflowerMark size={29}/></div><h3>{group.label}</h3><p className="age-range">{group.ages}</p><p className="age-desc">{group.description}</p><Link to="/age-groups" className="age-more" aria-label={`Learn about ${group.label.toLowerCase()} care`}><ArrowUpRight size={18}/></Link></div></Reveal>)}</div><div className="age-note"><span>QUESTIONS ABOUT A PROGRAM?</span><Link to="/contact">Ask about openings <ArrowRight size={16}/></Link></div></div></section>
    <section className="info-section"><div className="container-wide info-grid"><Reveal className="info-photo"><PhotoSlot photoKey="classroom" title="Learning materials and play" /></Reveal><Reveal className="info-copy"><div className="section-label">02 / THE CENTER AT A GLANCE</div><h2>Feel connected before you <em>visit.</em></h2><p>Located at <strong>{SITE.address}</strong>, Sunflower Early Learning Center provides year-round daytime child care for infants through school-age children.</p><div className="info-list"><div><span>01</span> Year-round daytime care</div><div><span>02</span> Program capacity: 25</div><div><span>03</span> Child care subsidy accepted</div></div><Link to="/about" className="inline-cta">More about the center <span><ArrowUpRight size={18}/></span></Link></Reveal></div></section>
    <section className="hours-section section-space"><div className="container-wide hours-grid"><Reveal><div className="section-label">03 / WHEN TO FIND US</div><h2>A little clarity<br/>for your <em>calendar.</em></h2><p>Find a time that works for your family with our regular opening hours.</p><Link to="/contact" className="button button-outline">Plan your visit <ArrowUpRight size={17}/></Link></Reveal><Reveal><div className="hours-card"><div className="hours-header"><span>WEEKLY HOURS</span><Clock3 size={24}/></div>{SITE.hours.map((item) => <div className="hours-row" key={item.day}><span>{item.day}</span><strong>{item.closes ? `${item.opens} - ${item.closes}` : item.opens}</strong></div>)}</div></Reveal></div></section>
    <section className="contact-banner"><div className="container-wide contact-banner-inner"><div className="banner-flower"><SunflowerMark size={128}/></div><div><span className="section-label">READY TO LEARN MORE?</span><h2>Start with a <em>hello.</em></h2><p>Ask the center about care options, availability, and next steps.</p></div><a className="button button-light" href={SITE.phoneHref}>Call {SITE.phoneDisplay} <ArrowUpRight size={19}/></a></div></section>
    
  </main>;
}
