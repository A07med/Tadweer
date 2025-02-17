// src/components/dashboard/company/components/DeliveryMap.tsx
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Clock, Navigation } from 'lucide-react';
import * as turf from '@turf/turf';

mapboxgl.accessToken = 'pk.eyJ1IjoidW5rbm93bjI3IiwiYSI6ImNtNHNqcmdvdjAxN3IycXNndXowZjFnOGkifQ.2HgAMLBAYZihUz0bLbJ7kg';

interface DeliveryLocation {
  lat: number;
  lng: number;
  address: string;
}

interface DeliveryMapProps {
  currentLocation?: DeliveryLocation;
  destination: string;
  isInTransit: boolean;
}

const DeliveryMap = ({ currentLocation, isInTransit }: DeliveryMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const animationRef = useRef<number>();
  const routeRef = useRef<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [distance, setDistance] = useState('0');
  const [duration, setDuration] = useState('0');
  const [_progress, setProgress] = useState(0);

  useEffect(() => {
    if (!mapContainer.current || !currentLocation) return;

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [currentLocation.lng, currentLocation.lat],
      zoom: 15,
      pitch: 45,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      'bottom-right'
    );

    // Create custom marker element
    const el = document.createElement('div');
    el.className = 'delivery-vehicle';
    el.innerHTML = `
      <div class="relative w-12 h-12 transform -translate-x-1/2 -translate-y-1/2">
        <div class="absolute inset-0 bg-[#5F7053] rounded-full opacity-20 animate-ping"></div>
        <div class="relative flex items-center justify-center w-12 h-12 bg-[#5F7053] rounded-full shadow-lg">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" 
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 3h2l.5 2m1.5 4h14l-2 7H7L5 3" />
            <circle cx="8" cy="17" r="2" />
            <circle cx="16" cy="17" r="2" />
          </svg>
        </div>
      </div>
    `;

    // Add marker to map
    marker.current = new mapboxgl.Marker({
      element: el,
      rotationAlignment: 'map',
    })
      .setLngLat([currentLocation.lng, currentLocation.lat])
      .addTo(map.current);

    // Get route when map loads
    map.current.on('load', async () => {
      await getRoute();
      setIsLoading(false);
    });

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      map.current?.remove();
    };
  }, [currentLocation]);

  // Function to get route from Mapbox Directions API
  const getRoute = async () => {
    if (!map.current || !currentLocation) return;

    try {
      // Destination coordinates (example - replace with actual geocoding)
      const destLng = currentLocation.lng + 0.02;
      const destLat = currentLocation.lat + 0.02;

      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${
          currentLocation.lng
        },${currentLocation.lat};${destLng},${destLat}?geometries=geojson&overview=full&access_token=${
          mapboxgl.accessToken
        }`
      );

      const data = await response.json();
      const route = data.routes[0];
      routeRef.current = route.geometry.coordinates;

      // Add route line
      map.current.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: routeRef.current
          }
        }
      });

      map.current.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#5F7053',
          'line-width': 6,
          'line-opacity': 0.8
        }
      });

      // Add the progress line
      map.current.addLayer({
        id: 'route-progress',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#4CAF50',
          'line-width': 6,
          'line-opacity': 0.8,
          'line-gradient': [
            'interpolate',
            ['linear'],
            ['line-progress'],
            0, '#4CAF50',
            1, '#5F7053'
          ]
        }
      });

      // Set distance and duration
      setDistance((route.distance / 1000).toFixed(1));
      setDuration((route.duration / 60).toFixed(0));

      if (isInTransit) {
        animateDelivery();
      }
    } catch (error) {
      console.error('Error fetching route:', error);
    }
  };

  // Function to animate delivery vehicle along the route
  const animateDelivery = () => {
    if (!marker.current || !map.current || routeRef.current.length === 0) return;

    // Cancel any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const animate = () => {
      if (!isInTransit) return;

      setProgress((prevProgress) => {
        const newProgress = (prevProgress + 0.0005) % 1;
        const currentPoint = turf.along(
          turf.lineString(routeRef.current),
          turf.length(turf.lineString(routeRef.current)) * newProgress
        );

        if (marker.current && currentPoint) {
          const coords: [number, number] = currentPoint.geometry.coordinates as [number, number];
          marker.current.setLngLat(coords);

          // Rotate marker to follow route
          if (newProgress < 0.99) {
            const ahead = turf.along(
              turf.lineString(routeRef.current),
              turf.length(turf.lineString(routeRef.current)) * (newProgress + 0.001)
            );
            const bearing = turf.bearing(currentPoint, ahead);
            marker.current.setRotation(bearing);
          }

          // Center map on vehicle with offset
          map.current?.setCenter([
            coords[0] + 0.001, // Slight offset to show more of the route ahead
            coords[1]
          ]);
        }

        return newProgress;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
  };

  useEffect(() => {
    if (isInTransit) {
      animateDelivery();
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isInTransit]);

  return (
    <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
      <div ref={mapContainer} className="w-full h-full" />
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/90">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-4 border-[#5F7053] border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-600">Loading map...</p>
          </div>
        </div>
      )}

      {/* Distance and ETA Overlay */}
      <div className="absolute p-4 bg-white rounded-lg shadow-lg bottom-4 left-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Navigation className="w-4 h-4 text-[#5F7053]" />
            <span className="text-sm font-medium">{distance} km</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#5F7053]" />
            <span className="text-sm font-medium">{duration} min</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryMap;