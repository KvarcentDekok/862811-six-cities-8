import { Offer, OfferServer } from './types/offer';
import { Review, ReviewServer } from './types/review';

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
