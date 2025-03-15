import { Modal } from "react-bootstrap";

export const EventError = () => {
    return (<>
        <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h2>Error selecting Event</h2>
        </Modal.Body>
    </>);
}