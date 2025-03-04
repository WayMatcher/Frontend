import '../styles/NavBar.scss';
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

export default function NavBar() {
  return (
    <div className="NavBar">
      <div className="nav-logo"><img src="logo192.png" alt="Logo Palceholder" height="32px" /></div>
      <div className="nav-links">
        <a href=".">Location A</a>
        <a href=".">Location B</a>
        <a href=".">Location C</a>
        <a href=".">Location D</a>
      </div>
      <ButtonGroup className="auth-buttons">
        <Button variant='primary'>Login</Button>
        <Button variant='secondary'>Register</Button>
      </ButtonGroup>
    </div>
  );
}