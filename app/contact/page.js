'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });

    function handleChange(e) {
        setForm({...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        alert('Thank you for reaching out!');
        setForm({ name: '', email: '', message: '' });
    }

    return ( <
        div >
        <
        header className = "text-white bg-[url('/about.jpg')] bg-cover bg-center h-[700px] w-full" >
        <
        div className = "flex flex-col items-center justify-center h-[calc(100%-64px)] text-center mt-[-40px]" >
        <
        h1 className = "text-5xl font-bold" > Contact IRFANI Events < /h1> <
        /div> <
        /header>

        <
        section className = "flex flex-col md:flex-row justify-between p-10 bg-black text-white" >
        <
        div className = "md:w-1/2 p-5 justify-center mt-20" >
        <
        h2 className = "text-2xl font-semibold mb-4" > Request Form < /h2> <
        form onSubmit = { handleSubmit }
        className = "space-y-4" >
        <
        input name = "name"
        value = { form.name }
        onChange = { handleChange }
        placeholder = "Your Name"
        className = "w-full p-2 border rounded"
        required /
        >
        <
        input name = "email"
        value = { form.email }
        onChange = { handleChange }
        placeholder = "Your Email"
        type = "email"
        className = "w-full p-2 border rounded"
        required /
        >
        <
        textarea name = "message"
        value = { form.message }
        onChange = { handleChange }
        placeholder = "Your Message"
        className = "w-full p-2 border rounded"
        rows = "4"
        required /
        >
        <
        button type = "submit"
        className = "bg-secondary border-2 border-white text-white px-4 py-2 rounded" >
        Send Message <
        /button> <
        /form> <
        /div>

        <
        div className = "relative md:w-1/2" >
        <
        iframe src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2537.998249848038!2d73.07206992436008!3d33.667946087926914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df95459918a25f%3A0x46495cfc8ce0a1a3!2sI-8%20Markaz%20I%208%20Markaz%20I-8%2C%20Islamabad%2C%20Pakistan!5e1!3m2!1sen!2s!4v1749130039478!5m2!1sen!2s"
        width = "600"
        height = "450"
        style = {
            { border: 0 } }
        allowFullScreen loading = "lazy"
        referrerPolicy = "no-referrer-when-downgrade"
        className = "rounded-lg border-2 border-gray-300" >
        < /iframe> <
        /div> <
        /section>

        <
        section id = "contact"
        className = "p-10 bg-black text-white" >
        <
        h2 className = "text-3xl font-bold text-center mb-8" > Contact Info < /h2> <
        div className = "flex flex-col md:flex-row justify-between gap-6" >
        <
        p className = "flex items-center gap-4" >
        <
        Image src = "/location.webp"
        height = { 70 }
        width = { 70 }
        alt = "Location" / >
        Rehman Baba Road, I - 8 Islamabad <
        /p> <
        p className = "flex items-center gap-4" >
        <
        Image src = "/phone.jpg"
        height = { 70 }
        width = { 70 }
        alt = "Phone" / >
        +92 - 3258907430 <
        /p> <
        p className = "flex items-center gap-4" >
        <
        Image src = "/email.jpg"
        height = { 70 }
        width = { 70 }
        alt = "Email" / >
        Info @Irfanievents.com <
        /p> <
        /div> <
        /section> <
        /div>
    );
}