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
  'user/comment',
  async ({commentData, offerId}: CommentParams) => {
    const {data} = await api.post(APIRoute.Comment.replace(':hotel_id', offerId), commentData);
    return data;
  },
);

const initialState: DataState = {
  allOffers: [],
  isLoading: true,
  isCommentSending: false,
  offersNearby: [],
  reviews: [],
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
      });
  },
});

export {loadOffers, loadOffersNearby, loadReviews, comment};
export default dataSlice.reducer;
