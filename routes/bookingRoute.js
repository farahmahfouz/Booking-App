const express = require('express');
const { auth, restrictTo } = require('../controllers/authController');
const {
  getCheckoutSessions,
  getAllBooking,
  createBooking,
  getBooking,
  updateBooking,
  deleteBooking,
} = require('../controllers/bookingController');
const router = express.Router();

router.use(auth);

router.get('/checkout-session/:tourId', getCheckoutSessions);

router.use(restrictTo('admin', 'lead-guide'));

router.get('/', getAllBooking);
router.post('/', createBooking);

router.get('/:id', getBooking);
router.patch('/:id', updateBooking);
router.delete('/:id', deleteBooking);

module.exports = router;
