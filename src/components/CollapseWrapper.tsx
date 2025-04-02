import { useEffect, useState } from 'react';
import { Collapse } from 'react-bootstrap';

/**
 * CollapseWrapper is a component that wraps its children in a Bootstrap Collapse component.
 * It manages the "in" state of the Collapse internally using a fade effect.
 *
 * @param {Object} props - The props for the component.
 * @param {React.ReactElement} props.children - The child element to be wrapped by the Collapse.
 * @returns {JSX.Element} The rendered Collapse component.
 */
export default function CollapseWrapper({ children }: { children: React.ReactElement }) {
    // State to control the visibility of the Collapse component
    const [fade, setFade] = useState<boolean>(false);

    useEffect(() => {
        // Set fade to true when the component mounts
        setFade(true);

        // Cleanup function to reset fade to false when the component unmounts
        return () => {
            setFade(false);
        };
    }, []); // Empty dependency array ensures this runs only on mount and unmount

    // Render the Collapse component with the "in" prop controlled by the fade state
    return <Collapse in={fade}>{children}</Collapse>;
}
