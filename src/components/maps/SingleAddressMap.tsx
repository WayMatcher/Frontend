import Address from '@/types/objects/Address/dto';
import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

/**
 * Props for the SingleAddressMap component.
 */
interface SingleAddressMapProps {
    /**
     * Address object containing latitude and longitude.
     */
    address: Address;

    /**
     * Width of the map in pixels.
     */
    width: number;

    /**
     * Height of the map in pixels.
     */
    height: number;

    /**
     * Zoom level for the map (default is 14).
     */
    zoom?: number;
}

/**
 * Renders a static Google Map image for a given address.
 *
 * @param {SingleAddressMapProps} props - The props for the component.
 * @returns {JSX.Element | null} A Card image element with the map or null if the image URL is not generated.
 */
export function SingleAddressMap({ address, width, height, zoom = 14 }: SingleAddressMapProps) {
    const [imageUrl, setImageUrl] = useState(''); // State to store the generated map image URL.

    useEffect(() => {
        /**
         * Generates the static map URL using Google Maps Static API.
         */
        const generateStaticMap = () => {
            const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string; // Retrieve API key from environment variables.

            if (!apiKey) {
                console.error('Google Maps API key is missing!'); // Log error if API key is not available.
                return;
            }

            // Validate latitude and longitude values.
            if (
                address.latitude < -90 ||
                address.latitude > 90 ||
                address.longitude < -180 ||
                address.longitude > 180
            ) {
                console.error('Invalid latitude or longitude!'); // Log error if coordinates are invalid.
                return;
            }

            // Construct the marker and base URL for the static map.
            const marker = `markers=color:red|${address.latitude},${address.longitude}`;
            const baseUrl = `https://maps.googleapis.com/maps/api/staticmap?size=${width}x${height}&zoom=${zoom}&${marker}&key=${apiKey}`;

            setImageUrl(baseUrl); // Update the state with the generated URL.
        };

        generateStaticMap(); // Call the function to generate the map URL.
    }, [address, width, height, zoom]); // Re-run the effect when dependencies change.

    // Render the map image if the URL is available, otherwise return null.
    if (imageUrl != '') return <Card.Img variant='top' src={imageUrl} />;
    return null;
}
