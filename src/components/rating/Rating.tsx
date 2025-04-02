import { apiGetUserRating } from '@/api/endpoints/user';
import ErrorModalContext from '@/contexts/ErrorModalContext';
import { useContext, useEffect, useState } from 'react';
import LoadingOverlay from '@/components/LoadingOverlay';

/**
 * Component to display a user's rating as a star-based visualization.
 * Fetches the rating from the API and handles loading and error states.
 *
 * @param {Object} props - Component props.
 * @param {number} props.userId - The ID of the user whose rating is to be displayed.
 */
const Rating = ({ userId }: { userId: number }) => {
    const { showErrorModal } = useContext(ErrorModalContext); // Context to show error modals.
    const [rating, setRating] = useState<number>(); // State to store the user's rating.
    const [loading, setLoading] = useState(false); // State to manage loading overlay visibility.

    /**
     * Sub-component to render star icons based on the rating value.
     *
     * @param {Object} props - Component props.
     * @param {number | undefined} props.rating - The rating value to render stars for.
     * @returns {JSX.Element[]} Array of JSX elements representing stars.
     */
    const RenderStars = ({ rating }: { rating: number | undefined }) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            // Full star for ratings >= current index.
            if (rating && rating >= i) {
                stars.push(<span key={`rating-${i}`} className='bi bi-star-fill'></span>);
            }
            // Half star for fractional ratings.
            else if (rating && rating > i - 1 && rating < i) {
                stars.push(<span key={`rating-${i}`} className='bi bi-star-half'></span>);
            }
            // Empty star for ratings < current index.
            else {
                stars.push(<span key={`rating-${i}`} className='bi bi-star'></span>);
            }
        }
        return stars;
    };

    useEffect(() => {
        /**
         * Fetches the user's rating from the API and updates the state.
         * Handles errors by showing an error modal.
         */
        const fetchData = async () => {
            try {
                setLoading(true); // Show loading overlay.
                const response = await apiGetUserRating({ userId: userId }); // API call to fetch rating.
                setRating(response.data || 0); // Update rating state.
                setLoading(false); // Hide loading overlay.
            } catch (error: unknown) {
                // Handle errors and show error modal.
                if (error instanceof Error) {
                    showErrorModal(error.message);
                    throw error;
                } else {
                    console.error(error);
                    throw new Error('An unknown error occurred');
                }
            } finally {
                setLoading(false); // Ensure loading overlay is hidden.
            }
        };
        fetchData();
    }, [userId]); // Re-run effect when userId changes.

    return (
        <LoadingOverlay isLoading={loading}>
            {/* Render stars only if rating is available */}
            <div className='flex items-center'>{rating && <RenderStars rating={rating} />}</div>
        </LoadingOverlay>
    );
};

export default Rating;
