import EventMember from '@/types/objects/EventMember/dto';
import User from '@/types/objects/User/dto';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { ListGroup } from 'react-bootstrap';
import ProfilePicture from '@/components/ProfilePicture';

const EventMemberDisplay = ({ members, freeSeats }: { members: EventMember[]; freeSeats: number }) => {
    const authUser = useAuthUser<User>();
    return (
        <>
            <ListGroup horizontal>
                {members.map((member) => (
                    <ListGroup.Item
                        key={member.memberId}
                        className={member.memberId === authUser?.userId ? 'eventOwner' : undefined}
                    >
                        <ProfilePicture
                            image={member.user.profilepicture}
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
                            <ListGroup.Item key={`seat-${i}`}>
                                <span className='bi bi-person-add'></span>
                            </ListGroup.Item>,
                        );
                    }
                    return items;
                })()}
            </ListGroup>
        </>
    );
};

export default EventMemberDisplay;
