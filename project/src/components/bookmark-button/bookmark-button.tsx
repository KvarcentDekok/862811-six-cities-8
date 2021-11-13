import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import browserHistory from '../../browser-history';
import { AppRoute, AuthorizationStatus, ErrorMesssage } from '../../const';
import { changeFavoriteStatus } from '../../store/data/data';
import { AppDispatch } from '../../store/store';
import { getAuthorizationStatus } from '../../store/user/selectors';

type BookmarkButtonProps = {
  isFavorite: boolean,
  id: number,
  className: 'property' | 'place-card'
}

function BookmarkButton({isFavorite, id, className}: BookmarkButtonProps):JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const authorizationStatus = useSelector(getAuthorizationStatus);

  function onBookmarkClick() {
    const status = Number(!isFavorite);

    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(changeFavoriteStatus({status, offerId: String(id)}))
        .then(unwrapResult)
        .catch(() => toast.error(status ? ErrorMesssage.AddToFavoriteError : ErrorMesssage.RemoveFromFavoriteError));
    } else {
      browserHistory.push(AppRoute.SignIn);
    }
  }

  return (
    <button
      className={`${className}__bookmark-button ${
        isFavorite && `${className}__bookmark-button--active`
      } button`}
      type="button"
      onClick={onBookmarkClick}
    >
      <svg
        className={`${className}__bookmark-icon`}
        width={className === 'property' ? '31' : '18'}
        height={className === 'property' ? '33' : '19'}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default BookmarkButton;
