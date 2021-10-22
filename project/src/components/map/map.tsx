import React, { useEffect, useRef } from 'react';
import leaflet, { LayerGroup, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/useMap';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';
import { State } from '../../types/state';
import { connect, ConnectedProps } from 'react-redux';

type MapProps = {
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

const mapStateToProps = ({city, offers}: State) => ({
  currentCity: city,
  offers,
});

const connector = connect(mapStateToProps);
const markersGroup: LayerGroup = leaflet.layerGroup([]);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & MapProps;

function Map({ offers, currentCity, activeOfferId }: ConnectedComponentProps): JSX.Element {
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

  return <section className="cities__map map" ref={mapRef}></section>;
}

export {Map};
export default connector(Map);
