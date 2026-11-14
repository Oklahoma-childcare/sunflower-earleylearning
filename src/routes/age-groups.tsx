import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowRight, Heart } from "lucide-react";
import { AGE_GROUPS, SITE } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { PhotoSlot } from "@/components/PhotoSlot";
export const Route = createFileRoute("/age-groups")({ component: AgeGroups });
function AgeGroups() { return <main id="main-content">
  <section className="interior-header"><div className="container-wide"><span className="section-label">THE LITTLE YEARS / BIG MILESTONES</span><h1>Every age has<br/><em>its own magic.</em></h1><p>From infants to school-age children, explore child care options for each stage of growing up.</p></div></section>
  <section className="section-space"><div className="container-wide program-list">{AGE_GROUPS.map((group, i) => <Reveal className="program-row" key={group.number}><div className={`program-number age-${group.color}`}>{group.number}</div><div className="program-copy"><span className="tiny-uppercase">{group.ages}</span><h2>{group.label}</h2><p>{group.description}</p><a href={SITE.phoneHref} className="text-link">Ask about availability <ArrowUpRight size={17}/></a></div><div className="program-photo"><PhotoSlot type="square" photoKey={group.label.toLowerCase() as "infants" | "toddlers" | "preschool" | "school-age"} title={`${group.label} learning inspiration`}/></div></Reveal>)}</div></section>
  <section className="soft-section"><div className="container-wide soft-inner"><Heart size={32}/><div><h2>Let's find the right next step.</h2><p>Contact us for current openings, tuition, daily routines, and details about getting started.</p></div><Link to="/contact" className="button button-dark">Contact the center <ArrowRight size={17}/></Link></div></section>
</main>; }
