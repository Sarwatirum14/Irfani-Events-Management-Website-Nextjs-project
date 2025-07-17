"use client";

import { useState, useEffect } from 'react';

export default function BookingSystem() {
    const [view, setView] = useState('login');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        date: '',
        guests: '',
        eventType: '',
        location: '',
        description: ''
    });
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        setUsers(storedUsers);
        setBookings(storedBookings);
    }, []);

    const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value });

    const handleSignup = () => {
        if (!formData.name || !formData.email || !formData.password) return alert('All fields required.');
        if (!/^[A-Za-z\s]+$/.test(formData.name)) return alert('Name should contain only letters and spaces.');
        const exists = users.find(u => u.email === formData.email);
        if (exists) return alert('User already exists.');
        const newUser = { name: formData.name, email: formData.email, password: formData.password };
        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        alert('Signup successful! Please login.');
        resetForm();
        setView('login');
    };

    const handleLogin = () => {
        const user = users.find(u => u.email === formData.email && u.password === formData.password);
        if (!user) return alert('Invalid credentials or not signed up.');
        setCurrentUser(user);
        resetForm();
        setView('dashboard');
    };

    const handleLogout = () => {
        setCurrentUser(null);
        setView('login');
    };

    const handleBookingSubmit = async() => {
        const requiredFields = ['name', 'phone', 'date', 'guests', 'eventType', 'location'];
        const empty = requiredFields.some(field => !formData[field]);
        if (empty) return alert('Please fill all fields before submitting.');
        if (!/^[A-Za-z\s]+$/.test(formData.name)) return alert('Name should contain only letters and spaces.');
        if (!/^\d+$/.test(formData.phone)) return alert('Phone number should contain only digits.');

        const today = new Date().toISOString().split('T')[0];
        if (formData.date <= today) return alert('Please select a future date for booking.');

        const { _id, id, ...formDataWithoutId } = formData;
        const booking = {
            ...formDataWithoutId,
            email: currentUser.email,
            createdAt: new Date().toISOString()
        };

        try {
            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(booking)
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Failed to submit booking.');
            }

            const savedBooking = await res.json();
            const newBookings = [...bookings, savedBooking];
            setBookings(newBookings);
            localStorage.setItem('bookings', JSON.stringify(newBookings));
            alert('Booking submitted.');
            resetForm();
            setView('viewBookings');
        } catch (err) {
            console.error(err);
            alert(`Error: ${err.message}`);
        }
    };

    const handleBookingUpdate = () => {
        const updated = bookings.map(b => b.id === lastUserBooking().id ? {...b, ...formData } : b);
        setBookings(updated);
        localStorage.setItem('bookings', JSON.stringify(updated));
        alert('Booking updated.');
        setView('viewBookings');
    };

    const resetForm = () => setFormData({ name: '', email: '', password: '', phone: '', date: '', guests: '', eventType: '', location: '', description: '' });

    const userBookings = bookings.filter(b => b.email === currentUser ? .email);
    const lastUserBooking = () => userBookings[userBookings.length - 1];

    return ( <
        div className = "min-h-screen bg-[url('/back7.webp')] bg-cover bg-center flex items-center justify-center px-4 py-20" >
        <
        div className = "max-w-2xl bg-black/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl text-white space-y-8" > {
            view === 'login' && ( <
                >
                <
                h2 className = "text-3xl font-bold text-center" > Login < /h2> <
                input name = "email"
                placeholder = "Email"
                onChange = { handleChange }
                className = "bg-[#1a1a1a] border border-gray-600 p-3 w-full rounded" / >
                <
                input name = "password"
                type = "password"
                placeholder = "Password"
                onChange = { handleChange }
                className = "bg-[#1a1a1a] border border-gray-600 p-3 w-full rounded" / >
                <
                button onClick = { handleLogin }
                className = "bg-pink-500 hover:bg-pink-600 w-full py-2 rounded mt-2" > Login < /button> <
                p className = "text-sm text-center mt-4 text-gray-400" >
                Don & apos; t have an account ? { ' ' } <
                button onClick = {
                    () => setView('signup') }
                className = "text-pink-400 underline" > Sign Up < /button> <
                /p> <
                />
            )
        }

        {
            view === 'signup' && ( <
                >
                <
                h2 className = "text-3xl font-bold text-center" > Sign Up < /h2> <
                input name = "name"
                placeholder = "Name"
                onChange = { handleChange }
                className = "bg-[#1a1a1a] border border-gray-600 p-3 w-full rounded" / >
                <
                input name = "email"
                placeholder = "Email"
                onChange = { handleChange }
                className = "bg-[#1a1a1a] border border-gray-600 p-3 w-full rounded" / >
                <
                input name = "password"
                type = "password"
                placeholder = "Password"
                onChange = { handleChange }
                className = "bg-[#1a1a1a] border border-gray-600 p-3 w-full rounded" / >
                <
                button onClick = { handleSignup }
                className = "bg-yellow-500 hover:bg-yellow-600 w-full py-2 rounded mt-2" > Sign Up < /button> <
                p className = "text-sm text-center mt-4 text-gray-400" >
                Already have an account ? { ' ' } <
                button onClick = {
                    () => setView('login') }
                className = "text-pink-400 underline" > Login < /button> <
                /p> <
                />
            )
        }

        {
            view === 'dashboard' && ( <
                div >
                <
                h2 className = "text-3xl font-bold text-center" > Welcome, { currentUser ? .name } < /h2> <
                div className = "flex flex-col gap-4 mt-4" >
                <
                button onClick = {
                    () => setView('booking') }
                className = "bg-pink-500 hover:bg-pink-600 py-2 rounded" > Book an Event < /button> <
                button onClick = {
                    () => setView('viewBookings') }
                className = "bg-gray-700 hover:bg-gray-600 py-2 rounded" > See My Bookings < /button> <
                button onClick = { handleLogout }
                className = "bg-red-500 hover:bg-red-600 py-2 rounded" > Logout < /button> <
                /div> <
                /div>
            )
        }

        {
            view === 'booking' && ( <
                >
                <
                h2 className = "text-3xl font-bold text-center" > Booking Form < /h2> <
                input name = "name"
                placeholder = "Name"
                value = { formData.name }
                onChange = { handleChange }
                className = "bg-[#1a1a1a] border border-gray-600 p-3 w-full rounded mb-2" / >
                <
                input name = "phone"
                placeholder = "Phone"
                value = { formData.phone }
                onChange = { handleChange }
                className = "bg-[#1a1a1a] border border-gray-600 p-3 w-full rounded mb-2" / >
                <
                input type = "date"
                name = "date"
                min = { new Date().toISOString().split('T')[0] }
                value = { formData.date }
                onChange = { handleChange }
                className = "bg-[#1a1a1a] border border-gray-600 p-3 w-full rounded mb-2" /
                >
                <
                input name = "guests"
                type = "number"
                placeholder = "Guests"
                value = { formData.guests }
                onChange = { handleChange }
                className = "bg-[#1a1a1a] border border-gray-600 p-3 w-full rounded mb-2" / >
                <
                select name = "eventType"
                value = { formData.eventType }
                onChange = { handleChange }
                className = "bg-[#1a1a1a] border border-gray-600 p-3 w-full rounded mb-2" >
                <
                option value = "" > Select Event Type < /option> <
                option > Wedding < /option> <
                option > Birthday < /option> <
                option > Corporate < /option> <
                option > Anniversary < /option> <
                /select> <
                select name = "location"
                value = { formData.location }
                onChange = { handleChange }
                className = "bg-[#1a1a1a] border border-gray-600 p-3 w-full rounded mb-2" >
                <
                option value = "" > Select Location < /option> <
                option > Banquet Hall < /option> <
                option > Destination Wedding < /option> <
                option > Outdoor Garden < /option> <
                option > Home Setup < /option> <
                /select> <
                textarea name = "description"
                placeholder = "Description"
                value = { formData.description }
                onChange = { handleChange }
                className = "bg-[#1a1a1a] border border-gray-600 p-3 w-full rounded mb-2" / >
                <
                div className = "flex gap-4 mt-4" >
                <
                button onClick = { handleBookingSubmit }
                className = "bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded" > Submit < /button> <
                button onClick = {
                    () => setView('dashboard') }
                className = "bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded" > Back < /button> <
                /div> <
                />
            )
        }

        {
            view === 'viewBookings' && ( <
                >
                <
                h2 className = "text-3xl font-bold text-center" > Your Bookings < /h2> {
                    userBookings.length === 0 ? ( <
                        p className = "text-center text-gray-400" > No bookings yet. < /p>
                    ) : ( <
                        ul className = "space-y-4" > {
                            userBookings.map((b) => ( <
                                li key = { b.id }
                                className = "bg-[#3a3a3a] border border-gray-600 p-4 rounded" >
                                <
                                p className = "text-pink-300 font-semibold" > { b.eventType }
                                on { b.date }
                                at { b.location }(Guests: { b.guests }) < /p> <
                                p className = "mt-1 text-sm text-gray-300" > { b.description } < /p> {
                                    b.id === lastUserBooking() ? .id && ( <
                                        button onClick = {
                                            () => {
                                                setFormData(b);
                                                setView('booking');
                                            }
                                        }
                                        className = "mt-2 bg-yellow-500 hover:bg-yellow-600 px-4 py-1 rounded" > Update < /button>
                                    )
                                } <
                                /li>
                            ))
                        } <
                        /ul>
                    )
                } <
                button onClick = {
                    () => setView('dashboard') }
                className = "mt-4 bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded w-full" > Back < /button> <
                />
            )
        } <
        /div> <
        /div>
    );
}