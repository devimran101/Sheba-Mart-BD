const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Read .env.local file to get MONGODB_URI
const envPath = path.join(__dirname, '../.env.local');
let mongodbUri = '';

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const match = envContent.match(/^MONGODB_URI=(.*)$/m);
  if (match && match[1]) {
    mongodbUri = match[1].trim().replace(/['"]/g, '');
  }
}

if (!mongodbUri) {
  mongodbUri = 'mongodb+srv://ShebaMartBd:Y49S1GQDWQRv5FeT@cluster0.e5n1hnl.mongodb.net/ShebaMartBd';
}

console.log('Connecting to MongoDB...');

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
});
const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  salePrice: { type: Number },
  purchasePrice: { type: Number },
  discountRate: { type: Number },
  sku: { type: String, required: true, unique: true },
  stock: { type: Number, required: true, default: 0 },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  tags: [{ type: String }],
  images: [{ type: String }],
  attributes: [
    {
      key: { type: String },
      value: { type: String },
    },
  ],
  isFeatured: { type: Boolean, default: false },
  isNewArrival: { type: Boolean, default: false },
  isFlashSale: { type: Boolean, default: false },
  isPublished: { type: Boolean, default: true },
  ratings: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  totalSales: { type: Number, default: 0 },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const productsData = [
  // ─── CATEGORY 1: LADIES' CLOTHING (5 Products) ───
  {
    name: "Women's Floral Silk Wrap Dress (Rose Bloom Edition)",
    slug: "womens-floral-silk-wrap-dress-rose-bloom",
    description: "Indulge in luxury with this wrap dress crafted from premium Mulberry silk. Featuring a flattering self-tie waist, beautiful draped detailing, and a romantic rose print, it is the ultimate piece for formal events, daytime garden parties, or evening galas.",
    price: 4500,
    salePrice: 3800,
    discountRate: 16,
    purchasePrice: 2000,
    stock: 45,
    sku: "LAD-SDR-01",
    categorySlug: "ladies-clothing",
    images: ["/assets/images/products/floral-silk-wrap-dress-1.webp"],
    tags: ["ladies", "silk", "floral", "wrap-dress"],
    attributes: [{ key: "Material", value: "100% Mulberry Silk" }, { key: "Fit", value: "Adjustable Wrap Fit" }],
    isFeatured: true,
    isNewArrival: true,
    isFlashSale: true
  },
  {
    name: "Women's Floral Silk Wrap Dress (Sapphire Meadow Edition)",
    slug: "womens-floral-silk-wrap-dress-sapphire-meadow",
    description: "An elegant wrap silhouette meets rich sapphire blue floral motifs. Made from lightweight silk that flows gracefully, this dress offers both seasonal breathability and a high-end designer drape, complete with standard buttoned cuffs.",
    price: 4600,
    salePrice: 3900,
    discountRate: 15,
    purchasePrice: 2100,
    stock: 40,
    sku: "LAD-SDR-02",
    categorySlug: "ladies-clothing",
    images: ["/assets/images/products/floral-silk-wrap-dress-2.webp"],
    tags: ["ladies", "silk", "floral", "party-wear"],
    attributes: [{ key: "Material", value: "95% Silk, 5% Spandex Blend" }, { key: "Color", value: "Sapphire Blue" }],
    isFeatured: true,
    isNewArrival: true,
    isFlashSale: true
  },
  {
    name: "Women's Floral Silk Wrap Dress (Lilac Garden Edition)",
    slug: "womens-floral-silk-wrap-dress-lilac-garden",
    description: "Exquisite craftsmanship highlights this pastel lilac silk dress. Designed with a deep V-neckline and elegant tie closure, it provides a highly delicate, soft texture that flatters all body types beautifully.",
    price: 4400,
    purchasePrice: 2000,
    stock: 35,
    sku: "LAD-SDR-03",
    categorySlug: "ladies-clothing",
    images: ["/assets/images/products/floral-silk-wrap-dress-3.webp"],
    tags: ["ladies", "silk", "lilac", "formal-dress"],
    attributes: [{ key: "Material", value: "100% Silk Georgette" }, { key: "Lining", value: "Full Satin Lining" }],
    isFeatured: false,
    isNewArrival: false,
    isFlashSale: false
  },
  {
    name: "Women's Floral Silk Wrap Dress (Scarlet Breeze Edition)",
    slug: "womens-floral-silk-wrap-dress-scarlet-breeze",
    description: "Make a striking statement with this bold scarlet wrap dress. Cut from smooth sand-washed silk, it features dynamic tie-up details, making it the perfect choice for date nights and premium functions.",
    price: 4800,
    purchasePrice: 2200,
    stock: 30,
    sku: "LAD-SDR-04",
    categorySlug: "ladies-clothing",
    images: ["/assets/images/products/floral-silk-wrap-dress-4.webp"],
    tags: ["ladies", "silk", "scarlet", "wrap-dress"],
    attributes: [{ key: "Material", value: "100% Sand-Washed Silk" }, { key: "Fit", value: "Slim Fit" }],
    isFeatured: false,
    isNewArrival: false,
    isFlashSale: false
  },
  {
    name: "Women's Vintage Floral Print Cotton Dress",
    slug: "womens-vintage-floral-print-cotton-dress",
    description: "A breezy cotton midi dress perfect for summer styling. Decorated with vintage cottagecore floral prints, it features a relaxed tiered skirt, comfortable elastic smocking at the waist, and highly breathable natural fibers.",
    price: 2600,
    purchasePrice: 1200,
    stock: 50,
    sku: "LAD-CDR-05",
    categorySlug: "ladies-clothing",
    images: ["/assets/images/products/floral_print_cotton_dress_1777999644446.webp"],
    tags: ["ladies", "cotton", "midi-dress", "summer"],
    attributes: [{ key: "Material", value: "100% Breathable Cotton" }, { key: "Length", value: "Midi Length" }],
    isFeatured: false,
    isNewArrival: false,
    isFlashSale: false
  },

  // ─── CATEGORY 2: MEN'S CLOTHING (5 Products) ───
  {
    name: "Men's Essential Cotton Crewneck Tee",
    slug: "mens-essential-cotton-crewneck-tee",
    description: "Engineered from long-staple combed cotton, this crewneck tee is built for everyday luxury. Features a durable ribbed collar, reinforced shoulder seams, and a regular fit that stays soft wash after wash.",
    price: 950,
    salePrice: 750,
    discountRate: 21,
    purchasePrice: 350,
    stock: 150,
    sku: "MEN-TTE-01",
    categorySlug: "mens-clothing",
    images: ["/assets/images/products/essential-cotton-crewneck-tee-1.webp"],
    tags: ["men", "crewneck", "combed-cotton", "daily-essential"],
    attributes: [{ key: "Material", value: "100% Combed Cotton" }, { key: "Weight", value: "180 GSM" }],
    isFeatured: true,
    isNewArrival: true,
    isFlashSale: true
  },
  {
    name: "Men's Tailored Linen Summer Blazer",
    slug: "mens-tailored-linen-summer-blazer",
    description: "Embrace warm-weather sophistication with this tailored blazer. Crafted from high-grade Irish linen with minimal interior structure, it keeps you cool while maintaining a sharp, relaxed sartorial profile.",
    price: 4900,
    salePrice: 3900,
    discountRate: 20,
    purchasePrice: 2000,
    stock: 25,
    sku: "MEN-LBL-02",
    categorySlug: "mens-clothing",
    images: ["/assets/images/products/linen_summer_blazer_mens_1777999845004.webp"],
    tags: ["men", "blazer", "linen", "summer-formal"],
    attributes: [{ key: "Material", value: "100% Organic Linen" }, { key: "Lining", value: "Viscose Half-Lining" }],
    isFeatured: true,
    isNewArrival: true,
    isFlashSale: true
  },
  {
    name: "Men's Classic Cable Knit Merino Wool Sweater",
    slug: "mens-classic-cable-knit-merino-wool-sweater",
    description: "Expertly knit from extra-fine Merino wool, this cable knit sweater is soft, insulating, and temperature-regulating. A timeless layer that pairs perfectly with shirts and smart trousers.",
    price: 3200,
    purchasePrice: 1500,
    stock: 35,
    sku: "MEN-CWS-03",
    categorySlug: "mens-clothing",
    images: ["/assets/images/products/merino_wool_sweater_mens_1777999810235.webp"],
    tags: ["men", "sweater", "merino-wool", "cable-knit"],
    attributes: [{ key: "Material", value: "100% Extra-fine Merino Wool" }, { key: "Knit Type", value: "Cable Knit" }],
    isFeatured: false,
    isNewArrival: false,
    isFlashSale: false
  },
  {
    name: "Men's Premium Oxford Slim Fit Shirt",
    slug: "mens-premium-oxford-slim-fit-shirt",
    description: "Constructed from thick basket-weave cotton fabric, this classic Oxford shirt features a signature button-down collar, standard barrel cuffs, and a tailored slim fit that works for both office and casual weekends.",
    price: 1900,
    purchasePrice: 850,
    stock: 90,
    sku: "MEN-OXS-04",
    categorySlug: "mens-clothing",
    images: ["/assets/images/products/oxford_slim_fit_shirt_mens_1777999780694.webp"],
    tags: ["men", "shirt", "oxford", "slim-fit"],
    attributes: [{ key: "Material", value: "100% Oxford Cotton" }, { key: "Collar", value: "Button-Down" }],
    isFeatured: false,
    isNewArrival: false,
    isFlashSale: false
  },
  {
    name: "Men's Premium Stretch Chino Trousers",
    slug: "mens-premium-stretch-chino-trousers",
    description: "The ideal balance of style and flexibility. Made from midweight cotton twill with added elastane, these chinos feature a modern tapered fit, slant side pockets, and a button-through coin slot.",
    price: 2400,
    purchasePrice: 1100,
    stock: 60,
    sku: "MEN-SCT-05",
    categorySlug: "mens-clothing",
    images: ["/assets/images/products/stretch_chino_trousers_mens_1777999878314.webp"],
    tags: ["men", "chinos", "trousers", "stretch"],
    attributes: [{ key: "Material", value: "98% Cotton, 2% Elastane" }, { key: "Fit", value: "Slim Tapered" }],
    isFeatured: false,
    isNewArrival: false,
    isFlashSale: false
  },

  // ─── CATEGORY 3: KIDS & BABY CLOTHING (5 Products) ───
  {
    name: "Kids Vintage Graphic Print Hoodie (Navy Varsity)",
    slug: "kids-vintage-graphic-print-hoodie-navy-varsity",
    description: "A cozy streetwear hoodie for kids. Featuring a retro collegiate chest print, cozy kangaroo pouch pocket, and soft fleece lining, it is ideal for outdoor activities, school days, or home lounge wear.",
    price: 1600,
    salePrice: 1300,
    discountRate: 18,
    purchasePrice: 700,
    stock: 45,
    sku: "KID-HOD-01",
    categorySlug: "kids-baby-clothing",
    images: ["/assets/images/products/vintage-graphic-print-hoodie-1.webp"],
    tags: ["kids", "hoodie", "streetwear", "varsity"],
    attributes: [{ key: "Material", value: "80% Cotton, 20% Polyester Fleece" }, { key: "Pockets", value: "Front Kangaroo Pocket" }],
    isFeatured: true,
    isNewArrival: true,
    isFlashSale: true
  },
  {
    name: "Kids Vintage Graphic Print Hoodie (Forest Green)",
    slug: "kids-vintage-graphic-print-hoodie-forest-green",
    description: "Crafted in heavy-duty cotton fleece, this rich forest green hoodie features collegiate lettering. Ribbed cuffs and hem provide a secure fit, while keeping your child snug and warm during cool weather.",
    price: 1650,
    salePrice: 1350,
    discountRate: 18,
    purchasePrice: 750,
    stock: 40,
    sku: "KID-HOD-02",
    categorySlug: "kids-baby-clothing",
    images: ["/assets/images/products/vintage-graphic-print-hoodie-2.webp"],
    tags: ["kids", "hoodie", "fleece", "forest-green"],
    attributes: [{ key: "Material", value: "85% Cotton, 15% Polyester" }, { key: "Knit Type", value: "Fleece Backed" }],
    isFeatured: true,
    isNewArrival: true,
    isFlashSale: true
  },
  {
    name: "Kids Stretch Chino Trousers (Khaki Brown)",
    slug: "kids-stretch-chino-trousers-khaki-brown",
    description: "Perfect for active play or semi-formal gatherings. These children's chinos are woven with soft cotton and flexible stretch fibers. Features an inner adjustable waistband for growth flexibility.",
    price: 1400,
    purchasePrice: 650,
    stock: 55,
    sku: "KID-PNT-03",
    categorySlug: "kids-baby-clothing",
    images: ["/assets/images/products/stretch-chino-trousers-1.webp"],
    tags: ["kids", "chinos", "trousers", "khaki"],
    attributes: [{ key: "Material", value: "97% Cotton, 3% Spandex" }, { key: "Waist", value: "Internal Elastic Adjuster" }],
    isFeatured: false,
    isNewArrival: false,
    isFlashSale: false
  },
  {
    name: "Kids Stretch Chino Trousers (Stone Grey)",
    slug: "kids-stretch-chino-trousers-stone-grey",
    description: "Classic gray chinos with high durability. Easy to wash, fade-resistant, and designed with standard front/back pockets, perfect for styling with shirts and t-shirts alike.",
    price: 1400,
    purchasePrice: 650,
    stock: 50,
    sku: "KID-PNT-04",
    categorySlug: "kids-baby-clothing",
    images: ["/assets/images/products/stretch-chino-trousers-2.webp"],
    tags: ["kids", "chinos", "grey", "durable"],
    attributes: [{ key: "Material", value: "98% Cotton, 2% Elastane" }, { key: "Pocket count", value: "4 Pocket design" }],
    isFeatured: false,
    isNewArrival: false,
    isFlashSale: false
  },
  {
    name: "Kids Heritage Selvedge Denim Jeans",
    slug: "kids-heritage-selvedge-denim-jeans",
    description: "Premium kids jeans constructed from raw selvedge denim. Provides a timeless, classic look while enduring rough playtimes with reinforced bar-tacks at high-stress areas.",
    price: 1950,
    purchasePrice: 900,
    stock: 35,
    sku: "KID-DNM-05",
    categorySlug: "kids-baby-clothing",
    images: ["/assets/images/products/heritage-selvedge-denim-jeans-3.webp"],
    tags: ["kids", "jeans", "denim", "selvedge"],
    attributes: [{ key: "Material", value: "100% Selvedge Cotton Denim" }, { key: "Weight", value: "11.5 oz Denim" }],
    isFeatured: false,
    isNewArrival: false,
    isFlashSale: false
  },

  // ─── CATEGORY 4: FASHION ACCESSORIES (5 Products) ───
  {
    name: "Women's High-Waisted Pleated Trousers (Charcoal Black)",
    slug: "womens-high-waisted-pleated-trousers-charcoal-black",
    description: "Make a strong professional impression. Woven in structured crease-resistant crepe fabric, these high-waisted pleated trousers boast a wide-leg cut, front pocket details, and tailored waist tab details.",
    price: 2500,
    salePrice: 2000,
    discountRate: 20,
    purchasePrice: 1100,
    stock: 45,
    sku: "ACC-PNT-01",
    categorySlug: "fashion-accessories",
    images: ["/assets/images/products/high-waisted-pleated-trousers-1.webp"],
    tags: ["accessories", "pleated-trousers", "high-waist", "workwear"],
    attributes: [{ key: "Material", value: "70% Polyester, 26% Rayon, 4% Spandex" }, { key: "Rise", value: "High Rise" }],
    isFeatured: true,
    isNewArrival: true,
    isFlashSale: true
  },
  {
    name: "Women's High-Waisted Pleated Trousers (Sand Beige)",
    slug: "womens-high-waisted-pleated-trousers-sand-beige",
    description: "A neutral sand beige edition of our beloved pleated trousers. Elegantly draped and perfect for transitions from morning corporate work straight to dinner parties. Features detailed zipper fly with hook-and-bar closure.",
    price: 2550,
    salePrice: 2050,
    discountRate: 19,
    purchasePrice: 1150,
    stock: 40,
    sku: "ACC-PNT-02",
    categorySlug: "fashion-accessories",
    images: ["/assets/images/products/high-waisted-pleated-trousers-2.webp"],
    tags: ["accessories", "pleated-trousers", "beige", "wide-leg"],
    attributes: [{ key: "Material", value: "Crease-Resistant Twill Crepe" }, { key: "Color", value: "Sand Beige" }],
    isFeatured: true,
    isNewArrival: true,
    isFlashSale: true
  },
  {
    name: "Women's High-Waisted Pleated Trousers (Olive Green)",
    slug: "womens-high-waisted-pleated-trousers-olive-green",
    description: "Add color sophistication to your luxury corporate collection. Pleated detailing lines the front of these trousers, ensuring clean shape retention and premium silhouette styling.",
    price: 2600,
    purchasePrice: 1200,
    stock: 35,
    sku: "ACC-PNT-03",
    categorySlug: "fashion-accessories",
    images: ["/assets/images/products/high-waisted-pleated-trousers-3.webp"],
    tags: ["accessories", "trousers", "olive-green", "pleated"],
    attributes: [{ key: "Material", value: "Polyester-Rayon Crepe Blend" }, { key: "Cut", value: "Relaxed Wide Leg" }],
    isFeatured: false,
    isNewArrival: false,
    isFlashSale: false
  },
  {
    name: "Women's High-Waisted Pleated Trousers (Navy Blue)",
    slug: "womens-high-waisted-pleated-trousers-navy-blue",
    description: "Deep navy colorway that aligns with formal aesthetic codes. Crafted from dynamic crease-resistant blend, these tailored trousers maintain clean lines throughout busy travel or work schedules.",
    price: 2600,
    purchasePrice: 1200,
    stock: 30,
    sku: "ACC-PNT-04",
    categorySlug: "fashion-accessories",
    images: ["/assets/images/products/high-waisted-pleated-trousers-4.webp"],
    tags: ["accessories", "trousers", "navy-blue", "workwear"],
    attributes: [{ key: "Material", value: "crease-free poly-viscose" }, { key: "Pocket details", value: "Rear welt pockets" }],
    isFeatured: false,
    isNewArrival: false,
    isFlashSale: false
  },
  {
    name: "Men's Heavyweight Waterproof Parka Jacket",
    slug: "mens-heavyweight-waterproof-parka-jacket",
    description: "Engineered to withstand harsh elements. This robust winter parka features a fully waterproof nylon shell, high-loft down insulation, storm cuffs, and an adjustable hood for maximum thermal protection.",
    price: 5800,
    purchasePrice: 2800,
    stock: 20,
    sku: "ACC-PKJ-05",
    categorySlug: "fashion-accessories",
    images: ["/assets/images/products/waterproof_parka_mens_1777999829328.webp"],
    tags: ["accessories", "outerwear", "parka", "winter-coat"],
    attributes: [{ key: "Outer Shell", value: "Waterproof Ripstop Nylon" }, { key: "Insulation", value: "700 Fill Down" }],
    isFeatured: false,
    isNewArrival: false,
    isFlashSale: false
  },

  // ─── CATEGORY 5: JEWELRY & ORNAMENTS (5 Products) ───
  {
    name: "Men's Lightweight Merino Wool Sweater (Grey Melange)",
    slug: "mens-lightweight-merino-wool-sweater-grey-melange",
    description: "Woven with fine lightweight merino wool, this sweater feels soft against the skin. Excellent for layering under luxury leather coats or suits during seasonal shifts. Tailored with clean ribbed hem and cuffs.",
    price: 2900,
    salePrice: 2300,
    discountRate: 20,
    purchasePrice: 1400,
    stock: 50,
    sku: "JEW-SWT-01",
    categorySlug: "jewelry",
    images: ["/assets/images/products/lightweight-merino-wool-sweater-1.webp"],
    tags: ["jewelry-clothing", "merino-wool", "lightweight", "grey-melange"],
    attributes: [{ key: "Material", value: "100% Merino Wool" }, { key: "Weight", value: "Lightweight Knit" }],
    isFeatured: true,
    isNewArrival: true,
    isFlashSale: true
  },
  {
    name: "Men's Lightweight Merino Wool Sweater (Deep Navy)",
    slug: "mens-lightweight-merino-wool-sweater-deep-navy",
    description: "Deep navy edition of our merino collection. Offering thermoregulating comfort, breathable design, and a sleek modern profile that complements classic watches and premium accessories.",
    price: 2950,
    salePrice: 2350,
    discountRate: 20,
    purchasePrice: 1450,
    stock: 45,
    sku: "JEW-SWT-02",
    categorySlug: "jewelry",
    images: ["/assets/images/products/lightweight-merino-wool-sweater-3.webp"],
    tags: ["jewelry-clothing", "merino-wool", "navy", "minimalist"],
    attributes: [{ key: "Material", value: "100% Merino Wool" }, { key: "Care", value: "Dry Clean Recommended" }],
    isFeatured: true,
    isNewArrival: true,
    isFlashSale: true
  },
  {
    name: "Women's Oversized Cashmere Cardigan (Soft Cream)",
    slug: "womens-oversized-cashmere-cardigan-soft-cream",
    description: "Knitted from the finest Inner Mongolian cashmere, this oversized cardigan is incredibly plush. Styled with dropped shoulders, patch front pockets, and tortoiseshell buttons for relaxed, elegant layering.",
    price: 4900,
    purchasePrice: 2500,
    stock: 25,
    sku: "JEW-CDG-03",
    categorySlug: "jewelry",
    images: ["/assets/images/products/oversized-cashmere-cardigan-1.webp"],
    tags: ["jewelry-clothing", "cashmere", "cardigan", "soft-cream"],
    attributes: [{ key: "Material", value: "100% Cashmere Knit" }, { key: "Fit", value: "Oversized Fit" }],
    isFeatured: false,
    isNewArrival: false,
    isFlashSale: false
  },
  {
    name: "Women's Oversized Cashmere Cardigan (Dusty Rose)",
    slug: "womens-oversized-cashmere-cardigan-dusty-rose",
    description: "Luxurious comfort in a romantic dusty rose shade. Hand-finished edges and ribbed details along the front opening elevate the premium character of this cashmere layering piece.",
    price: 4950,
    purchasePrice: 2550,
    stock: 20,
    sku: "JEW-CDG-04",
    categorySlug: "jewelry",
    images: ["/assets/images/products/oversized-cashmere-cardigan-3.webp"],
    tags: ["jewelry-clothing", "cashmere", "cardigan", "dusty-rose"],
    attributes: [{ key: "Material", value: "100% Cashmere" }, { key: "Care", value: "Handwash Cold" }],
    isFeatured: false,
    isNewArrival: false,
    isFlashSale: false
  },
  {
    name: "Men's Smart Cotton Button-Up Shirt",
    slug: "mens-smart-cotton-button-up-shirt",
    description: "Tailored in a premium cotton poplin fabric, this shirt features a clean structured cut, classic spread collar, and adjustable cuffs. An excellent foundation piece for formal style pairings.",
    price: 2400,
    purchasePrice: 1200,
    stock: 45,
    sku: "JEW-SCS-05",
    categorySlug: "jewelry",
    images: ["/assets/images/products/smart_cotton_button_up_shirt_1777999629555.webp"],
    tags: ["jewelry-clothing", "cotton-shirt", "formal", "button-up"],
    attributes: [{ key: "Material", value: "100% Cotton Poplin" }, { key: "Collar", value: "Spread Collar" }],
    isFeatured: false,
    isNewArrival: false,
    isFlashSale: false
  }
];

