/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { notify, history } from 'aesirx-uikit';
import { Storage, env } from 'aesirx-lib';

// LOGIN
const login = async ({ username, password }) => {
  document.body.classList.add('body_login_page');

  // const authService = new AesirxAuthenticationApiService();
  // const result = await authService.login(username, password);
  if (username === env.REACT_APP_DEFAULT_USER && password === env.REACT_APP_DEFAULT_PASSWORD) {
    Storage.setItem('auth', true);
    document.body.classList.remove('body_login_page');

    history.push('/');
    return true;
  } else {
    notify('Login information is incorrect', 'error');
    document.body.classList.remove('body_login_page');
    return false;
  }
};

// LOGOUT
const logout = () => {
  localStorage.clear();

  history.push('/login');
};

// LOGIN STATUS
const isLogin = () => {
  try {
    const isAuthenticated = Storage.getItem('auth');
    // const userID = Storage.getItem(AUTHORIZATION_KEY.MEMBER_ID, null);
    // const userName = Storage.getItem(AUTHORIZATION_KEY.MEMBER_EMAIL, null);

    if (isAuthenticated) {
      return true;
    }
    return false;
  } catch (error) {
    logout();
  }
};

export { login, logout, isLogin };
