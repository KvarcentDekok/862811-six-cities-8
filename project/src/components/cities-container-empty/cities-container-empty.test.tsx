import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import CitiesContainerEmpty from './cities-container-empty';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { CITIES } from '../../const';

const mockStore = configureMockStore();

describe('Component: CitiesContainerEmpty', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      MAIN: {city: CITIES[0]},
    });

    const {getByText} = render(
      <Provider store={store}>
        <Router history={history}>
          <CitiesContainerEmpty />
        </Router>
      </Provider>,
    );

    expect(getByText('No places to stay available')).toBeInTheDocument();
    expect(getByText(new RegExp(CITIES[0].name, 'i'))).toBeInTheDocument();
  });
});
