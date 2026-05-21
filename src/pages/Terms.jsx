import PageShell from "../components/PageShell";

export default function Terms() {
  return (
    <PageShell mainClassName="section-pad px-ds-3">
      <article className="mx-auto max-w-3xl">
        <h1 className="font-primary text-ds-3xl font-medium text-text-primary">
          Terms and conditions
        </h1>
        <p className="mt-ds-3 text-ds-sm text-text-disabled">
          Last updated: May 2026. This is a general summary for the website; your
          trade agreements may include additional terms.
        </p>
        <p className="mt-ds-3 text-ds-md leading-relaxed text-text-disabled">
          By using this site you agree to use it lawfully and not to misuse ordering
          or contact features. Product availability, specifications, and pricing
          for bulk orders are confirmed by our team at the time of quotation or
          purchase order.
        </p>
        <p className="mt-ds-2 text-ds-md leading-relaxed text-text-disabled">
          Content on this site is provided for information. For binding terms on
          supply, payment, delivery, and returns, refer to your contract or invoice
          with Abhyati Food Pak Solutions Pvt Ltd.
        </p>
      </article>
    </PageShell>
  );
}
