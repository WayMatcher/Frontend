import { apiGetUserRating } from '@/api/endpoints/user';
import ErrorModalContext from '@/contexts/ErrorModalContext';
import { useContext, useEffect, useState } from 'react';
import LoadingOverlay from '@/components/LoadingOverlay';

const Rating = ({ userId }: { userId: number }) => {
    const { showErrorModal } = useContext(ErrorModalContext);
    const [rating, setRating] = useState<number>();
    const [loading, setLoading] = useState(false);

    const RenderStars = ({ rating }: { rating: number | undefined }) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (rating && rating >= i) {
                stars.push(<span key={`rating-${i}`} className='bi bi-star-fill'></span>);
            } else if (rating && rating > i - 1 && rating < i) {
                stars.push(<span key={`rating-${i}`} className='bi bi-star-half'></span>);
            } else {
                stars.push(<span key={`rating-${i}`} className='bi bi-star'></span>);
            }
        }
        return stars;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await apiGetUserRating({ userId: userId });
                setRating(response.data || 0);
                setLoading(false);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    showErrorModal(error.message);
                    throw error;
                } else {
                    console.error(error);
                    throw new Error('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
            const stars = document.querySelectorAll('.star');
            stars.forEach((star, index) => {
                if (rating && index < rating) {
                    star.classList.add('filled');
                } else {
                    star.classList.remove('filled');
                }
            });
        };
        fetchData();
    }, [userId]);

    return (
        <LoadingOverlay isLoading={loading}>
            <div className='flex items-center'>{rating && <RenderStars rating={rating} />}</div>
        </LoadingOverlay>
    );
};

export default Rating;
