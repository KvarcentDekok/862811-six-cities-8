import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {DataState} from '../../types/state';
import { OfferServer } from '../../types/offer';
import { APIRoute } from '../../const';
import { adaptToClientOffers, api, adaptToClientReviews } from '../../services/api';
import { CommentData, ReviewServer } from '../../types/review';

type CommentParams = {
  commentData: CommentData,
  offerId: string
}

type ChangeFavoriteStatusParams = {
  status: number,
  offerId: string
}


const loadOffers = createAsyncThunk(
  'data/loadOffers',
  async () => {
    const {data} = await api.get<OfferServer[]>(APIRoute.Offers);
    return data;
  },
);

const loadOffersNearby = createAsyncThunk(
  'data/loadOffersNearby',
  async (offerId: string) => {
    const {data} = await api.get<OfferServer[]>(APIRoute.OffersNearby.replace(':hotel_id', offerId));
    return data;
  },
);

const loadReviews = createAsyncThunk(
  'data/loadReviews',
  async (offerId: string) => {
    const {data} = await api.get<ReviewServer[]>(APIRoute.Reviews.replace(':hotel_id', offerId));
    return data;
  },
);

const comment = createAsyncThunk(
  'data/comment',
  async ({commentData, offerId}: CommentParams) => {
    const {data} = await api.post(APIRoute.Comment.replace(':hotel_id', offerId), commentData);
    return data;
  },
);

const changeFavoriteStatus = createAsyncThunk(
  'data/changeFavoriteStatus',
  async ({status, offerId}: ChangeFavoriteStatusParams) => {
    const {data} = await api.post(APIRoute.Favorite.replace(':hotel_id', offerId).replace(':status', String(status)));
    return data;
  },
);

const loadFavoriteOffers = createAsyncThunk(
  'data/loadFavoriteOffers',
  async () => {
    const {data} = await api.get(APIRoute.FavoriteOffers);
    return data;
  },
);

const initialState: DataState = {
  allOffers: [],
  isLoading: true,
  isCommentSending: false,
  offersNearby: [],
  reviews: [],
  favoriteOffers: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadOffers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadOffers.fulfilled, (state, action) => {
        state.allOffers = adaptToClientOffers(action.payload);
        state.isLoading = false;
      })
      .addCase(loadOffers.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(loadOffersNearby.fulfilled, (state, action) => {
        state.offersNearby = adaptToClientOffers(action.payload);
      })
      .addCase(loadReviews.fulfilled, (state, action) => {
        state.reviews = adaptToClientReviews(action.payload);
      })
      .addCase(comment.pending, (state) => {
        state.isCommentSending = true;
      })
      .addCase(comment.fulfilled, (state, action) => {
        state.isCommentSending = false;
        state.reviews = adaptToClientReviews(action.payload);
      })
      .addCase(comment.rejected, (state) => {
        state.isCommentSending = false;
      })
      .addCase(changeFavoriteStatus.fulfilled, (state, action) => {
        const { id, isFavorite } = action.payload;
        const offerIndexAll = state.allOffers.findIndex((offer) => offer.id === id);

        state.allOffers[offerIndexAll] = adaptToClientOffers([action.payload])[0];

        if (state.favoriteOffers.length && !isFavorite) {
          const offerIndexFavorite = state.favoriteOffers.findIndex((offer) => offer.id === id);

          state.favoriteOffers.splice(offerIndexFavorite, 1);
        }

        if (state.offersNearby.length) {
          const offerIndexNearby = state.offersNearby.findIndex((offer) => offer.id === id);

          state.offersNearby[offerIndexNearby] = adaptToClientOffers([action.payload])[0];
        }
      })
      .addCase(loadFavoriteOffers.fulfilled, (state, action) => {
        state.favoriteOffers = adaptToClientOffers(action.payload);
      });
  },
});

export {loadOffers, loadOffersNearby, loadReviews, comment, changeFavoriteStatus, loadFavoriteOffers};
export default dataSlice.reducer;
