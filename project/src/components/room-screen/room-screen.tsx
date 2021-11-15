import { Offer } from '../../types/offer';
import { useParams } from 'react-router';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import { getPercentageOfRating } from '../../utils/utils';
import Header from '../header/header';
import Reviews from '../reviews/reviews';
import InteractiveMap from '../interactive-map/interactive-map';
import { useDispatch, useSelector } from 'react-redux';
import { changeCity } from '../../store/main/main';
import { loadOffersNearby, loadReviews } from '../../store/data/data';
import PlacesList from '../places-list/places-list';
import { useEffect } from 'react';
import { getAllOffers } from '../../store/data/selectors';
import { AppDispatch } from '../../store/store';
import { toast } from 'react-toastify';
import { ErrorMesssage, OfferType } from '../../const';
import { unwrapResult } from '@reduxjs/toolkit';
import BookmarkButton from '../bookmark-button/bookmark-button';

const IMAGES_MAX_COUNT = 6;

type PossibleOffer = Offer | undefined;

function RoomScreen(): JSX.Element {
  const offers = useSelector(getAllOffers);
  const { id } = useParams<{ id: string }>();
  const offer: PossibleOffer = offers.find((item) => item.id === Number(id));
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (offer) {
      window.scrollTo(0, 0);
      dispatch(changeCity(offer.city));
      dispatch(loadOffersNearby(String(offer.id)))
        .then(unwrapResult)
        .catch(() => toast.error(ErrorMesssage.NoOffersNearby));
      dispatch(loadReviews(String(offer.id)))
        .then(unwrapResult)
        .catch(() => toast.error(ErrorMesssage.NoReviews));
    }
  }, [dispatch, offer]);

  if (!offer) {
    return (<NotFoundScreen/>);
  }

  const {
    bedrooms,
    description,
    goods,
    host,
    images,
    isFavorite,
    isPremium,
    maxAdults,
    price,
    rating,
    title,
    type,
  } = offer;

  return (
    <div className="page">
      <Header/>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.slice(0, IMAGES_MAX_COUNT).map((image) => (
                <div key={image} className="property__image-wrapper">
                  <img
                    className="property__image"
                    src={image}
                    alt="Photo studio"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium && (
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="property__name-wrapper">
                <h1 className="property__name">{title}</h1>
                <BookmarkButton isFavorite={isFavorite} id={Number(id)} className='property' />
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{ width: `${getPercentageOfRating(rating)}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">
                  {rating}
                </span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {OfferType.get(type)}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                    Max {maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goods.map((good) => (
                    <li key={good} className="property__inside-item">
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={`property__avatar-wrapper ${host.isPro ? 'property__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                    <img
                      className="property__avatar user__avatar"
                      src={host.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">{host.name}</span>
                  {host.isPro && <span className="property__user-status">Pro</span>}
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              <Reviews offerId={id}/>
            </div>
          </div>
          <InteractiveMap containerClassName='property__map' activeOfferId={Number(id)}/>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
                Other places in the neighbourhood
            </h2>
            <PlacesList variant='near-places' />
          </section>
        </div>
      </main>
    </div>
  );
}

export default RoomScreen;
