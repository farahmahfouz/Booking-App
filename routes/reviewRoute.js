const { Router } = require('express');
const { getAllReviews, createReview, getReview, updateReview, deleteReview, setToursUserIds } = require('../controllers/reviewController');
const { auth, restrictTo } = require('../controllers/authController');
const router = Router({ mergeParams: true });


router.get('/', getAllReviews);

router.post('/', auth, restrictTo('user'), setToursUserIds, createReview);

router.get('/:id', getReview);

router.patch('/:id', updateReview);

router.delete('/:id', deleteReview);

module.exports = router;
