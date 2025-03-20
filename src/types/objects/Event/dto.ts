import Stop from '@/types/objects/Stop/dto';

export default interface WMEvent {
    id: number;
    created_by: number;
    title: string;
    description?: string;
    start_time: string;
    stops: Stop[];
    image?: string;
    status: string;
    created_at: string;
    updated_at: string;
}
