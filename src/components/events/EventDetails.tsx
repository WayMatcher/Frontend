import { Alert, Button, ButtonGroup, Col, Image, ListGroup, Modal, Row } from 'react-bootstrap';
import WMEvent from '@/types/objects/Event/dto';
import { useContext, useEffect, useState } from 'react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import User from '@/types/objects/User/dto';
import EventMap from './EventMap';
import EventInvite from './EventInvite';
import '@/components/styles/EventDetails.scss';
import { Link, useNavigate } from 'react-router-dom';
import ErrorModalContext from '@/contexts/ErrorModalContext';
import { apiDeleteEvent } from '@/api/endpoints/event';

const Details = ({ event }: { event: WMEvent }) => {
    return (
        <>
            <Modal.Body>
                <Row>
                    <Col>
                        <h3>Details</h3>
                        <p>Description</p>
                        <ListGroup>
                            <ListGroup.Item>{event.description}</ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </Modal.Body>
        </>
    );
};

const Event = ({
    event,
    showInviteState,
}: {
    event: WMEvent;
    showInviteState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}) => {
    const authUser = useAuthUser<User>();
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
                                        {stop.address.postalcode}
                                    </ListGroup.Item>
                                </ListGroup>
                            ))}
                        </ListGroup>
                    </Col>

                    <Col>
                        <ListGroup>
                            <ListGroup.Item>
                                <strong>Date:</strong> {event.startTimestamp}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Start:</strong> {event.stopList[0].address.street}{' '}
                                {event.stopList[0].address.city} {event.stopList[0].address.state}{' '}
                                {event.stopList[0].address.postalcode}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Free Seats:</strong> {event.freeSeats}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <strong>Members:</strong>
                                <ListGroup horizontal>
                                    {event.eventMembers.map((member) => (
                                        <ListGroup.Item key={member.memberId}>
                                            <Button variant='outline-secondary' disabled>
                                                {member.user.profilepicture ? (
                                                    <Image
                                                        roundedCircle={true}
                                                        src={URL.createObjectURL(member.user.profilepicture)}
                                                        width={64}
                                                    ></Image>
                                                ) : (
                                                    <Image
                                                        roundedCircle={true}
                                                        src='https://api.ai-cats.net/v1/cat?size=256&theme=All'
                                                        width={64}
                                                    ></Image>
                                                )}
                                            </Button>
                                        </ListGroup.Item>
                                    ))}
                                    {(() => {
                                        const items = [];
                                        for (let i = 0; i < event.freeSeats; i++) {
                                            items.push(
                                                <ListGroup.Item key={`seat-${i}`}>
                                                    <Button
                                                        disabled={authUser === null}
                                                        onClick={() => {
                                                            showInviteState[1](true);
                                                        }}
                                                    >
                                                        <span className='bi bi-plus-lg'></span>
                                                    </Button>
                                                </ListGroup.Item>,
                                            );
                                        }
                                        return items;
                                    })()}
                                </ListGroup>
                                <br />
                                {!authUser && (
                                    <Alert variant='info'>
                                        Please <Link to='/register'>register</Link> or <Link to='/login'>log in</Link>{' '}
                                        to be able to join this Way!
                                    </Alert>
                                )}
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
    const authUser = useAuthUser<User>();
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
                                <strong>Date:</strong> {new Date(event.startTimestamp).toLocaleDateString('de-AT')}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Start:</strong> {event.stopList[0].address.street}{' '}
                                {event.stopList[0].address.city} {event.stopList[0].address.state}{' '}
                                {event.stopList[0].address.postalcode}
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
                                                        disabled={authUser === null}
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
                <i>This event is owned by you</i>
            </Modal.Body>
        </>
    );
};

const EventDetails = ({ event, showModal }: { event?: WMEvent; showModal: boolean }) => {
    const navigate = useNavigate();

    const { showErrorModal } = useContext(ErrorModalContext);

    const [show, setShow] = useState<boolean>(showModal);
    const showInvite = useState<boolean>(false);
    const [isOwnedEvent, setIsOwnedEvent] = useState<boolean>(false);
    const [currentEvent, setCurrentEvent] = useState<WMEvent | undefined>();

    const authUser = useAuthUser<User>();
    const handleCloseModal = () => {
        setShow(false);
        navigate('/events');
    };

    useEffect(() => {
        setShow(showModal);
        if (event) {
            setCurrentEvent(event);
        }
    }, [showModal, event]);

    useEffect(() => {
        if (authUser?.userId === currentEvent?.owner.userId) {
            setIsOwnedEvent(true);
        } else {
            setIsOwnedEvent(false);
        }
    }, [currentEvent]);

    const onDelete = async () => {
        try {
            if (!currentEvent?.eventId) return;
            await apiDeleteEvent({ eventId: currentEvent.eventId });
        } catch (error: unknown) {
            if (error instanceof Error) {
                showErrorModal(error.message || 'Failed to delete event');
                throw error;
            } else {
                throw new Error('An unknown error occurred');
            }
        } finally {
            handleCloseModal();
        }
    };

    if (!currentEvent) return null;

    return (
        <>
            <Modal show={show} onHide={handleCloseModal} dialogClassName='modal-wide'>
                <Modal.Header closeButton>
                    <Modal.Title>{currentEvent.description}</Modal.Title>
                </Modal.Header>
                {isOwnedEvent ? (
                    <OwnedEvent key={currentEvent.eventId} event={currentEvent} showInviteState={showInvite} />
                ) : (
                    <Event key={currentEvent.eventId} event={currentEvent} showInviteState={showInvite} />
                )}
                <Modal.Footer>
                    <ButtonGroup>
                        {isOwnedEvent === true ? <Button variant='primary'>Edit</Button> : null}
                        {isOwnedEvent === true ? (
                            <Button variant='danger' onClick={onDelete}>
                                Delete
                            </Button>
                        ) : null}
                        <Button variant='secondary' onClick={handleCloseModal}>
                            Close
                        </Button>
                    </ButtonGroup>
                </Modal.Footer>
            </Modal>
            <EventInvite showState={showInvite} event={currentEvent} owner={isOwnedEvent === true ? true : undefined} />
        </>
    );
};

export default EventDetails;
