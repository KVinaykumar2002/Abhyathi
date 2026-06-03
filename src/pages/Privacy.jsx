import AppLink from "@/components/ui/AppLink";
import PageShell from "../components/PageShell";

function Section({ title, children }) {
  return (
    <section className="mt-ds-5">
      <h2 className="font-primary text-ds-xl font-semibold text-text-primary">{title}</h2>
      <div className="mt-ds-2 space-y-ds-2 text-ds-md leading-relaxed text-text-disabled">
        {children}
      </div>
    </section>
  );
}

function BulletList({ items }) {
  return (
    <ul className="list-disc space-y-ds-1 pl-ds-4">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function Privacy() {
  return (
    <PageShell mainClassName="section-pad px-ds-3 pb-ds-6">
      <article className="mx-auto max-w-3xl">
        <h1 className="font-primary text-ds-3xl font-semibold text-text-primary md:text-ds-4xl">
          Privacy Policy
        </h1>
        <p className="mt-ds-2 text-ds-lg font-medium text-text-primary">
          Abhyati Food Pak Solutions Pvt Ltd
        </p>
        <p className="mt-ds-1 text-ds-sm text-text-disabled">Effective date: June 2026</p>

        <p className="mt-ds-4 text-ds-md leading-relaxed text-text-disabled">
          Abhyati Food Pak Solutions Pvt Ltd operates a mobile application that enables
          customers to browse food packaging products, place orders, make payments, and
          track deliveries. This Privacy Policy explains how we collect, use, protect,
          and share your personal information when you use our website and application.
        </p>

        <Section title="1. Information We Collect">
          <p>We may collect the following information:</p>
          <BulletList
            items={[
              "Name",
              "Mobile number",
              "Email address",
              "Delivery address",
              "Order history",
              "Payment transaction information",
              "Device information and application usage data",
            ]}
          />
        </Section>

        <Section title="2. Purpose of Data Collection">
          <p>The information collected is used for:</p>
          <BulletList
            items={[
              "User registration and OTP authentication",
              "Order processing and delivery",
              "Customer support",
              "Payment processing through Razorpay",
              "Service improvements",
              "Security and fraud prevention",
            ]}
          />
        </Section>

        <Section title="3. Payment Processing">
          <p>
            Payments are securely processed through Razorpay and other authorized payment
            service providers. We do not store complete debit card, credit card, UPI PIN,
            or banking credentials on our servers.
          </p>
        </Section>

        <Section title="4. Data Security">
          <p>
            We implement industry-standard security measures to protect personal
            information from unauthorized access, disclosure, alteration, or destruction.
          </p>
        </Section>

        <Section title="5. Order Fulfillment">
          <p>
            Customer information may be shared with logistics and delivery partners solely
            for order processing and delivery purposes.
          </p>
        </Section>

        <Section title="6. User Rights">
          <p>Users may request:</p>
          <BulletList
            items={[
              "Access to their personal information",
              "Correction of inaccurate information",
              "Account deletion requests",
              "Removal of personal data, subject to legal obligations",
            ]}
          />
          <p className="mt-ds-2">
            To exercise these rights, contact us using the details in the Contact
            Information section below or via our{" "}
            <AppLink to="/contact" className="min-h-0 text-ds-md">
              contact page
            </AppLink>
            .
          </p>
        </Section>

        <Section title="7. Children's Privacy">
          <p>
            This application is intended for users above 18 years of age and does not
            knowingly collect information from children.
          </p>
        </Section>

        <Section title="8. Policy Updates">
          <p>
            Abhyati Food Pak Solutions Pvt Ltd reserves the right to update this Privacy
            Policy at any time. Updated versions will be published on the website and
            application. Continued use of our services after updates constitutes acceptance
            of the revised policy.
          </p>
        </Section>

        <Section title="Contact Information">
          <ul className="space-y-ds-1 text-text-disabled">
            <li>
              <span className="font-medium text-text-primary">Company:</span> Abhyati Food
              Pak Solutions Pvt Ltd
            </li>
            <li>
              <span className="font-medium text-text-primary">Website:</span>{" "}
              <a
                href="https://abhyatifoodpack.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary underline hover:text-text-primary"
              >
                https://abhyatifoodpack.com/
              </a>
            </li>
            <li>
              <span className="font-medium text-text-primary">Email:</span>{" "}
              <a
                href="mailto:info@abhyatifoodpak.com"
                className="text-text-secondary underline hover:text-text-primary"
              >
                info@abhyatifoodpak.com
              </a>
            </li>
            <li>
              <span className="font-medium text-text-primary">Address:</span> D.No. 1-44,
              Shed No. 4, Sreekanth Reddy Estate, Kompally, Hyderabad – 500100
            </li>
          </ul>
        </Section>
      </article>
    </PageShell>
  );
}
