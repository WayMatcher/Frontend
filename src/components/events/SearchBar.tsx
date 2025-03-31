import { Button, Dropdown, DropdownButton, Form, Stack } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar({
    onSearch,
    onReset,
}: {
    onSearch: (searchTerm: string) => void;
    onReset: () => void;
}) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    const handleReset = () => {
        setSearchTerm('');
        onSearch('');
        onReset();
    };

    const navigate = useNavigate();

    return (
        <Stack direction='horizontal' gap={3} className='SearchBar'>
            <DropdownButton title={' Create New Way'} drop='down'>
                <Dropdown.Item onClick={() => navigate('/events/new/?ispilot=true')} eventKey='2'>
                    <span className='bi bi-car-front-fill'> New Pilot Way</span>
                </Dropdown.Item>
                <Dropdown.Item onClick={() => navigate('/events/new/?ispassenger=true')} eventKey='1'>
                    <span className='bi bi-person-fill'> New Passenger Way</span>
                </Dropdown.Item>
            </DropdownButton>
            <Form.Control
                className='me-auto'
                type='text'
                placeholder='Search for events'
                value={searchTerm}
                onChange={handleInputChange}
            />
            <Button variant='outline-danger' onClick={handleReset}>
                Reset
            </Button>
        </Stack>
    );
}
