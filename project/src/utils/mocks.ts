import {address, lorem, image, datatype, name} from 'faker';
import { OfferServer } from '../types/offer';

type FakeOfferParams = {
  cityName?: string,
  isPremium?: boolean
}

export const makeFakeOffer = ({cityName, isPremium}: FakeOfferParams): OfferServer => ({
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
  'is_favorite': datatype.boolean(),
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
