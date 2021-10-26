import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { State } from '../../types/state';

const mapStateToProps = ({ authorizationStatus, authInfo }: State) => ({
  authorizationStatus,
  authInfo,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Header({ authorizationStatus, authInfo }: PropsFromRedux): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a className="header__logo-link header__logo-link--active">
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width="81"
                height="41"
              />
            </a>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {authorizationStatus === AuthorizationStatus.Auth &&
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
                      <a className="header__nav-link" href="#">
                        <span className="header__signout">Sign out</span>
                      </a>
                    </li>
                  </>}
              {authorizationStatus !== AuthorizationStatus.Auth &&
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

export {Header};
export default connector(Header);
