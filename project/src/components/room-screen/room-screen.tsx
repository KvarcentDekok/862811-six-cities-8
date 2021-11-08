import { Offer } from '../../types/offer';
import { useParams } from 'react-router';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import { getPercentageOfRating, capitalize } from '../../utils/utils';
import { Review } from '../../types/review';
import Header from '../header/header';
import Reviews from '../reviews/reviews';
import Map from '../map/map';
import { MapContainerClassName, PlaceCardVariant } from '../../const';
import { useDispatch } from 'react-redux';
import { changeCity } from '../../store/main/main';
import { loadOffersNearby } from '../../store/data/data';
import PlacesList from '../places-list/places-list';
import { useEffect } from 'react';

type RoomScreenProps = {
  offers: Offer[],
  reviews: Review[]
};

type PossibleOffer = Offer | undefined;

function RoomScreen({ offers, reviews }: RoomScreenProps): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const offer: PossibleOffer = offers.find((item) => item.id === Number(id));
  const dispatch = useDispatch();

  useEffect(() => {
    if (offer) {
      dispatch(changeCity(offer.city));
      dispatch(loadOffersNearby(String(offer.id)));
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
              {images.map((image) => (
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
                <button
                  className={`property__bookmark-button ${
                    isFavorite && 'property__bookmark-button--active'
                  } button`}
                  type="button"
                >
                  <svg
                    className="property__bookmark-icon"
                    width="31"
                    height="33"
                  >
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
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
                  {capitalize(type)}
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
              <Reviews reviews={reviews}/>
            </div>
          </div>
          <Map containerClassName={MapContainerClassName.Property}/>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
                Other places in the neighbourhood
            </h2>
            <PlacesList variant={PlaceCardVariant.NearPlaces} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default RoomScreen;
