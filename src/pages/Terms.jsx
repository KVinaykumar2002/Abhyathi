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

function SubSection({ title, children }) {
  return (
    <div className="mt-ds-3">
      <h3 className="font-primary text-ds-lg font-semibold text-text-primary">{title}</h3>
      <div className="mt-ds-2 space-y-ds-2">{children}</div>
    </div>
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

export default function Terms() {
  return (
    <PageShell mainClassName="section-pad px-ds-3 pb-ds-6">
      <article className="mx-auto max-w-3xl">
        <h1 className="font-primary text-ds-3xl font-semibold text-text-primary md:text-ds-4xl">
          Terms &amp; Conditions
        </h1>
        <p className="mt-ds-2 text-ds-lg font-medium text-text-primary">
          Abhyati Food Pak Solutions Pvt Ltd
        </p>
        <p className="mt-ds-1 text-ds-sm text-text-disabled">Effective date: June 2026</p>

        <p className="mt-ds-4 text-ds-md leading-relaxed text-text-disabled">
          By using our website, mobile application, or placing orders with Abhyati Food Pak
          Solutions Pvt Ltd, you agree to the terms below. Please read them carefully before
          using our services.
        </p>

        <Section title="Terms & Conditions">
          <SubSection title="Product Availability">
            <BulletList
              items={[
                "All products are subject to availability.",
                "Product images are for reference purposes and may vary slightly from actual products.",
              ]}
            />
          </SubSection>

          <SubSection title="Pricing">
            <BulletList
              items={[
                "Prices displayed in the application are inclusive of applicable taxes unless otherwise stated.",
                "The company reserves the right to revise prices without prior notice.",
              ]}
            />
          </SubSection>

          <SubSection title="Orders">
            <BulletList
              items={[
                "Orders are confirmed only after successful payment verification.",
                "Customers are responsible for providing accurate delivery information.",
              ]}
            />
          </SubSection>

          <SubSection title="B2B Customers">
            <BulletList
              items={[
                "GST details must be provided accurately at the time of purchase.",
                "Any corrections should be communicated immediately after order placement.",
              ]}
            />
          </SubSection>

          <SubSection title="Order Cancellation">
            <BulletList
              items={[
                "Orders may be cancelled within 4 hours of placement, provided they have not been dispatched.",
                "Cancellation requests after dispatch may not be accepted.",
              ]}
            />
          </SubSection>
        </Section>

        <Section title="Return, Replacement & Refund Policy">
          <SubSection title="Product Replacement">
            <BulletList
              items={[
                "Customers may request a replacement within 15 days from the date of delivery.",
                "Returned products must be unused, undamaged, and accompanied by the original invoice.",
                "After verification and approval, customers may replace the returned product with another product of equal value.",
                "If the selected replacement product has a higher value, the customer must pay the difference amount.",
                "If the selected replacement product has a lower value, the balance amount will be adjusted according to company policy.",
              ]}
            />
          </SubSection>

          <SubSection title="Eligible Conditions">
            <p>Replacement requests will be accepted for:</p>
            <BulletList
              items={[
                "Wrong product delivered",
                "Damaged product received",
                "Manufacturing defects",
                "Approved exchange requests",
              ]}
            />
          </SubSection>

          <SubSection title="Non-Eligible Conditions">
            <p>Replacement or refund requests will not be accepted for:</p>
            <BulletList
              items={[
                "Customized products",
                "Products damaged due to misuse",
                "Products returned without original proof of purchase",
                "Products returned after 15 days from delivery",
              ]}
            />
          </SubSection>

          <SubSection title="Refund Policy">
            <BulletList
              items={[
                "Approved refunds will be processed within 48 hours after successful verification.",
                "Refunds will be credited through the original payment method whenever applicable.",
              ]}
            />
          </SubSection>

          <SubSection title="Company Rights">
            <p>
              Abhyati Food Pak Solutions Pvt Ltd reserves the right to approve, reject, or
              modify any replacement or refund request based on product inspection and policy
              compliance.
            </p>
          </SubSection>
        </Section>

        <Section title="Limitation of Liability">
          <p>
            Abhyati Food Pak Solutions Pvt Ltd shall not be liable for indirect, incidental,
            consequential, or special damages arising from the use of the application,
            products, or services.
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
          <p className="mt-ds-3">
            For general enquiries, visit our{" "}
            <AppLink to="/contact" className="min-h-0 text-ds-md">
              contact page
            </AppLink>
            .
          </p>
        </Section>
      </article>
    </PageShell>
  );
}
