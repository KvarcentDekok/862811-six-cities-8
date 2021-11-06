import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import LocationFavorite from './location-favorite';
import { CITIES } from '../../const';

describe('Component: LocationFavorite', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    const {getByText} = render(
      <Router history={history}>
        <LocationFavorite cityName={CITIES[0].name}>
          <div>Test child</div>
        </LocationFavorite>
      </Router>,
    );

    expect(getByText(new RegExp(CITIES[0].name, 'i'))).toBeInTheDocument();
    expect(getByText('Test child')).toBeInTheDocument();
  });
});
