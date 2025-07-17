"use client";

import { useState, useEffect } from "react";

export default function BookingSystem() {
    const [view, setView] = useState("login");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        date: "",
        guests: "",
        eventType: "",
        location: "",
        description: ""
    });

    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
            const storedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
            setUsers(storedUsers);
            setBookings(storedBookings);
        }
    }, []);

    const handleChange = (e) =>
        setFormData({...formData, [e.target.name]: e.target.value });

    const handleSignup = () => {
        if (!formData.name || !formData.email || !formData.password)
            return alert("All fields required.");
        if (!/^[A-Za-z\s]+$/.test(formData.name))
            return alert("Name should contain only letters and spaces.");
        const exists = users.find((u) => u.email === formData.email);
        if (exists) return alert("User already exists.");
        const newUser = {
            name: formData.name,
            email: formData.email,
            password: formData.password
        };
        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        alert("Signup successful! Please login.");
        resetForm();
        setView("login");
    };

    const handleLogin = () => {
        const user = users.find(
            (u) => u.email === formData.email && u.password === formData.password
        );
        if (!user) return alert("Invalid credentials or not signed up.");
        setCurrentUser(user);
        resetForm();
        setView("dashboard");
    };

    const handleLogout = () => {
        setCurrentUser(null);
        setView("login");
    };

    const handleBookingSubmit = async() => {
        const requiredFields = [
            "name",
            "phone",
            "date",
            "guests",
            "eventType",
            "location"
        ];
        const empty = requiredFields.some((field) => !formData[field]);
        if (empty) return alert("Please fill all fields before submitting.");
        if (!/^[A-Za-z\s]+$/.test(formData.name))
            return alert("Name should contain only letters and spaces.");
        if (!/^\d+$/.test(formData.phone))
            return alert("Phone number should contain only digits.");

        const today = new Date().toISOString().split("T")[0];
        if (formData.date <= today)
            return alert("Please select a future date for booking.");

        const booking = {
            ...formData,
            id: crypto.randomUUID(),
            email: currentUser.email,
            createdAt: new Date().toISOString()
        };

        try {
            const res = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(booking)
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Failed to submit booking.");
            }

            const savedBooking = await res.json();
            const newBookings = [...bookings, savedBooking];
            setBookings(newBookings);
            localStorage.setItem("bookings", JSON.stringify(newBookings));
            alert("Booking submitted.");
            resetForm();
            setView("viewBookings");
        } catch (err) {
            console.error(err);
            alert(`Error: ${err.message}`);
        }
    };

    const handleBookingUpdate = () => {
        const updated = bookings.map((b) =>
            b.id === lastUserBooking().id ? {...b, ...formData } : b
        );
        setBookings(updated);
        localStorage.setItem("bookings", JSON.stringify(updated));
        alert("Booking updated.");
        setView("viewBookings");
    };

    const resetForm = () =>
        setFormData({
            name: "",
            email: "",
            password: "",
            phone: "",
            date: "",
            guests: "",
            eventType: "",
            location: "",
            description: ""
        });

    const userBookings = bookings.filter((b) => b.email === currentUser ? .email);
    const lastUserBooking = () => userBookings[userBookings.length - 1];

}