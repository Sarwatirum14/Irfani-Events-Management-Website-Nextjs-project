// app/components/Navbar.js
'use client'
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/40 text-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-end space-x-6">
        <Link href="/" className="hover:text-pink-500 transition">Home</Link>
        <a href="/#about" className="hover:text-pink-500 transition">About us</a>
        <a href="/#events" className="hover:text-pink-500 transition">Event</a>
        <Link href="/gallery" className="hover:text-pink-500 transition">Gallery</Link>
        <a href="/contact" className="hover:text-pink-500 transition">Contact Us</a>
        <a href="/admin" className="hover:text-pink-500 transition">Admin Login</a>
        <button className="border-2 border-white border-r-4 p-0.5"><a href="/booking" className="hover:text-pink-500 transition">BOOK NOW!</a></button>

      </div>
    </nav>
  );
}
