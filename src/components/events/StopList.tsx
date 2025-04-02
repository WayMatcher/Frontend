import Stop from '@/types/objects/Stop/dto';
import React, { useEffect } from 'react';
import { Alert, Button, ButtonGroup, ListGroup } from 'react-bootstrap';
import AddressAddModal from '@/components/address/AddressAddModal';
import Address from '@/types/objects/Address/dto';
import { Variant } from 'react-bootstrap/esm/types';
import InternationalAddressDisplay from '@/components/address/AddressDisplay';
import '@/components/_styles/StopList.scss';

/**
 * Displays a list of stops in a read-only format.
 * @param {Object} props - Component props.
 * @param {Stop[]} props.stopList - Array of stops to display.
 */
const StopListDisplay = ({ stopList }: { stopList: Stop[] }) => {
    return (
        <ListGroup>
            {stopList.map((stop: Stop, index: number) => (
                <>
                    <ListGroup.Item key={`stop-${index}`} eventKey={index}>
                        {/* Display stop sequence number and address */}
                        <strong>#{stop.stopSequenceNumber + 1}:</strong> {stop.address.street} {stop.address.postalcode}{' '}
                        ({stop.address.state}, {stop.address.city})
                    </ListGroup.Item>
                </>
            ))}
        </ListGroup>
    );
};

/**
 * Allows editing of a list of stops, including reordering, adding, and deleting stops.
 * @param {Object} props - Component props.
 * @param {[Stop[], React.Dispatch<React.SetStateAction<Stop[]>>]} props.stopListState - State tuple for the stop list.
 */
