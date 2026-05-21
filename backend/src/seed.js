import "dotenv/config";
import { connectDB } from "./config/db.js";
import { Product } from "./models/Product.js";
import { catalogSeedItems } from "./data/catalogSeed.js";
import {
  uploadImageFromUrl,
  clearAllProductImages,
  mediaPath,
  deleteImageFile,
} from "./lib/gridfs.js";

const force = process.argv.includes("--force");

async function seedProductImages(item) {
  const safeName = item.name.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
  const fileId = await uploadImageFromUrl(
    item.image,
    `${safeName}.jpg`
  );
  return {
    name: item.name,
    price: item.price,
    category: item.category,
    description: item.description,
    soldOut: Boolean(item.soldOut),
    imageFileId: fileId,
    image: mediaPath(fileId.toString()),
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
    console.log("Removing existing products and GridFS images…");
    const existing = await Product.find({}, { imageFileId: 1 });
    await Promise.all(
      existing.map((p) => deleteImageFile(p.imageFileId))
    );
    await clearAllProductImages();
    await Product.deleteMany({});
  }

  console.log(
    `Uploading ${catalogSeedItems.length} product images to MongoDB GridFS…`
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
      });
    }
  }

  await Product.insertMany(docs);
  const withGridFs = docs.filter((d) => d.imageFileId).length;
  console.log(
    `\nSeeded ${docs.length} products (${withGridFs} images stored in MongoDB GridFS).`
  );
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
