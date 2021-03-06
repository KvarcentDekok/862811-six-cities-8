import dayjs from 'dayjs';
import { Rating, Review } from '../types/review';
import { Sorting } from '../const';
import { Offer } from '../types/offer';

export function getPercentageOfRating(rating: number): number {
  return Math.round(rating) * 100 / 5;
}

export function capitalize(string: string): string {
  return string[0].toUpperCase() + string.slice(1);
}

export function getISOString(date: string): string {
  return dayjs(date).toISOString();
}

export function formatDate(date: string): string {
  return dayjs(date).format('MMMM YYYY');
}

export const ratingValues: Rating[] = [
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

export function getEnumValues<T extends Record<string, T[keyof T]>>(enumeration: T): Array<T[keyof T]> {
  return Object
    .keys(enumeration)
    .map((key) => enumeration[key]);
}

export function sortOffers(offers: Offer[], currentSorting: Sorting): Offer[] {
  switch (currentSorting) {
    case Sorting.PriceLowToHigh:
      return offers.sort((a, b) => a.price - b.price);
    case Sorting.PriceHighToLow:
      return offers.sort((a, b) => b.price - a.price);
    case Sorting.TopRated:
      return offers.sort((a, b) => b.rating - a.rating);
    default:
      return offers;
  }
}

export function sortReviews(reviews: Review[]): Review[] {
  return reviews.sort((a, b) => dayjs(a.date).isBefore(dayjs(b.date)) ? 1 : -1);
}

export const getRandomInteger = (a = 0, b = 1): number => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
