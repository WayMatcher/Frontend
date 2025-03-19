import { Button, Form, Stack } from 'react-bootstrap';
import { useState } from 'react';

export default function SearchBar({ onSearch }: { onSearch: (searchTerm: string) => void }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    const handleReset = () => {
        setSearchTerm('');
        onSearch('');
    };

    return (
        <Stack direction='horizontal' gap={3} className='SearchBar'>
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
