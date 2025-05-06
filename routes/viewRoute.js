const { Router } = require('express');
const {
  getOverview,
  getTour,
  getLoginForm,
  getAccount,
  updateUserData,
  getMyTours
} = require('../controllers/viewController.js');
const router = Router();
const { auth, isLoggedIn } = require('../controllers/authController.js');
const { createBookingCheckout } = require('../controllers/bookingController');

router.get('/', createBookingCheckout, isLoggedIn, getOverview);

router.get('/tour/:slug', isLoggedIn, getTour);

router.get('/login', isLoggedIn, getLoginForm);

router.get('/me', auth, getAccount);

router.get('/my-tours', auth, getMyTours)

router.post('/updateMe', auth, updateUserData);

module.exports = router;
