import Address from '@/types/objects/Address/dto';
import Stop from '@/types/objects/Stop/dto';
import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

interface Props {
    stopList: Stop[];
    width: number;
    height: number;
}

function MapURL({ stopList, width, height }: Props) {
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

            // Get start, end and waypoints
            const start: Address = stopList[0].address;
            const end: Address = stopList[stopList.length - 1].address;
            const waypoints: Address[] = stopList.slice(1, stopList.length - 1).map((stop) => stop.address);

            console.log('Start: ', start.longitude, start.latitude);
            console.log('End: ', end.longitude, end.latitude);

            // Check if Latitude is specified in degrees within the range [-90, 90]. Longitude is specified in degrees within the range [-180, 180]
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

            // Build markers string
            const startMarker =
                start.latitude && start.longitude
                    ? `markers=color:green|label:S|${start.latitude},${start.longitude}`
                    : '';
            const endMarker =
                end.latitude && end.longitude ? `markers=color:red|label:E|${end.latitude},${end.longitude}` : '';
            const waypointMarkers = waypoints
                .filter((wp) => wp.latitude && wp.longitude)
                .map((wp, index) => `markers=color:blue|label:${index + 1}|${wp.latitude},${wp.longitude}`)
                .join('&');

            // Build path string (connect all points)
            const path = `path=color:0x0000ff|weight:5|${[start, ...waypoints, end].map((p) => `${p.latitude},${p.longitude}`).join('|')}`;

            const baseUrl = `https://maps.googleapis.com/maps/api/staticmap?size=${width}x${height}&${startMarker}&${endMarker}${waypointMarkers && '&' + waypointMarkers}&${path}&key=${apiKey}`;
            /* https://maps.googleapis.com/
                maps/
                api/
                staticmap
                ?center=63.259591,-144.667969
                &zoom=6&size=400x400
                &markers=color:blue%7Clabel:S%7C62.107733,-145.541936
                &markers=size:tiny%7Ccolor:green%7CDelta+Junction,AK
                &markers=size:mid%7Ccolor:0xFFFF00%7Clabel:C%7CTok,AK%22
                &key=AIzaSyDxT0mzJKNVt5fKK-uWM6wCNZ7x4AYvLDI
                */

            /* https://maps.googleapis.com/
                maps/
                api/
                staticmap
                ?size=600x400
                &markers=color:green|label:S|34.0522,-118.2437
                &markers=color:red|label:E|34.0522,-118.2437
                &path=color:0x0000ff|weight:5|34.0522,-118.2437|34.0522,-118.2437
                &key=AIzaSyDxT0mzJKNVt5fKK-uWM6wCNZ7x4AYvLDI
             */
            setImageUrl(baseUrl);
        };

        generateStaticMap();
    }, []);
    if (!imageUrl) return null;
    return <Card.Img variant='top' src={imageUrl} />;
}

export default MapURL;
