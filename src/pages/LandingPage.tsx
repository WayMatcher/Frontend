import { useNavigate } from 'react-router-dom';
import '@/pages/styles/LandingPage.scss';
import { Container, Button, Col, Row } from 'react-bootstrap';

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <Container fluid className='landing-page'>
            <Row className='justify-content-center align-items-center text-center'>
                <Col md={8}>
                    <h1 className='display-3'>WayMatcher</h1>
                    <p className='lead'>Find your way together</p>
                    <Button variant='primary' size='lg' onClick={() => navigate('/register')}>
                        Start matching
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}
