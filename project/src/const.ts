export enum AppRoute {
  SignIn = '/login',
  Favorites = '/favorites',
  Room = '/offer/:id',
  Main = '/'
}

export enum APIRoute {
  Offers = '/hotels'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const URL_MARKER_DEFAULT = '/img/pin.svg';
export const URL_MARKER_CURRENT = '/img/pin-active.svg';
export const CITIES = [
  {
    'location': {
      'latitude': 48.858906,
      'longitude': 2.3120158,
      'zoom': 10,
    },
    'name': 'Paris',
  },
  {
    'location': {
      'latitude': 50.95779,
      'longitude': 6.8972834,
      'zoom': 10,
    },
    'name': 'Cologne',
  },
  {
    'location': {
      'latitude': 50.855024,
      'longitude': 4.3403707,
      'zoom': 10,
    },
    'name': 'Brussels',
  },
  {
    'location': {
      'latitude': 52.3547498,
      'longitude': 4.8339214,
      'zoom': 10,
    },
    'name': 'Amsterdam',
  },
  {
    'location': {
      'latitude': 53.5586941,
      'longitude': 9.7877415,
      'zoom': 10,
    },
    'name': 'Hamburg',
  },
  {
    'location': {
      'latitude': 51.2385413,
      'longitude': 6.7443112,
      'zoom': 10,
    },
    'name': 'Dusseldorf',
  },
];
