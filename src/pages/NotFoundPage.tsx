import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    return (
        <Container className='text-center mt-5'>
            <Row>
                <Col>
                    <h1 className='display-3'>404</h1>
                    <p className='lead'>Page Not Found</p>
                    <p>The page you are looking for does not exist.</p>
                    <Link to='/'>
                        <Button variant='primary'>Find your way</Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default NotFoundPage;
