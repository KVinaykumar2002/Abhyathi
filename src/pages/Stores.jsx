import { MapPin, ExternalLink, Store } from "lucide-react";
import PageShell from "@/components/PageShell";
import { Button } from "@/components/ui";
import { useSiteContent } from "@/hooks/useSiteContent";
import { productImageSrc } from "@/lib/productImage";

function mapsUrlForStore(store) {
  const direct = String(store?.googleMapsUrl ?? "").trim();
  if (direct) return direct;
  const address = String(store?.address ?? "").trim();
  if (!address) return "";
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

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
            {entries.map((store, index) => {
              const imageSrc = productImageSrc(store.image);
              const mapsUrl = mapsUrlForStore(store);
              return (
                <article
                  key={`${store.name}-${index}`}
                  className="overflow-hidden rounded-ds-md border border-border-muted bg-surface-raised"
                >
                  <div className="aspect-[16/10] w-full overflow-hidden bg-surface-base">
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={store.name || "Store"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-text-disabled">
                        <Store className="h-10 w-10 text-text-secondary/70" aria-hidden />
                        <span className="text-ds-sm">Photo coming soon</span>
                      </div>
                    )}
                  </div>
                  <div className="p-ds-3">
                    {store.name && (
                      <h2 className="text-ds-lg font-semibold text-text-primary">
                        {store.name}
                      </h2>
                    )}
                    {store.address && (
                      <p className="mt-ds-2 flex items-start gap-2 text-ds-md text-text-disabled">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-text-secondary" aria-hidden />
                        <span>{store.address}</span>
                      </p>
                    )}
                    {mapsUrl && (
                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-ds-2 inline-flex items-center gap-1.5 text-ds-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
                      >
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                        View location on Google Maps
                      </a>
                    )}
                    {store.phone && (
                      <p className="mt-ds-2 text-ds-md text-text-disabled">{store.phone}</p>
                    )}
                    {store.hours && (
                      <p className="mt-ds-1 text-ds-sm text-text-disabled">{store.hours}</p>
                    )}
                  </div>
                </article>
              );
            })}
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
