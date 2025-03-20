import React, { createContext, useState, ReactNode } from 'react';
import { EventContextProps } from '@/types/contexts/contexts';
import WMEvent from '@/types/objects/Event/dto';

const EventContext: React.Context<EventContextProps> = createContext<EventContextProps>({
    setCurrentEvent: () => {},
    currentEvent: null,
});

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentEvent, setCurrentEvent] = useState<WMEvent | null>(null);

    return (
        <EventContext.Provider
            value={{
                setCurrentEvent,
                currentEvent,
            }}
        >
            {children}
        </EventContext.Provider>
    );
};

export default EventContext;
