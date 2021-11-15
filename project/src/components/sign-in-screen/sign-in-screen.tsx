import React, { FormEvent, MouseEvent, useRef } from 'react';
import { AuthData } from '../../types/auth-data';
import { login } from '../../store/user/user';
import { useDispatch } from 'react-redux';
import browserHistory from '../../browser-history';
import { AppRoute, ErrorMesssage, CITIES } from '../../const';
import { AppDispatch } from '../../store/store';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getRandomInteger } from '../../utils/utils';
import { Link } from 'react-router-dom';
import { changeCity } from '../../store/main/main';

const INVALID_PASSWORD_MESSAGE = 'Password must be at least one number and one letter';

function SignInScreen(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const randomCity = CITIES[getRandomInteger(0, CITIES.length - 1)];

  const onSubmit = async (authData: AuthData) => {
    await dispatch(login(authData))
      .then(unwrapResult)
      .then(() => browserHistory.push(AppRoute.Main))
      .catch(() => toast.error(ErrorMesssage.LoginError));
  };

  const validatePassword = (evt: MouseEvent<HTMLButtonElement>) => {
    if (passwordRef.current?.checkValidity() === false && passwordRef.current?.validity.patternMismatch) {
      passwordRef.current?.setCustomValidity(INVALID_PASSWORD_MESSAGE);
    } else {
      passwordRef.current?.setCustomValidity('');
    }
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      onSubmit({
        email: loginRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="main.html">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label htmlFor='email' className="visually-hidden">E-mail</label>
                <input id='email' className="login__input form__input" type="email" name="email" placeholder="Email" required ref={loginRef}/>
              </div>
              <div className="login__input-wrapper form__input-wraFpper">
                <label htmlFor='password' className="visually-hidden">Password</label>
                <input
                  id='password'
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  ref={passwordRef}
                  pattern='(?=.*\d)(?=.*[a-z]).*'
                />
              </div>
              <button className="login__submit form__submit button" type="submit" onClick={validatePassword}>Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.Main} onClick={() => dispatch(changeCity(randomCity))}>
                <span>{randomCity.name}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default SignInScreen;
