import {address, lorem, image, datatype, name, date} from 'faker';
import { OfferServer } from '../types/offer';
import { ReviewServer } from '../types/review';
import { getISOString } from './utils';

type FakeOfferParams = {
  cityName?: string,
  isPremium?: boolean,
  isFavorite?: boolean
}

export const makeFakeOffer = ({cityName, isPremium, isFavorite}: FakeOfferParams): OfferServer => ({
  'bedrooms': 4,
  'city': {
    'location': {
      'latitude': Number(address.latitude()),
      'longitude': Number(address.longitude()),
      'zoom': 10,
    },
    'name': cityName ? cityName : address.cityName(),
  },
  'description': lorem.words(),
  'goods': new Array(4).fill(lorem.word()),
  'host': {
    'avatar_url': image.avatar(),
    'id': datatype.number(),
    'is_pro':  datatype.boolean(),
    'name': name.findName(),
  },
  'id': datatype.number(),
  'images': new Array(4).fill(image.imageUrl()),
  'is_favorite': isFavorite !== undefined ? isFavorite : datatype.boolean(),
  'is_premium': isPremium !== undefined ? isPremium : datatype.boolean(),
  'location': {
    'latitude': Number(address.latitude()),
    'longitude': Number(address.longitude()),
    'zoom': 8,
  },
  'max_adults': 4,
  'preview_image': image.imageUrl(),
  'price': 150,
  'rating': 4.8,
  'title': lorem.words(),
  'type': 'apartment',
} as OfferServer);

export const makeFakeReview = (): ReviewServer => ({
  'comment': lorem.words(),
  'date': getISOString(date.past().toISOString()),
  'id': datatype.number(),
  'rating': datatype.float(),
  'user': {
    'avatar_url': image.avatar(),
    'id': datatype.number(),
    'is_pro':  datatype.boolean(),
    'name': name.findName(),
  },
} as ReviewServer);
