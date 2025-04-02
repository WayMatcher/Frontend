import { Button, Dropdown, DropdownButton, Form, Stack } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';

/**
 * SearchBar component allows users to search for events and reset the search input.
 * It also provides options for authenticated users to create new events.
 *
 * @param {Object} props - Component props.
 * @param {function(string): void} props.onSearch - Callback function triggered on search input change.
 * @param {function(): void} props.onReset - Callback function triggered on reset button click.
 */
export default function SearchBar({
    onSearch,
    onReset,
}: {
    onSearch: (searchTerm: string) => void;
    onReset: () => void;
}) {
    // State to manage the current search term
    const [searchTerm, setSearchTerm] = useState('');

    /**
     * Handles changes in the search input field.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} e - Input change event.
     */
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value); // Update the search term state
        onSearch(value); // Trigger the onSearch callback with the new value
    };

    /**
     * Resets the search input field and triggers the reset callbacks.
     */
    const handleReset = () => {
        setSearchTerm(''); // Clear the search term state
        onSearch(''); // Trigger the onSearch callback with an empty string
        onReset(); // Trigger the onReset callback
    };

    const navigate = useNavigate(); // Hook to navigate between routes
    const isAuthenticated = useIsAuthenticated(); // Hook to check if the user is authenticated

    return (
        <Stack direction='horizontal' gap={3} className='SearchBar'>
            {/* Show dropdown options for creating new events if the user is authenticated */}
            {isAuthenticated && (
                <DropdownButton title={' Create New Way'} drop='down'>
                    <Dropdown.Item onClick={() => navigate('/events/new/?ispilot=true')} eventKey='2'>
                        <span className='bi bi-car-front-fill'> New Pilot Way</span>
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => navigate('/events/new/?ispassenger=true')} eventKey='1'>
                        <span className='bi bi-person-fill'> New Passenger Way</span>
                    </Dropdown.Item>
                </DropdownButton>
            )}
            {/* Search input field */}
            <Form.Control
                className='me-auto'
                type='text'
                placeholder='Search for events'
                value={searchTerm}
                onChange={handleInputChange}
            />
            {/* Reset button */}
            <Button variant='outline-danger' onClick={handleReset}>
                Reset
            </Button>
        </Stack>
    );
}
