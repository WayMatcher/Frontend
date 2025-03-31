import Address from '@/types/objects/Address/dto';
import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

interface SingleAddressMapProps {
    address: Address;
    width: number;
    height: number;
    zoom?: number;
}

export function SingleAddressMap({ address, width, height, zoom = 14 }: SingleAddressMapProps) {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const generateStaticMap = () => {
            const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;

            if (!apiKey) {
                console.error('Google Maps API key is missing!');
                return;
            }

            if (
                address.latitude < -90 ||
                address.latitude > 90 ||
                address.longitude < -180 ||
                address.longitude > 180
            ) {
                console.error('Invalid latitude or longitude!');
                return;
            }

            const marker = `markers=color:red|${address.latitude},${address.longitude}`;
            const baseUrl = `https://maps.googleapis.com/maps/api/staticmap?size=${width}x${height}&zoom=${zoom}&${marker}&key=${apiKey}`;

            setImageUrl(baseUrl);
        };

        generateStaticMap();
    }, [address, width, height, zoom]);

    if (imageUrl != '') return <Card.Img variant='top' src={imageUrl} />;
    return null;
}
