import '../styles/Footer.scss';
import TermsConditions from './TermsConditions';
import Privacy from './Privacy';

export default function Footer() {
  return (
    <div className="Footer" >
      <Privacy />
      <TermsConditions />
      <i className='copyright'>WayMatcher, 2025 ©</i>
    </div>
  );
}