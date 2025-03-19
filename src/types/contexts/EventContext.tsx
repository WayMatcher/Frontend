import React, { createContext, useState, ReactNode } from 'react';
import { EventContextProps } from '@/types/contexts';
import WMEvent from '@/types/Event/dto';

const EventContext: React.Context<EventContextProps> = createContext<EventContextProps>({
    currentEvent: null,
    setCurrentEvent: () => {},
});

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentEvent, setCurrentEvent] = useState<WMEvent | null>(null);

    return <EventContext.Provider value={{ currentEvent, setCurrentEvent }}>{children}</EventContext.Provider>;
};

export default EventContext;
