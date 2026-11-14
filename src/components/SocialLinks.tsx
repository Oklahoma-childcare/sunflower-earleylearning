import { ArrowUpRight, Facebook, Instagram, Youtube } from "lucide-react";
import { SITE } from "@/lib/site";

type SocialLinksProps = { variant?: "footer" | "contact" };

const PLATFORMS = [
  { key: "facebook", name: "Facebook", Icon: Facebook },
  { key: "instagram", name: "Instagram", Icon: Instagram },
  { key: "youtube", name: "YouTube", Icon: Youtube },
] as const;

/** Links appear only if a real HTTPS profile URL is supplied in social-links.json. */
export function SocialLinks({ variant = "footer" }: SocialLinksProps) {
  const profiles = PLATFORMS.filter(
    ({ key }) => /^https:\/\/\S+/i.test(SITE.socialLinks[key].trim()),
  );

  if (!profiles.length) return null;

  return (
    <div className={`social-links social-links-${variant}`} aria-label="Social media profiles">
      {profiles.map(({ key, name, Icon }) => (
        <a
          key={key}
          className="social-link"
          href={SITE.socialLinks[key]}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${SITE.name} on ${name} (opens in a new tab)`}
        >
          <Icon size={18} aria-hidden="true" />
          <span>{name}</span>
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}
