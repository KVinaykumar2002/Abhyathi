import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const carouselItems = [
  {
    title: "Ramzan Halleem Seller",
    image:
      "https://cdn-ilcfohd.nitrocdn.com/FscgktnmMRRqWDETpcYvxPESIEOZOwzY/assets/images/optimized/rev-93de195/kdap.in/wp-content/uploads/2024/12/Ramzan-Halleem-Seller-150x150.jpeg",
  },
  {
    title: "Quick service Restaurant",
    image:
      "https://cdn-ilcfohd.nitrocdn.com/FscgktnmMRRqWDETpcYvxPESIEOZOwzY/assets/images/optimized/rev-93de195/kdap.in/wp-content/uploads/2024/12/Quick-service-Restaurant-150x150.jpeg",
  },
  {
    title: "Reseller",
    image:
      "https://cdn-ilcfohd.nitrocdn.com/FscgktnmMRRqWDETpcYvxPESIEOZOwzY/assets/images/optimized/rev-93de195/kdap.in/wp-content/uploads/2024/12/Reseller-150x150.jpeg",
  },
  {
    title: "Restaurant",
    image:
      "https://cdn-ilcfohd.nitrocdn.com/FscgktnmMRRqWDETpcYvxPESIEOZOwzY/assets/images/optimized/rev-93de195/kdap.in/wp-content/uploads/2024/12/Restaurant-150x150.jpeg",
  },
  {
    title: "Corporate supplier",
    image:
      "https://cdn-ilcfohd.nitrocdn.com/FscgktnmMRRqWDETpcYvxPESIEOZOwzY/assets/images/optimized/rev-93de195/kdap.in/wp-content/uploads/2024/12/Corporate-supplier-150x150.jpeg",
  },
  {
    title: "Catering services",
    image:
      "https://cdn-ilcfohd.nitrocdn.com/FscgktnmMRRqWDETpcYvxPESIEOZOwzY/assets/images/optimized/rev-93de195/kdap.in/wp-content/uploads/2024/12/Catering-services-150x150.jpeg",
  },
  {
    title: "Bakery services",
    image:
      "https://cdn-ilcfohd.nitrocdn.com/FscgktnmMRRqWDETpcYvxPESIEOZOwzY/assets/images/optimized/rev-93de195/kdap.in/wp-content/uploads/2024/12/Bakery-services-150x150.jpeg",
  },
  {
    title: "Bar & Pub",
    image:
      "https://cdn-ilcfohd.nitrocdn.com/FscgktnmMRRqWDETpcYvxPESIEOZOwzY/assets/images/optimized/rev-93de195/kdap.in/wp-content/uploads/2024/12/Bar-Pub-150x150.jpeg",
  },
  {
    title: "pan shop",
    image:
      "https://cdn-ilcfohd.nitrocdn.com/FscgktnmMRRqWDETpcYvxPESIEOZOwzY/assets/images/optimized/rev-93de195/kdap.in/wp-content/uploads/2024/12/pan-shop-150x150.jpeg",
  },
  {
    title: "Juice & milkshakes",
    image:
      "https://cdn-ilcfohd.nitrocdn.com/FscgktnmMRRqWDETpcYvxPESIEOZOwzY/assets/images/optimized/rev-93de195/kdap.in/wp-content/uploads/2024/12/Juice-milkshakes-150x150.jpeg",
  },
  {
    title: "Ice cream parlour",
    image:
      "https://cdn-ilcfohd.nitrocdn.com/FscgktnmMRRqWDETpcYvxPESIEOZOwzY/assets/images/optimized/rev-93de195/kdap.in/wp-content/uploads/2024/12/Ice-cream-parlour-150x150.jpeg",
  },
  {
    title: "hospitality services",
    image:
      "https://cdn-ilcfohd.nitrocdn.com/FscgktnmMRRqWDETpcYvxPESIEOZOwzY/assets/images/optimized/rev-93de195/kdap.in/wp-content/uploads/2024/12/hospitality-services-150x150.jpeg",
  },
  {
    title: "hospital",
    image:
      "https://cdn-ilcfohd.nitrocdn.com/FscgktnmMRRqWDETpcYvxPESIEOZOwzY/assets/images/optimized/rev-93de195/kdap.in/wp-content/uploads/2024/12/hospital-150x150.jpeg",
  },
  {
    title: "food cart",
    image:
      "https://cdn-ilcfohd.nitrocdn.com/FscgktnmMRRqWDETpcYvxPESIEOZOwzY/assets/images/optimized/rev-93de195/kdap.in/wp-content/uploads/2024/12/food-cart-150x150.jpeg",
  },
  {
    title: "dine in food chains",
    image:
      "https://cdn-ilcfohd.nitrocdn.com/FscgktnmMRRqWDETpcYvxPESIEOZOwzY/assets/images/optimized/rev-93de195/kdap.in/wp-content/uploads/2024/12/dine-in-food-chains-150x150.jpeg",
  },
  {
    title: "diary products",
    image:
      "https://cdn-ilcfohd.nitrocdn.com/FscgktnmMRRqWDETpcYvxPESIEOZOwzY/assets/images/optimized/rev-93de195/kdap.in/wp-content/uploads/2024/12/diary-products-150x150.jpeg",
  },
];

