import axios from 'axios';
import { clearAuth, getAuthInfo, persistAuth, persistInfo } from '../utils/handleAuth';

const axiosClient = axios.create();

axiosClient.defaults.headers.common['Accept'] = 'application/json';

const publicPaths = ['/auth/sign_in', '/api/v1/users/create_admin.json']

axiosClient.interceptors.request.use(function (request) {
  if (!publicPaths.includes(request.url)) {
    const authInfo = getAuthInfo();

    if (authInfo) {
      request.headers['uid'] = authInfo.uid;
      request.headers['client'] = authInfo.client;
      request.headers['access-token'] = authInfo['access-token'];
    }
  }

  return request;
});

axiosClient.interceptors.response.use(function (response) {
  // Adding localstorage auth
  persistAuth(response.headers);

  if (response.config.url === '/auth/sign_in') persistInfo(response.data);

  return response;
}, function (error) {
  const { status, config } = error.response;

  if (status === 401 && config.url !== '/auth/sign_in') {
    clearAuth();
    window.location = '/app/sign-in';
  }

  return Promise.reject(error);
});

export default axiosClient;
