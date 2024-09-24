import "@testing-library/jest-dom";
import { clearAuth, getAuthInfo, getProfile, persistAuth, persistInfo } from "./handleAuth";

describe('handleAuth module', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  });

  it('persistAuth should call localstorage setItem with valid headers', () => {
    jest.spyOn(window.localStorage.__proto__, 'setItem');

    const mockHeaders = {
      uid: '12345',
      client: 'mock-client',
      ['access-token']: 'mock-token',
    }

    persistAuth(mockHeaders);

    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('persistAuth should not call localstorage setItem without client header', () => {
    jest.spyOn(window.localStorage.__proto__, 'setItem');

    const mockHeaders = {
      uid: '12345',
      client: null,
      ['access-token']: 'mock-token',
    }

    persistAuth(mockHeaders);

    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  it('persistAuth should not update access token when there is no new token', () => {
    jest.spyOn(window.localStorage.__proto__, 'setItem');

    const mockHeaders = {
      uid: '12345',
      client: 'mock-client',
      ['access-token']: 'mock-token',
    }

    persistAuth(mockHeaders);

    const newMockHeaders = {
      uid: '12345',
      client: 'mock-client',
    }

    persistAuth(newMockHeaders);

    const authInfo = getAuthInfo();

    expect(authInfo['access-token']).toBe(mockHeaders['access-token']);
  });

  it('persistAuth should update access token when receive new token', () => {
    jest.spyOn(window.localStorage.__proto__, 'setItem');

    const mockHeaders = {
      uid: '12345',
      client: 'mock-client',
      ['access-token']: 'mock-token',
    }

    persistAuth(mockHeaders);

    const newMockHeaders = {
      uid: '12345',
      client: 'mock-client',
      ['access-token']: 'new-mock-token',
    }

    persistAuth(newMockHeaders);

    const authInfo = getAuthInfo();

    expect(authInfo['access-token']).toBe(newMockHeaders['access-token']);
  });

  it('persistInfo should call localstorage setItem', () => {
    jest.spyOn(window.localStorage.__proto__, 'setItem');

    const mockUser = {
      name: 'Mock name',
      email: 'Mock email',
      role: 'Mock role',
    };

    persistInfo({ data: mockUser })

    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('getProfile should return user info', () => {
    const mockUser = {
      name: 'Mock name',
      email: 'Mock email',
      role: 'Mock role',
    };

    persistInfo({ data: mockUser })

    const userInfo = getProfile();

    expect(userInfo.name).toBe(mockUser.name);
    expect(userInfo.email).toBe(mockUser.email);
    expect(userInfo.role).toBe(mockUser.role);
  });

  it('getProfile should return undefined when there is no user info', () => {
    clearAuth();

    const userInfo = getProfile();

    expect(userInfo).toBeUndefined();
  });

  it('getAuthInfo should return auth info', () => {
    const mockHeaders = {
      uid: '12345',
      client: 'mock-client',
      ['access-token']: 'mock-token',
    }

    persistAuth(mockHeaders);

    const authInfo = getAuthInfo();

    expect(authInfo.uid).toBe(mockHeaders.uid);
    expect(authInfo.client).toBe(mockHeaders.client);
    expect(authInfo['access-token']).toBe(mockHeaders['access-token']);
  });

  it('getAuthInfo should return undefined when there is no auth info', () => {
    clearAuth();

    const authInfo = getAuthInfo();

    expect(authInfo).toBeUndefined();
  });

  it('clearAuth should call localstorage remoteItem', () => {
    jest.spyOn(window.localStorage.__proto__, 'removeItem');
    
    clearAuth();

    expect(localStorage.removeItem).toHaveBeenCalled();
  });
});