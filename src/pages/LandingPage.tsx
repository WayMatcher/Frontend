import { useNavigate } from 'react-router-dom';
import '@/pages/_styles/LandingPage.scss';
import imgUrl from './WayMatcher-NoText.png';
import { Container, Button, Col, Row, Image } from 'react-bootstrap';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';

/**
 * LandingPage component serves as the entry point for the application.
 * It displays a welcome message, a call-to-action button, and a decorative SVG graphic.
 *
 * @returns {JSX.Element} The rendered LandingPage component.
 */
export default function LandingPage() {
    const navigate = useNavigate(); // Hook to programmatically navigate between routes.
    const isAuthenticated = useIsAuthenticated(); // Hook to check if the user is authenticated.

    return (
        <>
            {/* Main container for the landing page */}
            <Container fluid className='landing-page'>
                <Row className='justify-content-center align-items-center text-center'>
                    <Col md={8}>
                        {/* Logo image */}
                        <Image src={imgUrl} />

                        {/* Application title */}
                        <h1 className='display-3'>WayMatcher</h1>

                        {/* Subtitle */}
                        <p className='lead'>Find your way together</p>

                        {/* Call-to-action button */}
                        <Button
                            variant='primary'
                            size='lg'
                            onClick={
                                () =>
                                    isAuthenticated
                                        ? navigate('/events') // Navigate to events page if authenticated.
                                        : navigate('/register') // Navigate to register page if not authenticated.
                            }
                        >
                            Start matching
                        </Button>
                    </Col>
                </Row>
                <Row className='justify-content-center mt-5'>
                    <Col md={10}>{/* Placeholder for additional content */}</Col>
                </Row>
            </Container>

            {/* Decorative SVG graphic */}
            <div className='graphic'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 200' className='carpool-graphic'>
                    {/* Road */}
                    <rect x='0' y='105' width='500' height='20' fill='#ccc' />
                    <line x1='0' y1='115' x2='500' y2='115' stroke='#fff' strokeDasharray='10,30' />

                    {/* Connections between waypoints and people */}
                    <line x1='100' y1='50' x2='100' y2='100' stroke='#3d4049' strokeWidth='2' />
                    <line x1='250' y1='50' x2='250' y2='100' stroke='#3d4049' strokeWidth='2' />
                    <line x1='400' y1='50' x2='400' y2='100' stroke='#3d4049' strokeWidth='2' />

                    {/* Waypoints */}
                    <circle cx='100' cy='100' r='10' fill='#41a1ce' />
                    <circle cx='250' cy='100' r='10' fill='#41a1ce' />
                    <circle cx='400' cy='100' r='10' fill='#41a1ce' />

                    {/* People */}
                    <circle cx='100' cy='50' r='10' fill='#f38e4b' />
                    <circle cx='250' cy='50' r='10' fill='#f38e4b' />
                    <circle cx='400' cy='50' r='10' fill='#f38e4b' />
                </svg>
            </div>
        </>
    );
}
