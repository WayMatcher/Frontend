import Notification from '@/types/objects/Notification/dto';

const InboxItem = ({ notification }: { notification: Notification }) => {
    return (
        <div key={notification.notificationID}>
            <h2>{notification.message}</h2>
        </div>
    );
};

export default InboxItem;
