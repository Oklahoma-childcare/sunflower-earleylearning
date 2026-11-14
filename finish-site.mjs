import fs from 'node:fs';
import path from 'node:path';

// Run in the Sunflower React project root: node finish-site.mjs
// Preserves the original sunflower theme and layout. Does not publish the site.
const root = process.cwd();
if (fs.existsSync(path.join(root, '.sunflower-finished'))) {
  console.log('Updates already applied. Edit src/lib/photos.json for new photos.');
  process.exit(0);
}
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const write = (file, content) => {
  const target = path.join(root, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content, 'utf8');
};
const edit = (file, edits) => {
  let text = read(file);
  for (const [from, to] of edits) {
    if (typeof from === 'string' && !text.includes(from)) {
      throw new Error(`${file}: expected content not found: ${from.slice(0, 65)}`);
    }
    if (from instanceof RegExp && !from.test(text)) {
      throw new Error(`${file}: expected pattern not found: ${from}`);
    }
    text = text.replace(from, to);
  }
  write(file, text);
};

// These are licensed illustrative photographs of real playrooms/teaching materials.
// They do NOT depict Sunflower Early Learning Center. To use real center photos,
// put authorized images under public/photos and change each src to /photos/name.webp.
const photos = {
  hero: {
    src: 'https://images.unsplash.com/photo-1763310225230-6e15b125935a?auto=format&fit=crop&w=1500&q=85',
    alt: 'Bright early-learning playroom with child-sized tables; illustrative photograph',
    position: 'center center',
  },
  classroom: {
    src: 'https://images.pexels.com/photos/8923987/pexels-photo-8923987.jpeg?auto=compress&cs=tinysrgb&w=1300',
    alt: 'Colorful learning materials arranged on classroom shelves; illustrative photograph',
    position: 'center center',
  },
  about: {
    src: 'https://images.pexels.com/photos/9951401/pexels-photo-9951401.jpeg?auto=compress&cs=tinysrgb&w=1300',
    alt: 'Child-friendly activity corner with small table and toys; illustrative photograph',
    position: 'center center',
  },
  infants: {
    src: 'https://images.pexels.com/photos/8923956/pexels-photo-8923956.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Brightly colored developmental toys on a table; illustrative photograph',
    position: 'center center',
  },
  toddlers: {
    src: 'https://images.unsplash.com/photo-1763310225537-f7161d5c93e9?auto=format&fit=crop&w=950&q=85',
    alt: 'Children\'s pretend-play kitchen area with small tables; illustrative photograph',
    position: 'center center',
  },
  preschool: {
    src: 'https://images.pexels.com/photos/8535634/pexels-photo-8535634.jpeg?auto=compress&cs=tinysrgb&w=950',
    alt: 'Empty kindergarten classroom with child-sized furniture; illustrative photograph',
    position: 'center center',
  },
  'school-age': {
    src: 'https://images.pexels.com/photos/15052434/pexels-photo-15052434.jpeg?auto=compress&cs=tinysrgb&w=950',
    alt: 'Learning space with small tables and colorful teaching materials; illustrative photograph',
    position: 'center center',
  },
};
write('src/lib/photos.json', JSON.stringify(photos, null, 2) + '\n');

write('src/components/PhotoSlot.tsx', `import { useState } from 'react';
import photos from '@/lib/photos.json';
import { SunflowerMark } from './SunflowerMark';

type PhotoKey = keyof typeof photos;
type Props = {
  photoKey: PhotoKey;
  type?: 'hero' | 'wide' | 'square';
  title?: string;
};

/** Change the photo URLs or /photos/*.webp paths in src/lib/photos.json. */
export function PhotoSlot({ photoKey, type = 'wide', title }: Props) {
  const photo = photos[photoKey];
  const [error, setError] = useState(false);
  const hasImage = Boolean(photo.src) && !error;

  return (
    <div className={\`photo-slot photo-slot-\${type} \${hasImage ? 'has-photo' : 'no-photo'}\`}>
      {hasImage ? (
        <img
          className="approved-photo"
          src={photo.src}
          alt={photo.alt || title || 'Early learning photograph'}
          title={title}
          loading={type === 'hero' ? 'eager' : 'lazy'}
          fetchPriority={type === 'hero' ? 'high' : 'auto'}
          decoding="async"
          style={{ objectPosition: photo.position || 'center' }}
          onError={() => setError(true)}
        />
      ) : (
        <div className="photo-fallback" role="img" aria-label={title || 'Sunflower decoration'}>
          <SunflowerMark size={80} />
        </div>
      )}
    </div>
  );
}
`);

