import '../styles/Footer.scss';
import TermsConditions from './TermsConditions';
import Privacy from './Privacy';

export default function Footer() {
  return (
    <div className="Footer" >
      <div className="Terms">
        <Privacy />
        <TermsConditions />
      </div>
    </div>
  );
}