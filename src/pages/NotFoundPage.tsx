import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/**
 * NotFoundPage Component
 *
 * This component renders a 404 error page with a message indicating that the requested page
 * could not be found. It also provides a button to navigate back to the homepage.
 *
 * @returns {JSX.Element} The rendered 404 Not Found page.
 */
const NotFoundPage: React.FC = () => {
    return (
        // Center the content vertically and horizontally with Bootstrap classes
        <Container className='text-center mt-5'>
            <Row>
                <Col>
                    {/* Display the 404 error code */}
                    <h1 className='display-3'>404</h1>

                    {/* Display a lead message */}
                    <p className='lead'>Page Not Found</p>

                    {/* Provide additional context about the missing page */}
                    <p>The page you are looking for does not exist.</p>

                    {/* Link back to the homepage */}
                    <Link to='/'>
                        <Button variant='primary'>Find your way</Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default NotFoundPage;
