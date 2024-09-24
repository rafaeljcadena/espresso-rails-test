import axios from "axios";
import { clearAuth, getProfile, persistAuth } from "../utils/handleAuth";
import axiosClient from "./axiosClient";

const mockFetchData = jest.fn().mockImplementation(() => new Promise((resolve, reject) => {
  return resolve();
}));

describe('axiosClient tests', () => {
  beforeEach(() => {
    jest.spyOn(axiosClient, 'get').mockImplementation(mockFetchData);
  })

  afterEach(() => {
    jest.restoreAllMocks()
  });

  describe('Request interceptors', () => {
    const mockHeaders = {
      uid: '12345',
      client: 'mock-client',
      ['access-token']: 'mock-token',
    };

    beforeEach(() => {
      persistAuth(mockHeaders);
    });

    it('should add auth headers in non-authentication requests', async () => {
      const request = axiosClient.interceptors.request.handlers[0].fulfilled({ url: '/mock', headers: {} });

      expect(request.headers.uid).toBe(mockHeaders.uid);
      expect(request.headers.client).toBe(mockHeaders.client);
      expect(request.headers['access-token']).toBe(mockHeaders['access-token']);
    });

    it('should not add auth headers when there is no authenticated user', async () => {
      clearAuth();

      const request = axiosClient.interceptors.request.handlers[0].fulfilled({ url: '/mock', headers: {} });

      expect(request.headers.uid).toBeUndefined();
      expect(request.headers.client).toBeUndefined();
      expect(request.headers['access-token']).toBeUndefined();
    });

    it('should not add auth headers in non-authentication requests', async () => {
      const request = axiosClient.interceptors.request.handlers[0].fulfilled({ url: '/auth/sign_in', headers: {} });

      expect(request.headers.uid).toBeUndefined();
      expect(request.headers.client).toBeUndefined();
      expect(request.headers['access-token']).toBeUndefined();
    });
  });

  describe('Response interceptors', () => {
    const mockHeaders = {
      uid: '12345',
      client: 'mock-client',
      ['access-token']: 'mock-token',
    };

    it('should update auth headers', () => {
      jest.spyOn(window.localStorage.__proto__, 'setItem');

      axiosClient.interceptors.response.handlers[0].fulfilled({ config: { url: '/mock' }, headers: mockHeaders })

      expect(localStorage.setItem).toHaveBeenCalled();
    });

    it('should update users info when login', () => {
      const mockUser = {
        name: 'Mock name',
        email: 'Mock email',
        role: 'Mock role',
      };

      axiosClient.interceptors.response.handlers[0].fulfilled({ 
        config: { url: '/auth/sign_in' }, 
        headers: mockHeaders, 
        data: { data: mockUser }
      });

      const userInfo = getProfile();

      expect(userInfo.name).toBe(mockUser.name);
      expect(userInfo.email).toBe(mockUser.email);
      expect(userInfo.role).toBe(mockUser.role);
    });

    it('should clear auth with unauthorized responses', async () => {
      jest.spyOn(window.localStorage.__proto__, 'removeItem');

      try {
        await axiosClient.interceptors.response.handlers[0].rejected({
          response: {
            status: 401,
            config: { url: '/mock' },
            headers: mockHeaders,
          }
        });
      } catch (err) { }

      expect(localStorage.removeItem).toHaveBeenCalled();
    });

    it('should not clear auth in rejected requests', async () => {
      jest.spyOn(window.localStorage.__proto__, 'removeItem');

      try {
        await axiosClient.interceptors.response.handlers[0].rejected({
          response: {
            status: 422,
            config: { url: '/mock' },
            headers: mockHeaders,
          }
        });
      } catch (err) { }

      expect(localStorage.removeItem).not.toHaveBeenCalled();
    });

    // it('should add auth headers in non-authentication requests', async () => {
    //   const request = axiosClient.interceptors.response.handlers[0].fulfilled({ url: '/mock', headers: {} });

    //   expect(request.headers.uid).toBe(mockHeaders.uid);
    //   expect(request.headers.client).toBe(mockHeaders.client);
    //   expect(request.headers['access-token']).toBe(mockHeaders['access-token']);
    // });

    // it('should not add auth headers in non-authentication requests', async () => {
    //   const request = axiosClient.interceptors.request.handlers[0].fulfilled({ url: '/auth/sign_in', headers: {} });

    //   expect(request.headers.uid).toBeUndefined();
    //   expect(request.headers.client).toBeUndefined();
    //   expect(request.headers['access-token']).toBeUndefined();
    // });
  });

});