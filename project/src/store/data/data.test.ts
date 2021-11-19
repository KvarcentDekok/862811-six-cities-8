import data, { changeFavoriteStatus, comment, loadFavoriteOffers, loadOffers, loadOffersNearby, loadReviews } from './data';
import { makeFakeOffer, makeFakeReview } from '../../utils/mocks';
import { adaptToClientOffers, adaptToClientReviews } from '../../services/api';
import { CommentData } from '../../types/review';

describe('Reducer: data', () => {
  it('without additional parameters should return initial state', () => {
    expect(data(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        allOffers: [],
        isLoading: true,
        isCommentSending: false,
        offersNearby: [],
        reviews: [],
        favoriteOffers: [],
      });
  });

  it('should change loading flag to "true"', () => {
    const state = {
      allOffers: [],
      isLoading: false,
      isCommentSending: false,
      offersNearby: [],
      reviews: [],
      favoriteOffers: [],
    };

    expect(data(state, loadOffers.pending(' ')))
      .toEqual({
        allOffers: [],
        isLoading: true,
        isCommentSending: false,
        offersNearby: [],
        reviews: [],
        favoriteOffers: [],
      });
  });

  it('should fill all offers and change loading flag to "false"', () => {
    const state = {
      allOffers: [],
      isLoading: true,
      isCommentSending: false,
      offersNearby: [],
      reviews: [],
      favoriteOffers: [],
    };

    const offers = new Array(4).fill(makeFakeOffer({}));

    expect(data(state, loadOffers.fulfilled(offers, ' ')))
      .toEqual({
        allOffers: adaptToClientOffers(offers),
        isLoading: false,
        isCommentSending: false,
        offersNearby: [],
        reviews: [],
        favoriteOffers: [],
      });
  });

  it('should change loading flag to "false"', () => {
    const state = {
      allOffers: [],
      isLoading: true,
      isCommentSending: false,
      offersNearby: [],
      reviews: [],
      favoriteOffers: [],
    };

    expect(data(state, loadOffers.rejected(null, ' ')))
      .toEqual({
        allOffers: [],
        isLoading: false,
        isCommentSending: false,
        offersNearby: [],
        reviews: [],
        favoriteOffers: [],
      });
  });

  it('should fill offers nearby', () => {
    const state = {
      allOffers: [],
      isLoading: false,
      isCommentSending: false,
      offersNearby: [],
      reviews: [],
      favoriteOffers: [],
    };

    const offers = new Array(4).fill(makeFakeOffer({}));

    expect(data(state, loadOffersNearby.fulfilled(offers, '1', ' ')))
      .toEqual({
        allOffers: [],
        isLoading: false,
        isCommentSending: false,
        offersNearby: adaptToClientOffers(offers),
        reviews: [],
        favoriteOffers: [],
      });
  });

  it('should fill reviews', () => {
    const state = {
      allOffers: [],
      isLoading: false,
      isCommentSending: false,
      offersNearby: [],
      reviews: [],
      favoriteOffers: [],
    };

    const reviews = new Array(4).fill(makeFakeReview());

    expect(data(state, loadReviews.fulfilled(reviews, '1', ' ')))
      .toEqual({
        allOffers: [],
        isLoading: false,
        isCommentSending: false,
        offersNearby: [],
        reviews: adaptToClientReviews(reviews),
        favoriteOffers: [],
      });
  });

  it('should change sending comment flag to "true"', () => {
    const state = {
      allOffers: [],
      isLoading: false,
      isCommentSending: false,
      offersNearby: [],
      reviews: [],
      favoriteOffers: [],
    };

    const commentData: CommentData = {
      rating: '5',
      comment: '5',
    };

    expect(data(state, comment.pending(' ', {commentData, offerId: '1'})))
      .toEqual({
        allOffers: [],
        isLoading: false,
        isCommentSending: true,
        offersNearby: [],
        reviews: [],
        favoriteOffers: [],
      });
  });

  it('should fill reviews and change sending comment flag to "false"', () => {
    const state = {
      allOffers: [],
      isLoading: false,
      isCommentSending: true,
      offersNearby: [],
      reviews: [],
      favoriteOffers: [],
    };

    const commentData: CommentData = {
      rating: '5',
      comment: '5',
    };

    const reviews = new Array(4).fill(makeFakeReview());

    expect(data(state, comment.fulfilled(reviews, ' ', {commentData, offerId: '1'})))
      .toEqual({
        allOffers: [],
        isLoading: false,
        isCommentSending: false,
        offersNearby: [],
        reviews: adaptToClientReviews(reviews),
        favoriteOffers: [],
      });
  });

  it('should change sending comment flag to "false"', () => {
    const state = {
      allOffers: [],
      isLoading: false,
      isCommentSending: true,
      offersNearby: [],
      reviews: [],
      favoriteOffers: [],
    };

    const commentData: CommentData = {
      rating: '5',
      comment: '5',
    };

    expect(data(state, comment.rejected(null, ' ', {commentData, offerId: '1'})))
      .toEqual({
        allOffers: [],
        isLoading: false,
        isCommentSending: false,
        offersNearby: [],
        reviews: [],
        favoriteOffers: [],
      });
  });

  it('should change offers with favorive status', () => {
    const favoriteOffer = makeFakeOffer({isFavorite: true});

    const state = {
      allOffers: adaptToClientOffers([favoriteOffer]),
      isLoading: false,
      isCommentSending: false,
      offersNearby: adaptToClientOffers([favoriteOffer]),
      reviews: [],
      favoriteOffers: adaptToClientOffers([favoriteOffer]),
    };

    const notFavoriteOffer = Object.assign(
      {},
      favoriteOffer,
      {
        'is_favorite': false,
      },
    );

    expect(data(state, changeFavoriteStatus.fulfilled(notFavoriteOffer, ' ', {status: 0, offerId: '1'})))
      .toEqual({
        allOffers: adaptToClientOffers([notFavoriteOffer]),
        isLoading: false,
        isCommentSending: false,
        offersNearby: adaptToClientOffers([notFavoriteOffer]),
        reviews: [],
        favoriteOffers: [],
      });
  });

  it('should fill favorite offers', () => {
    const state = {
      allOffers: [],
      isLoading: false,
      isCommentSending: false,
      offersNearby: [],
      reviews: [],
      favoriteOffers: [],
    };

    const offers = new Array(4).fill(makeFakeOffer({}));

    expect(data(state, loadFavoriteOffers.fulfilled(offers, ' ')))
      .toEqual({
        allOffers: [],
        isLoading: false,
        isCommentSending: false,
        offersNearby: [],
        reviews: [],
        favoriteOffers: adaptToClientOffers(offers),
      });
  });
});
