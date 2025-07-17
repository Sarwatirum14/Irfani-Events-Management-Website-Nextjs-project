export default function Footer() {
    return ( <
        footer className = "bg-black text-white py-10" >
        <
        div className = "max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left" >

        { /* Quick Links */ } <
        div >
        <
        h3 className = "text-xl font-semibold mb-4" > Quick Links < /h3> <
        ul className = "space-y-2" >
        <
        li > < a href = "/"
        className = "hover:underline" > Home < /a></li >
        <
        li > < a href = "/booking"
        className = "hover:underline" > Bookings < /a></li >
        <
        li > < a href = "/contact"
        className = "hover:underline" > Contact Us < /a></li >
        <
        /ul> <
        /div>

        { /* Contact Info */ } <
        div >
        <
        h3 className = "text-xl font-semibold mb-4" > Contact < /h3> <
        ul className = "space-y-2 text-sm" >
        <
        li > Email: < a href = "mailto:support@shaevents.com"
        className = "hover:underline" > support @Irfanievents.com < /a></li >
        <
        li > Phone: < a href = "tel:+1234567890"
        className = "hover:underline" > +123 456 7890 < /a></li >
        <
        li > Location: Islamabad, Pakistan < /li> <
        /ul> <
        /div>

        { /* About & Social */ } <
        div >
        <
        h3 className = "text-xl font-semibold mb-4" > About IRFANI Events < /h3> <
        p className = "text-sm mb-4" >
        We provide seamless event booking experiences
        for weddings, corporate events, birthdays, and more. <
        /p> <
        div className = "flex justify-center sm:justify-start space-x-4 mt-2" > { /* Home Icon with Tooltip */ } <
        div className = "relative group" >
        <
        a href = "/"
        className = "hover:text-pink-400" > 🌐 < /a> <
        div className = "absolute bottom-full mb-1 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap" >
        Home <
        /div> <
        /div>

        { /* About Us Icon with Tooltip */ } <
        div className = "relative group" >
        <
        a href = "/#about"
        className = "hover:text-pink-400" > 📘 < /a> <
        div className = "absolute bottom-full mb-1 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap" >
        About Us <
        /div> <
        /div>

        { /* Gallery Icon with Tooltip */ } <
        div className = "relative group" >
        <
        a href = "/gallery"
        className = "hover:text-pink-400" > 📸 < /a> <
        div className = "absolute bottom-full mb-1 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap" >
        Gallery <
        /div> <
        /div> <
        /div>

        <
        /div>

        <
        /div>

        { /* Copyright */ } <
        div className = "mt-10 text-center border-t border-gray-700 pt-4 text-sm text-gray-400" > ©2025 IRFANI Events.All rights reserved. <
        /div> <
        /footer>
    );
}