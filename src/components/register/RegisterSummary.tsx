import { useContext } from "react"
import RegisterContext from "../../contexts/RegisterContext";
import { Col, Container, Row, Button } from "react-bootstrap";
import apiRegister from "../../api/register";

export default function RegisterSummary(): React.ReactElement {
    const { registerAddress, registerUser, registerVehicle } = useContext(RegisterContext);
    if (!registerUser || !registerAddress || !registerVehicle) return <h2 className="warning">Registration not completed!</h2>
    return (
        <>
            <h2>Summary</h2>
            <Container>
                <Row>
                    <Col>
                        <h3>User</h3>
                        <p>Username: {registerUser.username}</p>
                        <p>Email: {registerUser.email}</p>
                        <p>Name: {registerUser.firstName} {registerUser.name}</p>
                        <p>Additional Description: {registerUser.additional_description}</p>
                        <p>Telephone: {registerUser.telephone}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h3>Address</h3>
                        <p>Street: {registerAddress.street}</p>
                        <p>Postal Code: {registerAddress.postal_code}</p>
                        <p>Region: {registerAddress.region}</p>
                        <p>Country: {registerAddress.country}</p>
                        <p>State: {registerAddress.state}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h3>Vehicle</h3>
                        <p>Make: {registerVehicle.make}</p>
                        <p>Model: {registerVehicle.model}</p>
                        <p>Year: {registerVehicle.year}</p>
                        <p>Seats: {registerVehicle.seats}</p>
                        <p>License Plate: {registerVehicle.license_plate}</p>
                    </Col>
                </Row>
                <br />
                <Button type="submit" onClick={() => apiRegister(registerUser, registerAddress, registerVehicle)}>Register</Button>
            </Container>
        </>
    );
}