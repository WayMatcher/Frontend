import { Card, Stack } from 'react-bootstrap';
import Placeholder from 'react-bootstrap/Placeholder';

/**
 * A placeholder component for an event card.
 * This component is used to display a skeleton UI while the actual content is loading.
 * It uses Bootstrap's Placeholder and Card components for styling.
 *
 * @returns {JSX.Element} The placeholder event card component.
 */
export default function EventCardPlaceholder() {
    return (
        // Card container with a maximum width and primary border
        <Card style={{ maxWidth: '18rem' }} className='text-center' border='primary'>
            {/* Card header with placeholders for title and subtitle */}
            <Card.Header className='text-muted'>
                <Stack direction='horizontal' gap={3} className='justify-content-center'>
                    {/* Placeholder for the title */}
                    <Placeholder as='span' animation='glow'>
                        <Placeholder xs={8} />
                    </Placeholder>
                    <div className='vr' /> {/* Vertical divider */}
                    {/* Placeholder for the subtitle */}
                    <Placeholder as='span' animation='glow'>
                        <Placeholder xs={4} />
                    </Placeholder>
                </Stack>
            </Card.Header>

            {/* Placeholder for the image or visual content */}
            <div style={{ width: '100%', height: '200px', backgroundColor: '#e9ecef' }} />

            {/* Card body with placeholders for title, description, and additional content */}
            <Card.Body>
                {/* Placeholder for the card title */}
                <Card.Title>
                    <Placeholder as='h5' animation='glow'>
                        <Placeholder xs={6} />
                    </Placeholder>
                </Card.Title>
                {/* Placeholder for the first paragraph */}
                <Placeholder as='p' animation='glow'>
                    <Placeholder xs={7} /> <Placeholder xs={4} />
                </Placeholder>
                {/* Placeholder for the second paragraph */}
                <Placeholder as='p' animation='glow'>
                    <Placeholder xs={5} /> <Placeholder xs={6} />
                </Placeholder>
                <hr /> {/* Horizontal divider */}
                {/* Placeholder for additional content */}
                <Placeholder as='div' animation='glow'>
                    <Placeholder xs={8} />
                </Placeholder>
            </Card.Body>

            {/* Card footer with placeholders for footer content and a button */}
            <Card.Footer className='text-muted'>
                <Stack direction='horizontal' gap={3} className='justify-content-center'>
                    {/* Placeholder for footer text */}
                    <Placeholder as='span' animation='glow'>
                        <Placeholder xs={6} />
                    </Placeholder>
                    <div className='vr' /> {/* Vertical divider */}
                    {/* Placeholder for a button */}
                    <Placeholder.Button variant='primary' xs={6} />
                </Stack>
            </Card.Footer>
        </Card>
    );
}
