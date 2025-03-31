import React from 'react';
import { Container, Spinner, ContainerProps } from 'react-bootstrap';
import '@/components/_styles/LoadingOverlay.scss';

interface LoadingOverlayProps extends ContainerProps {
    isLoading: boolean;
    children: React.ReactNode;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading, children, ...containerProps }) => {
    return (
        <Container className='loading-overlay-container' {...containerProps}>
            {isLoading && (
                <div className='loading-overlay'>
                    <Spinner animation='border' role='status'>
                        <span className='visually-hidden'>Loading...</span>
                    </Spinner>
                </div>
            )}
            {children}
        </Container>
    );
};

export default LoadingOverlay;
