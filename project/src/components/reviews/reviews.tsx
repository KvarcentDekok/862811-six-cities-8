import { useSelector } from 'react-redux';
import { getReviews } from '../../store/data/selectors';
import ReviewForm from '../review-form/review-form';
import ReviewComponent from '../review/review';
import { getAuthorizationStatus } from '../../store/user/selectors';
import { AuthorizationStatus } from '../../const';

type ReviewsProps = {
  offerId: string
}

function Reviews({offerId}: ReviewsProps): JSX.Element {
  const reviews = useSelector(getReviews);
  const authorizationStatus = useSelector(getAuthorizationStatus);

  function renderReviews() {
    return reviews.map((review) => (
      <ReviewComponent key={review.id} review={review} />
    ));
  }

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {renderReviews()}
      </ul>
      {authorizationStatus === AuthorizationStatus.Auth && <ReviewForm offerId={offerId} />}
    </section>
  );
}

export default Reviews;
