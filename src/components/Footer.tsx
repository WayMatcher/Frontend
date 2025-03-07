import '../styles/Footer.scss';
import { Container } from 'react-bootstrap';

export default function Footer() {
  return (

    <div className='Footer'>
      <Container>
        <a href=".">Privacy</a>
        <a href=".">Terms & Conditions</a>
      </Container>
      <i className='copyright'>WayMatcher, 2025 ©</i>
    </div>
  );
}