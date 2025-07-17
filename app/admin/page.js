'use client';

import { useEffect, useState } from 'react';

export default function BookingPage() {
    const [bookings, setBookings] = useState([]);
    const [adminLoggedIn, setAdminLoggedIn] = useState(false);
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    useEffect(() => {
        const storedLogin = localStorage.getItem('adminLoggedIn');
        if (storedLogin === 'true') {
            setAdminLoggedIn(true);
            fetchBookings();
        }
    }, []);

    const fetchBookings = async() => {
        try {
            const res = await fetch('/api/bookings');
            if (!res.ok) throw new Error('Failed to fetch bookings');
            const data = await res.json();
            setBookings(data);
        } catch (err) {
            console.error('Error fetching bookings:', err);
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const { email, password } = credentials;
        if (email === 'admin@event.com' && password === 'admin123') {
            setAdminLoggedIn(true);
            localStorage.setItem('adminLoggedIn', 'true');
            fetchBookings();
        } else {
            alert('Invalid admin credentials');
        }
    };

    const handleLogout = () => {
        setAdminLoggedIn(false);
        localStorage.removeItem('adminLoggedIn');
        window.location.reload();
    };

    const handleDelete = async(id) => {
        try {
            const res = await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setBookings((prev) => prev.filter((b) => b._id !== id));
            } else {
                alert('Failed to delete booking.');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleAccept = (id) => {
        const updated = bookings.map((b) =>
            b._id === id ? {...b, accepted: true } : b
        );
        setBookings(updated);
    };

    if (!adminLoggedIn) {
        return ( <
            div className = "min-h-screen bg-[url('/back13.jpg')] bg-cover bg-center flex items-center justify-center px-4 py-20" >
            <
            form onSubmit = { handleLogin }
            className = "max-w-2xl w-full bg-black/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl text-white space-y-6" >
            <
            h2 className = "text-xl font-bold text-center" > Admin Login < /h2> <
            input type = "email"
            placeholder = "Email"
            required value = { credentials.email }
            onChange = {
                (e) =>
                setCredentials({...credentials, email: e.target.value })
            }
            className = "w-full bg-[#1a1a1a] text-white border border-gray-600 p-3 rounded" /
            >
            <
            input type = "password"
            placeholder = "Password"
            required value = { credentials.password }
            onChange = {
                (e) =>
                setCredentials({...credentials, password: e.target.value })
            }
            className = "w-full bg-[#1a1a1a] text-white border border-gray-600 p-3 rounded" /
            >
            <
            button type = "submit"
            className = "w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600" >
            Login <
            /button> <
            /form> <
            /div>
        );
    }

    return ( <
        div className = "min-h-screen bg-[url('/back14.avif')] text-white bg-cover bg-center flex items-center justify-center px-4 py-20" >
        <
        div className = "w-full max-w-4xl bg-black/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl space-y-8" >
        <
        div className = "flex flex-col sm:flex-row justify-between items-center border-b border-gray-600 pb-4" >
        <
        h1 className = "text-3xl font-extrabold text-center sm:text-left" >
        Admin - All Bookings <
        /h1> <
        button onClick = { handleLogout }
        className = "mt-4 sm:mt-0 bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg" >
        Logout <
        /button> <
        /div>

        {
            bookings.length === 0 ? ( <
                p className = "text-center text-gray-400 mt-6 text-lg" >
                No bookings available. <
                /p>
            ) : ( <
                ul className = "space-y-6" > {
                    bookings.map((booking) => ( <
                        li key = { booking._id }
                        className = "bg-[#2c2c2c] border border-gray-700 p-6 rounded-xl shadow" >
                        <
                        div className = "mb-2" >
                        <
                        p className = "text-lg font-semibold text-pink-400" > { booking.name } | { booking.date } | { booking.eventType } <
                        /p> <
                        p className = "text-sm text-gray-300" >
                        Email: { booking.email } <
                        /p> <
                        p className = "text-sm text-gray-300" >
                        Phone: { booking.phone } <
                        /p> <
                        p className = "text-sm text-gray-300" >
                        Guests: { booking.guests } | Location: { booking.location } <
                        /p> <
                        /div> <
                        p className = "text-sm text-gray-400 mt-2" > { booking.description } <
                        /p>

                        {
                            booking.accepted && ( <
                                p className = "mt-2 text-green-400 font-semibold" >
                                Status: Accepted <
                                /p>
                            )
                        }

                        <
                        div className = "mt-4 flex gap-4 justify-end" > {!booking.accepted && ( <
                                button onClick = {
                                    () => handleAccept(booking._id) }
                                className = "bg-green-600 hover:bg-green-700 px-4 py-2 rounded" >
                                Accept <
                                /button>
                            )
                        } <
                        button onClick = {
                            () => handleDelete(booking._id) }
                        className = "bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded" >
                        Delete <
                        /button> <
                        /div> <
                        /li>
                    ))
                } <
                /ul>
            )
        } <
        /div> <
        /div>
    );
}