async function seed() {
  try {
    try {
      await mongoose.connect(mongodbUri);
    } catch (connErr) {
      console.log('SRV connection failed, trying direct connection fallback...');
      const directUri = 'mongodb+srv://ShebaMartBd:Y49S1GQDWQRv5FeT@cluster0.e5n1hnl.mongodb.net/ShebaMartBd';
      await mongoose.connect(directUri);
    }
    console.log('Connected to MongoDB successfully.');

    // Clear existing products
    const deleteResult = await Product.deleteMany({});
    console.log(`Cleared ${deleteResult.deletedCount} existing products.`);

    // Query all categories
    const categoriesList = await Category.find({});
    console.log(`Fetched ${categoriesList.length} categories from DB.`);

    const categoryMap = {};
    categoriesList.forEach(c => {
      categoryMap[c.slug] = c._id;
    });

    // Prepare products with proper Category ObjectIds
    const finalProducts = productsData.map(p => {
      const categoryId = categoryMap[p.categorySlug];
      if (!categoryId) {
        throw new Error(`Category with slug "${p.categorySlug}" not found in DB! Seed categories first.`);
      }
      const pCopy = { ...p };
      pCopy.categories = [categoryId];
      delete pCopy.categorySlug;
      return pCopy;
    });

    // Insert new products
    const insertResult = await Product.insertMany(finalProducts);
    console.log(`Seeded ${insertResult.length} products successfully:`);
    insertResult.forEach((prod, i) => {
      console.log(`[Product ${i+1}] Name: "${prod.name}", SKU: "${prod.sku}"`);
    });

  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  }
}

seed();
