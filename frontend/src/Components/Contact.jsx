// ...existing code...
import React from 'react';
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function ContactSection() {
  return (
    <div className="w-full bg-gradient-to-br from-black via-gray-900 to-black border border-white/10 rounded-2xl shadow-2xl mt-10 mx-0 py-12 sm:py-16 min-h-[340px] sm:min-h-[420px] relative z-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4 text-white flex items-center gap-3">
              <span className="p-2 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 shadow-md">
                <FaEnvelope className="text-white" />
              </span>
              Contact & Support
            </h2>
            <p className="text-white/90 mb-4 text-lg">
              For inquiries or support, reach out to us:
            </p>
            <div className="flex flex-col gap-2 mb-2">
              <span className="text-white/80 flex items-center gap-2">
                <FaEnvelope className="text-purple-400" />
                <Link to="mailto:info@SkillSwap.com" className="text-purple-300 underline">info@SkillSwap.com</Link>
              </span>
              <span className="text-white/80 flex items-center gap-2">
                <FaPhoneAlt className="text-purple-400" />
                <Link to="tel:+911234567890" className="text-purple-300 underline">+91 12345 67890</Link>
              </span>
            </div>
          </div>

          <form className="flex-1 mt-4 md:mt-0 flex flex-col gap-3">
            <input
              type="text"
              placeholder="Your Name"
              className="p-3 rounded-lg bg-white/5 text-white placeholder-white/40 border border-purple-700/20 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="p-3 rounded-lg bg-white/5 text-white placeholder-white/40 border border-purple-700/20 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
            <textarea
              placeholder="Your Message"
              className="p-3 rounded-lg bg-white/5 text-white placeholder-white/40 border border-purple-700/20 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              rows={3}
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 text-white font-bold py-3 rounded-lg mt-2 shadow-lg hover:scale-[1.03] transition-transform"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}