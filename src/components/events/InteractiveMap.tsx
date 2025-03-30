import { useEffect, useRef } from 'react';
import Stop from '@/types/objects/Stop/dto';

interface Props {
    stopList: Stop[];
    width: string;
    height: string;
}

function InteractiveMap({ stopList, width, height }: Props) {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initializeMap = async () => {
            if (!stopList || stopList.length < 2) {
                console.error('Not enough stops to generate a route!');
                return;
            }

            const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;

            if (!apiKey) {
                console.error('Google Maps API key is missing!');
                return;
            }

            // Check if the Google Maps API script is already loaded
            if (!document.querySelector(`script[src*="maps.googleapis.com"]`)) {
                const googleMapsScript = document.createElement('script');
                googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&v=beta`;
                googleMapsScript.async = true;

                googleMapsScript.onload = () => initializeGoogleMaps();
                googleMapsScript.onerror = () => {
                    console.error(
                        'Failed to load the Google Maps API script. Check your API key and network connection.',
                    );
                };

                document.body.appendChild(googleMapsScript);
            } else {
                initializeGoogleMaps();
            }
        };

        const initializeGoogleMaps = () => {
            const google = (window as any).google;

            if (!google) {
                console.error('Google Maps API failed to load. Verify your API key and enabled APIs.');
                return;
            }

            // Initialize the map
            const map = new google.maps.Map(mapRef.current, {
                center: { lat: stopList[0].address.latitude, lng: stopList[0].address.longitude },
                zoom: 10,
            });

            // Initialize the DirectionsService and DirectionsRenderer
            const directionsService = new google.maps.DirectionsService();
            const directionsRenderer = new google.maps.DirectionsRenderer();
            directionsRenderer.setMap(map);

            // Build the route request
            const waypoints = stopList.slice(1, stopList.length - 1).map((stop) => ({
                location: { lat: stop.address.latitude, lng: stop.address.longitude },
                stopover: true,
            }));

            const request = {
                origin: { lat: stopList[0].address.latitude, lng: stopList[0].address.longitude },
                destination: {
                    lat: stopList[stopList.length - 1].address.latitude,
                    lng: stopList[stopList.length - 1].address.longitude,
                },
                waypoints: waypoints,
                travelMode: google.maps.TravelMode.DRIVING,
            };

            // Fetch and render the route
            directionsService.route(request, (result: any, status: any) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsRenderer.setDirections(result);
                } else {
                    console.error('Directions request failed due to ' + status);
                }
            });
        };

        initializeMap();
    }, [stopList]);

    return (
        <div
            ref={mapRef}
            style={{
                width: width || '100%',
                height: height || '400px',
                position: 'relative',
                overflow: 'hidden',
            }}
        />
    );
}

export default InteractiveMap;
