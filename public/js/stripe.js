import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { showAlert } from './alerts';

const stripePromise = loadStripe(
  'pk_test_51QfRinJwyO3wDfL0vHjeDX0MGMWDoysbZChmqyarx4ZYt3srQubzauLFGuFQI89L4mfLAGDkf5ptjXsoDIVlhcFd00ZFbLUyjA'
);

export const bookTour = async (tourId) => {
  try {
    const session = await axios(
      `/api/v1/booking/checkout-session/${tourId}`
    );

    window.location.href = session.data.session.url;
    const stripe = await stripePromise;
    if (!stripe) {
      throw new Error('Stripe failed to load.');
    }
    // window.open(session.data.session.url, '_blank');

    // await stripe.redirectToCheckout({
    //   sessionId: session.data.session.id,
    // });

  } catch (err) {
    console.log(err);
    showAlert('error', err.message || 'An error occurred!');
  }
};
