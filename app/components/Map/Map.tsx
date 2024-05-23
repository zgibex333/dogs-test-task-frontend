import { GoogleMap, Marker } from '@react-google-maps/api';
import styles from './Map.module.scss';
import { useRef } from 'react';

const center: google.maps.LatLngLiteral = {
  lat: 53.13202679332364,
  lng: 23.156835322745422,
};

const markers: google.maps.LatLngLiteral[] = [
  { lat: 53.127762, lng: 23.168596 },
  { lat: 53.2, lng: 23.3 },
  { lat: 53.4, lng: 23.5 },
];

// const options: google.maps.MapOptions = {
//   backgroundColor: 'red',
// };

export const Map = () => {
  const mapRef = useRef<GoogleMap>(null);

  return (
    <GoogleMap
      ref={mapRef}
      zoom={10}
      center={center}
      mapContainerClassName={styles.map}
    >
      {markers.map((marker) => (
        <Marker key={marker.lat} position={{ ...marker }} />
      ))}
    </GoogleMap>
  );
};
