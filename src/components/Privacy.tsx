import '@/styles/Footer.scss';
import { Container } from 'react-bootstrap';

export default function Footer() {
    return (
        <Container className='Privacy'>
            <h1>Privacy</h1>
            <p>By using this website, you agree to the following privacy policy:</p>
            <ul>
                <li>We collect your email address and username for account creation.</li>
                <li>We collect your location data to provide you with relevant information.</li>
                <li>We collect your search history to improve our services.</li>
                <li>We collect your IP address for security and fraud prevention.</li>
            </ul>
        </Container>
    );
}
