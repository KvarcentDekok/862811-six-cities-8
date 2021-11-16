import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import InteractiveMap from './interactive-map';
import { CITIES } from '../../const';
import { adaptToClientOffers } from '../../services/api';
import { makeFakeOffer } from '../../utils/mocks';

const OFFERS_NUMBER = 4;

describe('Component: InteractiveMap', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const offers = adaptToClientOffers(new Array(OFFERS_NUMBER).fill(makeFakeOffer({cityName: CITIES[0].name})));
    const points = offers.map((offer) => ({
      latitude: offer.location.latitude,
      longitude: offer.location.longitude,
      id: offer.id,
    }));

    const {container} = render(
      <Router history={history}>
        <InteractiveMap
          containerClassName='property__map'
          points={points}
          activePointId={offers[0].id}
          center={CITIES[0].location}
          onMarkerClick={() => jest.fn()}
        />
      </Router>,
    );

    expect(container.querySelectorAll('.leaflet-marker-icon').length).toBe(OFFERS_NUMBER);
    expect(container.querySelector('[src="/img/pin-active.svg"]')).toBeInTheDocument();
  });
});
