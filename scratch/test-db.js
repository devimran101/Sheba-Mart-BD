const mongoose = require('mongoose');

const directUri = 'mongodb+srv://ShebaMartBd:Y49S1GQDWQRv5FeT@cluster0.e5n1hnl.mongodb.net/ShebaMartBd';

console.log('Connecting to MongoDB directly...');
mongoose.connect(directUri)
  .then(() => {
    console.log('Success!');
    process.exit(0);
  })
  .catch(err => {
    console.error('Failed:', err);
    process.exit(1);
  });
