import { Container, Image } from 'react-bootstrap';

const ProfilePicture = ({
    image,
    ...dimensions
}: {
    image?: Blob;
    width?: string | number | undefined;
    height?: string | number | undefined;
}) => {
    dimensions.width = dimensions.width || dimensions.height;
    dimensions.height = dimensions.height || dimensions.width;

    return (
        <Container className='profile-picture'>
            {image ? (
                <Image
                    src={URL.createObjectURL(image)}
                    alt='Profile-Picture'
                    width={dimensions.width}
                    height={dimensions.height}
                />
            ) : (
                <Image
                    src={'https://api.ai-cats.net/v1/cat?size=1024&theme=all'}
                    alt='Profile-Picture'
                    width={dimensions.width}
                    height={dimensions.height}
                />
            )}
        </Container>
    );
};

export default ProfilePicture;
