import EventMember from '@/types/objects/EventMember/dto';
import User from '@/types/objects/User/dto';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { ListGroup } from 'react-bootstrap';
import { Image } from 'react-bootstrap';

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
                        {member.user.profilepicture ? (
                            <Image src={URL.createObjectURL(member.user.profilepicture)} />
                        ) : (
                            member.user.username
                        )}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </>
    );
};

export default EventMemberDisplay;
