import "dotenv/config";
import { connectDB } from "./config/db.js";
import { Product } from "./models/Product.js";
import { catalogSeedItems } from "./data/catalogSeed.js";
import { fetchUrlToDataUrl } from "./lib/imageBase64.js";
import {
  clearAllProductImages,
  deleteImageFile,
} from "./lib/gridfs.js";

const force = process.argv.includes("--force");

async function seedProductImages(item) {
  const image = await fetchUrlToDataUrl(item.image);
  return {
    name: item.name,
    price: item.price,
    category: item.category,
    description: item.description,
    soldOut: Boolean(item.soldOut),
    image,
    imageFileId: null,
  };
}

async function seed() {
  await connectDB();

  const count = await Product.countDocuments();
  if (count > 0 && !force) {
    console.log(
      `Database already has ${count} products — skipping seed. Run with --force to replace.`
    );
    process.exit(0);
  }

  if (force && count > 0) {
    console.log("Removing existing products and legacy GridFS images…");
    const existing = await Product.find({}, { imageFileId: 1 });
    await Promise.all(
      existing.map((p) => deleteImageFile(p.imageFileId))
    );
    await clearAllProductImages();
    await Product.deleteMany({});
  }

  console.log(
    `Converting ${catalogSeedItems.length} product images to base64…`
  );

  const docs = [];
  for (let i = 0; i < catalogSeedItems.length; i++) {
    const item = catalogSeedItems[i];
    process.stdout.write(`  [${i + 1}/${catalogSeedItems.length}] ${item.name}… `);
    try {
      const doc = await seedProductImages(item);
      docs.push(doc);
      console.log("ok");
    } catch (err) {
      console.log("failed");
      console.error(`    ${err.message}`);
      docs.push({
        name: item.name,
        price: item.price,
        category: item.category,
        description: item.description,
        soldOut: Boolean(item.soldOut),
        image: item.image,
        imageFileId: null,
      });
    }
  }

  await Product.insertMany(docs);
  const withBase64 = docs.filter((d) => d.image?.startsWith("data:image/")).length;
  console.log(
    `\nSeeded ${docs.length} products (${withBase64} images stored as base64 in MongoDB).`
  );
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
