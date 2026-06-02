import PageShell from "@/components/PageShell";
import { Button } from "@/components/ui";

export default function Catalogue() {
  return (
    <PageShell>
      <section className="mx-auto max-w-5xl px-ds-3 pb-ds-6 pt-28 text-center md:pt-32">
        <h1 className="text-ds-4xl font-semibold text-text-primary">Catalogue</h1>
        <p className="mx-auto mt-ds-3 max-w-2xl text-ds-lg text-text-disabled">
          Browse our packaging catalogue and request complete product sheets for containers, cups, bags, and eco-friendly lines.
        </p>
        <div className="mt-ds-5">
          <Button to="/menu" variant="primary" size="lg">
            View products
          </Button>
        </div>
      </section>
    </PageShell>
  );
}
