import React, { memo } from 'react';
import { Offer } from '../../types/offer';
import { Link } from 'react-router-dom';
import { getPercentageOfRating, capitalize } from '../../utils/utils';
import BookmarkButton from '../bookmark-button/bookmark-button';

type PlaceCardProps = {
  offer: Offer,
  onPlaceHover?: (id: number) => void,
  onPlaceLeave?: () => void,
  variant: 'cities' | 'near-places' | 'favorites',
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

  let conatainerClassName = '';
  let imageWrapperClassName = '';
  let cardInfoClassName = '';
  let imageWidth = '';
  let imageHeight = '';

  switch (variant) {
    case 'cities':
      conatainerClassName = 'cities__place-card';
      imageWrapperClassName = 'cities__image-wrapper';
      imageWidth = '260';
      imageHeight = '200';
      break;
    case 'near-places':
      conatainerClassName = 'near-places__card';
      imageWrapperClassName = 'near-places__image-wrapper';
      imageWidth = '260';
      imageHeight = '200';
      break;
    case 'favorites':
      conatainerClassName = 'favorites__card';
      imageWrapperClassName = 'favorites__image-wrapper';
      cardInfoClassName = 'favorites__card-info';
      imageWidth = '150';
      imageHeight = '110';
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
          <img className="place-card__image" src={previewImage} width={imageWidth} height={imageHeight} alt="Place image"/>
        </Link>
      </div>
      <div className={`${cardInfoClassName} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <BookmarkButton isFavorite={isFavorite} id={id} className='place-card' />
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

export default memo(PlaceCard);
