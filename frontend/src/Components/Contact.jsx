// ...existing code...
import React, { useState } from 'react';
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); // added

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      alert('Please enter a valid email address.');
      return;
    }
    setIsModalOpen(true);
  };

  const confirmSend = async () => {
    // replaced mailto with backend call (Gmail via server)
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8080/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || res.statusText);

      alert('Message sent successfully.');
      setIsModalOpen(false);
      setName(''); setEmail(''); setMessage('');
    } catch (err) {
      alert('Send failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => setIsModalOpen(false);

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

          <form className="flex-1 mt-4 md:mt-0 flex flex-col gap-3" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="p-3 rounded-lg bg-white/5 text-white placeholder-white/40 border border-purple-700/20 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-3 rounded-lg bg-white/5 text-white placeholder-white/40 border border-purple-700/20 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
            <textarea
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              required
              className="p-3 rounded-lg bg-white/5 text-white placeholder-white/40 border border-purple-700/20 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
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

      {/* custom confirm modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 backdrop-blur-sm">
          <div className="w-[92%] max-w-md rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900 to-black p-6 shadow-2xl relative">
            <button
              onClick={closeModal}
              className="absolute right-3 top-3 text-white/70 hover:text-white text-2xl leading-none"
              aria-label="Close"
            >
              ×
            </button>
            <div className="flex items-center gap-3 mb-2">
              <span className="p-2 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 shadow-md">
                <FaEnvelope className="text-white" />
              </span>
              <h3 className="text-xl font-semibold text-white">Confirm details</h3>
            </div>

            {/* helper text */}
            <p className="text-white/70 text-sm mb-3">
              Please confirm your details so we can contact you. If everything looks correct, click Send.
            </p>

            <div className="text-white/90 text-sm space-y-2">
              <p><span className="text-white/60">To:</span> info@SkillSwap.com</p>
              <p><span className="text-white/60">From:</span> {email}</p>
              <p><span className="text-white/60">Name:</span> {name || 'Anonymous'}</p>

              {/* message label + preview */}
              <p className="text-white/60">Message:</p>
              <div className="p-3 rounded-lg bg-white/5 border border-white/10 max-h-40 overflow-auto">
                <p className="whitespace-pre-wrap">{message}</p>
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-lg border border-white/10 text-white/80 hover:bg-white/5 transition"
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={confirmSend}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition-transform"
                type="button"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}