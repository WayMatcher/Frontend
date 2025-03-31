import { MultiStopMap } from '../maps/MultiStopMap';
import { SingleAddressMap } from '../maps/SingleAddressMap';
import Stop from '@/types/objects/Stop/dto';

interface Props {
    stopList: Stop[];
    width: number;
    height: number;
}

function MapURL({ stopList, width, height }: Props) {
    return <MultiStopMap stopList={stopList} width={width} height={height} />;
}

export { SingleAddressMap };
export default MapURL;
