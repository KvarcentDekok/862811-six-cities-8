import React, { memo, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute, ErrorMessage } from '../../const';
import { AppDispatch } from '../../store/store';
import { getAuthInfo, getLoggedInFlag } from '../../store/user/selectors';
import { logout } from '../../store/user/user';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import browserHistory from '../../browser-history';
import { dropToken } from '../../services/token';

function Header(): JSX.Element {
  const isLoggedIn = useSelector(getLoggedInFlag);
  const authInfo = useSelector(getAuthInfo);
  const dispatch = useDispatch<AppDispatch>();

  function handleSignOutClick(evt: MouseEvent<HTMLAnchorElement>) {
    evt.preventDefault();
    dispatch(logout())
      .then(unwrapResult)
      .then(() => {
        dropToken();
        browserHistory.push(AppRoute.SignIn);
      })
      .catch(() => toast.error(ErrorMessage.LogoutError));
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to={AppRoute.Main}>
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width="81"
                height="41"
              />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {isLoggedIn &&
                  <>
                    <li className="header__nav-item user">
                      <Link
                        className="header__nav-link header__nav-link--profile"
                        to="/favorites"
                      >
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                          <img src={authInfo?.avatarUrl} alt='User avatar' className='user__avatar'/>
                        </div>
                        <span className="header__user-name user__name">
                          {authInfo?.email}
                        </span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <a className="header__nav-link" onClick={handleSignOutClick} href=''>
                        <span className="header__signout">Sign out</span>
                      </a>
                    </li>
                  </>}
              {!isLoggedIn &&
                  <li className="header__nav-item user">
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to='/login'
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
