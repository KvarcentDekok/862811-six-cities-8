import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import PlaceCard from './place-card';
import { adaptToClientOffers } from '../../services/api';
import { makeFakeOffer } from '../../utils/mocks';

describe('Component: PlaceCard', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const offer = adaptToClientOffers([makeFakeOffer({})])[0];

    const {getByAltText, getByText} = render(
      <Router history={history}>
        <PlaceCard offer={offer} onPlaceHover={jest.fn()} onPlaceLeave={jest.fn()} />
      </Router>,
    );

    expect(getByAltText(/Place image/i)).toBeInTheDocument();
    expect(getByText(new RegExp(String(offer.price), 'i'))).toBeInTheDocument();
    expect(getByText(new RegExp(offer.title, 'i'))).toBeInTheDocument();
    expect(getByText(new RegExp(offer.type, 'i'))).toBeInTheDocument();
  });

  it('should render correctly when premium', () => {
    const history = createMemoryHistory();
    const offer = adaptToClientOffers([makeFakeOffer({isPremium: true})])[0];

    const {getByText} = render(
      <Router history={history}>
        <PlaceCard offer={offer} onPlaceHover={jest.fn()} onPlaceLeave={jest.fn()} />
      </Router>,
    );

    expect(getByText(/Premium/i)).toBeInTheDocument();
  });

  it('should render correctly when not premium', () => {
    const history = createMemoryHistory();
    const offer = adaptToClientOffers([makeFakeOffer({isPremium: false})])[0];

    const {queryByText} = render(
      <Router history={history}>
        <PlaceCard offer={offer} onPlaceHover={jest.fn()} onPlaceLeave={jest.fn()} />
      </Router>,
    );

    expect(queryByText(/Premium/i)).not.toBeInTheDocument();
  });
});
