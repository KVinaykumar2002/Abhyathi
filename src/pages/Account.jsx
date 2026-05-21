import PageShell from "../components/PageShell";
import { Button } from "@/components/ui";

export default function Account() {
  return (
    <PageShell mainClassName="section-pad px-ds-3">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-primary text-ds-3xl font-medium tracking-tight text-text-primary md:text-ds-4xl">
          Trade accounts
        </h1>
        <p className="mt-ds-3 text-ds-lg leading-relaxed text-text-disabled">
          Login and registration for ordering are handled by our sales team so we
          can set up correct pricing, delivery, and GST details for your business.
        </p>
        <ul className="mt-ds-3 list-disc space-y-ds-1 pl-5 text-ds-md text-text-disabled">
          <li>New customers: request an account when you first place an enquiry.</li>
          <li>Existing customers: use the email we have on file or mention your company name.</li>
        </ul>
        <div className="mt-ds-4">
          <Button to="/contact" variant="primary">
            Contact us to get access
          </Button>
        </div>
      </div>
    </PageShell>
  );
}
