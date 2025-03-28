import { apiGetInbox } from '@/api/endpoints/inbox';
import InboxItem from '@/components/inbox/InboxItem';
import ErrorModalContext from '@/contexts/ErrorModalContext';
import Notification from '@/types/objects/Notification/dto';
import User from '@/types/objects/User/dto';
import { useContext, useEffect, useState } from 'react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { Accordion, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function InboxPage() {
    const navigate = useNavigate();
    const authUser = useAuthUser<User>();

    const [notifications, setNotifications] = useState<Notification[]>([]);

    const { showErrorModal } = useContext(ErrorModalContext);

    useEffect(() => {
        const fetchData = async () => {
            if (!authUser?.userId) {
                console.log('User is not logged in, redirecting to login page');
                navigate('/login');
                return <h2>User is not logged in</h2>;
            }
            try {
                const response = await apiGetInbox({ userId: authUser.userId });
                setNotifications(response.data);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    showErrorModal(error.message);
                }
            }
        };
        fetchData();
    }, []);

    if (!authUser?.userId) {
        console.log('User is not logged in, redirecting to login page');
        navigate('/login');
        return <h2>User is not logged in</h2>;
    }

    return (
        <Container>
            <h1>Inbox</h1>
            <Accordion>
                {notifications.map((notification: Notification) => {
                    return (
                        <InboxItem notification={notification} notificationState={[notifications, setNotifications]} />
                    );
                })}
            </Accordion>
        </Container>
    );
}

export default InboxPage;
