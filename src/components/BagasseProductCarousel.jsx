import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { productImageSrc } from "@/lib/productImage";

const PAGE_SIZE = 4;

const FEATURED_IMAGE =
  "https://www.restokart.com/media/uploads/topicoftheday/Bagasse_Food_Packaging3.jpeg";

function chunkProducts(items, size) {
  const pages = [];
  for (let i = 0; i < items.length; i += size) {
    pages.push(items.slice(i, i + size));
  }
  return pages;
}

export default function BagasseProductCarousel() {
  const { data: products = [], isLoading } = useProducts();
  const [activePage, setActivePage] = useState(0);
  const scrollerRef = useRef(null);

  const pages = useMemo(
    () => chunkProducts(products.filter((p) => !p.soldOut), PAGE_SIZE),
    [products]
  );

  const syncPageFromScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el || !pages.length) return;
    const pageWidth = el.clientWidth;
    if (!pageWidth) return;
    const next = Math.round(el.scrollLeft / pageWidth);
    setActivePage(Math.min(Math.max(next, 0), pages.length - 1));
  }, [pages.length]);

  useEffect(() => {
    setActivePage(0);
    scrollerRef.current?.scrollTo({ left: 0 });
  }, [pages.length]);

  const goToPage = useCallback((pageIndex) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({
      left: pageIndex * el.clientWidth,
      behavior: "smooth",
    });
    setActivePage(pageIndex);
  }, []);

  useEffect(() => {
    if (pages.length <= 1) return undefined;
    const timer = window.setInterval(() => {
      setActivePage((current) => {
        const next = current >= pages.length - 1 ? 0 : current + 1;
        const el = scrollerRef.current;
        if (el) {
          el.scrollTo({
            left: next * el.clientWidth,
            behavior: "smooth",
          });
        }
        return next;
      });
    }, 4000);
    return () => window.clearInterval(timer);
  }, [pages.length]);

  return (
    <section
      className="section-pad bg-surface-base px-ds-3 font-primary text-text-primary"
      aria-label="Featured bagasse products"
    >
      <div className="mx-auto mb-ds-4 max-w-7xl text-center md:mb-ds-5">
        <h2 className="font-primary text-ds-2xl font-semibold tracking-tight text-text-primary md:text-ds-3xl">
          Featured Bagasse Packaging
        </h2>
        <div className="mx-auto mt-ds-2 h-px w-24 bg-border-muted" aria-hidden="true" />
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-ds-4 lg:flex-row lg:items-center lg:gap-ds-5">
        <figure className="m-0 flex w-full justify-center lg:w-[41.6667%] lg:justify-start">
          <img
            src={FEATURED_IMAGE}
            alt="A collection of sustainable bagasse food packaging"
            className="block h-auto w-full max-w-[420px] rounded-ds-sm object-cover"
          />
        </figure>

        <div className="w-full min-w-0 lg:w-[58.3333%]">
          {isLoading && !products.length ? (
            <p className="py-ds-4 text-center text-ds-md text-text-disabled">
              Loading products…
            </p>
          ) : !pages.length ? (
            <p className="py-ds-4 text-center text-ds-md text-text-disabled">
              No products available yet.
            </p>
          ) : (
            <>
              <div
                ref={scrollerRef}
                className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                onScroll={syncPageFromScroll}
                role="region"
                aria-label="Product grid pages"
                tabIndex={0}
              >
                {pages.map((pageProducts, pageIndex) => (
                  <div
                    key={`page-${pageIndex}`}
                    className="grid w-full min-w-full shrink-0 snap-start grid-cols-1 gap-px border border-border-muted bg-border-muted sm:grid-cols-2"
                    role="tabpanel"
                    aria-label={`Product selection ${pageIndex + 1} of ${pages.length}`}
                  >
                    {pageProducts.map((product) => {
                      const hasPrice =
                        product.price != null &&
                        product.price !== "" &&
                        !Number.isNaN(Number(product.price));
                      const price = hasPrice
                        ? Number(product.price).toFixed(2)
                        : null;
                      return (
                        <article
                          key={product.id ?? product.name}
                          className="group flex min-h-[145px] items-start gap-3 border border-border-muted bg-surface-raised px-3 py-4 transition-colors duration-fast hover:border-text-secondary sm:px-4"
                        >
                          <div className="flex h-[82px] w-[76px] shrink-0 items-center justify-center pr-2 sm:w-[84px]">
                            <img
                              src={productImageSrc(product.image)}
                              alt={product.name}
                              className="block max-h-[76px] max-w-full object-contain transition-transform duration-normal group-hover:scale-105"
                              loading="lazy"
                            />
                          </div>
                          <div className="min-w-0 flex-1 pt-0.5">
                            <h3 className="m-0 min-h-[74px] text-left font-primary text-ds-lg font-semibold italic leading-[1.35] text-text-primary sm:text-ds-xl">
                              <Link
                                to="/menu"
                                className="line-clamp-3 block overflow-hidden text-text-primary no-underline transition-colors duration-fast hover:text-text-secondary focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
                              >
                                <span>{product.name}</span>
                              </Link>
                            </h3>
                            <p className="m-0 pt-1 text-left text-ds-lg font-semibold leading-6 text-text-secondary">
                              {price ? (
                                <span aria-label={`Price ${price} rupees`}>
                                  ₹{price}
                                </span>
                              ) : (
                                <span>Enquire</span>
                              )}
                            </p>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                ))}
              </div>

              {pages.length > 1 && (
                <nav className="mt-ds-4 flex justify-center" aria-label="Product pages">
                  <ol className="m-0 flex list-none items-center gap-2 p-0">
                    {pages.map((_, pageIndex) => (
                      <li key={pageIndex} className="m-0 p-0">
                        <button
                          type="button"
                          aria-label={`Go to product page ${pageIndex + 1} of ${pages.length}`}
                          aria-selected={activePage === pageIndex}
                          onClick={() => goToPage(pageIndex)}
                          className={`block h-[11px] w-[11px] rounded-full border-0 p-0 transition-all duration-fast focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring ${
                            activePage === pageIndex
                              ? "bg-text-secondary"
                              : "bg-white hover:bg-white/80"
                          }`}
                        />
                      </li>
                    ))}
                  </ol>
                </nav>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
