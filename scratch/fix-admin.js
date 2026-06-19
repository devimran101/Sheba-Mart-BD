const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

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

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['super_admin', 'admin', 'user'], default: 'user' },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function run() {
  try {
    try {
      await mongoose.connect(mongodbUri);
    } catch (connErr) {
      console.log('SRV connection failed, trying direct connection fallback...');
      const directUri = 'mongodb+srv://ShebaMartBd:Y49S1GQDWQRv5FeT@cluster0.e5n1hnl.mongodb.net/ShebaMartBd';
      await mongoose.connect(directUri);
    }
    console.log('Connected to MongoDB.');

    const result = await User.updateOne(
      { email: 'imranshuvo101@gmail.com' },
      { $set: { role: 'super_admin' } }
    );

    console.log('Update result:', result);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected.');
  }
}

run();
