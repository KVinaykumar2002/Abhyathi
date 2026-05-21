import Navbar from "./Navbar";
import Footer from "./Footer";
import { cn } from "@/lib/utils";

/**
 * Standard dark page wrapper — design.md surface.base theme
 */
export default function PageShell({ children, className, mainClassName }) {
  return (
    <div
      className={cn(
        "min-h-screen min-w-0 overflow-x-hidden bg-surface-base font-primary text-text-primary selection:bg-text-secondary/30 selection:text-text-secondary",
        className
      )}
    >
      <Navbar />
      <main className={cn(mainClassName)}>{children}</main>
      <Footer />
    </div>
  );
}
