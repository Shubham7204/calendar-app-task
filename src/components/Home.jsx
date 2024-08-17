import React, { useContext, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CalendarContext from '../context/CalendarContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

// Set up the localizer for the calendar
const localizer = momentLocalizer(moment);

const Home = () => {
    const { events } = useContext(CalendarContext);
    const [selectedEvent, setSelectedEvent] = useState(null);

    // Convert events to the format expected by react-big-calendar
    const calendarEvents = events.map(event => ({
        id: event.id,
        title: event.name,
        start: new Date(event.date),
        end: new Date(event.date),
        category: event.category,
    }));

    // Define color mapping for different event categories
    const eventStyleGetter = (event) => {
        let style = {
            backgroundColor: '#3174ad',
            borderRadius: '5px',
            opacity: 0.8,
            color: 'white',
            border: '0px',
            display: 'block'
        };

        switch(event.category) {
            case 'Work':
                style.backgroundColor = '#007bff';
                break;
            case 'Personal':
                style.backgroundColor = '#28a745';
                break;
            case 'Birthdays':
                style.backgroundColor = '#ffc107';
                break;
            case 'Anniversary':
                style.backgroundColor = '#dc3545';
                break;
            default:
                break;
        }

        return {
            style: style
        };
    };

    const handleSelectEvent = (event) => {
        setSelectedEvent(event);
    };

    const handleCloseDialog = () => {
        setSelectedEvent(null);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Calendar</h1>
            <Calendar
                localizer={localizer}
                events={calendarEvents}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                eventPropGetter={eventStyleGetter}
                onSelectEvent={handleSelectEvent}
            />

            <Dialog open={!!selectedEvent} onOpenChange={handleCloseDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{selectedEvent?.title}</DialogTitle>
                    </DialogHeader>
                    <div>
                        <p><strong>Category:</strong> {selectedEvent?.category}</p>
                        <p><strong>Date:</strong> {selectedEvent?.start.toLocaleDateString()}</p>
                        <p><strong>Description:</strong> {events.find(e => e.id === selectedEvent?.id)?.description}</p>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Home;