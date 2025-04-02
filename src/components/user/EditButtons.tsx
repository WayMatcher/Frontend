import { Button, ButtonGroup } from 'react-bootstrap';

/**
 * EditButtons component renders a group of buttons for resetting and submitting a form.
 *
 * @param {Object} props - Component props.
 * @param {boolean} props.isSubmitting - Indicates if the form is currently being submitted.
 * @param {boolean} props.isLoading - Indicates if the form is in a loading state.
 * @returns {JSX.Element} A button group with reset and submit buttons.
 */
export default function EditButtons({ isSubmitting, isLoading }: { isSubmitting: boolean; isLoading: boolean }) {
    return (
        <ButtonGroup>
            {/* Reset button, disabled while the form is submitting */}
            <Button type='reset' disabled={isSubmitting} className='btn btn-secondary'>
                Reset
            </Button>
            {isLoading ? (
                // Submit button in loading state
                <Button type='submit' disabled={isLoading} className='btn btn-primary'>
                    Loading...
                </Button>
            ) : (
                // Submit button, shows "Saving..." if submitting, otherwise "Save"
                <Button type='submit' disabled={isSubmitting} className='btn btn-primary'>
                    {isSubmitting ? 'Saving...' : 'Save'}
                </Button>
            )}
        </ButtonGroup>
    );
}
