import React from 'react';
import mapboxgl from 'mapbox-gl';
import { Country } from '../../types';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiZWR1cGFsbGk5NCIsImEiOiJjbGk3bDllaW0yMWJ5M3ZscDQxNTUwOTY0In0.S0D463lcMtGYv4hpHZ-TgQ';

interface Props {
  countries: Country[];
}

const MapComponent: React.FC<Props> = ({ countries }) => {
  const mapContainerRef = React.useRef<HTMLDivElement | null>(null);
  const [map, setMap] = React.useState<mapboxgl.Map | null>(null);

  React.useEffect(() => {
    if (mapContainerRef.current) {
      const initializeMap = () => {
        const newMap = new mapboxgl.Map({
          container: mapContainerRef.current!,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [0, 0],
          zoom: 2,
        });

        newMap.on('load', () => {
          setMap(newMap);
        });
      };

      mapboxgl.accessToken = 'pk.eyJ1IjoiZWR1cGFsbGk5NCIsImEiOiJjbGk3bDllaW0yMWJ5M3ZscDQxNTUwOTY0In0.S0D463lcMtGYv4hpHZ-TgQ';
      initializeMap();
    }
  }, []);

  React.useEffect(() => {
    if (map) {
      const markers: mapboxgl.Marker[] = [];

      countries.forEach((country) => {
        const { countryInfo, active, country:countryName, recovered, deaths } = country;

        const markerElement = document.createElement('div');
        markerElement.className = 'marker';
        markerElement.style.background = '#ff0000';
        markerElement.style.borderRadius = '50%';
        markerElement.style.width = '20px';
        markerElement.style.height = '20px';

        const marker = new mapboxgl.Marker(markerElement)
          .setLngLat([countryInfo.long, countryInfo.lat])
          .addTo(map);

        markers.push(marker);

        const popup = new mapboxgl.Popup({ closeButton: false, closeOnClick: false }).setHTML(
          `<p>Country: ${countryName}</p>
          <p>Active: ${active}</p>
          <p>Recovered: ${recovered}</p>
          <p>Death: ${deaths}</p>`
        );

        marker.getElement()?.addEventListener('mouseover', () => {
          popup.addTo(map);
          marker.setPopup(popup);
        });

        marker.getElement()?.addEventListener('mouseout', () => {
          popup.remove();
          marker.setPopup();
        });
      });

      return () => {
        markers.forEach((marker) => marker.remove());
      };
    }
  }, [map, countries]);

  return <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />;
};

export default MapComponent;
