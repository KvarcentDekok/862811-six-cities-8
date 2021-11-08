import { Review } from '../../types/review';
import ReviewForm from '../review-form/review-form';
import ReviewComponent from '../review/review';

type ReviewsProps = {
  reviews: Review[]
};

function Reviews({ reviews }: ReviewsProps): JSX.Element {
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
      <ReviewForm onReview={() => false} />
    </section>
  );
}

export default Reviews;