// Remove proposal labels only from the visible interface, not from release/SEO controls.
edit('src/components/Nav.tsx', [
  ['      {SITE.demoMode && <div className="preview-banner">INDEPENDENT PREVIEW CONCEPT &nbsp; / &nbsp; NOT AN OFFICIAL ORGANIZATION WEBSITE</div>}\n', ''],
]);
edit('src/components/Footer.tsx', [
  ['Find public information about child care, age groups, hours, and ways to get in touch in Tulsa, Oklahoma.', 'Explore child care options, opening hours, and ways to connect with our Tulsa center.'],
  ['<span>&copy; {new Date().getFullYear()} Sunflower Early Learning Center informational concept.</span><span>{SITE.demoMode ? "Independent design preview; not an official or endorsed website." : "Made for families in Tulsa, OK."}</span>', '<span>Sunflower Early Learning Center &middot; Tulsa, Oklahoma</span><span>Made for families in Tulsa, OK.</span>'],
]);
edit('src/routes/contact.tsx', [
  [/<div className="contact-note">[\s\S]*?<\/div>/, ''],
  ['Hours are taken from the Oklahoma Human Services listing. Call to confirm holidays or schedule changes.', 'Plan your visit around our regular hours. Give us a call for holiday or special schedules.'],
  ['PUBLIC LISTED HOURS', 'OPENING HOURS'],
  ['Our published<br/><em>opening hours.</em>', 'Our regular<br/><em>opening hours.</em>'],
]);
edit('src/routes/index.tsx', [
  ['Your starting point for exploring <strong>Sunflower Early Learning Center</strong> - a year-round child care center serving families in Tulsa.', 'Explore early childhood care with <strong>Sunflower Early Learning Center</strong> - serving Tulsa families from infancy through school age.'],
  ['<PhotoSlot type="hero" title="The Tulsa center" note="Facility photographs require approval before publication." />', '<PhotoSlot type="hero" photoKey="hero" title="A bright early learning space" />'],
  ['Oklahoma Human Services listed program', 'Child care in Tulsa, Oklahoma'],
  ['A GOOD DAY STARTS WITH GOOD INFORMATION.', 'LITTLE DAYS. BIG POSSIBILITIES.'],
  ['State program level', 'Oklahoma program level'],
  ['Per state listing', 'Child care support'],
  ['Every age brings new questions. These are the age ranges listed by Oklahoma Human Services for the center.', 'Every stage deserves room to grow. Explore care options from infancy to the school-age years.'],
  ['AGE GROUP AVAILABILITY MAY CHANGE.', 'QUESTIONS ABOUT A PROGRAM?'],
  ['<PhotoSlot title="Inside the learning center" note="Approved classroom images will be displayed here." />', '<PhotoSlot photoKey="classroom" title="Learning materials and play" />'],
  ['Sunflower Early Learning Center is listed by Oklahoma Human Services as a child care center at <strong>{SITE.address}</strong>. The public listing includes its hours, accepted age groups, and contact information.', 'Located at <strong>{SITE.address}</strong>, Sunflower Early Learning Center provides year-round daytime child care for infants through school-age children.'],
  ['Listed total capacity: 25', 'Program capacity: 25'],
  ['Subsidy acceptance listed by the state', 'Child care subsidy accepted'],
  ["The center's published daytime hours are below. Please confirm holiday changes directly with the center.", 'Find a time that works for your family with our regular opening hours.'],
  ['<p className="hours-source">Source: Oklahoma Human Services child care locator.</p>', ''],
  [/<div className="container-wide source-footer"><MapPin size=\{16\}\/>(?:.|\n)*?<\/div>/, ''],
]);
edit('src/routes/about.tsx', [
  ['Helpful, publicly verified information about Sunflower Early Learning Center in Tulsa, Oklahoma.', 'Get to know Sunflower Early Learning Center in Tulsa, Oklahoma.'],
  ['<PhotoSlot type="wide" title="Center building and entrance"/>', '<PhotoSlot type="wide" photoKey="about" title="A cozy space for early learning"/>'],
  ['Sunflower Early Learning Center is listed in the Oklahoma Human Services child care locator under facility ID <strong>{SITE.id}</strong>. The listing describes a year-round, daytime child care center that serves infants through school-age children.', 'Sunflower Early Learning Center is a year-round child care center in Tulsa, serving families with infants, toddlers, preschoolers, and school-age children.'],
  ['Families can use this information to begin an informed conversation with the center. For tours, enrollment, pricing, classroom activities, or current openings, contact the provider directly.', 'Explore the age groups we serve and get in touch to ask about current openings, daily routines, tuition, or scheduling a visit.'],
  ['ON THE PUBLIC RECORD', 'GET TO KNOW SUNFLOWER'],
  ['Facts you can <em>check.</em>', 'The essentials at a <em>glance.</em>'],
  ['STATE PROGRAM LEVEL', 'PROGRAM LEVEL'],
  ['LISTED CAPACITY', 'CAPACITY'],
  [/<a href=\{SITE\.officialListing\} target="_blank" rel="noreferrer" className="source-link">[\s\S]*?<\/a>/, ''],
  ['Reach the center directly for up-to-date program information.', 'We look forward to connecting with families in our community.'],
]);
edit('src/routes/age-groups.tsx', [
  ['Find the age groups listed for Sunflower Early Learning Center in Tulsa and start a conversation about the right care for your family.', 'From infants to school-age children, explore child care options for each stage of growing up.'],
  ['<PhotoSlot type="square" title={`${group.label} care setting`}/>', '<PhotoSlot type="square" photoKey={group.label.toLowerCase() as "infants" | "toddlers" | "preschool" | "school-age"} title={`${group.label} learning inspiration`}/>'],
  ['The state listing confirms accepted age groups, but specific classroom availability, fees, routines, and staffing should be confirmed directly with the center.', 'Contact us for current openings, tuition, daily routines, and details about getting started.'],
]);
edit('src/routes/faq.tsx', [
  ["Essential details from the state's public child care listing, gathered in one easy place.", 'Helpful answers about age groups, regular hours, subsidy assistance, and getting in touch.'],
  ['Contact the center to confirm any details that may have changed since the public listing was updated.', 'Get in touch with any other questions about care, schedules, and enrollment.'],
]);
edit('src/lib/site.ts', [
  ['Oklahoma Human Services lists care for infants (0 to 11 months), toddlers (12 to 23 months), preschool children (2 to 4 years), and school-age children (5 years and older). Contact the center to confirm current openings for your child\'s age.', 'We serve infants (0 to 11 months), toddlers (12 to 23 months), preschool children (2 to 4 years), and school-age children (5 years and older). Ask us about openings for your child\'s age.'],
  ['Yes. The Oklahoma Human Services child care locator lists Sunflower Early Learning Center as accepting subsidy. Confirm current eligibility, openings, and enrollment steps directly with the center.', 'Yes, child care subsidies are accepted. Contact the center for current eligibility, openings, and enrollment steps.'],
  ['The public state listing shows Monday, Tuesday, Thursday, and Friday from 7:30 AM to 5:30 PM, and Wednesday from 7:00 AM to 5:30 PM. The center is listed as closed on weekends. Call ahead to confirm holiday schedules or changes.', 'Our regular hours are 7:30 AM to 5:30 PM on Monday, Tuesday, Thursday, and Friday; Wednesday starts at 7:00 AM. We are closed on weekends. Call ahead about holiday schedules.'],
  ['The listed address is 7705 E 31st St, Tulsa, OK 74145. Use the directions link on the Contact page to confirm your route.', 'Find us at 7705 E 31st St, Tulsa, OK 74145. Use the directions link on our Contact page to plan your visit.'],
]);

