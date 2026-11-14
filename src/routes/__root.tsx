import { createRootRoute, Outlet, ScrollRestoration } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
export const Route = createRootRoute({ component: Root });
function Root() {
  return <><a className="skip-link" href="#main-content">Skip to content</a><Seo/><Nav/><Outlet/><Footer/><ScrollRestoration /></>;
}
