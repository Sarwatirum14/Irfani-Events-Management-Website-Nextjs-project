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
            id: typeof crypto !== "undefined" ? crypto.randomUUID() : Math.random().toString(36).substr(2, 9),
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
            b.id === lastUserBooking() ? .id ? {...b, ...formData } : b
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

    // ✅ Renders based on view
    return ( <
        main style = {
            { padding: "2rem", fontFamily: "sans-serif" } } > {
            view === "login" && ( <
                >
                <
                h2 > Login < /h2> <
                input name = "email"
                placeholder = "Email"
                onChange = { handleChange }
                /> <
                input name = "password"
                placeholder = "Password"
                type = "password"
                onChange = { handleChange }
                /> <
                button onClick = { handleLogin } > Login < /button> <
                p >
                No account ? < button onClick = {
                    () => setView("signup") } > Sign up < /button> <
                /p> <
                />
            )
        }

        {
            view === "signup" && ( <
                >
                <
                h2 > Signup < /h2> <
                input name = "name"
                placeholder = "Name"
                onChange = { handleChange }
                /> <
                input name = "email"
                placeholder = "Email"
                onChange = { handleChange }
                /> <
                input name = "password"
                placeholder = "Password"
                type = "password"
                onChange = { handleChange }
                /> <
                button onClick = { handleSignup } > Sign Up < /button> <
                p >
                Already have an account ? { " " } <
                button onClick = {
                    () => setView("login") } > Login < /button> <
                /p> <
                />
            )
        }

        {
            view === "dashboard" && ( <
                >
                <
                h2 > Welcome, { currentUser ? .name } < /h2> <
                button onClick = {
                    () => setView("book") } > Book Event < /button> <
                button onClick = {
                    () => setView("viewBookings") } > View My Bookings < /button> <
                button onClick = { handleLogout } > Logout < /button> <
                />
            )
        }

        {
            view === "book" && ( <
                >
                <
                h2 > Book Your Event < /h2> <
                input name = "name"
                placeholder = "Name"
                onChange = { handleChange }
                /> <
                input name = "phone"
                placeholder = "Phone"
                onChange = { handleChange }
                /> <
                input name = "date"
                type = "date"
                onChange = { handleChange }
                /> <
                input name = "guests"
                placeholder = "Guests"
                onChange = { handleChange }
                /> <
                input name = "eventType"
                placeholder = "Event Type"
                onChange = { handleChange }
                /> <
                input name = "location"
                placeholder = "Location"
                onChange = { handleChange }
                /> <
                textarea name = "description"
                placeholder = "Description"
                onChange = { handleChange }
                /> <
                button onClick = { handleBookingSubmit } > Submit Booking < /button> <
                button onClick = {
                    () => setView("dashboard") } > Back < /button> <
                />
            )
        }

        {
            view === "viewBookings" && ( <
                >
                <
                h2 > My Bookings < /h2> {
                    userBookings.length === 0 ? ( <
                        p > No bookings yet. < /p>
                    ) : (
                        userBookings.map((b) => ( <
                            div key = { b.id }
                            style = {
                                { border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" } } >
                            <
                            p > < strong > Date: < /strong> {b.date}</p >
                            <
                            p > < strong > Guests: < /strong> {b.guests}</p >
                            <
                            p > < strong > Type: < /strong> {b.eventType}</p >
                            <
                            p > < strong > Location: < /strong> {b.location}</p >
                            <
                            p > < strong > Description: < /strong> {b.description}</p >
                            <
                            /div>
                        ))
                    )
                } <
                button onClick = {
                    () => setView("dashboard") } > Back < /button> {
                    userBookings.length > 0 && ( <
                        button onClick = {
                            () => {
                                const booking = lastUserBooking();
                                setFormData(booking);
                                setView("editBooking");
                            }
                        } > Edit Last Booking < /button>
                    )
                } <
                />
            )
        }

        {
            view === "editBooking" && ( <
                >
                <
                h2 > Edit Last Booking < /h2> <
                input name = "name"
                value = { formData.name }
                onChange = { handleChange }
                /> <
                input name = "phone"
                value = { formData.phone }
                onChange = { handleChange }
                /> <
                input name = "date"
                value = { formData.date }
                onChange = { handleChange }
                /> <
                input name = "guests"
                value = { formData.guests }
                onChange = { handleChange }
                /> <
                input name = "eventType"
                value = { formData.eventType }
                onChange = { handleChange }
                /> <
                input name = "location"
                value = { formData.location }
                onChange = { handleChange }
                /> <
                textarea name = "description"
                value = { formData.description }
                onChange = { handleChange }
                /> <
                button onClick = { handleBookingUpdate } > Update Booking < /button> <
                button onClick = {
                    () => setView("viewBookings") } > Cancel < /button> <
                />
            )
        } <
        /main>
    );
}