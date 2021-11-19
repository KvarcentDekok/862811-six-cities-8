import { useSelector } from 'react-redux';
import { getReviews, getReviewsNumber } from '../../store/data/selectors';
import ReviewForm from '../review-form/review-form';
import ReviewComponent from '../review/review';
import { getLoggedInFlag } from '../../store/user/selectors';

type ReviewsProps = {
  offerId: string
}

function Reviews({offerId}: ReviewsProps): JSX.Element {
  const reviews = useSelector(getReviews);
  const reviewsNumber = useSelector(getReviewsNumber);
  const isLoggedIn = useSelector(getLoggedInFlag);

  function renderReviews() {
    return reviews.map((review) => (
      <ReviewComponent key={review.id} review={review} />
    ));
  }

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{reviewsNumber}</span>
      </h2>
      <ul className="reviews__list">
        {renderReviews()}
      </ul>
      {isLoggedIn && <ReviewForm offerId={offerId} />}
    </section>
  );
}

export default Reviews;
