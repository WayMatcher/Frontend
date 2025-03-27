import PropTypes from 'prop-types';
import { Card, Button, Alert, ListGroup, Container } from 'react-bootstrap';
import Address from '@/types/objects/Address/dto';

// Helper function to format address lines based on country code
// This contains the core logic adapting to different formats.
const formatAddressLines = (address: Address) => {
    if (!address) {
        return ['No address provided.'];
    }

    const {
        city,
        postalcode,
        street, // Fallback if addressLine1 isn't provided
        country,
        countrycode,
        region,
        state,
        addressLine1,
        addressLine2,
    } = address;

    // Normalize country code for consistent matching
    const cc = (countrycode || '').toUpperCase();

    const lines = [];

    // --- Determine primary street lines ---
    // Prefer addressLine1 if available, otherwise use street.
    const primaryStreetLine = addressLine1 || street;
    if (primaryStreetLine) {
        lines.push(primaryStreetLine);
    }
    // Always add addressLine2 if it exists.
    if (addressLine2) {
        lines.push(addressLine2);
    }

    // --- Determine Administrative Area (State/Region) ---
    // Use state if available, otherwise region. Could potentially display both if needed.
    const adminArea = state || region || '';

    // --- Format based on Country Code ---
    switch (cc) {
        case 'US':
            // USA Format: [Street Lines], City, State PostalCode
            let cityStateZip = city || '';
            if (adminArea) {
                // Typically 'state' for US
                cityStateZip += `${city ? ', ' : ''}${adminArea}`;
            }
            if (postalcode) {
                cityStateZip += ` ${postalcode}`;
            }
            if (cityStateZip) lines.push(cityStateZip.trim());
            break;

        case 'DE':
        case 'AT':
            // Germany/Austria Format: [Street Lines], PostalCode City
            let postalCity = postalcode || '';
            if (city) {
                postalCity += ` ${city}`;
            }
            if (postalCity) lines.push(postalCity.trim());
            // Optional: Add region/state if relevant for specific addresses within DE/AT,
            // though usually not part of the main postal address block.
            // if (adminArea) lines.push(adminArea);
            break;

        // Add more country cases here (e.g., GB, CA, JP, FR...)
        // case 'GB': ...
        // case 'CA': ...

        default:
            // Generic Fallback Format (often similar to US/CA)
            // [Street Lines], City, AdminArea PostalCode
            let genericCityLine = city || '';
            if (adminArea) {
                genericCityLine += `${city ? ', ' : ''}${adminArea}`;
            }
            if (postalcode) {
                genericCityLine += ` ${postalcode}`;
            }
            if (genericCityLine) lines.push(genericCityLine.trim());
            break;
    }

    // --- Add Country Name ---
    // Add the country name at the end, especially important for international contexts.
    // Use the provided country name, or fallback to the code if name is missing.
    if (country) {
        lines.push(country);
    } else if (cc) {
        // Optionally, you could have a lookup map here for code -> full name
        lines.push(cc); // Fallback to code if full name not provided
    }

    // Filter out any potential empty lines that might result from missing data
    return lines.filter((line) => line && line.trim() !== '');
};

function InternationalAddressDisplay({ address, variant }: { address: Address; variant?: 'card' | 'compact' }) {
    switch (variant) {
        case 'card':
            return <AddressDisplayCard address={address} />;
        case 'compact':
            return <AddressDisplayCompact address={address} />;
        default:
            return <AddressDisplayCard address={address} />;
    }
}

function AddressDisplayCard({ address }: { address: Address }) {
    if (!address) {
        return (
            <Card>
                <Card.Body>No address data provided.</Card.Body>
            </Card>
        );
    }

    const { latitude, longitude } = address;
    const formattedLines = formatAddressLines(address);

    const mapUrl = latitude && longitude ? `https://www.google.com/maps?q=${latitude},${longitude}` : null;
    console.log(stop);
    return (
        <Card style={{ width: '18rem' }} className='mb-3'>
            <Card.Body>
                <Card.Title>Address</Card.Title>
                <address style={{ whiteSpace: 'pre-line', marginBottom: mapUrl ? '1rem' : '0' }}>
                    {formattedLines.length > 0 ? formattedLines.join('\n') : 'Address details incomplete.'}
                </address>
                {mapUrl && (
                    <Button variant='outline-primary' size='sm' href={mapUrl} target='_blank' rel='noopener noreferrer'>
                        View on Map
                    </Button>
                )}
            </Card.Body>
        </Card>
    );
}

function AddressDisplayCompact({ address }: { address: Address }) {
    if (!address) {
        return (
            <ListGroup.Item>
                <Alert variant='warning'>No address data provided.</Alert>
            </ListGroup.Item>
        );
    }

    const { latitude, longitude } = address;
    const formattedLines = formatAddressLines(address);

    const mapUrl = latitude && longitude ? `https://www.google.com/maps?q=${latitude},${longitude}` : null;

    return (
        <Container>
            {/* Use the semantic <address> tag */}
            <address style={{ whiteSpace: 'pre-line', marginBottom: mapUrl ? '1rem' : '0' }}>
                {formattedLines.length > 0 ? formattedLines.join('\n') : 'Address details incomplete.'}
            </address>
            <div className='vr'></div>
            {mapUrl && (
                <Button variant='outline-primary' size='sm' href={mapUrl} target='_blank' rel='noopener noreferrer'>
                    View on Map
                </Button>
            )}
        </Container>
    );
}

// Define PropTypes for type checking and documentation
InternationalAddressDisplay.propTypes = {
    address: PropTypes.shape({
        city: PropTypes.string,
        postalcode: PropTypes.string,
        street: PropTypes.string, // Used as fallback for addressLine1
        country: PropTypes.string, // Full country name (e.g., "Austria")
        countrycode: PropTypes.string, // ISO 3166-1 alpha-2 (e.g., "AT")
        region: PropTypes.string, // Often equivalent to state/province
        state: PropTypes.string, // Often equivalent to region/province
        longitude: PropTypes.number,
        latitude: PropTypes.number,
        addressLine1: PropTypes.string, // Preferred primary street line
        addressLine2: PropTypes.string, // Apt, Suite, Floor etc.
    }), //.isRequired // Uncomment if address prop is always required
};

export default InternationalAddressDisplay;