const StopListEdit = ({ stopListState }: { stopListState: [Stop[], React.Dispatch<React.SetStateAction<Stop[]>>] }) => {
    const [stops, setStops] = stopListState;
    const showAddressState = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState<string>('');
    const [address, setAddress] = React.useState<Address | null>(null);

    /**
     * Gets the index of a stop in the stop list.
     * @param {Stop} stop - The stop to find.
     * @returns {number} - The index of the stop.
     */
    const getIndexOfStop = (stop: Stop) => {
        return stops.indexOf(stop);
    };

    /**
     * Moves a stop up in the list.
     * @param {Stop} stop - The stop to move up.
     */
    const handleUp = (stop: Stop) => {
        const index = getIndexOfStop(stop);
        if (index > 0) {
            const listItems = document.querySelectorAll('.stop-list .list-group-item');
            const currentItem = listItems[index] as HTMLElement;
            const previousItem = listItems[index - 1] as HTMLElement;

            // Calculate heights for transform
            const currentHeight = currentItem.offsetHeight;
            const previousHeight = previousItem.offsetHeight;

            // Apply transform for animation
            currentItem.style.transform = `translateY(-${previousHeight}px)`;
            previousItem.style.transform = `translateY(${currentHeight}px)`;

            // Add animation class
            currentItem.classList.add('swap-animation');
            previousItem.classList.add('swap-animation');

            // Remove transform and animation class after animation ends
            setTimeout(() => {
                currentItem.style.transform = '';
                previousItem.style.transform = '';
                currentItem.classList.remove('swap-animation');
                previousItem.classList.remove('swap-animation');

                // Update stops after animation
                const newStops = [...stops];
                [newStops[index - 1], newStops[index]] = [newStops[index], newStops[index - 1]];
                newStops.forEach((s, i) => {
                    s.stopSequenceNumber = i; // Update sequence numbers
                });
                setStops(newStops);
            }, 300);
        }
    };

    /**
     * Moves a stop down in the list.
     * @param {Stop} stop - The stop to move down.
     */
    const handleDown = (stop: Stop) => {
        const index = getIndexOfStop(stop);
        if (index < stops.length - 1) {
            const listItems = document.querySelectorAll('.stop-list .list-group-item');
            const currentItem = listItems[index] as HTMLElement;
            const nextItem = listItems[index + 1] as HTMLElement;

            // Calculate heights for transform
            const currentHeight = currentItem.offsetHeight;
            const nextHeight = nextItem.offsetHeight;

            // Apply transform for animation
            currentItem.style.transform = `translateY(${nextHeight}px)`;
            nextItem.style.transform = `translateY(-${currentHeight}px)`;

            // Add animation class
            currentItem.classList.add('swap-animation');
            nextItem.classList.add('swap-animation');

            // Remove transform and animation class after animation ends
            setTimeout(() => {
                currentItem.style.transform = '';
                nextItem.style.transform = '';
                currentItem.classList.remove('swap-animation');
                nextItem.classList.remove('swap-animation');

                // Update stops after animation
                const newStops = [...stops];
                [newStops[index + 1], newStops[index]] = [newStops[index], newStops[index + 1]];
                newStops.forEach((s, i) => {
                    s.stopSequenceNumber = i; // Update sequence numbers
                });
                setStops(newStops);
            }, 300);
        }
    };

    // Add a new stop when an address is selected
    useEffect(() => {
        if (address) {
            setStops([
                ...stops,
                {
                    stopSequenceNumber: stops.length,
                    address: address,
                },
            ]);
        }
    }, [address]);

    /**
     * Opens the modal to add a new stop.
     */
    const handleNew = () => {
        setAddress(null);
        showAddressState[1](true);
    };

    /**
     * Deletes a stop from the list.
     * @param {Stop} stop - The stop to delete.
     */
    const handleDelete = (stop: Stop) => {
        setStops(stops.filter((s) => s !== stop));
    };

    return (
        <>
            <ListGroup className='stop-list'>
                {stops.map((stop: Stop) => {
                    /**
                     * Determines the badge color for a stop based on its position.
                     * @returns {Variant} - The badge color variant.
                     */
                    const assessBadgeColor = (): Variant => {
                        if (getIndexOfStop(stop) === 0) {
                            return 'primary'; // First stop
                        } else if (getIndexOfStop(stop) === stops.length - 1) {
                            return 'success'; // Last stop
                        } else {
                            return 'secondary'; // Intermediate stops
                        }
                    };

                    return (
                        <ListGroup.Item>
                            <span className={`bi bi-dot text-${assessBadgeColor()}`}></span>
                            <InternationalAddressDisplay address={stop.address} variant='compact' />
                            <ButtonGroup>
                                <Button variant='outline-danger' onClick={() => handleDelete(stop)}>
                                    <span className='bi bi-trash'></span>
                                </Button>
                                <Button
                                    variant='secondary'
                                    onClick={() => handleUp(stop)}
                                    disabled={getIndexOfStop(stop) === 0}
                                >
                                    <span className='bi bi-arrow-up-short'></span>
                                </Button>
                                <Button
                                    variant='secondary'
                                    onClick={() => handleDown(stop)}
                                    disabled={getIndexOfStop(stop) === stops.length - 1}
                                >
                                    <span className='bi bi-arrow-down-short'></span>
                                </Button>
                            </ButtonGroup>
                        </ListGroup.Item>
                    );
                })}
                <ListGroup.Item>
                    <ButtonGroup>
                        <Button onClick={handleNew}>
                            <span className={'bi bi-plus'}> Add new Stop</span>
                        </Button>
                    </ButtonGroup>
                    {alertMessage != '' && (
                        <Alert variant='danger' onClose={() => setAlertMessage('')}>
                            {alertMessage}
                        </Alert>
                    )}
                </ListGroup.Item>
            </ListGroup>
            <AddressAddModal showState={showAddressState} setAddress={setAddress} />
        </>
    );
};

/**
 * Main component for displaying or editing a stop list.
 * @param {Object} props - Component props.
 * @param {boolean} props.edit - Whether the list is in edit mode.
 * @param {[Stop[], React.Dispatch<React.SetStateAction<Stop[]>>]} props.stopListState - State tuple for the stop list.
 */
const StopList = ({
    edit,
    stopListState,
}: {
    edit: boolean;
    stopListState: [Stop[], React.Dispatch<React.SetStateAction<Stop[]>>];
}) => {
    return (
        <>{edit ? <StopListEdit stopListState={stopListState} /> : <StopListDisplay stopList={stopListState[0]} />}</>
    );
};

export default StopList;
