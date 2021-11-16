import React, { useEffect, useRef } from 'react';
import leaflet, { LayerGroup, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';
import classNames from 'classnames';
import { Location } from '../../types/offer';

type Point = {
  latitude: number,
  longitude: number,
  id: number
}

type MapProps = {
  containerClassName: 'cities__map' | 'property__map',
  points: Point[],
  activePointId: number,
  center: Location,
  onMarkerClick: (id: number) => void
};

const defaultCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

const currentCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

const markersGroup: LayerGroup = leaflet.layerGroup([]);

function InteractiveMap({ containerClassName, points, activePointId, center, onMarkerClick }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, center);
  const mapClassName = classNames({
    [containerClassName]: true,
    'map': true,
  });

  useEffect(() => {
    if (map) {
      const markers: Marker[] = [];

      markersGroup?.clearLayers();

      points.forEach((location, i) => {
        markers.push(new Marker({
          lat: location.latitude,
          lng: location.longitude,
        }).on('click', () => onMarkerClick(location.id)));

        markers[i].setIcon(location.id === activePointId ? currentCustomIcon : defaultCustomIcon);
        markersGroup.addLayer(markers[i]);
      });

      markersGroup.addTo(map);
    }
  }, [map, points, activePointId, onMarkerClick]);

  return <section className={mapClassName} ref={mapRef}></section>;
}

export default InteractiveMap;
