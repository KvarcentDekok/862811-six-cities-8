import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import PlaceCardFavorite from './place-card-favorite';
import { adaptToClientOffers } from '../../services/api';
import { makeFakeOffer } from '../../utils/mocks';

describe('Component: PlaceCardFavorite', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const offer = adaptToClientOffers([makeFakeOffer({})])[0];

    const {getByAltText, getByText} = render(
      <Router history={history}>
        <PlaceCardFavorite offer={offer} />
      </Router>,
    );

    expect(getByAltText(/Place image/i)).toBeInTheDocument();
    expect(getByText(new RegExp(String(offer.price), 'i'))).toBeInTheDocument();
    expect(getByText(new RegExp(offer.title, 'i'))).toBeInTheDocument();
    expect(getByText(new RegExp(offer.type, 'i'))).toBeInTheDocument();
  });
});
