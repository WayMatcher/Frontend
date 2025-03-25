import { Button, ButtonGroup, Col, ListGroup, Modal, Row, Stack } from 'react-bootstrap';
import WMEvent from '@/types/objects/Event/dto';
import { useEffect, useState } from 'react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import User from '@/types/objects/User/dto';
import EventMap from './EventMap';
import EventMember from '@/types/objects/EventMember/dto';
import { apiSendInvite } from '@/api/endpoints/invite';
import EventInvite from './EventInvite';

const Event = ({
    event,
    showInviteState,
}: {
    event: WMEvent;
    showInviteState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}) => {
    return (
        <>
            <Modal.Body>
                <Row>
                    <Col>
                        <ListGroup>
                            <EventMap width={900} height={1200} stopList={event.stopList} />
                            <strong>Stops:</strong>
                            {event.stopList.map((stop) => (
                                <ListGroup horizontal>
                                    <ListGroup.Item key={'seq' + stop.stopId}>
                                        <strong>#{stop.stopSequenceNumber}: </strong>
                                    </ListGroup.Item>
                                    <ListGroup.Item key={'addr' + stop.stopId}>
                                        {stop.address.street} {stop.address.city} {stop.address.state}{' '}
                                        {stop.address.postal_code}
                                    </ListGroup.Item>
                                </ListGroup>
                            ))}
                        </ListGroup>
                    </Col>

                    <Col>
                        <ListGroup>
                            <ListGroup.Item>{event.description}</ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Date:</strong> {event.startTimestamp}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Start:</strong> {event.stopList[0].address.street}{' '}
                                {event.stopList[0].address.city} {event.stopList[0].address.state}{' '}
                                {event.stopList[0].address.postal_code}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Free Seats:</strong> {event.freeSeats}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <strong>Members:</strong>
                                <ListGroup horizontal>
                                    {event.eventMembers.map((member) => (
                                        <ListGroup.Item key={member.memberId}>
                                            <Button disabled>{member.memberId}</Button>
                                        </ListGroup.Item>
                                    ))}
                                    {(() => {
                                        const items = [];
                                        for (let i = 0; i < event.freeSeats; i++) {
                                            items.push(
                                                <ListGroup.Item key={`seat-${i}`}>
                                                    <Button
                                                        onClick={() => {
                                                            showInviteState[1](true);
                                                        }}
                                                    >{`${i + 1}`}</Button>
                                                </ListGroup.Item>,
                                            );
                                        }
                                        return items;
                                    })()}
                                </ListGroup>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </Modal.Body>
        </>
    );
};

const OwnedEvent = ({
    event,
    showInviteState,
}: {
    event: WMEvent;
    showInviteState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}) => {
    return (
        <>
            <Modal.Body>
                <Row>
                    <Col>
                        <EventMap width={300} height={400} stopList={event.stopList} />
                    </Col>
                    <Col>
                        <ListGroup>
                            <ListGroup.Item>{event.description}</ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Date:</strong> {event.startTimestamp}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Start:</strong> {event.stopList[0].address.street}{' '}
                                {event.stopList[0].address.city} {event.stopList[0].address.state}{' '}
                                {event.stopList[0].address.postal_code}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Free Seats:</strong> {event.freeSeats}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <strong>Members:</strong>
                                <ListGroup horizontal>
                                    {event.eventMembers.map((member) => (
                                        <ListGroup.Item key={member.memberId}>
                                            <Button disabled>{member.memberId}</Button>
                                        </ListGroup.Item>
                                    ))}
                                    {(() => {
                                        const items = [];
                                        for (let i = 0; i < event.freeSeats; i++) {
                                            items.push(
                                                <ListGroup.Item key={`seat-${i}`}>
                                                    <Button
                                                        onClick={() => {
                                                            showInviteState[1](true);
                                                        }}
                                                    >{`${i + 1}`}</Button>
                                                </ListGroup.Item>,
                                            );
                                        }
                                        return items;
                                    })()}
                                </ListGroup>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <strong>Stops:</strong>
                        <ListGroup>
                            {event.stopList.map((stop) => (
                                <>
                                    <ListGroup.Item key={'seq' + stop.stopId}>
                                        <strong>#{stop.stopSequenceNumber}: </strong>
                                    </ListGroup.Item>
                                    <ListGroup.Item key={'addr' + stop.stopId}>
                                        {stop.address.street} {stop.address.city} {stop.address.state}{' '}
                                        {stop.address.postal_code}
                                    </ListGroup.Item>
                                </>
                            ))}
                        </ListGroup>
                    </Col>
                </Row>
                <i>This event is owned by you</i>
            </Modal.Body>
        </>
    );
};

const EventDetails = ({ event, showModal }: { event?: WMEvent; showModal: boolean }) => {
    const [show, setShow] = useState<boolean>(showModal);
    const showInvite = useState<boolean>(false);
    const showRequest = useState<boolean>(false);
    const [isOwnedEvent, setIsOwnedEvent] = useState<boolean>(false);
    const [currentEvent, setCurrentEvent] = useState<WMEvent | undefined>();
    const authUser = useAuthUser<User>();
    const handleCloseModal = () => setShow(false);

    useEffect(() => {
        setShow(showModal);
        if (event) {
            setCurrentEvent(event);
        }
    }, [showModal, event]);

    useEffect(() => {
        // find member that is the owner of the event
        currentEvent?.eventMembers.forEach((member: EventMember) => {
            if (member.eventRole === 0 && member.memberId === member?.user.userId) {
                setIsOwnedEvent(true);
            }
        });

        if (authUser?.userId !== currentEvent?.eventMembers[0].memberId) {
            setIsOwnedEvent(true);
        } else {
            setIsOwnedEvent(false);
        }
    }, [currentEvent]);

    if (currentEvent) {
        return (
            <>
                <Modal show={show} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{currentEvent.title}</Modal.Title>
                    </Modal.Header>
                    {isOwnedEvent ? (
                        <Event key={currentEvent.eventId} event={currentEvent} showInviteState={showInvite} />
                    ) : (
                        <OwnedEvent key={currentEvent.eventId} event={currentEvent} showInviteState={showInvite} />
                    )}
                    <Modal.Footer>
                        <ButtonGroup>
                            {!isOwnedEvent && <Button variant='primary'>Edit</Button>}
                            <Button variant='secondary' onClick={handleCloseModal}>
                                Close
                            </Button>
                        </ButtonGroup>
                    </Modal.Footer>
                </Modal>
                <EventInvite showState={showInvite} event={currentEvent} owner />
                <EventInvite showState={showRequest} event={currentEvent} />
            </>
        );
    } else {
        return null;
    }
};

export default EventDetails;
