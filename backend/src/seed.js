import "dotenv/config";
import { connectDB } from "./config/db.js";
import { Product } from "./models/Product.js";

const seedItems = [
  {
    name: "Biodegradable Meal Containers",
    price: 42.99,
    category: "Containers",
    description:
      "Sturdy, leak-resistant clamshell containers made from plant-based materials. Ideal for takeout, catering, and meal prep.",
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop",
  },
  {
    name: "Kraft Paper Food Bags",
    price: 28.5,
    soldOut: true,
    category: "Bags & Wraps",
    description:
      "Grease-resistant kraft bags with reinforced handles. Perfect for bakeries, quick-service restaurants, and retail food outlets.",
    image:
      "https://images.unsplash.com/photo-1607083206968-13611e41cbd2?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Compostable Coffee Cups",
    price: 36.75,
    soldOut: true,
    category: "Cups & Lids",
    description:
      "Double-wall compostable cups with matching lids. Heat-insulated and suitable for hot beverages on the go.",
    image:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1200&auto=format&fit=crop",
  },
];

async function seed() {
  await connectDB();
  const count = await Product.countDocuments();
  if (count > 0) {
    console.log(`Database already has ${count} products — skipping seed.`);
    process.exit(0);
  }

  await Product.insertMany(seedItems);
  console.log(`Seeded ${seedItems.length} sample products.`);
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
