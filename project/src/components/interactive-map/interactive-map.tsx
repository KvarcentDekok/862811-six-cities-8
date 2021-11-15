import React, { useEffect, useRef } from 'react';
import leaflet, { LayerGroup, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';
import { useSelector } from 'react-redux';
import { getOffersByCity, getOffersNearby } from '../../store/data/selectors';
import { getCity } from '../../store/main/selectors';
import browserHistory from '../../browser-history';

type MapProps = {
  containerClassName: 'cities__map' | 'property__map',
  activeOfferId: number
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

function InteractiveMap({ containerClassName, activeOfferId }: MapProps): JSX.Element {
  const offersByCity = useSelector(getOffersByCity);
  const offersNearby = useSelector(getOffersNearby);
  const currentCity = useSelector(getCity);
  const mapRef = useRef(null);
  const map = useMap(mapRef, currentCity);

  let offersToShow = offersByCity;

  if (containerClassName === 'property__map') {
    const currentOffer = offersByCity.find((offer) => offer.id === activeOfferId);

    if (currentOffer) {
      offersToShow = offersNearby.slice();
      offersToShow.splice(-1, 0, currentOffer);
    }
  }

  function onMarkerClick(offerId: number) {
    browserHistory.push(`/offer/${offerId}`);
  }

  useEffect(() => {
    if (map) {
      const markers: Marker[] = [];

      markersGroup?.clearLayers();

      offersToShow.forEach((offer, i) => {
        markers.push(new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        }).on('click', () => onMarkerClick(offer.id)));

        markers[i].setIcon(offer.id === activeOfferId ? currentCustomIcon : defaultCustomIcon);
        markersGroup.addLayer(markers[i]);
      });

      markersGroup.addTo(map);
    }
  }, [map, offersToShow, activeOfferId, currentCity]);

  return <section className={`${containerClassName} map`} ref={mapRef}></section>;
}

export default InteractiveMap;
