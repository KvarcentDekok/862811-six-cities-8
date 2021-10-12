import dayjs from 'dayjs';

export function getPercentageOfRating(rating: number): number {
  return rating * 100 / 5;
}

export function makeFirstLetterUppercase(string: string): string {
  return string[0].toUpperCase() + string.slice(1);
}

export function getISOString(date: Date): string {
  return dayjs(date).toISOString();
}

export function formatDate(date: Date): string {
  return dayjs(date).format('MMMM YYYY');
}
