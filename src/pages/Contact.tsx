import { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Instagram, Twitter, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] dark:bg-[#0f0f0f] pt-14">
      {/* Hero */}
      <div className="bg-[#1a1a1a] py-16 sm:py-20 px-5 text-center">
        <p className="label-upper text-[9px] text-[#888888] mb-3">We're here</p>
        <h1 className="heading-editorial text-3xl sm:text-4xl text-[#FAFAF8] mb-3">Get in Touch</h1>
        <p className="sans-light text-sm text-[#888888] max-w-sm mx-auto">
          Have a question, feedback, or just want to say hi? We'd love to hear from you.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="md:col-span-2 space-y-10">
            <div>
              <h2 className="label-upper text-[10px] text-[#1a1a1a] dark:text-[#f0ede8] mb-6">Contact Information</h2>
              <div className="space-y-5">
                {[
                  { icon: Mail, label: 'Email', value: 'hello@lordlook.in', href: 'mailto:hello@lordlook.in' },
                  { icon: Phone, label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
                  { icon: MapPin, label: 'Address', value: '42 Fashion Street, Bandra West, Mumbai — 400050', href: null },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-[#e8e8e8] dark:border-[#2a2a2a] flex items-center justify-center shrink-0">
                      <Icon size={16} strokeWidth={1.5} className="text-[#888888]" />
                    </div>
                    <div>
                      <p className="label-upper text-[8px] text-[#888888] mb-1">{label}</p>
                      {href ? (
                        <a href={href} className="sans-light text-sm text-[#1a1a1a] dark:text-[#f0ede8] hover:opacity-60 transition-opacity">{value}</a>
                      ) : (
                        <p className="sans-light text-sm text-[#1a1a1a] dark:text-[#f0ede8]">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="label-upper text-[10px] text-[#1a1a1a] dark:text-[#f0ede8] mb-4">Follow Us</h3>
              <div className="flex gap-3">
                {[Instagram, Twitter, MessageCircle].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 border border-[#e8e8e8] dark:border-[#2a2a2a] flex items-center justify-center text-[#888888] hover:bg-[#1a1a1a] dark:hover:bg-[#f0ede8] hover:text-[#FAFAF8] dark:hover:text-[#1a1a1a] transition-all"
                  >
                    <Icon size={16} strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            </div>

            <a
              href="https://wa.me/919876543210?text=Hi%20LordLook%2C%20I%20have%20a%20question"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 border border-green-700 bg-green-700/5 hover:bg-green-700/10 transition-colors group"
            >
              <div className="w-10 h-10 bg-green-600 flex items-center justify-center">
                <MessageCircle size={18} className="text-white" />
              </div>
              <div>
                <p className="serif-italic text-sm text-green-700">Chat on WhatsApp</p>
                <p className="sans-light text-xs text-green-700/70">Usually responds within an hour</p>
              </div>
            </a>

            <div className="border border-[#e8e8e8] dark:border-[#2a2a2a] p-5">
              <h3 className="label-upper text-[9px] text-[#1a1a1a] dark:text-[#f0ede8] mb-4">Support Hours</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between sans-light text-[#888888]">
                  <span>Monday – Saturday</span><span className="text-[#1a1a1a] dark:text-[#f0ede8]">10am – 7pm</span>
                </div>
                <div className="flex justify-between sans-light text-[#888888]">
                  <span>Sunday</span><span className="text-[#1a1a1a] dark:text-[#f0ede8]">11am – 4pm</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3">
            <h2 className="label-upper text-[10px] text-[#1a1a1a] dark:text-[#f0ede8] mb-6">Send a Message</h2>

            {sent && (
              <div className="flex items-center gap-3 border border-green-700 bg-green-700/5 text-green-700 px-5 py-4 mb-6 text-sm">
                <CheckCircle size={16} strokeWidth={1.5} />
                <span className="sans-light">Message sent! We'll get back to you within 24 hours.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="label-upper text-[9px] text-[#888888] mb-2 block">Name</label>
                  <input
                    required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name" type="text"
                    className="w-full px-4 py-3 border border-[#e8e8e8] dark:border-[#2a2a2a] bg-transparent text-sm text-[#1a1a1a] dark:text-[#f0ede8] placeholder-[#888888] focus:outline-none focus:border-[#1a1a1a] dark:focus:border-[#f0ede8] font-light transition-colors"
                  />
                </div>
                <div>
                  <label className="label-upper text-[9px] text-[#888888] mb-2 block">Email</label>
                  <input
                    required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com" type="email"
                    className="w-full px-4 py-3 border border-[#e8e8e8] dark:border-[#2a2a2a] bg-transparent text-sm text-[#1a1a1a] dark:text-[#f0ede8] placeholder-[#888888] focus:outline-none focus:border-[#1a1a1a] dark:focus:border-[#f0ede8] font-light transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="label-upper text-[9px] text-[#888888] mb-2 block">Subject</label>
                <input
                  required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="Order issue, feedback, partnership..." type="text"
                  className="w-full px-4 py-3 border border-[#e8e8e8] dark:border-[#2a2a2a] bg-transparent text-sm text-[#1a1a1a] dark:text-[#f0ede8] placeholder-[#888888] focus:outline-none focus:border-[#1a1a1a] dark:focus:border-[#f0ede8] font-light transition-colors"
                />
              </div>
              <div>
                <label className="label-upper text-[9px] text-[#888888] mb-2 block">Message</label>
                <textarea
                  required rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Write your message here..."
                  className="w-full px-4 py-3 border border-[#e8e8e8] dark:border-[#2a2a2a] bg-transparent text-sm text-[#1a1a1a] dark:text-[#f0ede8] placeholder-[#888888] focus:outline-none focus:border-[#1a1a1a] dark:focus:border-[#f0ede8] font-light transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 bg-[#1a1a1a] dark:bg-[#f0ede8] text-[#FAFAF8] dark:text-[#1a1a1a] text-xs tracking-widest uppercase font-light hover:opacity-80 active:scale-[0.98] transition-all"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
