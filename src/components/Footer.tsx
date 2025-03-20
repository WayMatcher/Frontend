import { Link } from 'react-router-dom';
import './styles/Footer.scss';
import { Container } from 'react-bootstrap';

export default function Footer() {
    return (
        <>
            <Container>
                <Link to='/privacy'>Privacy</Link>
                <Link to='/terms'>Terms & Conditions</Link>
            </Container>
            <Container>
                <i className='copyright'>WayMatcher, 2025 ©</i>
            </Container>
        </>
    );
}
