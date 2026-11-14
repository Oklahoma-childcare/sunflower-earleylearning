import fs from "node:fs";
import path from "node:path";
const cwd = process.cwd();
// Load Vite-style local env settings before building static HTML. This script
// runs BEFORE Vite, so Vite's own env loading has not happened yet.
const fileEnv = {};
for (const name of [".env", ".env.local"]) {
  const fullPath = path.join(cwd, name);
  if (!fs.existsSync(fullPath)) continue;
  for (const line of fs.readFileSync(fullPath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*(VITE_[A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!match) continue;
    let value = match[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
    fileEnv[match[1]] = value;
  }
}
for (const [key, value] of Object.entries(fileEnv)) {
  if (process.env[key] === undefined) process.env[key] = value;
}
// Shared public profile list, editable once for both React and static HTML.
const socials = JSON.parse(fs.readFileSync(path.join(cwd, "src/lib/social-links.json"), "utf8"));
const photos = JSON.parse(fs.readFileSync(path.join(cwd, "src/lib/photos.json"), "utf8"));
const routes = {
  "/": {
    title: "Sunflower Early Learning Center | Child Care in Tulsa, OK",
    description: "Learn about Sunflower Early Learning Center in Tulsa, Oklahoma. Find verified child care ages, hours, location, contact details, and subsidy information.",
    h1: "Little moments. Bright futures.",
    content: `<p>Explore Sunflower Early Learning Center, a year-round child care center at 7705 E 31st St in Tulsa, Oklahoma.</p><section><h2>Child care for different ages</h2><p>Oklahoma Human Services lists infants, toddlers, preschool children, and school-age children among the ages served.</p><ul><li>Infants: 0-11 months</li><li>Toddlers: 12-23 months</li><li>Preschool: 2-4 years</li><li>School-age: 5 years and older</li></ul><a href="/age-groups/">Explore age groups</a></section><section><h2>Verified information</h2><p>Sunflower Early Learning Center is listed as a three-star child care program with a capacity of 25. The state lists year-round care and acceptance of subsidy.</p><p>Hours: Monday, Tuesday, Thursday and Friday 7:30 AM-5:30 PM; Wednesday 7:00 AM-5:30 PM. Closed Saturday and Sunday.</p></section>`,
  },
  "/age-groups": {
    title: "Child Care Age Groups | Sunflower Early Learning Center Tulsa",
    description: "Find infant, toddler, preschool, and school-age care information for Sunflower Early Learning Center in Tulsa, Oklahoma.",
    h1: "Child care age groups in Tulsa",
    content: `<p>Oklahoma Human Services lists the following ages accepted at Sunflower Early Learning Center:</p><ul><li>Infants, 0-11 months</li><li>Toddlers, 12-23 months</li><li>Preschool children, 2-4 years</li><li>School-age children, 5 years and older</li></ul><p>Call (918) 734-0139 for current openings, routines, and program details.</p>`,
  },
  "/about": {
    title: "About Sunflower Early Learning Center | Tulsa, Oklahoma",
    description: "Get to know Sunflower Early Learning Center in Tulsa, including its child care age groups, director, and location.",
    h1: "About Sunflower Early Learning Center",
    content: `<p>Sunflower Early Learning Center is located at 7705 E 31st St, Tulsa, OK 74145, serving Tulsa families with year-round child care.</p><p>The center offers year-round daytime care for infants through school-age children. It has a 3-star program level, capacity of 25, and accepts child care subsidy.</p><p>Contact the center for enrollment, visit information, and tuition details.</p>`,
  },
  "/faq": {
    title: "Child Care FAQs | Sunflower Early Learning Center Tulsa",
    description: "Frequently asked questions about hours, accepted ages, subsidies, enrollment inquiries, and the location of Sunflower Early Learning Center in Tulsa.",
    h1: "Frequently asked questions about the center",
    content: `<h2>Which ages are accepted?</h2><p>Infants through school-age children are listed by Oklahoma Human Services.</p><h2>Are subsidies accepted?</h2><p>Yes. The state child care locator indicates subsidy acceptance. Confirm the current process directly with the center.</p><h2>What are the hours?</h2><p>Monday, Tuesday, Thursday, Friday: 7:30 AM-5:30 PM. Wednesday: 7:00 AM-5:30 PM. Saturday and Sunday: closed.</p><h2>How can I ask about enrollment?</h2><p>Call (918) 734-0139 or email j.crystal72@yahoo.com.</p>`,
  },
  "/contact": {
    title: "Contact & Directions | Sunflower Early Learning Center Tulsa",
    description: "Call Sunflower Early Learning Center at (918) 734-0139. Find opening hours, directions, and contact details for 7705 E 31st St in Tulsa.",
    h1: "Contact Sunflower Early Learning Center in Tulsa",
    content: `<address>7705 E 31st St, Tulsa, OK 74145</address><p><a href="tel:+19187340139">(918) 734-0139</a></p><p><a href="mailto:j.crystal72@yahoo.com">j.crystal72@yahoo.com</a></p><p>Director: Crystal Johnson.</p><h2>Opening hours</h2><p>Monday, Tuesday, Thursday, Friday 7:30 AM-5:30 PM. Wednesday 7:00 AM-5:30 PM. Saturday and Sunday closed.</p><p><a href="https://www.google.com/maps/search/?api=1&amp;query=7705%20E%2031st%20St%2C%20Tulsa%2C%20OK%2074145">Get directions</a></p>`,
  },
};
const esc = s => s.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const base = (process.env.VITE_SITE_URL || process.env.SITE_URL || "").trim().replace(/\/$/, "");
const approved = process.env.VITE_PUBLICATION_APPROVED === "true";
const photoApproved = process.env.VITE_PHOTOS_APPROVED === "true";
const publicReady = approved && photoApproved && /^https:\/\/[^/]+$/.test(base);
if (approved && !photoApproved) throw new Error("Publication requested without approved real organization photos. Provide authorized photos first.");
if (approved && !publicReady) throw new Error("Publication requested but VITE_SITE_URL must be a valid https:// domain.");
const photoNames = Object.keys(photos);
const photoManifest = Object.fromEntries(photoNames.map(name => [name,
  photoApproved && fs.existsSync(path.join(cwd, `public/photos/${name}.webp`))]));
// Photos can be added one at a time. Missing photos retain the original placeholders.
if (photoApproved && !Object.values(photoManifest).some(Boolean)) {
  throw new Error("VITE_PHOTOS_APPROVED=true requires at least one rights-cleared real organization photo in public/photos/.");
}
fs.writeFileSync(path.join(cwd, "src/lib/approved-photos.json"), JSON.stringify(photoManifest, null, 2) + "\n");
const address = { "@type": "PostalAddress", streetAddress: "7705 E 31st St", addressLocality: "Tulsa", addressRegion: "OK", postalCode: "74145", addressCountry: "US" };
const providerData = {
  "@context": "https://schema.org",
  "@type": "ChildCare",
  name: "Sunflower Early Learning Center",
  identifier: "K830058415",
  address,
  telephone: "+1-918-734-0139",
  email: "j.crystal72@yahoo.com",
  hasMap: "https://www.google.com/maps/search/?api=1&query=7705%20E%2031st%20St%2C%20Tulsa%2C%20OK%2074145",
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Thursday", "Friday"], opens: "07:30", closes: "17:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "07:00", closes: "17:30" },
  ],
  // Social accounts are supplied by the project sheet and require ownership verification before publishing.
  sameAs: ["https://childcarefind.okdhs.org/providers/K830058415", ...Object.values(socials).filter(v => /^https:\/\/\S+/i.test(v))],
};
if (publicReady) providerData.url = `${base}/`;
const firstPhoto = photoNames.find(name => photoManifest[name]);
if (publicReady && firstPhoto) providerData.image = photoNames.filter(name => photoManifest[name]).map(name => `${base}/photos/${name}.webp`);
const outDir = path.join(cwd, "public");
// An accessible, styled, content-complete HTML version loads before React.
// This also provides immediate page content to crawlers and non-JS visitors.
const staticCss = fs.readFileSync(path.join(cwd, "src/index.css"), "utf8")
  .replace(/^@tailwind (base|components|utilities);\s*$/gm, "");
fs.writeFileSync(path.join(outDir, "fallback.css"), staticCss);
const flowerSvg = `<svg width="43" height="43" viewBox="0 0 100 100" aria-hidden="true"><g fill="#e9b848">${Array.from({length:12},(_,i)=>`<ellipse cx="50" cy="22" rx="11" ry="20" transform="rotate(${i*30} 50 50)"/>`).join("")}</g><circle cx="50" cy="50" r="21" fill="#633d25"/></svg>`;
const navLinks = Object.entries(routes).map(([r, d]) => `<a class="nav-link" href="${r === "/" ? "/" : `${r}/`}">${esc(r === "/" ? "Home" : r === "/age-groups" ? "Age groups" : r === "/faq" ? "FAQs" : r.slice(1))}</a>`).join("");
const socialLinkLabels = {facebook: "Facebook", instagram: "Instagram", youtube: "YouTube"};
const socialHtml = variant => {
  const links = Object.entries(socials).filter(([key, url]) => socialLinkLabels[key] && typeof url === "string" && /^https:\/\/\S+/i.test(url.trim()));
  if (!links.length) return "";
  return `<div class="social-links social-links-${variant}" aria-label="Social media profiles">${links.map(([key,url]) => `<a class="social-link" href="${esc(url)}" target="_blank" rel="noopener noreferrer" aria-label="Visit Sunflower Early Learning Center on ${socialLinkLabels[key]} (opens in a new tab)"><span>${socialLinkLabels[key]}</span><span aria-hidden="true">&nearr;</span></a>`).join("")}</div>`;
};
const staticHeader = `<a class="skip-link" href="#main-content">Skip to content</a><header class="site-header"><div class="container-wide nav-inner"><a class="brand" href="/">${flowerSvg}<span class="brand-text"><strong>sunflower</strong><small>EARLY LEARNING CENTER</small></span></a><nav class="desktop-links" aria-label="Main navigation">${navLinks}</nav><a class="nav-cta" href="tel:+19187340139">Get in touch</a><button type="button" class="mobile-toggle" aria-label="Open menu" aria-controls="static-mobile-nav" aria-expanded="false">Menu</button></div><nav id="static-mobile-nav" class="mobile-panel" aria-label="Mobile navigation">${navLinks}</nav></header>`;
const photoBlock = (key, shape="wide") => {
  const photo = photos[key];
  if (!photo || !photo.src) return `<div class="photo-slot photo-slot-${shape} no-photo"><div class="photo-fallback" aria-hidden="true">&#10045;</div></div>`;
  return `<div class="photo-slot photo-slot-${shape} has-photo"><img class="approved-photo" src="${esc(photo.src)}" alt="${esc(photo.alt)}" loading="${shape === 'hero' ? 'eager' : 'lazy'}" decoding="async" style="object-position:${esc(photo.position || 'center')}"/></div>`;
};
const hoursBlock = `<div class="hours-card"><div class="hours-header"><span>WEEKLY HOURS</span></div>${[['Monday','7:30 AM - 5:30 PM'],['Tuesday','7:30 AM - 5:30 PM'],['Wednesday','7:00 AM - 5:30 PM'],['Thursday','7:30 AM - 5:30 PM'],['Friday','7:30 AM - 5:30 PM'],['Saturday','Closed'],['Sunday','Closed']].map(([d,h])=>`<div class="hours-row"><span>${d}</span><strong>${h}</strong></div>`).join("")}</div>`;
const staticFooter = `<footer class="footer"><div class="container-wide"><div class="footer-main"><div class="footer-intro"><a class="footer-logo" href="/">${flowerSvg}<span><strong>sunflower</strong><small>EARLY LEARNING CENTER</small></span></a><p>Explore child care options, opening hours, and ways to connect with our Tulsa center.</p>${socialHtml("footer")}</div><div class="footer-col"><h3>Explore</h3>${Object.entries(routes).map(([r])=>`<a href="${r === "/" ? "/" : `${r}/`}">${r === "/" ? "Home" : r.slice(1).replace("-", " ")}</a>`).join("")}</div><div class="footer-col"><h3>Visit &amp; connect</h3><a href="https://www.google.com/maps/search/?api=1&amp;query=7705%20E%2031st%20St%2C%20Tulsa%2C%20OK%2074145">7705 E 31st St, Tulsa, OK 74145</a><a href="tel:+19187340139">(918) 734-0139</a><a href="https://childcarefind.okdhs.org/providers/K830058415">State child care listing</a></div></div><div class="footer-bottom"><span>Sunflower Early Learning Center &middot; Tulsa, Oklahoma</span><span>Made for families in Tulsa, OK.</span></div></div></footer>`;
const info = ``;
const staticHome = `<main id="main-content"><section class="hero-section"><div class="container-wide hero-grid"><div class="hero-content"><div class="eyebrow">CHILD CARE IN TULSA, OKLAHOMA</div><h1>Little moments.<br/><em>Bright futures.</em></h1><p class="hero-description">Explore early childhood care with <strong>Sunflower Early Learning Center</strong> - serving Tulsa families from infancy through school age.</p><div class="hero-actions"><a href="/age-groups/" class="button button-dark">Explore age groups &nearr;</a><a href="/contact/" class="text-link">Find us in Tulsa &rarr;</a></div><div class="hero-proof">Infants through school-age children. <strong>Child care in Tulsa, Oklahoma.</strong></div></div><div class="hero-art"><div class="flower-circle">${flowerSvg}<span class="flower-circle-caption">a place to<br/>grow &amp; discover</span></div><div class="hero-photo-wrapper">${photoBlock('hero','hero')}</div><div class="hero-photo-ticket"><span><strong>Growing together</strong><small>One little day at a time</small></span></div></div></div><div class="container-wide hero-bottom">LITTLE DAYS. BIG POSSIBILITIES.</div></section><section class="facts-band"><div class="container-wide facts-grid"><div class="fact"><div><b>3-star</b><span>State program level</span></div></div><div class="fact"><div><b>4 age groups</b><span>Infant through school-age</span></div></div><div class="fact"><div><b>Year-round</b><span>Daytime child care</span></div></div><div class="fact"><div><b>Subsidy accepted</b><span>Child care support</span></div></div></div></section><section class="age-section section-space"><div class="container-wide"><div class="section-label">01 / EVERY STAGE MATTERS</div><div class="section-title-row"><h2>Room to <em>grow.</em></h2><p>Explore care options from infancy through the school-age years.</p></div><div class="age-cards">${[['01','Infants','0-11 months','peach'],['02','Toddlers','12-23 months','leaf'],['03','Preschool','2-4 years','sun'],['04','School-age','5 years and older','lavender']].map(([num,name,age,tone])=>`<div class="age-card age-${tone}"><div class="age-card-head">${num} / 04</div><h3>${name}</h3><p class="age-range">${age}</p><p class="age-desc">Contact the center to ask about care options, daily routines, and availability.</p><a class="age-more" aria-label="Learn about ${name} care" href="/age-groups/">&nearr;</a></div>`).join("")}</div><div class="age-note">QUESTIONS ABOUT A PROGRAM? <a href="/contact/">Ask about openings &rarr;</a></div></div></section><section class="info-section"><div class="container-wide info-grid"><div class="info-photo">${photoBlock('classroom')}</div><div class="info-copy"><div class="section-label">02 / THE CENTER AT A GLANCE</div><h2>Feel connected before you <em>visit.</em></h2><p>Located at <strong>7705 E 31st St, Tulsa, OK 74145</strong>, Sunflower Early Learning Center provides year-round child care for infants through school-age children.</p><div class="info-list"><div><span>01</span> Year-round daytime care</div><div><span>02</span> Program capacity: 25</div><div><span>03</span> Child care subsidy accepted</div></div><a href="/about/" class="inline-cta">More about the center</a></div></div></section><section class="hours-section section-space"><div class="container-wide hours-grid"><div><span class="section-label">03 / WHEN TO FIND US</span><h2>A little clarity<br/>for your <em>calendar.</em></h2><p>Find a time that works for your family with our regular opening hours.</p><a class="button button-outline" href="/contact/">Plan your visit &nearr;</a></div>${hoursBlock}</div></section><section class="contact-banner"><div class="container-wide contact-banner-inner"><div>${flowerSvg}</div><div><span class="section-label">READY TO LEARN MORE?</span><h2>Start with a <em>hello.</em></h2><p>Ask the center about care options, availability, and next steps.</p></div><a class="button button-light" href="tel:+19187340139">Call (918) 734-0139 &nearr;</a></div></section></main>`;
const statInterior = (route,page) => {
 const header = `<section class="interior-header"><div class="container-wide"><span class="section-label">SUNFLOWER / TULSA OKLAHOMA</span><h1>${esc(page.h1)}</h1><p>${esc(page.description)}</p></div></section>`;
 let body;
 if(route==='/age-groups') body=`<section class="section-space"><div class="container-wide program-list">${[['01','Infants','0-11 months','peach'],['02','Toddlers','12-23 months','leaf'],['03','Preschool','2-4 years','sun'],['04','School-age','5 years and older','lavender']].map(([n,label,age,tone])=>`<div class="program-row"><div class="program-number age-${tone}">${n}</div><div class="program-copy"><span class="tiny-uppercase">${age}</span><h2>${label}</h2><p>Find age-appropriate care information and ask about availability directly.</p><a href="tel:+19187340139" class="text-link">Ask about availability &nearr;</a></div><div class="program-photo">${photoBlock(label.toLowerCase(),'square')}</div></div>`).join('')}</div></section>`;
 else if(route==='/about')body=`<section class="section-space"><div class="container-wide about-grid"><div>${photoBlock('about')}</div><div class="about-text"><span class="section-label">SUNFLOWER AT A GLANCE</span><h2>Putting the important details <em>first.</em></h2>${page.content}<a class="button button-dark" href="/contact/">Ask a question &nearr;</a></div></div></section><section class="about-facts section-space"><div class="container-wide"><h2>The essentials at a <em>glance.</em></h2><div class="verified-grid"><div><span>PROGRAM LEVEL</span><strong>3-star level</strong></div><div><span>CAPACITY</span><strong>25 children</strong></div><div><span>DIRECTOR</span><strong>Crystal Johnson</strong></div></div></div></section>`;
 else if(route==='/faq')body=`<section class="section-space"><div class="container-wide faq-layout"><aside><span class="section-label">LET'S MAKE THINGS SIMPLE</span><h2>Wondering about <em>care?</em></h2><p>Explore our hours, care options, and how to get in touch.</p></aside><div class="faq-accordions">${[['Which ages are accepted?','Infant, toddler, preschool and school-age child care options are available.'],['Are subsidies accepted?','Yes, child care subsidies are accepted. Contact the center for current enrollment information.'],['What are the hours?','Weekdays from 7:30 AM to 5:30 PM except Wednesday beginning at 7:00 AM. Closed Saturday and Sunday.'],['How can I ask about enrollment?','Call (918) 734-0139 or email j.crystal72@yahoo.com.']].map(([q,a])=>`<article class="faq-item"><h3><button type="button" aria-expanded="true">${q}</button></h3><div class="faq-answer"><p>${a}</p></div></article>`).join('')}</div></div></section>`;
 else body=`<section class="section-space"><div class="container-wide contact-grid"><div class="contact-cards"><a class="contact-card" href="tel:+19187340139"><span><small>CALL THE CENTER</small><strong>(918) 734-0139</strong></span></a><a class="contact-card" href="mailto:j.crystal72@yahoo.com"><span><small>SEND AN EMAIL</small><strong>j.crystal72@yahoo.com</strong></span></a><a class="contact-card" href="https://www.google.com/maps/search/?api=1&amp;query=7705%20E%2031st%20St%2C%20Tulsa%2C%20OK%2074145"><span><small>FIND US</small><strong>7705 E 31st St, Tulsa, OK 74145</strong></span></a>${socialHtml("contact")}</div><div>${hoursBlock}</div></div></section>`;
 return `<main id="main-content">${header}${body}</main>`;
};

for (const [route, page] of Object.entries(routes)) {
  const urlPath = route === "/" ? "/" : `${route}/`;
  const canonical = publicReady ? `${base}${urlPath}` : "";
  const current = route === "/" ? cwd : path.join(cwd, route.slice(1));
  fs.mkdirSync(current, { recursive: true });
  const node = `${staticHeader}${route === "/" ? staticHome : statInterior(route, page)}${staticFooter}`;
  const photoPreload = route === "/" && photos.hero?.src ? `<link rel="preload" as="image" href="${esc(photos.hero.src)}" fetchpriority="high"/>` : "";
  const ogImage = publicReady && firstPhoto ? `<meta property="og:image" content="${base}/photos/${firstPhoto}.webp" />` : "";
  const ld = JSON.stringify(providerData).replaceAll("<", "\\u003c");
  const html = `<!doctype html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><meta name="theme-color" content="#fcfaf4"/><title>${esc(page.title)}</title><meta name="description" content="${esc(page.description)}"/><meta name="robots" content="${publicReady ? "index,follow,max-image-preview:large" : "noindex,nofollow"}"/>${canonical ? `<link rel="canonical" href="${canonical}"/>` : ""}${photoPreload}<meta property="og:type" content="website"/><meta property="og:title" content="${esc(page.title)}"/><meta property="og:description" content="${esc(page.description)}"/>${canonical ? `<meta property="og:url" content="${canonical}"/>` : ""}${ogImage}<meta name="twitter:card" content="${ogImage ? "summary_large_image" : "summary"}"/><link rel="icon" href="/favicon.svg" type="image/svg+xml"/><link rel="stylesheet" href="/fallback.css"/><script defer src="/preview.js"></script><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Fraunces:opsz,wght,SOFT,WONK@9..144,400,20,1;9..144,500,20,1;9..144,600,20,1;9..144,700,20,1&display=swap" rel="stylesheet"/><script type="application/ld+json">${ld}</script></head><body><div id="root">${node}</div><script type="module" src="/src/main.tsx"></script></body></html>`;
  fs.writeFileSync(path.join(current, "index.html"), html);
}
if (publicReady) {
  const urls = Object.keys(routes).map(route => `<url><loc>${base}${route === "/" ? "/" : `${route}/`}</loc></url>`).join("");
  fs.writeFileSync(path.join(outDir, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`);
  fs.writeFileSync(path.join(outDir, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`);
} else {
  fs.rmSync(path.join(outDir, "sitemap.xml"), { force: true });
  fs.writeFileSync(path.join(outDir, "robots.txt"), "User-agent: *\nAllow: /\n");
}
console.log(`Generated ${Object.keys(routes).length} SEO-ready HTML entry pages (${publicReady ? "indexable production" : "noindex preview"}).`);
