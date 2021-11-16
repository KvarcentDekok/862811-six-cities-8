import {renderHook} from '@testing-library/react-hooks';
import { MutableRefObject } from 'react';
import useMap from './use-map';
import { CITIES } from '../const';
import { Map } from 'leaflet';

describe('Hook: useMap', () => {
  const mockRef: MutableRefObject<HTMLElement | null> = {current: document.createElement('div')};

  it('should return leaflet map', () => {
    const {result} = renderHook(() =>
      useMap(mockRef, CITIES[0].location),
    );

    const map = result.current;

    expect(map).toBeInstanceOf(Map);
  });
});
