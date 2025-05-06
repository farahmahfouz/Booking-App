# Nested Routes Implementation Guide

## Overview
This documentation explains how to implement nested routes in your Express application, specifically focusing on the reviews system that belongs to tours. The implementation follows RESTful principles and maintains clean separation of concerns.

## Route Structure
The nested route structure follows this pattern:
```
/tours/:tourId/reviews
/tours/:tourId/reviews/:id
```

## Implementation Details

### 1. Review Router Configuration
**Location**: `routes/reviewRoutes.js`

```javascript
const { Router } = require('express');
const { 
  getAllReviews, 
  createReview, 
  getReview, 
  updateReview, 
  deleteReview, 
  setToursUserIds 
} = require('../controllers/reviewController');
const { auth, restrictTo } = require('../controllers/authController');

// Create router with mergeParams to access parent route params
const router = Router({ mergeParams: true });

// Route definitions
router.get('/', getAllReviews);
router.post('/', auth, restrictTo('user'), setToursUserIds, createReview);
router.get('/:id', getReview);
router.patch('/:id', updateReview);
router.delete('/:id', deleteReview);

module.exports = router;
```

### 2. Mounting the Nested Router
**Location**: `routes/tourRoutes.js`

```javascript
const express = require('express');
const reviewRouter = require('./reviewRoutes');
const router = express.Router();

// Other tour routes...

// Mount review router as a nested route
router.use('/:tourId/reviews', reviewRouter);

module.exports = router;
```

### 3. Controller Implementation
**Location**: `controllers/reviewController.js`

#### Key Features:
- Automatic population of tour and user IDs
- Filtering reviews by tour when tourId parameter exists
- Standard CRUD operations

```javascript
const catchAsync = require('../util/catchAsync');
const Review = require('../models/reviewModel');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };
  
  const reviews = await Review.find(filter);

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: { reviews },
  });
});

exports.setToursUserIds = (req, res, next) => {
  // Set tour ID from params if not in body
  if (!req.body.tour) req.body.tour = req.params.tourId;
  
  // Set user ID from authenticated user
  if (!req.body.user) req.body.user = req.user.id;
  
  next();
};

exports.createReview = catchAsync(async (req, res, next) => {
  const newReview = await Review.create(req.body);

  res.status(200).json({
    status: 'success',
    data: { review: newReview },
  });
});

// Other CRUD operations...
```

## Key Components

### 1. `mergeParams: true`
- Enables the child router to access parameters from the parent route
- Critical for accessing `tourId` in review routes

### 2. Middleware Chaining
- Authentication (`auth`)
- Authorization (`restrictTo`)
- Data population (`setToursUserIds`)
- Business logic (CRUD controllers)

### 3. Flexible Querying
- `getAllReviews` automatically filters by tour if `tourId` exists
- Works for both nested and non-nested routes

## Usage Examples

### Creating a Review for a Specific Tour
```
POST /tours/5f8d3b7b4f4d4b1b7c8b4567/reviews
{
  "review": "Great tour!",
  "rating": 5
}
```

### Getting All Reviews for a Tour
```
GET /tours/5f8d3b7b4f4d4b1b7c8b4567/reviews
```

### Getting All Reviews (Across All Tours)
```
GET /reviews
```

## Best Practices

1. **Parameter Validation**
   - Always validate `tourId` and `reviewId` as MongoDB IDs
   - Consider adding middleware to verify tour exists

2. **Authorization**
   - Restrict review updates/deletes to review author or admin
   - Implement proper ownership checks

3. **Error Handling**
   - Handle cases where parent resource doesn't exist
   - Provide meaningful error messages

4. **Route Organization**
   - Keep nested routes focused on the relationship
   - Maintain flat structure for independent operations

5. **Performance**
   - Consider adding indexes for tour and user references
   - Implement pagination for reviews list

## Advanced Considerations

### Population Options
You can enhance the review queries by populating related data:

```javascript
const reviews = await Review.find(filter).populate({
  path: 'user',
  select: 'name photo'
}).populate({
  path: 'tour',
  select: 'name'
});
```

### Factory Functions
For standard CRUD operations, consider using factory functions:

```javascript
exports.deleteReview = factory.deleteOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.getReview = factory.getOne(Review);
```