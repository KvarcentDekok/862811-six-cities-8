import React, { useEffect, useRef } from 'react';
import leaflet, { LayerGroup, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/useMap';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT, MapContainerClassName } from '../../const';
import { useSelector } from 'react-redux';
import { getOffersByCity, getOffersNearby } from '../../store/data/selectors';
import { getCity } from '../../store/main/selectors';

type MapProps = {
  containerClassName: MapContainerClassName,
  activeOfferId?: number
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

function Map({ containerClassName, activeOfferId }: MapProps): JSX.Element {
  const offers = useSelector(containerClassName === MapContainerClassName.Cities ? getOffersByCity : getOffersNearby);
  const currentCity = useSelector(getCity);
  const mapRef = useRef(null);
  const map = useMap(mapRef, currentCity);

  useEffect(() => {
    if (map) {
      const markers: Marker[] = [];

      markersGroup?.clearLayers();

      offers.forEach((offer, i) => {
        markers.push(new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        }));

        markers[i].setIcon(offer.id === activeOfferId ? currentCustomIcon : defaultCustomIcon);
        markersGroup.addLayer(markers[i]);
      });

      markersGroup.addTo(map);
    }
  }, [map, offers, activeOfferId, currentCity]);

  return <section className={`${containerClassName} map`} ref={mapRef}></section>;
}

export default Map;
