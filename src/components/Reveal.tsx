import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? undefined : { opacity: 0, y: 20 }} whileInView={reduced ? undefined : { opacity: 1, y: 0 }} transition={{ duration: 0.62, ease: [0.2, 0.7, 0.15, 1], delay }} viewport={{ once: true, margin: "-40px" }}>{children}</motion.div>;
}
