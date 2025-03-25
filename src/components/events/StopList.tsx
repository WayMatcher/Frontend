import Stop from '@/types/objects/Stop/dto';
import { ListGroup } from 'react-bootstrap';

const StopList = ({ stops }: { stops: Stop[] }) => {
    return (
        <ListGroup>
            {stops.map((stop: Stop) => (
                <>
                    <ListGroup.Item>
                        {stop.stopSequenceNumber} {stop.address.state} {stop.address.city} {stop.address.street}{' '}
                        {stop.address.postalcode}
                    </ListGroup.Item>
                </>
            ))}
        </ListGroup>
    );
};

export default StopList;
