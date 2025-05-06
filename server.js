const mongoose = require('mongoose');


process.on('uncaughtException', function (err) {
  console.log('Uncaught Exception 💥', err);
  console.log(err.name, err.message);
  process.exit(1);
});


require('dotenv').config();
const app = require('./app');


const DB = process.env.DATABASE_URL.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => {
    console.log('Connect with mongodb server');
  })
  .catch((err) => {
    console.log('Faild to connect with MongoDb server', err);
    // process.exit(1);
  });

const server = app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
