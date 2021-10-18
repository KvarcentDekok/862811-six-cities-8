import { MutableRefObject, useEffect, useState } from 'react';
import {Map} from 'leaflet';
import { Offer } from '../types/offer';
import leaflet from 'leaflet';

function useMap(mapRef: MutableRefObject<HTMLElement | null>, offers: Offer[]): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const city = offers[0].city;

  useEffect(() => {
    if (mapRef.current !== null && map === null) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        zoom: city.location.zoom,
      });

      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        )
        .addTo(instance);

      setMap(instance);
    }
  }, [mapRef, map, city]);

  return map;
}

export default useMap;
