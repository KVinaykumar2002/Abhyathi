import PageShell from "../components/PageShell";
import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <PageShell mainClassName="flex min-h-[70vh] flex-col items-center justify-center px-ds-3 text-center">
      <p className="text-ds-sm font-semibold uppercase tracking-widest text-text-secondary">
        404
      </p>
      <h1 className="mt-ds-2 max-w-lg font-primary text-ds-3xl font-medium text-text-primary md:text-ds-4xl">
        This page isn&apos;t on the menu
      </h1>
      <p className="mt-ds-3 max-w-md text-ds-md text-text-disabled">
        The link may be outdated. Head home or browse our product catalog.
      </p>
      <div className="mt-ds-4 flex flex-wrap justify-center gap-ds-2">
        <Button to="/" variant="primary">
          Back to home
        </Button>
        <Button to="/menu" variant="secondary">
          View products
        </Button>
      </div>
    </PageShell>
  );
}
