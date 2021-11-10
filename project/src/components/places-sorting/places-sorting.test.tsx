import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import PlacesSorting from './places-sorting';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Sorting } from '../../const';

const mockStore = configureMockStore();

describe('Component: PlacesSorting', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      MAIN: {sorting: Sorting.Popular},
    });

    const {getAllByText} = render(
      <Provider store={store}>
        <Router history={history}>
          <PlacesSorting />
        </Router>
      </Provider>,
    );

    expect(getAllByText(new RegExp(Sorting.Popular, 'i'))[0]).toBeInTheDocument();
  });
});
