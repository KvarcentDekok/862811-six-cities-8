import React, { ChangeEvent, FormEvent, Fragment } from 'react';
import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ratingValues } from '../../utils/utils';
import { comment as commentAction } from '../../store/data/data';
import { getCommentSendingFlag } from '../../store/data/selectors';
import { AppDispatch } from '../../store/store';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { ErrorMessage } from '../../const';

enum ReviewLength {
  Min = 50,
  Max = 300
}

type ReviewFormProps = {
  offerId: string
}

function ReviewForm({offerId}: ReviewFormProps): JSX.Element {
  const [formControls, setFormControls] = useState({
    rating: '',
    comment: '',
  });
  const dispatch = useDispatch<AppDispatch>();
  const isCommentSending = useSelector(getCommentSendingFlag);

  const {rating, comment} = formControls;

  async function handleSubmitReviewForm(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    await dispatch(commentAction({commentData: formControls, offerId}))
      .then(unwrapResult)
      .then(() => setFormControls({rating: '', comment: ''}))
      .catch(() => toast.error(ErrorMessage.SendReviewError));
  }

  function handleChangeReview({target}: ChangeEvent<HTMLTextAreaElement>) {
    setFormControls({
      ...formControls,
      comment: target.value,
    });
  }

  function renderRating(): JSX.Element[] {
    return ratingValues.map((ratingItem) => (
      <Fragment key={ratingItem.value}>
        <input className="form__rating-input visually-hidden" name="rating" value={ratingItem.value} id={`${ratingItem.value}-stars`} type="radio"
          onChange={() => {
            setFormControls({
              ...formControls,
              rating: ratingItem.value,
            });
          }}
          checked={ratingItem.value === rating}
          disabled={isCommentSending}
        />
        <label htmlFor={`${ratingItem.value}-stars`} className="reviews__rating-label form__rating-label" title={ratingItem.name}>
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </Fragment>
    ));
  }

  return (
    <form className="reviews__form form" action="#" method="post"
      onSubmit={handleSubmitReviewForm}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {renderRating()}
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={handleChangeReview}
        disabled={isCommentSending}
        maxLength={ReviewLength.Max}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{ReviewLength.Min} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={(comment.length < ReviewLength.Min) || (rating === '') || isCommentSending}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
