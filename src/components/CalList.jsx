import React, { useContext, useState, useEffect } from 'react';
import CalendarContext from '../context/CalendarContext';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Trash as TrashIcon, Edit as EditIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';

const CalList = () => {
    const { events, getEvents, deleteEvent, updateEvent } = useContext(CalendarContext);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [editingEvent, setEditingEvent] = useState({
        id: "",
        name: "",
        description: "",
        category: "",
        date: ""
    });
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                await getEvents();
            } catch (error) {
                console.error("Failed to fetch events:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchEvents();
    }, [getEvents]);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredEvents(events);
        } else {
            setFilteredEvents(
                events.filter(event =>
                    event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    event.description.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        }
    }, [searchQuery, events]);

    const handleUpdateEvent = (event) => {
        setEditingEvent({ ...event });
        setIsDialogOpen(true);
    };

    const handleEditEvent = () => {
        updateEvent(editingEvent.id, editingEvent);
        setIsDialogOpen(false);
    };

    const handleDeleteEvent = (id) => {
        deleteEvent(id);
    };

    const onChange = (e) => {
        setEditingEvent({ ...editingEvent, [e.target.name]: e.target.value });
    };

    const handleCategoryChange = (value) => {
        setEditingEvent({ ...editingEvent, category: value });
    };

    const handleExpandDescription = (event) => {
        setSelectedEvent(event);
        setShowFullDescription(true);
    };

    return (
        <>
            <div className="mb-4 mt-8">
                <Input
                    type="text"
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2"
                />
            </div>
            <div className="space-y-4 mt-4">
                {isLoading ? (
                    <p>Loading events...</p>
                ) : filteredEvents.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredEvents.map((event) => (
                            <Card key={event.id} className="h-full flex flex-col shadow-md hover:shadow-lg transition-shadow duration-300">
                                <CardHeader className="flex-grow">
                                    <CardTitle className="text-2xl mb-2">{event.name}</CardTitle>
                                    <CardDescription className="text-base">
                                        {event.description.length > 100 ? (
                                            <>
                                                {event.description.slice(0, 100)}...
                                                <button onClick={() => handleExpandDescription(event)} className="text-blue-500">Read More</button>
                                            </>
                                        ) : (
                                            event.description
                                        )}
                                    </CardDescription>
                                    <p className="text-sm text-gray-500">{event.category}</p>
                                    <p className="text-sm text-gray-500">{event.date}</p>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex justify-between items-center">
                                        <div className="flex space-x-2">
                                            <Button variant="destructive" onClick={() => handleDeleteEvent(event.id)} className="p-2">
                                                <TrashIcon className="h-5 w-5" />
                                            </Button>
                                            <Button variant="outline" onClick={() => handleUpdateEvent(event)} className="p-2">
                                                <EditIcon className="h-5 w-5" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <p>No events to display</p>
                )}
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="bg-white text-black">
                    <DialogHeader>
                        <DialogTitle>Edit Event</DialogTitle>
                    </DialogHeader>
                    <form className="space-y-4">
                        <div>
                            <Label htmlFor="name">Event Name</Label>
                            <Input
                                type="text"
                                id="name"
                                name="name"
                                value={editingEvent.name}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={editingEvent.description}
                                onChange={onChange}
                                required
                                rows={8}
                                className="resize-y"
                            />
                        </div>
                        <div>
                            <Label htmlFor="category">Category</Label>
                            <Select
                                value={editingEvent.category}
                                onValueChange={handleCategoryChange}
                                required
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Work">Work</SelectItem>
                                    <SelectItem value="Personal">Personal</SelectItem>
                                    <SelectItem value="Birthdays">Birthdays</SelectItem>
                                    <SelectItem value="Anniversary">Anniversary</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="date">Date</Label>
                            <Input
                                type="date"
                                id="date"
                                name="date"
                                value={editingEvent.date}
                                onChange={onChange}
                                required
                            />
                        </div>
                    </form>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleEditEvent}>
                            Save Changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={showFullDescription} onOpenChange={() => setShowFullDescription(false)}>
                <DialogContent className="bg-white text-black">
                    <DialogHeader>
                        <DialogTitle>Description</DialogTitle>
                    </DialogHeader>
                    <p>{selectedEvent?.description}</p>
                    <DialogFooter>
                        <Button onClick={() => setShowFullDescription(false)}>
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default CalList;
