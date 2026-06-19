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

const FAQSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const FAQ = mongoose.models.FAQ || mongoose.model('FAQ', FAQSchema);

const faqs = [
  {
    question: 'What sizes do you offer for your garments and how do I choose the correct fit?',
    answer: 'We offer sizes ranging from S to XXL for adults, and standard age-based sizing for kids. Every clothing product page has a detailed Size Chart containing exact chest, length, sleeve, and shoulder measurements in inches to help you select your perfect fit.',
    order: 1,
    isActive: true,
  },
  {
    question: 'What are the washing and care instructions for premium silk and cashmere items?',
    answer: 'To preserve the longevity of luxury items like our Floral Silk Wrap Dresses and Cashmere Cardigans, we highly recommend dry cleaning or gentle hand washing with cold water and mild liquid detergent. Always lay flat to dry in the shade and avoid wringing or machine drying.',
    order: 2,
    isActive: true,
  },
  {
    question: 'Do you offer Cash on Delivery (COD) and what are the delivery times?',
    answer: 'Yes, we provide Cash on Delivery (COD) nationwide across Bangladesh. Delivery inside Dhaka typically takes 24 to 48 hours, while delivery outside Dhaka is completed via express courier services within 3 to 5 business days.',
    order: 3,
    isActive: true,
  },
  {
    question: 'What is your exchange and return policy for clothing items?',
    answer: 'We offer an easy 7-day exchange policy. If your garment has a size issue or physical defect, you can request an exchange through your customer dashboard or support team. Please ensure the clothing remains unworn, unwashed, and has all original tags and packaging intact.',
    order: 4,
    isActive: true,
  },
  {
    question: 'Do you offer custom tailoring or custom fittings for blazers and trousers?',
    answer: 'Currently, all our products (such as our linen blazers and pleated trousers) are sold as ready-to-wear garments in standard sizing. We do not offer bespoke tailoring, custom measurements, or alteration services at this time.',
    order: 5,
    isActive: true,
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

    // Clear existing FAQs
    const deleteResult = await FAQ.deleteMany({});
    console.log(`Cleared ${deleteResult.deletedCount} existing FAQs.`);

    // Insert new FAQs
    const insertResult = await FAQ.insertMany(faqs);
    console.log(`Seeded ${insertResult.length} FAQs successfully:`);
    insertResult.forEach((f, i) => {
      console.log(`[FAQ ${i+1}] Question: "${f.question}"`);
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
