import EventMember from '@/types/objects/EventMember/dto';
import User from '@/types/objects/User/dto';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { Button, Col, ListGroup, Row } from 'react-bootstrap';
import ProfilePicture from '@/components/ProfilePicture';
import Rating from '../rating/Rating';
import EventInvite from './EventInvite';
import WMEvent from '@/types/objects/Event/dto';
import { useState, useMemo } from 'react';

const EventMemberDisplay = ({
    members,
    freeSeats,
    direction,
    event,
    owner = false,
}: {
    members: EventMember[];
    freeSeats: number;
    direction?: 'horizontal' | 'vertical';
    event: WMEvent;
    owner?: boolean;
}) => {
    const authUser = useAuthUser<User>();
    const [show, setShow] = useState(false); // State for modal visibility

    if (direction === 'vertical') {
        const memoizedListGroup = useMemo(
            () => (
                <ListGroup>
                    {members.map((member) => (
                        <ListGroup.Item
                            key={member.memberId}
                            className={member.memberId === authUser?.userId ? 'eventOwner' : undefined}
                        >
                            <Row>
                                <Col md='auto'>
                                    <ProfilePicture
                                        image={member.user.profilePicture}
                                        width={50}
                                        height={50}
                                        highlight={member.memberId === authUser?.userId}
                                    />
                                </Col>
                                <Col>
                                    <Row>
                                        <Col md='auto'>
                                            <div>
                                                <strong>{member.user.username}</strong>
                                                {` (${member.user.firstname} ${member.user.name})`}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md='auto'>
                                            <div>
                                                {member.eventRole === 1 ? (
                                                    <span className='bi bi-person-fill'>Pilot</span>
                                                ) : (
                                                    <span className='bi bi-person-fill'>Passenger</span>
                                                )}
                                            </div>
                                        </Col>
                                        {member.user.userId !== undefined && (
                                            <Col md='auto'>
                                                <Rating userId={member.user.userId} />
                                            </Col>
                                        )}
                                    </Row>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                    {authUser && (
                        <ListGroup.Item>
                            <Button
                                onClick={() => setShow(true)} // Open modal on button click
                                variant='link'
                            >
                                <span className='bi bi-person-add'> {owner ? 'Invite Person' : 'Request Invite'}</span>
                            </Button>
                        </ListGroup.Item>
                    )}
                </ListGroup>
            ),
            [members, freeSeats, authUser, owner, event],
        );

        return (
            <>
                <h4>Members</h4>
                {memoizedListGroup}
                <EventInvite event={event} showState={[show, setShow]} owner={owner} />
            </>
        );
    } else {
        const memoizedListGroup = useMemo(
            () => (
                <ListGroup
                    horizontal
                    style={{
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                    }}
                >
                    {members.map((member) => (
                        <ListGroup.Item
                            key={member.memberId}
                            className={member.memberId === authUser?.userId ? 'eventOwner' : undefined}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 50,
                                height: 50,
                            }}
                        >
                            <ProfilePicture
                                image={member.user.profilePicture}
                                width={30}
                                height={30}
                                highlight={member.memberId === authUser?.userId}
                            />
                        </ListGroup.Item>
                    ))}
                    {(() => {
                        const items = [];
                        for (let i = 0; i < freeSeats; i++) {
                            items.push(
                                <ListGroup.Item
                                    key={`seat-${i}`}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: 50,
                                        height: 50,
                                    }}
                                >
                                    <span className='bi bi-person-add'></span>
                                </ListGroup.Item>,
                            );
                        }
                        return items;
                    })()}
                </ListGroup>
            ),
            [members, freeSeats, authUser],
        );

        return <>{memoizedListGroup}</>;
    }
};

export default EventMemberDisplay;
