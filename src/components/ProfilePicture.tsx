import { Image } from 'react-bootstrap';
import '@/components/_styles/ProfilePicture.scss';

/**
 * ProfilePicture component renders a profile picture with customizable size and style.
 *
 * @param {Object} props - Component props.
 * @param {Blob} [props.image] - The image blob to display. If not provided, a placeholder image is used.
 * @param {string | number} [props.width] - The width of the image. If not provided, height is used for size.
 * @param {string | number} [props.height] - The height of the image. If not provided, width is used for size.
 * @param {boolean} [props.inline=false] - Whether the image should be displayed inline or as a block element.
 * @param {boolean} [props.highlight] - (Unused) Indicates if the profile picture should be highlighted.
 * @returns {JSX.Element} The rendered profile picture component.
 */
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
    // Determine the size of the image. If width is not provided, use height.
    const size = width || height;

    return (
        <Image
            // Use the provided image blob or a placeholder image URL.
            src={image ? URL.createObjectURL(image) : 'https://api.ai-cats.net/v1/cat?size=1024&theme=all'}
            alt='Profile-Picture' // Accessible alt text for the image.
            width={size} // Set the width of the image.
            height={size} // Set the height of the image.
            className='profile-picture-image' // Apply custom styles from the SCSS file.
            style={{ display: inline ? 'inline-block' : 'block' }} // Conditionally set display style.
        />
    );
};

export default ProfilePicture;
