import 'react-big-calendar/lib/css/react-big-calendar.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CalendarState from './context/CalendarState';
import Header from './components/Header';
import Home from './components/Home';
import AddCal from './components/AddCal';
const App = () => {
    return (
        <CalendarState>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/add" element={<AddCal />} />
                </Routes>
            </Router>
        </CalendarState>
    );
};

export default App;
