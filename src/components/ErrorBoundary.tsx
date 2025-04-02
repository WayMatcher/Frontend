import * as React from 'react';

interface ErrorBoundaryProps {
    fallback: React.ReactNode;
    children: React.ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

/**
 * A React component that acts as an error boundary to catch JavaScript errors
 * in its child component tree. It provides a fallback UI when an error occurs.
 *
 * @template ErrorBoundaryProps - The props type for the ErrorBoundary component.
 * @template ErrorBoundaryState - The state type for the ErrorBoundary component.
 *
 * @extends React.Component<ErrorBoundaryProps, ErrorBoundaryState>
 *
 * @remarks
 * This component uses React's error boundary lifecycle methods:
 * - `getDerivedStateFromError` to update the state when an error is caught.
 * - `componentDidCatch` to log error details.
 *
 * @example
 * ```tsx
 * <ErrorBoundary fallback={<div>Something went wrong.</div>}>
 *   <MyComponent />
 * </ErrorBoundary>
 * ```
 *
 * @property {React.ReactNode} fallback - The UI to display when an error occurs.
 * @property {React.ReactNode} children - The child components wrapped by the error boundary.
 */
export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): ErrorBoundaryState {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo): void {
        console.error(error, info.componentStack);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return this.props.fallback;
        }

        return this.props.children;
    }
}
