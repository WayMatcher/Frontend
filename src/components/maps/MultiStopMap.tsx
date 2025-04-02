import Address from '@/types/objects/Address/dto';
import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

/**
 * Props for the MultiStopMap component.
 */
interface MultiStopMapProps {
    /**
     * List of stops, each containing an address object.
     */
    stopList: { address: Address }[];
    /**
     * Width of the map in pixels.
     */
    width: number;
    /**
     * Height of the map in pixels.
     */
    height: number;
}

/**
 * MultiStopMap component generates a static Google Map image
 * showing a route between multiple stops.
 *
 * @param {MultiStopMapProps} props - Component props.
 * @returns {JSX.Element | null} A Card image element with the map or null if no map is generated.
 */
export default function MultiStopMap({ stopList, width, height }: MultiStopMapProps) {
    // State to store the generated map image URL.
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        /**
         * Generates a static map URL using Google Maps API.
         * Validates input data and constructs the URL with markers and paths.
         */
        const generateStaticMap = () => {
            // Ensure there are at least two stops to generate a route.
            if (stopList.length < 2) {
                console.error('Not enough stops to generate a map!');
                return;
            }

            // Retrieve the Google Maps API key from environment variables.
            const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;

            if (!apiKey) {
                console.error('Google Maps API key is missing!');
                return;
            }

            // Extract the start, end, and waypoint addresses from the stop list.
            const start: Address = stopList[0].address;
            const end: Address = stopList[stopList.length - 1].address;
            const waypoints: Address[] = stopList.slice(1, stopList.length - 1).map((stop) => stop.address);

            // Validate latitude and longitude for the start and end points.
            if (
                start.latitude < -90 ||
                start.latitude > 90 ||
                start.longitude < -180 ||
                start.longitude > 180 ||
                end.latitude < -90 ||
                end.latitude > 90 ||
                end.longitude < -180 ||
                end.longitude > 180
            ) {
                console.error('Invalid latitude or longitude!');
                return;
            }

            // Construct markers for the start and end points.
            const startMarker = `markers=color:green|label:S|${start.latitude},${start.longitude}`;
            const endMarker = `markers=color:red|label:E|${end.latitude},${end.longitude}`;

            // Construct markers for waypoints, filtering out invalid coordinates.
            const waypointMarkers = waypoints
                .filter((wp) => wp.latitude && wp.longitude) // Ensure waypoints have valid coordinates.
                .map((wp, index) => `markers=color:blue|label:${index + 1}|${wp.latitude},${wp.longitude}`)
                .join('&');

            // Construct the path connecting all points (start, waypoints, end).
            const path = `path=color:0x0000ff|weight:5|${[start, ...waypoints, end]
                .map((p) => `${p.latitude},${p.longitude}`)
                .join('|')}`;

            // Build the final URL for the static map.
            const baseUrl = `https://maps.googleapis.com/maps/api/staticmap?size=${width}x${height}&${startMarker}&${endMarker}${waypointMarkers && '&' + waypointMarkers}&${path}&key=${apiKey}`;

            // Update the state with the generated map URL.
            setImageUrl(baseUrl);
        };

        // Trigger the map generation whenever stopList, width, or height changes.
        generateStaticMap();
    }, [stopList, width, height]);

    // Render the map image if the URL is available, otherwise render nothing.
    if (imageUrl != '') return <Card.Img variant='top' src={imageUrl} />;
    return null;
}
