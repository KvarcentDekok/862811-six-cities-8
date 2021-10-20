import { MutableRefObject, useEffect, useState } from 'react';
import { Map, TileLayer } from 'leaflet';
import { City } from '../types/offer';
import leaflet from 'leaflet';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  currentCity: City,
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const city = currentCity;

  useEffect(() => {
    const layer = new TileLayer(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      },
    );

    if (mapRef.current !== null && map === null) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        zoom: city.location.zoom,
      });

      instance.addLayer(layer);

      setMap(instance);
    }
  }, [mapRef, map, city, currentCity]);

  return map;
}

export default useMap;
