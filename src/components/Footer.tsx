import { Link } from 'react-router-dom';
import '@/components/_styles/Footer.scss';
import { Container } from 'react-bootstrap';

/**
 * Footer component that displays links to Privacy Policy and Terms & Conditions,
 * along with a copyright notice.
 *
 * @returns {JSX.Element} The rendered Footer component.
 */
export default function Footer() {
    return (
        <>
            {/* Container for policy and terms links */}
            <Container>
                {/* Link to the Privacy Policy page */}
                <Link to='/privacy'>Privacy Policy</Link>
                {/* Link to the Terms & Conditions page */}
                <Link to='/terms'>Terms & Conditions</Link>
            </Container>

            {/* Container for the copyright notice */}
            <Container>
                <i className='copyright'>WayMatcher, 2025 ©</i>
            </Container>
        </>
    );
}
