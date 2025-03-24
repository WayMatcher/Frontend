import EventMember from '@/types/objects/EventMember/dto';
import User from '@/types/objects/User/dto';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { ListGroup } from 'react-bootstrap';

const EventMemberDisplay = ({ members }: { members: EventMember[] }) => {
    const authUser = useAuthUser<User>();
    return (
        <>
            <ListGroup horizontal>
                {members.map((member) => (
                    <ListGroup.Item
                        key={member.memberId}
                        active={member.memberId === authUser?.userId}
                        className={member.memberId === authUser?.userId ? 'eventOwner' : undefined}
                    >
                        ProfilePicture
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </>
    );
};

export default EventMemberDisplay;
