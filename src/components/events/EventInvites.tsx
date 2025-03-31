import User from '@/types/objects/User/dto';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { Col, ListGroup, Row } from 'react-bootstrap';
import ProfilePicture from '@/components/ProfilePicture';
import Rating from '../rating/Rating';
import WMEvent from '@/types/objects/Event/dto';
import { useContext, useEffect, useState } from 'react';
import ErrorModalContext from '@/contexts/ErrorModalContext';
import { apiGetInviteList } from '@/api/endpoints/invite';
import { Invite } from '@/types/objects/Invite/dto';
import Placeholder from 'react-bootstrap/Placeholder';

const EventInvites = ({ event, owner = false }: { event: WMEvent; owner?: boolean }) => {
    const [invites, setInvites] = useState<Invite[]>([]);

    const { showErrorModal } = useContext(ErrorModalContext);

    const [loading, setLoading] = useState(false);
    const authUser = useAuthUser<User>();

    useEffect(() => {
        const fetchInvites = async () => {
            if (event.eventId) {
                try {
                    setLoading(true);
                    const response = await apiGetInviteList({ eventId: event.eventId });
                    setInvites(response.data);
                } catch (error: unknown) {
                    if (error instanceof Error) {
                        showErrorModal(error.message);
                        throw error;
                    } else {
                        console.error(error);
                        throw new Error('An unknown error occurred');
                    }
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchInvites();
    }, [event, invites]);

    if (!owner) {
        return <></>;
    }

    if (loading) {
        return (
            <>
                <h4>Invites</h4>
                <ListGroup>
                    {[...Array(3)].map((_, index) => (
                        <ListGroup.Item key={index}>
                            <Row>
                                <Col md='auto'>
                                    <Placeholder as='div' animation='glow'>
                                        <Placeholder style={{ width: 50, height: 50 }} />
                                    </Placeholder>
                                </Col>
                                <Col>
                                    <Row>
                                        <Col md='auto'>
                                            <Placeholder as='div' animation='glow'>
                                                <Placeholder xs={6} />
                                            </Placeholder>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md='auto'>
                                            <Placeholder as='div' animation='glow'>
                                                <Placeholder xs={4} />
                                            </Placeholder>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </>
        );
    }

    if (invites.length === 0) {
        return (
            <>
                <h4>Invites</h4>
                <p>No invites found.</p>
            </>
        );
    }
    return (
        <>
            <h4>Invites</h4>
            <ListGroup>
                {invites.map((invite) => {
                    if (invite.user?.userId) {
                        return (
                            <ListGroup.Item key={invite.user?.userId} active={invite.user?.userId === authUser?.userId}>
                                <Row>
                                    <Col md='auto'>
                                        <ProfilePicture image={invite.user?.profilePicture} width={50} height={50} />
                                    </Col>
                                    <Col>
                                        <Row>
                                            <Col md='auto'>
                                                <div>
                                                    <strong>{invite.user?.username}</strong>
                                                    {` (${invite.user?.firstname} ${invite.user?.name})`}
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md='auto'>
                                                <div>
                                                    {invite.eventRole === 1 ? (
                                                        <span className='bi bi-person-fill'>Pilot</span>
                                                    ) : (
                                                        <span className='bi bi-person-fill'>Passenger</span>
                                                    )}
                                                </div>
                                            </Col>
                                            {invite.user?.userId !== undefined && (
                                                <Col md='auto'>
                                                    <Rating userId={invite.user?.userId} />
                                                </Col>
                                            )}
                                        </Row>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        );
                    } else {
                        return null;
                    }
                })}
            </ListGroup>
        </>
    );
};

export default EventInvites;
