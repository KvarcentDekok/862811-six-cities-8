import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import { Offer, OfferServer } from '../types/offer';
import { Review, ReviewServer } from '../types/review';
import { getToken } from './token';

const BACKEND_URL = 'https://8.react.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();

      if (token) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  return api;
};

export function adaptToClientOffers(offers: OfferServer[]): Offer[] {
  return offers.map(({
    is_premium: isPremium,
    is_favorite: isFavorite,
    max_adults: maxAdults,
    preview_image: previewImage,
    host: {
      avatar_url: avatarUrl,
      is_pro: isPro,
      ...restUserProps
    },
    ...restProps
  }) => ({
    isPremium: isPremium,
    isFavorite: isFavorite,
    maxAdults: maxAdults,
    previewImage: previewImage,
    host: {
      avatarUrl: avatarUrl,
      isPro: isPro,
      ...restUserProps,
    },
    ...restProps,
  }));
}

export function adaptToClientReviews(reviews: ReviewServer[]): Review[] {
  return reviews.map(({
    user: {
      avatar_url: avatarUrl,
      is_pro: isPro,
      ...restUserProps
    },
    ...restProps
  }) => ({
    user: {
      avatarUrl: avatarUrl,
      isPro: isPro,
      ...restUserProps,
    },
    ...restProps,
  }));
}
