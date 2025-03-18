import { Spinner } from "react-bootstrap";

interface LoadingProps {
    loading: boolean;
    children?: React.ReactNode;
}

export default function Loading({ loading, children }: LoadingProps) {
    return (
        <>
            {(loading) ? children : <Spinner animation="border" role="status" />}
        </>
    );

}