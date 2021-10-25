import axios, {AxiosInstance, AxiosResponse, AxiosError} from 'axios';
import { Offer, OfferServer } from '../types/offer';
import { Review, ReviewServer } from '../types/review';

const BACKEND_URL = 'https://8.react.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;

enum HttpCode {
  Unauthorized = 401,
}

type UnauthorizedCallback = () => void;

export const createAPI = (onUnauthorized: UnauthorizedCallback): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
    transformResponse: (data) => adaptToClientOffers(JSON.parse(data)),
  });

  api.interceptors.response.use(
    (response: AxiosResponse) => response,

    (error: AxiosError) => {
      const {response} = error;

      if (response?.status === HttpCode.Unauthorized) {
        return onUnauthorized();
      }

      return Promise.reject(error);
    },
  );

  return api;
};

function adaptToClientOffers(offers: OfferServer[]): Offer[] {
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
