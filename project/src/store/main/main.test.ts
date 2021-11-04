import main, { changeCity } from './main';
import { CITIES } from '../../const';

describe('Reducer: main', () => {
  it('without additional parameters should return initial state', () => {
    expect(main(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({city: CITIES[0]});
  });

  it('should change current city by a given value', () => {
    const state = {city: CITIES[0]};

    expect(main(state, changeCity(CITIES[1])))
      .toEqual({city: CITIES[1]});
  });
});
