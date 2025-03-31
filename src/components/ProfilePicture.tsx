import { Image } from 'react-bootstrap';
import '@/components/_styles/ProfilePicture.scss';

const ProfilePicture = ({
    image,
    width,
    height,
    inline = false,
}: {
    image?: Blob;
    width?: string | number;
    height?: string | number;
    highlight?: boolean;
    inline?: boolean;
}) => {
    const size = width || height;

    return (
        <Image
            src={image ? URL.createObjectURL(image) : 'https://api.ai-cats.net/v1/cat?size=1024&theme=all'}
            alt='Profile-Picture'
            width={size}
            height={size}
            className='profile-picture-image'
            style={{ display: inline ? 'inline-block' : 'block' }}
        />
    );
};

export default ProfilePicture;
