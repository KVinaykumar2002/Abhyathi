import { Link } from "react-router-dom";
import { Package, PlusCircle, ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/api/products";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { Button } from "@/components/ui";

export default function AdminDashboard() {
  const { admin } = useAdminAuth();
  const { data: products = [] } = useQuery({
    queryKey: ["products", "all"],
    queryFn: () => fetchProducts(),
  });

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-3xl font-semibold text-text-primary md:text-4xl">
        Welcome{admin?.name ? `, ${admin.name}` : ""}
      </h1>
      <p className="mt-ds-2 text-lg text-text-disabled">
        Use the admin panel to add packaging products. Images are stored in MongoDB
        and shown on the public catalog automatically.
      </p>

      <div className="mt-ds-5 grid gap-ds-3 sm:grid-cols-2">
        <div className="rounded-ds-md border border-border-muted bg-surface-raised p-ds-4">
          <Package className="mb-ds-2 h-9 w-9 text-text-secondary" strokeWidth={1.75} />
          <p className="text-4xl font-bold text-text-primary">{products.length}</p>
          <p className="text-base text-text-disabled">Products in database</p>
        </div>
        <div className="flex flex-col justify-center rounded-ds-md border border-border-muted bg-surface-raised p-ds-4">
          <Button to="/admin/products" variant="primary" size="lg" className="gap-ds-2 text-lg">
            <PlusCircle className="h-5 w-5" />
            Add new product
          </Button>
          <a
            href="/menu"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-ds-3 inline-flex items-center gap-ds-2 text-base text-text-secondary hover:underline"
          >
            <ExternalLink className="h-5 w-5" />
            Preview on site
          </a>
        </div>
      </div>

      <div className="mt-ds-5 rounded-ds-md border border-dashed border-border-muted p-ds-4">
        <h2 className="text-xl font-semibold text-text-primary">Quick links</h2>
        <ul className="mt-ds-3 space-y-ds-2 text-lg text-text-disabled">
          <li>
            <Link to="/admin/products" className="text-text-secondary hover:underline">
              Manage all products
            </Link>
          </li>
          <li>
            <a href="/menu" className="text-text-secondary hover:underline">
              Public product page
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
