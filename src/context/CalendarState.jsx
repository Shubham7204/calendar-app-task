import React, { useState, useEffect } from 'react';
import CalendarContext from './CalendarContext';

const CalendarState = (props) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load events from localStorage
    const loadEvents = () => {
        const eventsData = localStorage.getItem('events');
        if (eventsData) {
            setEvents(JSON.parse(eventsData));
        }
        setLoading(false);
    };

    useEffect(() => {
        loadEvents();
    }, []);

    const saveEvents = (events) => {
        localStorage.setItem('events', JSON.stringify(events));
    };

    const addEvent = (event) => {
        const newEvent = { ...event, id: Date.now().toString() };
        const updatedEvents = [...events, newEvent];
        setEvents(updatedEvents);
        saveEvents(updatedEvents);
    };

    const updateEvent = (id, updatedEvent) => {
        const updatedEvents = events.map(event =>
            event.id === id ? { ...event, ...updatedEvent } : event
        );
        setEvents(updatedEvents);
        saveEvents(updatedEvents);
    };

    const deleteEvent = (id) => {
        const updatedEvents = events.filter(event => event.id !== id);
        setEvents(updatedEvents);
        saveEvents(updatedEvents);
    };

    const getEvents = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(events);
            }, 100);
        });
    };

    return (
        <CalendarContext.Provider value={{ events, loading, addEvent, updateEvent, deleteEvent, getEvents }}>
            {props.children}
        </CalendarContext.Provider>
    );
};

export default CalendarState;