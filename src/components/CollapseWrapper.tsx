import { useEffect, useState } from 'react';
import { Collapse } from 'react-bootstrap';

export default function CollapseWrapper({ children }: { children: React.ReactElement }) {
    const [fade, setFade] = useState<boolean>(false);

    useEffect(() => {
        setFade(true);
        return () => {
            setFade(false);
        };
    }, []);

    return <Collapse in={fade}>{children}</Collapse>;
}
