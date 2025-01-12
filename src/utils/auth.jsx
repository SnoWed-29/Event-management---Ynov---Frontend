// utils/auth.js
import {jwtDecode} from 'jwt-decode';

export const getAccessToken = () => {
  const cookies = document.cookie.split('; ');
  const accessToken = cookies.find(row => row.startsWith('access_token='));
  return accessToken ? accessToken.split('=')[1] : null;
};

export const getUserIdFromToken = () => {
  const token = getAccessToken();
  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.user_id;
  }
  return null;
};
