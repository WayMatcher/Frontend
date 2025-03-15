import { Container, Form } from "react-bootstrap";

export default function SearchBar() {
    return (
        <Container className="SearchBar">
            <Form>
                <Form.Group controlId="search">
                    <Form.Control type="text" placeholder="Search for events" />
                </Form.Group>
            </Form>
        </Container>
    )
}