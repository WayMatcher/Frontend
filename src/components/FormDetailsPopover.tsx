import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

interface FormDetailsProps {
    text: string;
}

const popover = (props: FormDetailsProps) => (
    <Popover id='popover-basic'>
        <Popover.Header as='h3'>Form Notes</Popover.Header>
        <Popover.Body>{props.text}</Popover.Body>
    </Popover>
);

const FormDetails = (props: FormDetailsProps) => {
    return (
        <OverlayTrigger trigger='focus' placement='right' overlay={popover(props)}>
            <Button variant='success'>Form Notes</Button>
        </OverlayTrigger>
    );
};

export default FormDetails;
