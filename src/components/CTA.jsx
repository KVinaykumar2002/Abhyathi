import { motion } from "framer-motion";
import { Button } from "@/components/ui";
import OrderNowButton from "./OrderNowButton";

const CTA = () => {
  return (
    <section className="section-pad bg-surface-base px-ds-3">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-ds-lg border border-border-muted bg-surface-raised p-ds-5 text-center md:p-ds-6"
        >
          <div className="pointer-events-none absolute top-0 right-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-text-secondary/10 blur-3xl" />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 translate-y-1/2 -translate-x-1/2 rounded-full bg-text-secondary/5 blur-3xl"
          />

          <div className="relative z-10 mx-auto max-w-3xl">
            <h2 className="mb-ds-4 font-primary text-ds-3xl leading-tight text-text-primary md:text-ds-4xl">
              Ready to upgrade your{" "}
              <span className="text-text-secondary">food service packaging?</span>
            </h2>
            <p className="mb-ds-5 text-ds-lg text-text-disabled">
              Partner with Abhyati Food Pak for reliable bulk supply, sustainable
              options, and packaging that meets the demands of modern food service
              businesses.
            </p>
            <div className="flex flex-col items-center justify-center gap-ds-2 sm:flex-row">
              <Button to="/contact" variant="primary" size="lg">
                Request a Quote
              </Button>
              <OrderNowButton to="/menu" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
