import EventMember from '@/types/objects/EventMember/dto';
import User from '@/types/objects/User/dto';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { Button, Col, ListGroup, Row } from 'react-bootstrap';
import ProfilePicture from '@/components/ProfilePicture';
import Rating from '../rating/Rating';
import EventInvite from './EventInvite';
import WMEvent from '@/types/objects/Event/dto';
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

/**
 * Component to display event members in either a vertical or horizontal layout.
 *
 * @param {Object} props - Component props.
 * @param {EventMember[]} props.members - List of event members.
 * @param {number} props.freeSeats - Number of free seats available.
 * @param {'horizontal' | 'vertical'} [props.direction] - Layout direction for the display.
 * @param {WMEvent} props.event - Event object containing event details.
 * @param {boolean} [props.owner=false] - Whether the current user is the event owner.
 * @returns {JSX.Element} The rendered component.
 */
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
    const authUser = useAuthUser<User>(); // Hook to get the authenticated user.
    const [show, setShow] = useState(false); // State for modal visibility.

    if (direction === 'vertical') {
        // Memoized vertical layout for better performance.
        const memoizedListGroup = useMemo(
            () => (
                <ListGroup>
                    {members.map((member) => (
                        <ListGroup.Item
                            key={member.memberId}
                            className={member.memberId === authUser?.userId ? 'eventOwner' : undefined}
                            as={Link}
                            to={`/profile/${member.user.username}`}
                        >
                            <Row>
                                <Col md='auto'>
                                    {/* Display profile picture with optional highlight for the current user */}
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
                                            {/* Display username and full name */}
                                            <div>
                                                <strong>{member.user.username}</strong>
                                                {` (${member.user.firstname} ${member.user.name})`}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md='auto'>
                                            {/* Display role as Pilot or Passenger */}
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
                                                {/* Display user rating */}
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
                            {/* Button to open the invite modal */}
                            <Button onClick={() => setShow(true)} variant='link'>
                                <span className='bi bi-person-add'> {owner ? 'Invite Person' : 'Request Invite'}</span>
                            </Button>
                        </ListGroup.Item>
                    )}
                </ListGroup>
            ),
            [members, freeSeats, authUser, owner, event], // Dependencies for memoization.
        );

        return (
            <>
                <h4>Members</h4>
                {memoizedListGroup}
                {/* Modal for inviting/requesting members */}
                <EventInvite event={event} showState={[show, setShow]} owner={owner} />
            </>
        );
    } else {
        // Memoized horizontal layout for better performance.
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
                            as={Link}
                            to={`/profile/${member.user.username}`}
                        >
                            {/* Display profile picture */}
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
                        // Render placeholders for free seats.
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
            [members, freeSeats, authUser], // Dependencies for memoization.
        );

        return <>{memoizedListGroup}</>;
    }
};

export default EventMemberDisplay;
