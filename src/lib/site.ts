import socialLinks from "./social-links.json";
export const SITE = {
  name: "Sunflower Early Learning Center",
  id: "K830058415",
  address: "7705 E 31st St, Tulsa, OK 74145",
  street: "7705 E 31st St",
  city: "Tulsa",
  state: "Oklahoma",
  zip: "74145",
  phoneDisplay: "(918) 734-0139",
  phoneHref: "tel:+19187340139",
  email: "j.crystal72@yahoo.com",
  director: "Crystal Johnson",
  starLevel: "3-star level program",
  capacity: 25,
  yearRound: true,
  acceptsSubsidy: true,
  officialListing: "https://childcarefind.okdhs.org/providers/K830058415",
  // Independent design concept. Publication/official affiliation requires consent.
  demoMode: import.meta.env.VITE_PUBLICATION_APPROVED !== "true",
  hours: [
    { day: "Monday", opens: "7:30 AM", closes: "5:30 PM" },
    { day: "Tuesday", opens: "7:30 AM", closes: "5:30 PM" },
    { day: "Wednesday", opens: "7:00 AM", closes: "5:30 PM" },
    { day: "Thursday", opens: "7:30 AM", closes: "5:30 PM" },
    { day: "Friday", opens: "7:30 AM", closes: "5:30 PM" },
    { day: "Saturday", opens: "Closed", closes: "" },
    { day: "Sunday", opens: "Closed", closes: "" },
  ],
  mapUrl: "https://www.google.com/maps/search/?api=1&query=7705%20E%2031st%20St%2C%20Tulsa%2C%20OK%2074145",
  embedUrl: "https://www.google.com/maps?q=7705%20E%2031st%20St%2C%20Tulsa%2C%20OK%2074145&output=embed",
  socialLinks,
} as const;

export const AGE_GROUPS = [
  { number: "01", label: "Infants", ages: "Birth to 11 months", icon: "baby", color: "peach", description: "Ask about care options, routines, and current openings for your youngest little one." },
  { number: "02", label: "Toddlers", ages: "12 to 23 months", icon: "footprints", color: "leaf", description: "Reach out to learn what a typical day looks like for curious, growing toddlers." },
  { number: "03", label: "Preschool", ages: "2 to 4 years", icon: "shapes", color: "sun", description: "Explore preschool-age care and talk with the center about day-to-day activities." },
  { number: "04", label: "School-age", ages: "5 years and older", icon: "book-open", color: "lavender", description: "Contact the center to ask about arrangements and space for school-age children." },
] as const;

export const FAQS = [
  { question: "What ages does Sunflower Early Learning Center serve?", answer: "We serve infants (0 to 11 months), toddlers (12 to 23 months), preschool children (2 to 4 years), and school-age children (5 years and older). Ask us about openings for your child's age." },
  { question: "Does the center accept child care subsidy assistance?", answer: "Yes, child care subsidies are accepted. Contact the center for current eligibility, openings, and enrollment steps." },
  { question: "What are the center's regular hours?", answer: "Our regular hours are 7:30 AM to 5:30 PM on Monday, Tuesday, Thursday, and Friday; Wednesday starts at 7:00 AM. We are closed on weekends. Call ahead about holiday schedules." },
  { question: "How can I ask about enrollment or a visit?", answer: "Call (918) 734-0139 or email j.crystal72@yahoo.com. The center can provide current availability, any required forms, fee information, and visit options." },
  { question: "Where is the center located?", answer: "Find us at 7705 E 31st St, Tulsa, OK 74145. Use the directions link on our Contact page to plan your visit." },
] as const;
