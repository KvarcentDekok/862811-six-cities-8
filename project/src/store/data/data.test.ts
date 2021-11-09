import data from './data';

describe('Reducer: data', () => {
  it('without additional parameters should return initial state', () => {
    expect(data(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        allOffers: [],
        isLoading: true,
        offersNearby: [],
      });
  });
});
