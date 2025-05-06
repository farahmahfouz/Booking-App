const mongoose = require('mongoose');
const fs = require('fs');
const Tour = require('../../models/tourModel.js');
const Review = require('../../models/reviewModel.js');
const User = require('../../models/userModel.js');
require('dotenv').config();

mongoose
  .connect(
    process.env.DATABASE_URL.replace(
      '<PASSWORD>',
      process.env.DATABASE_PASSWORD
    )
  )
  .then(() => console.log('DB connected successfully'));

// const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
// const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'));


const importData = async () => {
  try {
    // await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    // await Review.create(reviews);
    console.log(`Data retrieved successfully`);
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  // await Tour.deleteMany();
  await User.deleteMany();
  // await Review.deleteMany();
  console.log(`Data successfully deleted`);

  try {
  } catch (err) {
    console.log(err);
  }
  process.exit();
};


if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
