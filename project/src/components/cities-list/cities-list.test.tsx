import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import CitiesList from './cities-list';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { CITIES } from '../../const';

const mockStore = configureMockStore();

describe('Component: CitiesList', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      MAIN: {city: CITIES[0]},
    });

    const {getByText} = render(
      <Provider store={store}>
        <Router history={history}>
          <CitiesList cities={CITIES} />
        </Router>
      </Provider>,
    );

    for (let i = 0; i < CITIES.length; i++) {
      expect(getByText(new RegExp(CITIES[i].name, 'i'))).toBeInTheDocument();
    }
  });
});
