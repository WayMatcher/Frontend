import { Card, Stack } from 'react-bootstrap';
import Placeholder from 'react-bootstrap/Placeholder';

export default function EventCardPlaceholder() {
    return (
        <Card style={{ maxWidth: '18rem' }} className='text-center' border='primary'>
            <Card.Header className='text-muted'>
                <Stack direction='horizontal' gap={3} className='justify-content-center'>
                    <Placeholder as='span' animation='glow'>
                        <Placeholder xs={8} />
                    </Placeholder>
                    <div className='vr' />
                    <Placeholder as='span' animation='glow'>
                        <Placeholder xs={4} />
                    </Placeholder>
                </Stack>
            </Card.Header>
            <div style={{ width: '100%', height: '200px', backgroundColor: '#e9ecef' }} />
            <Card.Body>
                <Card.Title>
                    <Placeholder as='h5' animation='glow'>
                        <Placeholder xs={6} />
                    </Placeholder>
                </Card.Title>
                <Placeholder as='p' animation='glow'>
                    <Placeholder xs={7} /> <Placeholder xs={4} />
                </Placeholder>
                <Placeholder as='p' animation='glow'>
                    <Placeholder xs={5} /> <Placeholder xs={6} />
                </Placeholder>
                <hr />
                <Placeholder as='div' animation='glow'>
                    <Placeholder xs={8} />
                </Placeholder>
            </Card.Body>
            <Card.Footer className='text-muted'>
                <Stack direction='horizontal' gap={3} className='justify-content-center'>
                    <Placeholder as='span' animation='glow'>
                        <Placeholder xs={6} />
                    </Placeholder>
                    <div className='vr' />
                    <Placeholder.Button variant='primary' xs={6} />
                </Stack>
            </Card.Footer>
        </Card>
    );
}
