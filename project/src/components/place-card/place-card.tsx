import React from 'react';
import { Offer } from '../../types/offer';
import { Link } from 'react-router-dom';
import { getPercentageOfRating, capitalize } from '../../utils/utils';

type PlaceCardProps = {
  offer: Offer,
  onPlaceHover?: (id: number) => void,
  onPlaceLeave?: () => void,
  variant: 'cities' | 'near-places',
}

function PlaceCard({offer, onPlaceHover, onPlaceLeave, variant}: PlaceCardProps): JSX.Element {
  const {
    id,
    isFavorite,
    isPremium,
    previewImage,
    price,
    rating,
    title,
    type,
  } = offer;

  let conatainerClassName: string;
  let imageWrapperClassName: string;

  switch (variant) {
    case 'cities':
      conatainerClassName = 'cities__place-card';
      imageWrapperClassName = 'cities__image-wrapper';
      break;
    case 'near-places':
      conatainerClassName = 'near-places__card';
      imageWrapperClassName = 'near-places__image-wrapper';
  }

  return (
    <article
      className={`${conatainerClassName} place-card`}
      onMouseEnter={onPlaceHover ? () => onPlaceHover(id) : undefined}
      onMouseLeave={onPlaceLeave ? () => onPlaceLeave() : undefined}
    >
      {
        isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className={`${imageWrapperClassName} place-card__image-wrapper`}>
        <Link to={`/offer/${id}`}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button ${isFavorite && 'place-card__bookmark-button--active'} button`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${getPercentageOfRating(rating)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{capitalize(type)}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
