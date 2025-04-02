import { apiGetInbox } from '@/api/endpoints/inbox';
import InboxItem from '@/components/inbox/InboxItem';
import ErrorModalContext from '@/contexts/ErrorModalContext';
import Notification from '@/types/objects/Notification/dto';
import User from '@/types/objects/User/dto';
import { useContext, useEffect, useState } from 'react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { Accordion, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

/**
 * InboxPage component displays the user's inbox notifications.
 * Redirects to the login page if the user is not authenticated.
 */
function InboxPage() {
    const navigate = useNavigate(); // Hook for navigation
    const authUser = useAuthUser<User>(); // Hook to get authenticated user details

    const [notifications, setNotifications] = useState<Notification[]>([]); // State to store notifications

    const { showErrorModal } = useContext(ErrorModalContext); // Context to display error modals

    /**
     * Fetches inbox notifications for the authenticated user.
     * Redirects to the login page if the user is not logged in.
     */
    useEffect(() => {
        const fetchData = async () => {
            if (!authUser?.userId) {
                // Redirect to login if user is not authenticated
                console.error('User is not logged in, redirecting to login page');
                navigate('/login');
                return <h2>User is not logged in</h2>;
            }
            try {
                // Fetch notifications from the API
                const response = await apiGetInbox({ userId: authUser.userId });
                setNotifications(response.data); // Update state with fetched notifications
            } catch (error: unknown) {
                // Handle API errors and display error modal
                if (error instanceof Error) {
                    showErrorModal(error.message);
                }
            }
        };
        fetchData();
    }, []); // Empty dependency array ensures this runs only once on component mount

    // Redirect to login if user is not authenticated (redundant check for safety)
    if (!authUser?.userId) {
        console.error('User is not logged in, redirecting to login page');
        navigate('/login');
        return <h2>User is not logged in</h2>;
    }

    return (
        <Container>
            <h1>Inbox</h1>
            <Accordion>
                {/* Render each notification as an InboxItem */}
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
