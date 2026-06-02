import PageShell from "@/components/PageShell";
import { Button } from "@/components/ui";
import { useSiteContent } from "@/hooks/useSiteContent";

export default function Stores() {
  const { data: siteContent } = useSiteContent();
  const stores = siteContent?.stores ?? {};
  const entries = stores.entries ?? [];

  return (
    <PageShell>
      <section className="mx-auto max-w-5xl px-ds-3 pb-ds-6 pt-28 text-center md:pt-32">
        <h1 className="text-ds-4xl font-semibold text-text-primary">
          {stores.title || "Stores"}
        </h1>
        <p className="mx-auto mt-ds-3 max-w-2xl text-ds-lg text-text-disabled">
          {stores.subtitle ||
            "Discover where Abhyati Food Pak products are available and reach our team for local stock and delivery details."}
        </p>

        {entries.length > 0 && (
          <div className="mt-ds-5 grid gap-ds-3 text-left md:grid-cols-2">
            {entries.map((store, index) => (
              <article
                key={`${store.name}-${index}`}
                className="rounded-ds-md border border-border-muted bg-surface-raised p-ds-3"
              >
                <h2 className="text-ds-lg font-semibold text-text-primary">{store.name}</h2>
                {store.address && (
                  <p className="mt-ds-1 text-ds-md text-text-disabled">{store.address}</p>
                )}
                {store.phone && (
                  <p className="mt-ds-1 text-ds-md text-text-disabled">{store.phone}</p>
                )}
                {store.hours && (
                  <p className="mt-ds-1 text-ds-sm text-text-disabled">{store.hours}</p>
                )}
              </article>
            ))}
          </div>
        )}

        <div className="mt-ds-5">
          <Button to="/contact" variant="primary" size="lg">
            Contact for store info
          </Button>
        </div>
      </section>
    </PageShell>
  );
}
