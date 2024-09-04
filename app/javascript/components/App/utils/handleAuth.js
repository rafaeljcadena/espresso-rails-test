export function persistAuth(headers) {
  const uid = headers['uid'];
  const client = headers['client'];
  const accessToken = headers['access-token'];

  if (!client) return;

  const userInfo = getUserInfo();
  const newUserInfo = { ...userInfo, uid, client };

  if (accessToken) newUserInfo['access-token'] = accessToken;

  localStorage.setItem('user', JSON.stringify(newUserInfo));
}

export function persistInfo(data) {
  const { name, email, role } = data.data;

  const userInfo = getUserInfo();
  const newUserInfo = { ...userInfo, name, email, role };

  localStorage.setItem('user', JSON.stringify(newUserInfo));
}

export function getAuthInfo() {
  const userInfo = getUserInfo();
  if (!userInfo) return;

  const { uid, client } = userInfo;

  return { uid, client, ['access-token']: userInfo['access-token'] };
}

export function getProfile() {
  const userInfo = getUserInfo();
  if (!userInfo) return;

  const { name, email, role } = userInfo;

  return { name, email, role };
}

function getUserInfo() {
  const rawUserInfo = localStorage.getItem('user');

  if (!rawUserInfo) return;

  return JSON.parse(rawUserInfo);
}

export function clearAuth() {
  localStorage.removeItem('user');
}