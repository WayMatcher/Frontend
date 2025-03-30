import { useNavigate } from 'react-router-dom';
import '@/pages/styles/LandingPage.scss';
import { Container, Button, Col, Row } from 'react-bootstrap';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';

export default function LandingPage() {
    const navigate = useNavigate();
    const isAuthenticated = useIsAuthenticated();
    return (
        <Container fluid className='landing-page'>
            <Row className='justify-content-center align-items-center text-center'>
                <Col md={8}>
                    <h1 className='display-3'>WayMatcher</h1>
                    <p className='lead'>Find your way together</p>
                    <Button
                        variant='primary'
                        size='lg'
                        onClick={() => (isAuthenticated ? navigate('/events') : navigate('/register'))}
                    >
                        Start matching
                    </Button>
                </Col>
            </Row>
            <Row className='justify-content-center mt-5'>
                <Col md={10}>
                    <div className='graphic'>
                        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 200' className='carpool-graphic'>
                            {/* Road */}
                            <rect x='0' y='90' width='500' height='20' fill='#ccc' />
                            <line x1='0' y1='100' x2='500' y2='100' stroke='#fff' strokeDasharray='10,10' />

                            {/* Waypoints */}
                            <circle cx='100' cy='100' r='10' fill='#007bff' />
                            <circle cx='250' cy='100' r='10' fill='#007bff' />
                            <circle cx='400' cy='100' r='10' fill='#007bff' />

                            {/* Connections */}
                            <line x1='100' y1='50' x2='100' y2='100' stroke='#007bff' strokeWidth='2' />
                            <line x1='250' y1='50' x2='250' y2='100' stroke='#007bff' strokeWidth='2' />
                            <line x1='400' y1='50' x2='400' y2='100' stroke='#007bff' strokeWidth='2' />

                            {/* People */}
                            <circle cx='100' cy='50' r='10' fill='#ffc107' />
                            <circle cx='250' cy='50' r='10' fill='#ffc107' />
                            <circle cx='400' cy='50' r='10' fill='#ffc107' />
                        </svg>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
