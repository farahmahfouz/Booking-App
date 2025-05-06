const mongoose = require('mongoose');
const Tour = require('./tourModel');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review can not be empty'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user.'],
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour.'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  });
  next();
});

reviewSchema.statics.calcAverageRatings = async function (tourId) {
  const stats = await this.aggregate([
    { $match: { tour: tourId } },
    {
      $group: {
        _id: '$tour',
        nRatings: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);
  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].nRatings,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

reviewSchema.post('save', function () {
  this.constructor.calcAverageRatings(this.tour);
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.clone().findOne();
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  await this.r.constructor.calcAverageRatings(this.r.tour);
});

// reviewSchema.pre('aggregate', function (next) {
//   const pipeline = this.pipeline();

//   const hasUserLookup = pipeline.some(
//     (stage) => stage.$lookup?.from === 'users'
//   );
//   if (!hasUserLookup) {
//     pipeline.push(
//       {
//         $lookup: {
//           from: 'users',
//           localField: 'user',
//           foreignField: '_id',
//           as: 'user',
//           pipeline: [
//             {
//               $project: {
//                 _id: 0,
//                 name: 1,
//               },
//             },
//           ],
//         },
//       },
//       { $unwind: '$user' }
//     );
//   }

//   const hasTourLookup = pipeline.some(
//     (stage) => stage.$lookup?.from === 'tours'
//   );
//   if (!hasTourLookup) {
//     pipeline.push(
//       {
//         $lookup: {
//           from: 'tours',
//           localField: 'tour',
//           foreignField: '_id',
//           as: 'tour',
//           pipeline: [
//             {
//               $project: {
//                 _id: 0,
//                 name: 1,
//               },
//             },
//           ],
//         },
//       },
//       { $unwind: '$tour' },
//       {
//         $project: {
//           review: 1,
//           rating: 1,
//           'user.name': 1,
//           'user.photo': 1,
//         },
//       },
//     );
//   }

//   next();
// });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
