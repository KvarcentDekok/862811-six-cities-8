import React, { ChangeEvent, FormEvent } from 'react';
import {useState} from 'react';
import { FormControls, Rating } from '../../types/review';

type ReviewFormProps = {
  onReview: (formControls: FormControls) => void;
};

const MIN_REVIEW_LENGTH = 50;

const ratingValues: Rating[] = [
  {
    name: 'perfect',
    value: '5',
  },
  {
    name: 'good',
    value: '4',
  },
  {
    name: 'not bad',
    value: '3',
  },
  {
    name: 'badly',
    value: '2',
  },
  {
    name: 'terribly',
    value: '1',
  },
];

function ReviewForm({onReview}: ReviewFormProps): JSX.Element {
  const [formControls, setFormControls] = useState({
    rating: '',
    review: '',
  });

  const {rating, review} = formControls;

  return (
    <form className="reviews__form form" action="#" method="post"
      onSubmit={(evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        onReview(formControls);
        setFormControls({rating: '', review: ''});
      }}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {ratingValues.map((ratingItem) => (
          <>
            <input className="form__rating-input visually-hidden" name="rating" value={ratingItem.value} id={`${ratingItem.value}-stars`} type="radio"
              onChange={() => {
                setFormControls({
                  ...formControls,
                  rating: ratingItem.value,
                });
              }}
              checked={ratingItem.value === rating}
            />
            <label htmlFor={`${ratingItem.value}-stars`} className="reviews__rating-label form__rating-label" title={ratingItem.name}>
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </>
        ))}
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"
        value={review}
        onChange={({target}: ChangeEvent<HTMLTextAreaElement>) => {
          setFormControls({
            ...formControls,
            review: target.value,
          });
        }}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{MIN_REVIEW_LENGTH} characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={(review.length < MIN_REVIEW_LENGTH) || (rating === '')}>Submit</button>
      </div>
    </form>
  );
}

export default ReviewForm;