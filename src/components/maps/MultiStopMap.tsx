import Address from '@/types/objects/Address/dto';
import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

interface MultiStopMapProps {
    stopList: { address: Address }[];
    width: number;
    height: number;
}

export default function MultiStopMap({ stopList, width, height }: MultiStopMapProps) {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const generateStaticMap = () => {
            if (stopList.length < 2) {
                console.error('Not enough stops to generate a map!');
                return;
            }

            const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;

            if (!apiKey) {
                console.error('Google Maps API key is missing!');
                return;
            }

            const start: Address = stopList[0].address;
            const end: Address = stopList[stopList.length - 1].address;
            const waypoints: Address[] = stopList.slice(1, stopList.length - 1).map((stop) => stop.address);

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

            const startMarker = `markers=color:green|label:S|${start.latitude},${start.longitude}`;
            const endMarker = `markers=color:red|label:E|${end.latitude},${end.longitude}`;
            const waypointMarkers = waypoints
                .filter((wp) => wp.latitude && wp.longitude)
                .map((wp, index) => `markers=color:blue|label:${index + 1}|${wp.latitude},${wp.longitude}`)
                .join('&');

            const path = `path=color:0x0000ff|weight:5|${[start, ...waypoints, end]
                .map((p) => `${p.latitude},${p.longitude}`)
                .join('|')}`;

            const baseUrl = `https://maps.googleapis.com/maps/api/staticmap?size=${width}x${height}&${startMarker}&${endMarker}${waypointMarkers && '&' + waypointMarkers}&${path}&key=${apiKey}`;

            setImageUrl(baseUrl);
        };

        generateStaticMap();
    }, [stopList, width, height]);

    if (imageUrl != '') return <Card.Img variant='top' src={imageUrl} />;
    return null;
}
