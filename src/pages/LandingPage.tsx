import { useNavigate } from 'react-router-dom';
import '/src/styles/MainPage.scss';
import { Container, Button, Col, Row } from 'react-bootstrap';

export default function LandingPage() {
    const navigate = useNavigate();

    const getStarted = () => {
        navigate('/user/register');
    }

    return (
        <Container fluid className="landing-page">
            <Row className="justify-content-center align-items-center text-center">
                <Col md={8}>
                    <h1>Welcome to WayMatcher</h1>
                    <p>Your journey to finding the best paths starts here.</p>
                    <Button variant="primary" size="lg" onClick={getStarted} >Get Started</Button>
                </Col>
            </Row>
        </Container>
    );
}