import { unwrapResult } from '@reduxjs/toolkit';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import browserHistory from '../../browser-history';
import { AppRoute, ErrorMesssage } from '../../const';
import { changeFavoriteStatus } from '../../store/data/data';
import { AppDispatch } from '../../store/store';
import { getLoggedInFlag } from '../../store/user/selectors';

type BookmarkButtonProps = {
  isFavorite: boolean,
  id: number,
  className: 'property' | 'place-card'
}

function BookmarkButton({isFavorite, id, className}: BookmarkButtonProps):JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector(getLoggedInFlag);
  const buttonClassName = classNames({
    [`${className}__bookmark-button`]: true,
    [`${className}__bookmark-button--active`]: isFavorite,
    'button': true,
  });

  function onBookmarkClick() {
    const status = Number(!isFavorite);

    if (isLoggedIn) {
      dispatch(changeFavoriteStatus({status, offerId: String(id)}))
        .then(unwrapResult)
        .catch(() => toast.error(status ? ErrorMesssage.AddToFavoriteError : ErrorMesssage.RemoveFromFavoriteError));
    } else {
      browserHistory.push(AppRoute.SignIn);
    }
  }

  return (
    <button
      className={buttonClassName}
      type="button"
      onClick={onBookmarkClick}
    >
      <svg
        className={`${className}__bookmark-icon`}
        width={className === 'property' ? '31' : '18'}
        height={className === 'property' ? '33' : '19'}
      >
        <use href="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default BookmarkButton;
