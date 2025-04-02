import React from 'react';
import { Container, Spinner, ContainerProps } from 'react-bootstrap';
import '@/components/_styles/LoadingOverlay.scss';

/**
 * Props for the LoadingOverlay component.
 * @extends ContainerProps - Inherits all props from react-bootstrap's Container.
 * @property {boolean} isLoading - Determines whether the loading overlay is visible.
 * @property {React.ReactNode} children - The content to display inside the container.
 */
interface LoadingOverlayProps extends ContainerProps {
    isLoading: boolean;
    children: React.ReactNode;
}

/**
 * LoadingOverlay component displays a spinner overlay when `isLoading` is true.
 * It wraps its children inside a styled container.
 *
 * @param {LoadingOverlayProps} props - The props for the component.
 * @returns {JSX.Element} The rendered LoadingOverlay component.
 */
const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading, children, ...containerProps }) => {
    return (
        // Container wraps the entire component and applies custom styles.
        <Container className='loading-overlay-container' {...containerProps}>
            {/* Conditionally render the loading spinner overlay if isLoading is true */}
            {isLoading && (
                <div className='loading-overlay'>
                    <Spinner animation='border' role='status'>
                        {/* Screen-reader accessible text for the spinner */}
                        <span className='visually-hidden'>Loading...</span>
                    </Spinner>
                </div>
            )}
            {/* Render the children content passed to the component */}
            {children}
        </Container>
    );
};

export default LoadingOverlay;
