import { Image } from 'react-bootstrap';
import '@/components/styles/ProfilePicture.scss';

const ProfilePicture = ({
    image,
    highlight,
    width,
    height,
}: {
    image?: Blob;
    width?: string | number;
    height?: string | number;
    highlight?: boolean;
}) => {
    const size = width || height;

    return (
        <div className='profile-picture'>
            <Image
                src={image ? URL.createObjectURL(image) : 'https://api.ai-cats.net/v1/cat?size=1024&theme=all'}
                alt='Profile-Picture'
                width={size}
                height={size}
                className={`profile-picture${highlight ? ' highlight' : undefined}`}
            />
        </div>
    );
};

export default ProfilePicture;
