import { MutableRefObject, useEffect, useState } from 'react';
import { Map, TileLayer } from 'leaflet';
import { Location } from '../types/offer';
import leaflet from 'leaflet';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  center: Location,
): Map | null {
  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    const layer = new TileLayer(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      },
    );

    map?.flyTo([center.latitude, center.longitude]);

    if (mapRef.current !== null && map === null) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: center.latitude,
          lng: center.longitude,
        },
        zoom: center.zoom,
      });

      instance.addLayer(layer);

      setMap(instance);
    }
  }, [mapRef, map, center]);

  return map;
}

export default useMap;
