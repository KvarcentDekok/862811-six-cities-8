import { Review } from '../types/review';

export const reviews: Review[] = [
  {
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    date: new Date('2019-05-08T14:13:56.569Z'),
    id: 1,
    rating: 4,
    user: {
      'avatarUrl': 'img/avatar-angelina.jpg',
      'id': 1,
      'isPro': true,
      'name': 'Angelina',
    },
  },
];
