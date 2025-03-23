import { Button, ButtonGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function SaveButtons({ isSubmitting, isLoading }: { isSubmitting: boolean; isLoading: boolean }) {
    const navigate = useNavigate();

    return (
        <ButtonGroup>
            <Button variant={'outline-secondary'} onClick={() => navigate(-1)}>
                Back
            </Button>
            <Button type='reset' disabled={isSubmitting} className='btn btn-secondary'>
                Reset
            </Button>
            {isLoading ? (
                <Button type='submit' disabled={isLoading} className='btn btn-primary'>
                    Loading...
                </Button>
            ) : (
                <Button type='submit' disabled={isSubmitting} className='btn btn-primary'>
                    {isSubmitting ? 'Saving...' : 'Save'}
                </Button>
            )}
        </ButtonGroup>
    );
}