export default function IndustryImageCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(5);

  useEffect(() => {
    const updateVisibleItems = () => {
      if (window.innerWidth < 640) setVisibleItems(2);
      else if (window.innerWidth < 1024) setVisibleItems(3);
      else setVisibleItems(5);
    };
    updateVisibleItems();
    window.addEventListener("resize", updateVisibleItems);
    return () => window.removeEventListener("resize", updateVisibleItems);
  }, []);

  const maxIndex = Math.max(0, carouselItems.length - visibleItems);

  useEffect(() => {
    setActiveIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current >= maxIndex ? 0 : current + 1));
    }, 5000);
    return () => window.clearInterval(timer);
  }, [maxIndex]);

  const move = (direction) => {
    setActiveIndex((current) => {
      const next = current + direction;
      if (next < 0) return maxIndex;
      if (next > maxIndex) return 0;
      return next;
    });
  };

  const trackStyle = {
    "--visible-items": visibleItems,
    transform: `translateX(-${activeIndex * (100 / visibleItems)}%)`,
  };

  return (
    <section
      className="w-full overflow-hidden bg-surface-base py-ds-5 font-primary md:py-ds-6"
      aria-label="Industries we serve"
      role="region"
      aria-roledescription="carousel"
    >
      <div className="mx-auto mb-ds-4 max-w-7xl px-ds-3 text-center md:mb-ds-5">
        <h2 className="font-primary text-ds-2xl font-semibold tracking-tight text-text-primary md:text-ds-3xl">
          Industries We Serve
        </h2>
        <div className="mx-auto mt-ds-2 h-px w-24 bg-border-muted" aria-hidden="true" />
      </div>

      <div className="relative w-full overflow-hidden">
        <div
          className="flex w-full transition-transform duration-normal ease-out will-change-transform"
          style={trackStyle}
          aria-live="polite"
        >
          {carouselItems.map((item, index) => (
            <div
              className="box-border min-w-0 shrink-0 grow-0 basis-[calc(100%/var(--visible-items))] px-1.5 text-center sm:px-2"
              key={item.title}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${carouselItems.length}`}
            >
              <figure className="m-0 text-ds-sm font-medium leading-snug text-text-secondary">
                <img
                  className="mx-auto mb-ds-2 block h-[120px] w-[120px] max-w-full bg-surface-raised object-cover md:h-[150px] md:w-[150px]"
                  src={item.image}
                  alt={item.title}
                  loading={index < 6 ? "eager" : "lazy"}
                />
                <figcaption className="block break-words capitalize">
                  {item.title}
                </figcaption>
              </figure>
            </div>
          ))}
        </div>

        <button
          className="absolute left-2 top-[60px] z-[2] grid h-10 w-10 place-items-center border-0 bg-transparent text-text-secondary transition-colors duration-fast hover:text-text-primary focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring md:left-3 md:top-[75px] md:h-11 md:w-11"
          type="button"
          onClick={() => move(-1)}
          aria-label="Previous slide"
        >
          <ChevronLeft size={28} strokeWidth={2} aria-hidden="true" />
        </button>
        <button
          className="absolute right-2 top-[60px] z-[2] grid h-10 w-10 place-items-center border-0 bg-transparent text-text-secondary transition-colors duration-fast hover:text-text-primary focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring md:right-3 md:top-[75px] md:h-11 md:w-11"
          type="button"
          onClick={() => move(1)}
          aria-label="Next slide"
        >
          <ChevronRight size={28} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>

      <nav
        className="mt-ds-4 flex min-h-3 items-center justify-center gap-2.5"
        aria-label="Choose carousel slide"
      >
        {Array.from({ length: maxIndex + 1 }, (_, index) => (
          <button
            className="h-1.5 w-1.5 rounded-full border-0 bg-text-primary p-0 transition-opacity duration-fast hover:opacity-70 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
            style={{ opacity: activeIndex === index ? 1 : 0.2 }}
            key={index}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            aria-current={activeIndex === index ? "true" : undefined}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </nav>
    </section>
  );
}
