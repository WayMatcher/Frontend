import { Button, ButtonGroup } from 'react-bootstrap';

export default function SaveButtons({ isSubmitting, isLoading }: { isSubmitting: boolean; isLoading: boolean }) {
    return (
        <ButtonGroup>
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
