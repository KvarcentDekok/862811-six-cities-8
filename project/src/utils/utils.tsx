import dayjs from 'dayjs';
import { Rating } from '../types/review';

export function getPercentageOfRating(rating: number): number {
  return rating * 100 / 5;
}

export function makeFirstLetterUppercase(string: string): string {
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
