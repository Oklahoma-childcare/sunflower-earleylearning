import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { SITE } from "@/lib/site";
const PAGES: Record<string, { title: string; description: string }> = {
  "/": { title: "Sunflower Early Learning Center | Child Care in Tulsa, OK", description: "Learn about Sunflower Early Learning Center in Tulsa, Oklahoma. Find verified child care ages, hours, location, contact details, and subsidy information." },
  "/age-groups": { title: "Child Care Age Groups | Sunflower Early Learning Center Tulsa", description: "Find infant, toddler, preschool, and school-age care information for Sunflower Early Learning Center in Tulsa, Oklahoma." },
  "/about": { title: "About Sunflower Early Learning Center | Tulsa, Oklahoma", description: "Public details about Sunflower Early Learning Center in Tulsa, including its Oklahoma child care listing, director, location, and age groups served." },
  "/faq": { title: "Child Care FAQs | Sunflower Early Learning Center Tulsa", description: "Frequently asked questions about hours, accepted ages, subsidies, enrollment inquiries, and the location of Sunflower Early Learning Center in Tulsa." },
  "/contact": { title: "Contact & Directions | Sunflower Early Learning Center Tulsa", description: "Call Sunflower Early Learning Center at (918) 734-0139. Find opening hours, directions, and contact details for 7705 E 31st St in Tulsa." },
};
export function Seo() {
  const path = useRouterState({ select: s => s.location.pathname });
  useEffect(() => {
    const key = path.length > 1 ? path.replace(/\/$/, "") : "/";
    const page = PAGES[key] || PAGES["/"];
    document.title = page.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", page.description);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", page.title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", page.description);
    const approved = import.meta.env.VITE_PUBLICATION_APPROVED === "true" && !SITE.demoMode;
    const base = import.meta.env.VITE_SITE_URL?.replace(/\/$/, "");
    if (approved && base) {
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
      canonical.href = `${base}${key === "/" ? "/" : `${key}/`}`;
    }
  }, [path]);
  return null;
}
