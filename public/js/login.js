/* eslint-disable */
// import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';
import axios from 'axios';
import { showAlert } from './alerts';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/users/login',
      data: {
        email,
        password,
      },
    });
    console.log(res)

    if (res.data.status === 'success') {
      showAlert('success', 'Login successful');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    console.log(err)
    showAlert('error', err.response?.data?.message || 'Something went wrong!');
  }
};

export const logout = async() => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:3000/api/v1/users/logout',
    });
    if(res.data.status === 'success') location.reload(true) 
  } catch (err) {
    console.log('Error', err);
    showAlert('error', 'Error logging out!')
  }
};
