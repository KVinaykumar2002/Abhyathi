import AppLink from "@/components/ui/AppLink";
import PageShell from "../components/PageShell";

export default function Privacy() {
  return (
    <PageShell mainClassName="section-pad px-ds-3">
      <article className="mx-auto max-w-3xl">
        <h1 className="font-primary text-ds-3xl font-medium text-text-primary">
          Privacy policy
        </h1>
        <p className="mt-ds-3 text-ds-sm text-text-disabled">Last updated: May 2026.</p>
        <p className="mt-ds-3 text-ds-md leading-relaxed text-text-disabled">
          We collect information you submit through forms (such as name, email,
          phone, and message) to respond to enquiries and support orders. We do not
          sell your personal data.
        </p>
        <p className="mt-ds-2 text-ds-md leading-relaxed text-text-disabled">
          Technical data (for example basic logs or cookies required for the site to
          function) may be processed by our hosting or analytics providers as
          configured for this deployment.
        </p>
        <p className="mt-ds-2 text-ds-md leading-relaxed text-text-disabled">
          To request access, correction, or deletion of your data where applicable,
          contact us via the details on the{" "}
          <AppLink to="/contact" className="min-h-0 text-ds-md">
            contact page
          </AppLink>
          .
        </p>
      </article>
    </PageShell>
  );
}
