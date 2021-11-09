import main, { changeCity, changeSorting } from './main';
import { CITIES, Sorting } from '../../const';

describe('Reducer: main', () => {
  it('without additional parameters should return initial state', () => {
    expect(main(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        city: CITIES[0],
        sorting: Sorting.Popular,
      });
  });

  it('should change current city by a given value', () => {
    const state = {
      city: CITIES[0],
      sorting: Sorting.Popular,
    };

    expect(main(state, changeCity(CITIES[1])))
      .toEqual({
        city: CITIES[1],
        sorting: Sorting.Popular,
      });
  });

  it('should change current sorting by a given value', () => {
    const state = {
      city: CITIES[0],
      sorting: Sorting.Popular,
    };

    expect(main(state, changeSorting(Sorting.TopRated)))
      .toEqual({
        city: CITIES[0],
        sorting: Sorting.TopRated,
      });
  });
});
