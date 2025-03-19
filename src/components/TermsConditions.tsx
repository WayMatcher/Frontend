import '../styles/Footer.scss';
import { Container } from 'react-bootstrap';

export default function Footer() {
    return (
        <Container className='TermsConditions'>
            <h1>Terms & Conditions</h1>
            <p>By using this website, you agree to the following terms and conditions:</p>
            <ul>
                <li>Do not use this website for any illegal activity.</li>
                <li>Do not use this website to harass or bully others.</li>
                <li>Do not use this website to spread hate speech or misinformation.</li>
                <li>Do not use this website to spam or scam others.</li>
            </ul>
        </Container>
    );
}
