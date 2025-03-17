import { Button, ButtonGroup } from "react-bootstrap";

export default function SaveButtons({ isSubmitting }: { isSubmitting: boolean }) {
    return (
        <ButtonGroup>
            <Button type="reset" disabled={isSubmitting} className="btn btn-secondary">Reset</Button>
            <Button type="submit" disabled={isSubmitting} className="btn btn-primary">
                {isSubmitting ? 'Saving...' : 'Save'}
            </Button>
        </ButtonGroup>
    );
}