import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin } from 'lucide-react';

const MAPBOX_TOKEN = 'pk.eyJ1IjoidW5rbm93bjI3IiwiYSI6ImNtNHNqcmdvdjAxN3IycXNndXowZjFnOGkifQ.2HgAMLBAYZihUz0bLbJ7kg';
mapboxgl.accessToken = MAPBOX_TOKEN;

interface MapPickerProps {
  onLocationSelect: (location: { lat: number; lng: number; address: string } | null) => void;
  initialLocation?: { lat: number; lng: number };
}

interface GeocoderResult {
  result: {
    geometry: {
      coordinates: [number, number];
    };
    place_name: string;
  };
}

const MapPicker = ({ onLocationSelect, initialLocation }: MapPickerProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const geocoder = useRef<MapboxGeocoder | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number; address: string } | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          if (!initialLocation) {
            reverseGeocode(location.lat, location.lng);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          setUserLocation({ lat: 25.2048, lng: 55.2708 }); // Default to Dubai
        }
      );
    }
  }, [initialLocation]);

  useEffect(() => {
    if (!mapContainer.current || !userLocation) return;

    const initialCenter = initialLocation || userLocation;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [initialCenter.lng, initialCenter.lat],
      zoom: 13
    });

    map.current.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      'top-right'
    );

    geocoder.current = new MapboxGeocoder({
      accessToken: MAPBOX_TOKEN,
      mapboxgl: mapboxgl as any,
      marker: false,
      placeholder: 'Search for a location...',
      countries: 'ae', // Limit to UAE
      language: 'ar,en' // Support Arabic and English
    });

    if (map.current && geocoder.current) {
      map.current.addControl(geocoder.current);
    }

    marker.current = new mapboxgl.Marker({
      draggable: true,
      color: '#5F7053'
    })
      .setLngLat([initialCenter.lng, initialCenter.lat])
      .addTo(map.current);

    marker.current.on('dragend', () => {
      const lngLat = marker.current?.getLngLat();
      if (lngLat) {
        setIsLoadingAddress(true);
        reverseGeocode(lngLat.lat, lngLat.lng);
      }
    });

    map.current.on('click', (e) => {
      if (marker.current) {
        marker.current.setLngLat(e.lngLat);
        setIsLoadingAddress(true);
        reverseGeocode(e.lngLat.lat, e.lngLat.lng);
      }
    });

    if (geocoder.current) {
      geocoder.current.on('result', (event: GeocoderResult) => {
        if (marker.current) {
          const [lng, lat] = event.result.geometry.coordinates;
          marker.current.setLngLat([lng, lat]);
          // Use the place name from geocoder result for immediate feedback
          setSelectedLocation({
            lat,
            lng,
            address: event.result.place_name
          });
          onLocationSelect({
            lat,
            lng,
            address: event.result.place_name
          });
        }
      });

      geocoder.current.on('clear', () => {
        setSelectedLocation(null);
        onLocationSelect(null);
      });
    }

    map.current.on('load', () => {
      setIsLoading(false);
    });

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [userLocation, initialLocation]);

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_TOKEN}&language=ar,en`
      );
      const data = await response.json();
      const address = data.features[0]?.place_name || '';
      const location = { lat, lng, address };
      setSelectedLocation(location);
      onLocationSelect(location);
    } catch (error) {
      console.error('Error reverse geocoding:', error);
    } finally {
      setIsLoadingAddress(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-xl">
      <div ref={mapContainer} className="w-full h-[400px]" />
      
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/90">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-4 border-[#5F7053] border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-600">Loading map...</p>
          </div>
        </div>
      )}

      {/* Address loading indicator */}
      {isLoadingAddress && (
        <div className="absolute px-4 py-2 -translate-x-1/2 bg-white rounded-full shadow-lg top-4 left-1/2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-[#5F7053] border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-gray-600">Getting address...</span>
          </div>
        </div>
      )}

      {/* Selected location info */}
      {selectedLocation && !isLoadingAddress && (
        <div className="absolute p-3 bg-white rounded-lg shadow-lg left-4 right-4 bottom-16">
          <p className="text-sm font-medium text-gray-900">Selected Location:</p>
          <p className="mt-1 text-sm text-gray-600">{selectedLocation.address}</p>
        </div>
      )}

      {/* User location button */}
      <button
        onClick={() => {
          if (userLocation && map.current && marker.current) {
            map.current.flyTo({ center: [userLocation.lng, userLocation.lat], zoom: 15 });
            marker.current.setLngLat([userLocation.lng, userLocation.lat]);
            reverseGeocode(userLocation.lat, userLocation.lng);
          }
        }}
        className="absolute p-2 transition-colors bg-white rounded-lg shadow-lg bottom-4 right-4 hover:bg-gray-50"
        title="Go to my location"
      >
        <MapPin className="w-5 h-5 text-[#5F7053]" />
      </button>
    </div>
  );
};

export default MapPicker;