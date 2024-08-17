import React, { useState, useContext } from 'react';
import CalendarContext from '../context/CalendarContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';
import CalList from './CalList';

const AddCal = () => {
    const { addEvent } = useContext(CalendarContext);
    const [event, setEvent] = useState({
        name: '',
        description: '',
        category: '',
        date: ''
    });

    const handleChange = (e) => {
        setEvent({ ...event, [e.target.name]: e.target.value });
    };

    const handleCategoryChange = (value) => {
        setEvent({ ...event, category: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addEvent(event);
        setEvent({ name: '', description: '', category: '', date: '' });
    };

    return (
        <div className="p-6 space-y-6">
            <Card className="shadow-md rounded-lg">
                <CardHeader className="rounded-t-lg">
                    <CardTitle className="text-2xl font-bold">Add an Event</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1">
                            <Label htmlFor="name" className="text-md font-semibold">Event Name</Label>
                            <Input
                                id="name"
                                name="name"
                                value={event.name}
                                onChange={handleChange}
                                required
                                placeholder="Enter event name"
                                className="w-full p-2 text-md"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="description" className="text-md font-semibold">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={event.description}
                                onChange={handleChange}
                                required
                                placeholder="Enter event description"
                                rows={4}
                                className="w-full p-2 text-md"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="category" className="text-md font-semibold">Category</Label>
                            <Select
                                value={event.category}
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
                        <div className="space-y-1">
                            <Label htmlFor="date" className="text-md font-semibold">Date</Label>
                            <Input
                                id="date"
                                name="date"
                                type="date"
                                value={event.date}
                                onChange={handleChange}
                                required
                                className="w-full p-2 text-md"
                            />
                        </div>
                        <div className='flex justify-center'>
                            <Button
                                className="text-md py-2 w-36"
                                type="submit"
                            >
                                Add Event
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <div>
                <CalList />
            </div>
        </div>
    );
};

export default AddCal;