// The build script also creates the static HTML used for no-JS visitors and SEO.
// Update it so React and pre-rendered HTML have the same finished appearance.
edit('scripts/build-html.mjs', [
  ['const socials = JSON.parse(fs.readFileSync(path.join(cwd, "src/lib/social-links.json"), "utf8"));', 'const socials = JSON.parse(fs.readFileSync(path.join(cwd, "src/lib/social-links.json"), "utf8"));\nconst photos = JSON.parse(fs.readFileSync(path.join(cwd, "src/lib/photos.json"), "utf8"));'],
  ['const photoNames = ["exterior", "classroom", "infants", "toddlers", "preschool", "school-age"];', 'const photoNames = Object.keys(photos);'],
  ['Your starting point for exploring <strong>Sunflower Early Learning Center</strong> - a year-round child care center serving families in Tulsa.', 'Explore early childhood care with <strong>Sunflower Early Learning Center</strong> - serving Tulsa families from infancy through school age.'],
  ['These are the age ranges listed by Oklahoma Human Services for the center.', 'Explore care options from infancy through the school-age years.'],
  ['Sunflower Early Learning Center is listed by Oklahoma Human Services at <strong>7705 E 31st St, Tulsa, OK 74145</strong>. The state record includes hours, age groups, and contact details.', 'Located at <strong>7705 E 31st St, Tulsa, OK 74145</strong>, Sunflower Early Learning Center provides year-round child care for infants through school-age children.'],
  ['Listed total capacity: 25', 'Program capacity: 25'],
  ['Subsidy acceptance listed by the state', 'Child care subsidy accepted'],
  ['The published daytime hours appear here; confirm holiday changes with the center.', 'Find a time that works for your family with our regular opening hours.'],
  ['AGE GROUP AVAILABILITY MAY CHANGE.', 'QUESTIONS ABOUT A PROGRAM?'],
  ['A GOOD DAY STARTS WITH GOOD INFORMATION.', 'LITTLE DAYS. BIG POSSIBILITIES.'],
  ['Per state listing', 'Child care support'],
  ['Oklahoma Human Services listed program.', 'Child care in Tulsa, Oklahoma.'],
  ['Publicly listed director: Crystal Johnson.', 'Director: Crystal Johnson.'],
  ['The state listing describes a year-round daytime child care center, with 3-star program level, total capacity of 25, and subsidy acceptance. The listed director is Crystal Johnson.', 'The center offers year-round daytime care for infants through school-age children. It has a 3-star program level, capacity of 25, and accepts child care subsidy.'],
  ['For availability, enrollment, visits, and fees, contact the provider.', 'Contact the center for enrollment, visit information, and tuition details.'],
  ['Public details about Sunflower Early Learning Center in Tulsa, including its Oklahoma child care listing, director, location, and age groups served.', 'Get to know Sunflower Early Learning Center in Tulsa, including its child care age groups, director, and location.'],
  [/<a class="skip-link" href="#main-content">Skip to content<\/a>\$\{!publicReady \? '<div class="preview-banner">INDEPENDENT PREVIEW CONCEPT \/ NOT AN OFFICIAL ORGANIZATION WEBSITE<\/div>' : ""\}/, '<a class="skip-link" href="#main-content">Skip to content</a>'],
  [/const photoBlock = \(title,shape="wide"\) => \{[\s\S]*?\n\};\nconst hoursBlock =/, `const photoBlock = (key, shape="wide") => {
  const photo = photos[key];
  if (!photo || !photo.src) return \`<div class="photo-slot photo-slot-\${shape} no-photo"><div class="photo-fallback" aria-hidden="true">&#10045;</div></div>\`;
  return \`<div class="photo-slot photo-slot-\${shape} has-photo"><img class="approved-photo" src="\${esc(photo.src)}" alt="\${esc(photo.alt)}" loading="\${shape === 'hero' ? 'eager' : 'lazy'}" decoding="async" style="object-position:\${esc(photo.position || 'center')}"/></div>\`;
};
const hoursBlock =`],
  ['<p class="hours-source">Source: Oklahoma Human Services child care locator.</p>', ''],
  ['publicReady && photoManifest.exterior && route === "/" ? `<link rel="preload" as="image" href="/photos/exterior.webp" fetchpriority="high"/>` : ""', 'route === "/" && photos.hero?.src ? `<link rel="preload" as="image" href="${esc(photos.hero.src)}" fetchpriority="high"/>` : ""'],
  [/<footer class="footer">[\s\S]*?<\/footer>`;/, (match) => match
    .replace('Find public information about child care, age groups, hours, and ways to get in touch in Tulsa, Oklahoma.', 'Explore child care options, opening hours, and ways to connect with our Tulsa center.')
    .replace('&copy; ${new Date().getFullYear()} Sunflower Early Learning Center informational concept.', 'Sunflower Early Learning Center &middot; Tulsa, Oklahoma')
    .replace('${publicReady ? "Made for families in Tulsa, OK" : "Independent preview; not an official or endorsed website."}', 'Made for families in Tulsa, OK.')],
  ['const info = `<p><a href="https://childcarefind.okdhs.org/providers/K830058415">Verify these details with Oklahoma Human Services</a></p>`;', 'const info = ``;'],
  ["photoBlock('The Tulsa center','hero')", "photoBlock('hero','hero')"],
  ["photoBlock('Inside the learning center')", "photoBlock('classroom')"],
  ["photoBlock('Center building and entrance')", "photoBlock('about')"],
  ['photoBlock(`${label} care setting`,\'square\')', 'photoBlock(label.toLowerCase(),\'square\')'],
  ['STATE DIRECTORY INFORMATION', 'SUNFLOWER AT A GLANCE'],
  ['Facts you can <em>check.</em>', 'The essentials at a <em>glance.</em>'],
  ['STATE PROGRAM LEVEL', 'PROGRAM LEVEL'],
  ['LISTED CAPACITY', 'CAPACITY'],
  ['Sunflower Early Learning Center is located at 7705 E 31st St, Tulsa, OK 74145, and appears in the Oklahoma Human Services child care directory with facility ID K830058415.', 'Sunflower Early Learning Center is located at 7705 E 31st St, Tulsa, OK 74145, serving Tulsa families with year-round child care.'],
  ['Talk to the center for current information.', 'Explore our hours, care options, and how to get in touch.'],
  ['Infants, toddlers, preschool and school-age children are listed by Oklahoma Human Services.', 'Infant, toddler, preschool and school-age child care options are available.'],
  ['Yes, the state child care locator indicates subsidy acceptance.', 'Yes, child care subsidies are accepted. Contact the center for current enrollment information.'],
  [/<div class="container-wide source-footer">\$\{info\}<\/div>/g, ''],
  [ /\$\{info\}/g, '' ],
]);

const cssFile = 'src/index.css';
let css = read(cssFile);
if (!css.includes('/* Finished photo styling */')) {
  css += `\n/* Finished photo styling - retains the existing sunflower layout */
.photo-slot.has-photo { padding: 0; border: 0; background: #e7e4d3; }
.photo-slot.has-photo::before, .photo-slot.has-photo .photo-grid { display: none; }
.photo-slot.has-photo .approved-photo { position: absolute; inset: 0; display: block; width: 100%; height: 100%; object-fit: cover; }
.photo-slot.no-photo { padding: 0; border: 0; }
.photo-fallback { display: grid; place-items: center; width: 100%; height: 100%; background: linear-gradient(135deg,#f4e4b7,#e2eacb); color: #35543d; }
.photo-fallback svg { opacity: .8; }
`;
  write(cssFile, css);
}
write('PHOTO-GUIDE.md', `# Changing the website photographs

All photos are controlled by **src/lib/photos.json**. Edit only the src and alt fields.

- Use remote HTTPS images temporarily, or (recommended) place optimized approved images in **public/photos/** and change each src to a local URL such as **/photos/hero.webp**.
- File names are your choice, but the JSON path must match exactly. Keep the new alt text truthful.
- There are seven keys: hero, classroom, about, infants, toddlers, preschool, school-age.
- These default photos are **illustrative images from other places, not photographs of Sunflower Early Learning Center**. Do not describe them as the center's actual premises.
- Only publish or enable search indexing after getting organization approval. For actual facility/child photographs, secure the photographer's rights and any necessary parent/guardian consent.

## Current illustration sources

- hero: Camila Mofsovich / Unsplash — https://unsplash.com/photos/childrens-playroom-with-small-tables-and-chairs-7Lbw1Dxwj3Y
- classroom: Mikhail Nilov / Pexels — https://www.pexels.com/photo/educational-toys-on-shelves-8923987/
- about: Bakytzhan Baurzhanov / Pexels — https://www.pexels.com/photo/interior-design-in-kindergarten-9951401/
- infants: Mikhail Nilov / Pexels — https://www.pexels.com/photo/close-up-shot-of-colorful-shapes-on-the-white-table-8923956/
- toddlers: Camila Mofsovich / Unsplash — https://unsplash.com/photos/childrens-play-kitchen-area-with-small-tables-and-chairs-S76pM9zZrAE
- preschool: Ksenia Chernaya / Pexels — https://www.pexels.com/photo/an-empty-classroom-8535634/
- school-age: Batuhan Kocabaş / Pexels — https://www.pexels.com/photo/classroom-in-a-kindergarten-15052434/

Read the image provider license and confirm any additional rights for recognizable people, brands, or private property. The preview uses remote image URLs; for best production speed and reliability, download authorized originals and serve optimized WebP/AVIF files locally.
`);
write('README.md', `# Sunflower Early Learning Center - Website source

Five-page responsive React + TypeScript + Vite + TanStack Router + Tailwind website. The original sunflower color palette, logo, typography and layouts are preserved.

## Start

1. Install Node.js 22+ and npm.
2. Run **npm install** (this source archive does not include a lockfile).
3. Run **npm run dev** to preview the website.
4. Run **npm run build** to create Cloudflare Pages assets under **dist/**.

## Photos and social profiles

- Edit **src/lib/photos.json** to change any of the seven images. Use a remote https URL or a local file like **/photos/hero.webp**, stored under **public/photos/**. The current photos are *real-life but illustrative*; they are **not** photos of Sunflower itself.
- Edit **src/lib/social-links.json** for Facebook, Instagram or YouTube. Leave blank URLs empty.
- See **PHOTO-GUIDE.md** for photo links, licenses and replacements.
- Images are visible in local preview without enabling publication approval. No photo permission claim is made by the website.

## Publishing and SEO

The preview looks complete but remains **noindex** until authorized by the actual organization. To publish, verify the center's details, obtain permission to use its name/brand and actual facility photographs, and configure **.env.local** with the approved domain and approval flags. Do not enable publication based only on generic illustrative photos. The generator checks for at least one local approved photo before enabling indexing.

**Do not use filters/crops to attempt to remove copyright protection.** Keep written photo permission and, where identifiable children appear, applicable consent documentation.

Run **node scripts/build-html.mjs** whenever you change photos, profile links, or static SEO details, unless you use **npm run dev/build**, which runs it automatically.

## SEO features

Route-specific pre-rendered HTML, titles/descriptions, JSON-LD ChildCare data, mobile layouts, semantic content, sitemap and robots configuration, local contact links and responsive images. Final SEO verification requires a real authorized domain and live performance testing.
`);
fs.writeFileSync(path.join(root, '.sunflower-finished'), 'Applied once. Edit src/lib/photos.json for later image changes.\n');
console.log('Sunflower updates applied: banner and disclaimers removed, image configuration added, visual design retained.');
console.log('Next: node scripts/build-html.mjs, then npm run dev.');
