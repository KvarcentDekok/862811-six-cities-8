import { User, UserServer } from './user';

export type Location = {
  'latitude': number,
  'longitude': number,
  'zoom': number
}

export type City = {
  'location': Location,
  'name': string
}

export type Offer = {
  'bedrooms': number,
  'city': City,
  'description': string,
  'goods': string[],
  'host': User,
  'id': number,
  'images': string[],
  'isFavorite': boolean,
  //'is_favorite'?: boolean,
  'isPremium': boolean,
  //'is_premium'?: boolean,
  'location': Location,
  'maxAdults': number,
  //'max_adults'?: number,
  'previewImage': string,
  //'preview_image'?: string,
  'price': number,
  'rating': number,
  'title': string,
  'type': string
}

export type OfferServer  = Omit<Offer, 'host' | 'isFavorite' | 'isPremium' | 'maxAdults' | 'previewImage'> & {
  'host': UserServer,
  'is_favorite': boolean,
  'is_premium': boolean,
  'max_adults': number,
  'preview_image': string
}
