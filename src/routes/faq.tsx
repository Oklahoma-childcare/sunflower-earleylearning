import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Minus, ArrowUpRight } from "lucide-react";
import { FAQS, SITE } from "@/lib/site";
export const Route = createFileRoute("/faq")({ component: FAQPage });
function FAQPage() {
  const [open, setOpen] = useState<number>(0);
  return <main id="main-content"><section className="interior-header faq-header"><div className="container-wide"><span className="section-label">FREQUENTLY ASKED QUESTIONS</span><h1>Good questions.<br/><em>Helpful answers.</em></h1><p>Helpful answers about age groups, regular hours, subsidy assistance, and getting in touch.</p></div></section>
    <section className="section-space"><div className="container-wide faq-layout"><aside><div className="section-label">LET'S MAKE THINGS SIMPLE</div><h2>Wondering<br/>about <em>care?</em></h2><p>For the most current enrollment information, speak with the center directly.</p><a className="button button-dark" href={SITE.phoneHref}>Call the center <ArrowUpRight size={17}/></a></aside><div className="faq-accordions">{FAQS.map((item, i) => <article key={item.question} className={`faq-item ${open === i ? "active" : ""}`}><h3><button type="button" aria-controls={`faq-answer-${i}`} aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}><span>{item.question}</span><span className="faq-toggle">{open === i ? <Minus size={19}/> : <Plus size={19}/>}</span></button></h3><div className="faq-answer" id={`faq-answer-${i}`} hidden={open !== i}><p>{item.answer}</p></div></article>)}</div></div></section><section className="soft-section"><div className="container-wide soft-inner"><div><h2>Still curious?</h2><p>Get in touch with any other questions about care, schedules, and enrollment.</p></div><Link to="/contact" className="button button-dark">Contact &amp; directions <ArrowUpRight size={17}/></Link></div></section>
  </main>;
}
