import React, { memo } from 'react';
import { Offer } from '../../types/offer';
import { Link } from 'react-router-dom';
import { getPercentageOfRating, capitalize } from '../../utils/utils';
import BookmarkButton from '../bookmark-button/bookmark-button';
import classNames from 'classnames';

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

  let containerClassName = '';
  let imageWrapperClassName = '';
  let cardInfoClassName = '';
  let imageWidth = '';
  let imageHeight = '';

  switch (variant) {
    case 'cities':
      containerClassName = classNames('cities__place-card', 'place-card');
      imageWrapperClassName = classNames('cities__image-wrapper', 'place-card__image-wrapper');
      imageWidth = '260';
      imageHeight = '200';
      break;
    case 'near-places':
      containerClassName = classNames('near-places__card', 'place-card');
      imageWrapperClassName = classNames('near-places__image-wrapper', 'place-card__image-wrapper');
      imageWidth = '260';
      imageHeight = '200';
      break;
    case 'favorites':
      containerClassName = classNames('favorites__card', 'place-card');
      imageWrapperClassName = classNames('favorites__image-wrapper', 'place-card__image-wrapper');
      cardInfoClassName = classNames('favorites__card-info', 'place-card__info');
      imageWidth = '150';
      imageHeight = '110';
  }

  return (
    <article
      className={containerClassName}
      onMouseEnter={onPlaceHover ? () => onPlaceHover(id) : undefined}
      onMouseLeave={onPlaceLeave ? () => onPlaceLeave() : undefined}
    >
      {
        isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className={imageWrapperClassName}>
        <Link to={`/offer/${id}`}>
          <img className="place-card__image" src={previewImage} width={imageWidth} height={imageHeight} alt="Place image"/>
        </Link>
      </div>
      <div className={cardInfoClassName}>
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
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{capitalize(type)}</p>
      </div>
    </article>
  );
}

export default memo(PlaceCard);
