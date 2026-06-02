import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  FileText,
  LogOut,
  ExternalLink,
  Shield,
} from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { cn } from "@/lib/utils";

const navLinkClass = ({ isActive }) =>
  cn(
    "flex min-h-[48px] items-center gap-3 rounded-ds-sm px-ds-3 py-ds-2 text-lg font-medium transition-colors duration-fast",
    isActive
      ? "bg-text-secondary text-surface-base"
      : "text-text-disabled hover:bg-surface-raised hover:text-text-primary"
  );

export default function AdminLayout() {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/admin/login", { replace: true });
  }

  return (
    <div className="admin-ui flex min-h-screen min-w-0 flex-col bg-surface-base font-primary text-lg text-text-primary md:flex-row">
      <aside className="flex w-full shrink-0 flex-col border-b border-border-muted bg-surface-raised md:w-64 md:border-b-0 md:border-r lg:w-72">
        <div className="border-b border-border-muted px-ds-3 py-ds-4">
          <Link to="/admin" className="flex items-center gap-ds-2">
            <span className="flex h-11 w-11 items-center justify-center rounded-ds-sm bg-text-secondary text-surface-base">
              <Shield className="h-6 w-6" strokeWidth={2} />
            </span>
            <div>
              <p className="text-lg font-semibold text-text-primary">Abhyati Admin</p>
              <p className="text-base text-text-disabled">Content & catalog</p>
            </div>
          </Link>
        </div>

        <nav className="flex flex-1 flex-col gap-ds-1 p-ds-3">
          <NavLink to="/admin" end className={navLinkClass}>
            <LayoutDashboard className="h-5 w-5 shrink-0" strokeWidth={1.75} />
            Dashboard
          </NavLink>
          <NavLink to="/admin/products" className={navLinkClass}>
            <Package className="h-5 w-5 shrink-0" strokeWidth={1.75} />
            Products
          </NavLink>
          <NavLink to="/admin/site-content/home" className={navLinkClass}>
            <FileText className="h-5 w-5 shrink-0" strokeWidth={1.75} />
            Site Content
          </NavLink>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[48px] items-center gap-3 rounded-ds-sm px-ds-3 py-ds-2 text-lg font-medium text-text-disabled transition-colors hover:bg-surface-base hover:text-text-primary"
          >
            <ExternalLink className="h-5 w-5 shrink-0" strokeWidth={1.75} />
            View live site
          </a>
        </nav>

        <div className="border-t border-border-muted p-ds-3">
          <p className="mb-ds-2 truncate text-base text-text-disabled">
            Signed in as
            <br />
            <span className="font-medium text-text-primary">{admin?.email}</span>
          </p>
          <button
            type="button"
            onClick={handleLogout}
            className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-ds-sm border border-border-muted bg-surface-base px-ds-3 py-ds-2 text-base font-medium text-text-primary transition-colors hover:border-text-secondary hover:text-text-secondary"
          >
            <LogOut className="h-5 w-5" />
            Log out
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-border-muted bg-surface-raised/80 px-ds-3 py-ds-3 backdrop-blur-md md:px-ds-4">
          <p className="text-base text-text-disabled md:hidden">Abhyati Admin</p>
          <p className="hidden text-lg text-text-disabled md:block">
            Manage catalog — changes appear on the public site immediately.
          </p>
          <span className="rounded-full border border-text-secondary/40 bg-text-secondary/10 px-ds-3 py-1 text-sm font-semibold uppercase tracking-wider text-text-secondary">
            Admin
          </span>
        </header>
        <main className="flex-1 overflow-auto p-ds-3 md:p-ds-4 lg:p-ds-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
