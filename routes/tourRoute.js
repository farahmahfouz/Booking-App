const { Router } = require('express');
const router = Router();
const {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
  getToursWithin,
  getDistances,
} = require('../controllers/tourController');
const { auth, restrictTo } = require('../controllers/authController');
const { uploadTourImages, resizeTourImages } = require('../util/multer');
const reviewRouter = require('../routes/reviewRoute');

// router.param('id', CheckID);
router.use('/:tourId/reviews', reviewRouter);

router.get('/top-5-cheap', aliasTopTours, getAllTours);

router.get('/tour-stats', getTourStats);

router.get(
  '/monthly-plan/:year',
  auth,
  restrictTo('admin', 'lead-guide', 'guide'),
  getMonthlyPlan
);

router.get('/tours-within/:distance/center/:latlng/unit/:unit', getToursWithin);

router.get('/distances/:latlng/unit/:unit', getDistances);

router.get('/', getAllTours);

router.post('/', auth, restrictTo('admin', 'lead-guide'), createTour);

router.get('/:id', getTourById);

router.patch(
  '/:id',
  auth,
  restrictTo('admin', 'lead-guide'),
  uploadTourImages,
  resizeTourImages,
  updateTour
);

router.delete('/:id', auth, restrictTo('admin', 'lead-guide'), deleteTour);

// router.post(
//   '/:tourId/reviews',
//   auth,
//   restrictTo('user'),
//   reviewController.createReview
// );

module.exports = router;
