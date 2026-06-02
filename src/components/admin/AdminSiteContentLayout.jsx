import { NavLink, Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { to: "home", label: "Home Hero" },
  { to: "products", label: "Products Hero" },
  { to: "about", label: "About Page" },
  { to: "contact", label: "Contact Page" },
  { to: "stores", label: "Stores Page" },
  { to: "testimonials", label: "Testimonials" },
  { to: "social", label: "Social & Footer" },
];

const linkClass = ({ isActive }) =>
  cn(
    "rounded-ds-sm px-ds-3 py-ds-2 text-base font-medium transition-colors",
    isActive
      ? "bg-text-secondary text-surface-base"
      : "text-text-disabled hover:bg-surface-base hover:text-text-primary"
  );

export default function AdminSiteContentLayout() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-ds-5">
        <h1 className="text-3xl font-semibold text-text-primary md:text-4xl">Site Content</h1>
        <p className="mt-ds-2 text-lg text-text-disabled">
          Edit each page separately. Drag & drop images where supported, then save that section.
        </p>
      </div>

      <div className="flex flex-col gap-ds-5 lg:flex-row">
        <nav
          className="flex shrink-0 flex-row flex-wrap gap-ds-1 lg:w-52 lg:flex-col lg:flex-nowrap"
          aria-label="Content sections"
        >
          {SECTIONS.map(({ to, label }) => (
            <NavLink key={to} to={to} className={linkClass} end>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="min-w-0 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
